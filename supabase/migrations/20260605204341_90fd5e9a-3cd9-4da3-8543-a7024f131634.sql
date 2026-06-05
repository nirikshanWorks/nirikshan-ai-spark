
CREATE TABLE public.social_internship_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  college TEXT NOT NULL,
  track TEXT NOT NULL,
  resume_link TEXT,
  statement_of_purpose TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.social_internship_applications TO authenticated;
GRANT INSERT ON public.social_internship_applications TO anon;
GRANT ALL ON public.social_internship_applications TO service_role;

ALTER TABLE public.social_internship_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit internship applications"
  ON public.social_internship_applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins and managers can view applications"
  ON public.social_internship_applications FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'manager'));

CREATE POLICY "Admins and managers can update applications"
  ON public.social_internship_applications FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'manager'));

CREATE POLICY "Admins can delete applications"
  ON public.social_internship_applications FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_social_internship_applications_updated_at
  BEFORE UPDATE ON public.social_internship_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
