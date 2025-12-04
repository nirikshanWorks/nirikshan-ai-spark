-- Allow admins to update job applications (for status updates)
CREATE POLICY "Only admins can update applications" 
ON public.job_applications 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));