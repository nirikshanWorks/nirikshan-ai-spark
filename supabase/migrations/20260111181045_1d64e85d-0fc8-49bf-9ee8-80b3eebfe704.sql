-- Create holidays table
CREATE TABLE public.holidays (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  date DATE NOT NULL,
  type TEXT NOT NULL DEFAULT 'public', -- 'public', 'company', 'optional'
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  UNIQUE(date)
);

-- Enable Row Level Security
ALTER TABLE public.holidays ENABLE ROW LEVEL SECURITY;

-- Everyone can view holidays
CREATE POLICY "Anyone can view holidays" 
ON public.holidays 
FOR SELECT 
USING (true);

-- Only admins can manage holidays
CREATE POLICY "Admins can insert holidays" 
ON public.holidays 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update holidays" 
ON public.holidays 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete holidays" 
ON public.holidays 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add index for date lookups
CREATE INDEX idx_holidays_date ON public.holidays(date);