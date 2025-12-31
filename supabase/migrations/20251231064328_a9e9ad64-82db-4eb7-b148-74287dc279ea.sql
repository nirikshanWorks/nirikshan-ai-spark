-- Allow admins to delete job applications
CREATE POLICY "Only admins can delete applications" 
ON public.job_applications 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));