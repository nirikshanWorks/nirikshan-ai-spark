-- Add status and end_date columns to employees table
ALTER TABLE public.employees 
ADD COLUMN status text NOT NULL DEFAULT 'active',
ADD COLUMN end_date date;

-- Add a comment for documentation
COMMENT ON COLUMN public.employees.status IS 'Employee status: active, inactive, resigned, internship_ended';
COMMENT ON COLUMN public.employees.end_date IS 'End date for resignation or internship completion';