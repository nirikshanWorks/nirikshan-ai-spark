-- Create social internship applications table
CREATE TABLE IF NOT EXISTS public.social_internship_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  college TEXT NOT NULL,
  track TEXT NOT NULL,
  resume_link TEXT,
  statement_of_purpose TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.social_internship_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for social internship applications
CREATE POLICY "Anyone can submit social internship applications"
ON public.social_internship_applications
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Only authenticated users can view social internship applications"
ON public.social_internship_applications
FOR SELECT
TO authenticated
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_social_internship_applications_updated_at
BEFORE UPDATE ON public.social_internship_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
