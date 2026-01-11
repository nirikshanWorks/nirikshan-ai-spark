-- Fix the overly permissive admin policy for attendance
DROP POLICY IF EXISTS "Admins can manage attendance" ON public.attendance;

-- Create specific policies for admin operations
CREATE POLICY "Admins can insert attendance"
ON public.attendance FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update attendance"
ON public.attendance FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete attendance"
ON public.attendance FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Fix the overly permissive admin policy for leave_requests
DROP POLICY IF EXISTS "Admins can manage leave requests" ON public.leave_requests;

CREATE POLICY "Admins can insert leave requests"
ON public.leave_requests FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update leave requests"
ON public.leave_requests FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete leave requests"
ON public.leave_requests FOR DELETE
USING (has_role(auth.uid(), 'admin'));