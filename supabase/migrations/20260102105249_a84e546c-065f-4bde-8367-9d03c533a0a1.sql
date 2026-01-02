-- Create certificates table for verification system
CREATE TABLE public.certificates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  certificate_number TEXT NOT NULL UNIQUE,
  recipient_name TEXT NOT NULL,
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  nda_signed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique slug for public URL access
CREATE INDEX idx_certificates_certificate_number ON public.certificates(certificate_number);

-- Enable RLS
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view certificates (public verification)
CREATE POLICY "Anyone can view certificates"
ON public.certificates
FOR SELECT
USING (true);

-- Policy: Only admins can insert certificates
CREATE POLICY "Only admins can insert certificates"
ON public.certificates
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Policy: Only admins can update certificates
CREATE POLICY "Only admins can update certificates"
ON public.certificates
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Policy: Only admins can delete certificates
CREATE POLICY "Only admins can delete certificates"
ON public.certificates
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_certificates_updated_at
BEFORE UPDATE ON public.certificates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();