-- ============================================================
-- Sample Data for Testing
-- NOTE: Run this AFTER creating your admin user through Google OAuth
-- Replace 'YOUR_ADMIN_USER_ID' with actual UUID from auth.users
-- ============================================================

-- Update the first user to admin (do this manually after first login)
-- UPDATE public.users SET role = 'admin' WHERE email = 'your-admin@email.com';

-- Sample Subjects
INSERT INTO public.subjects (name, code, description, credits) VALUES
  ('Mathematics', 'MATH101', 'Fundamentals of Mathematics', 4),
  ('Physics', 'PHY101', 'Introduction to Physics', 4),
  ('Chemistry', 'CHEM101', 'Basic Chemistry', 3),
  ('Computer Science', 'CS101', 'Introduction to Programming', 4),
  ('English', 'ENG101', 'English Communication Skills', 2),
  ('Biology', 'BIO101', 'Introduction to Biology', 3);

-- Sample Timetable (requires subjects to exist)
-- INSERT INTO public.timetable (subject_id, day, start_time, end_time, room, batch)
-- SELECT id, 'Monday', '09:00', '10:00', 'Room 101', '2024-A'
-- FROM public.subjects WHERE code = 'MATH101';
