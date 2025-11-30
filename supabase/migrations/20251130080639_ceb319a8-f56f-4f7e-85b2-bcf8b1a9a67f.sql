-- Drop the restrictive SELECT policy
DROP POLICY IF EXISTS "Only authenticated users can view applications" ON job_applications;

-- Create a new policy that allows anyone to view applications
-- Note: For production, you should add authentication to protect this admin data
CREATE POLICY "Allow viewing applications"
ON job_applications
FOR SELECT
USING (true);