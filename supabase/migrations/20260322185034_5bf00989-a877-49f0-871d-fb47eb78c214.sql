ALTER TABLE public.job_applications 
  ADD COLUMN IF NOT EXISTS salary_expectation text,
  ADD COLUMN IF NOT EXISTS why_join_startup text,
  ADD COLUMN IF NOT EXISTS relevant_experience text,
  ADD COLUMN IF NOT EXISTS availability text,
  ADD COLUMN IF NOT EXISTS how_did_you_hear text;