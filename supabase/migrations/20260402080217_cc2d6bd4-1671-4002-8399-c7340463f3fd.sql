
-- Extend profiles table with CRM fields
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS full_name text,
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS department text,
  ADD COLUMN IF NOT EXISTS designation text,
  ADD COLUMN IF NOT EXISTS joining_date date,
  ADD COLUMN IF NOT EXISTS avatar_url text,
  ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;

-- Allow all authenticated users to view profiles (employee directory)
CREATE POLICY "Authenticated users can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (true);

-- Create tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  assigned_to uuid REFERENCES public.profiles(id),
  assigned_by uuid REFERENCES public.profiles(id),
  due_date date,
  priority text NOT NULL DEFAULT 'medium',
  status text NOT NULL DEFAULT 'todo',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view assigned tasks" ON public.tasks FOR SELECT TO authenticated USING (
  assigned_to = auth.uid() OR assigned_by = auth.uid() OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'manager')
);
CREATE POLICY "Authenticated can create tasks" ON public.tasks FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Task participants and admins can update" ON public.tasks FOR UPDATE TO authenticated USING (
  assigned_to = auth.uid() OR assigned_by = auth.uid() OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'manager')
);
CREATE POLICY "Admins can delete tasks" ON public.tasks FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));

-- Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  company text,
  service_interest text,
  message text,
  source text DEFAULT 'manual',
  status text DEFAULT 'new',
  assigned_to uuid REFERENCES public.profiles(id),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view assigned leads" ON public.leads FOR SELECT TO authenticated USING (
  assigned_to = auth.uid() OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'manager')
);
CREATE POLICY "Authenticated can create leads" ON public.leads FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Lead managers can update" ON public.leads FOR UPDATE TO authenticated USING (
  assigned_to = auth.uid() OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'manager')
);
CREATE POLICY "Admins can delete leads" ON public.leads FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));

-- Chat system tables
CREATE TABLE IF NOT EXISTS public.chat_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  description text,
  avatar_url text,
  created_by uuid,
  type text NOT NULL DEFAULT 'direct',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.chat_groups ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.chat_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES public.chat_groups(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  role text DEFAULT 'member',
  joined_at timestamptz DEFAULT now(),
  UNIQUE(group_id, user_id)
);

ALTER TABLE public.chat_members ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES public.chat_groups(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL,
  content text,
  message_type text DEFAULT 'text',
  file_url text,
  file_name text,
  file_size bigint,
  duration_seconds integer,
  reply_to uuid,
  is_deleted boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.message_reads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid REFERENCES public.chat_messages(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  read_at timestamptz DEFAULT now(),
  UNIQUE(message_id, user_id)
);

ALTER TABLE public.message_reads ENABLE ROW LEVEL SECURITY;

-- Security definer function for chat member lookups (avoids self-referencing RLS)
CREATE OR REPLACE FUNCTION public.user_group_ids(_user_id uuid)
RETURNS SETOF uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT group_id FROM public.chat_members WHERE user_id = _user_id
$$;

-- Chat groups RLS
CREATE POLICY "Members can view their groups" ON public.chat_groups FOR SELECT TO authenticated USING (
  id IN (SELECT public.user_group_ids(auth.uid()))
);
CREATE POLICY "Authenticated can create groups" ON public.chat_groups FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Group creators can update" ON public.chat_groups FOR UPDATE TO authenticated USING (created_by = auth.uid());

-- Chat members RLS (uses security definer function)
CREATE POLICY "Members can view group members" ON public.chat_members FOR SELECT TO authenticated USING (
  group_id IN (SELECT public.user_group_ids(auth.uid()))
);
CREATE POLICY "Authenticated can add members" ON public.chat_members FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can leave or be removed" ON public.chat_members FOR DELETE TO authenticated USING (
  user_id = auth.uid()
);

-- Chat messages RLS
CREATE POLICY "Members can view group messages" ON public.chat_messages FOR SELECT TO authenticated USING (
  group_id IN (SELECT public.user_group_ids(auth.uid()))
);
CREATE POLICY "Members can send messages" ON public.chat_messages FOR INSERT TO authenticated WITH CHECK (
  sender_id = auth.uid() AND group_id IN (SELECT public.user_group_ids(auth.uid()))
);
CREATE POLICY "Sender can update own messages" ON public.chat_messages FOR UPDATE TO authenticated USING (sender_id = auth.uid());

-- Message reads RLS
CREATE POLICY "Members can view message reads" ON public.message_reads FOR SELECT TO authenticated USING (
  message_id IN (SELECT id FROM public.chat_messages WHERE group_id IN (SELECT public.user_group_ids(auth.uid())))
);
CREATE POLICY "Users can mark as read" ON public.message_reads FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.message_reads;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tasks;

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('chat-files', 'chat-files', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT DO NOTHING;

-- Storage policies
CREATE POLICY "Authenticated upload chat files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'chat-files');
CREATE POLICY "Public view chat files" ON storage.objects FOR SELECT USING (bucket_id = 'chat-files');
CREATE POLICY "Authenticated upload avatars" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'avatars');
CREATE POLICY "Public view avatars" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
