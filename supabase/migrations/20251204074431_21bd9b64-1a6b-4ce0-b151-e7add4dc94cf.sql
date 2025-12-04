-- Drop existing check constraint and add new one with 'interview' status
ALTER TABLE public.job_applications DROP CONSTRAINT IF EXISTS job_applications_status_check;

ALTER TABLE public.job_applications ADD CONSTRAINT job_applications_status_check 
CHECK (status IN ('pending', 'selected', 'rejected', 'interview'));