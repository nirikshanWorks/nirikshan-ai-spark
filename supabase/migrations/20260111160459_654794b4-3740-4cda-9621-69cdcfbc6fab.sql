-- Create employees table with additional profile data
CREATE TABLE public.employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  employee_id TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  department TEXT,
  designation TEXT,
  joining_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create attendance table
CREATE TABLE public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'present' CHECK (status IN ('present', 'absent', 'half-day', 'late')),
  check_in_time TIMESTAMP WITH TIME ZONE DEFAULT now(),
  check_out_time TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(employee_id, date)
);

-- Create leave_requests table
CREATE TABLE public.leave_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE NOT NULL,
  leave_type TEXT NOT NULL CHECK (leave_type IN ('sick', 'casual', 'earned', 'unpaid', 'other')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for employees table
CREATE POLICY "Employees can view their own profile"
ON public.employees FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all employees"
ON public.employees FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert employees"
ON public.employees FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update employees"
ON public.employees FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete employees"
ON public.employees FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for attendance table
CREATE POLICY "Employees can view their own attendance"
ON public.attendance FOR SELECT
USING (employee_id IN (SELECT id FROM public.employees WHERE user_id = auth.uid()));

CREATE POLICY "Employees can mark their own attendance"
ON public.attendance FOR INSERT
WITH CHECK (employee_id IN (SELECT id FROM public.employees WHERE user_id = auth.uid()));

CREATE POLICY "Admins can view all attendance"
ON public.attendance FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage attendance"
ON public.attendance FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for leave_requests table
CREATE POLICY "Employees can view their own leave requests"
ON public.leave_requests FOR SELECT
USING (employee_id IN (SELECT id FROM public.employees WHERE user_id = auth.uid()));

CREATE POLICY "Employees can create leave requests"
ON public.leave_requests FOR INSERT
WITH CHECK (employee_id IN (SELECT id FROM public.employees WHERE user_id = auth.uid()));

CREATE POLICY "Admins can view all leave requests"
ON public.leave_requests FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage leave requests"
ON public.leave_requests FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- Triggers for updated_at
CREATE TRIGGER update_employees_updated_at
BEFORE UPDATE ON public.employees
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leave_requests_updated_at
BEFORE UPDATE ON public.leave_requests
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();