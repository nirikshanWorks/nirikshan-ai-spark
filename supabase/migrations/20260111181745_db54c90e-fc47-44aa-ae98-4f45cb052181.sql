-- Insert common Indian public holidays for 2025 and 2026
INSERT INTO public.holidays (name, date, type, description) VALUES
-- 2025 Holidays
('Republic Day', '2025-01-26', 'public', 'Celebrates the adoption of the Constitution of India'),
('Holi', '2025-03-14', 'public', 'Festival of Colors'),
('Good Friday', '2025-04-18', 'public', 'Christian holiday commemorating crucifixion of Jesus'),
('Eid ul-Fitr', '2025-03-31', 'public', 'End of Ramadan'),
('Buddha Purnima', '2025-05-12', 'public', 'Birth anniversary of Gautama Buddha'),
('Independence Day', '2025-08-15', 'public', 'Independence from British rule'),
('Janmashtami', '2025-08-16', 'public', 'Birth anniversary of Lord Krishna'),
('Gandhi Jayanti', '2025-10-02', 'public', 'Birth anniversary of Mahatma Gandhi'),
('Dussehra', '2025-10-12', 'public', 'Victory of good over evil'),
('Diwali', '2025-10-21', 'public', 'Festival of Lights'),
('Guru Nanak Jayanti', '2025-11-05', 'public', 'Birth anniversary of Guru Nanak'),
('Christmas', '2025-12-25', 'public', 'Birth of Jesus Christ'),
-- 2026 Holidays
('Republic Day', '2026-01-26', 'public', 'Celebrates the adoption of the Constitution of India'),
('Holi', '2026-03-04', 'public', 'Festival of Colors'),
('Good Friday', '2026-04-03', 'public', 'Christian holiday commemorating crucifixion of Jesus'),
('Independence Day', '2026-08-15', 'public', 'Independence from British rule'),
('Gandhi Jayanti', '2026-10-02', 'public', 'Birth anniversary of Mahatma Gandhi'),
('Dussehra', '2026-10-01', 'public', 'Victory of good over evil'),
('Diwali', '2026-11-08', 'public', 'Festival of Lights'),
('Christmas', '2026-12-25', 'public', 'Birth of Jesus Christ')
ON CONFLICT (date) DO NOTHING;