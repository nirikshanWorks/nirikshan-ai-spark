GRANT INSERT ON public.leads TO anon;

CREATE POLICY "Public can submit website leads"
ON public.leads
FOR INSERT
TO anon
WITH CHECK (source = 'website' AND status = 'new' AND assigned_to IS NULL);