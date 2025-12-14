-- Add offer acceptance tracking columns to job_applications
ALTER TABLE public.job_applications 
ADD COLUMN offer_accepted BOOLEAN DEFAULT NULL,
ADD COLUMN offer_accepted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
ADD COLUMN acceptance_token UUID DEFAULT NULL;

-- Create index for faster token lookup
CREATE INDEX idx_job_applications_acceptance_token ON public.job_applications(acceptance_token);

-- Create a policy to allow candidates to update their own acceptance via token
CREATE POLICY "Candidates can accept offer with valid token"
ON public.job_applications
FOR UPDATE
USING (acceptance_token IS NOT NULL)
WITH CHECK (acceptance_token IS NOT NULL);