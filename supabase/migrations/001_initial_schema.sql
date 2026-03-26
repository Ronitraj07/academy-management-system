-- ============================================================
-- AcademyPro - Initial Database Schema with RLS
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE user_role AS ENUM ('student', 'faculty', 'admin', 'pending');
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late');
CREATE TYPE remark_type AS ENUM ('positive', 'negative', 'neutral', 'warning');
CREATE TYPE feedback_status AS ENUM ('new', 'read', 'resolved');

-- ============================================================
-- USERS TABLE
-- ============================================================
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'pending',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admin can view all users"
  ON public.users FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'
  ));

CREATE POLICY "Admin can update all users"
  ON public.users FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'
  ));

CREATE POLICY "Allow insert on signup"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================================
-- STUDENTS TABLE
-- ============================================================
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  batch TEXT NOT NULL,
  class_name TEXT NOT NULL,
  roll_number TEXT,
  parent_email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students view own record"
  ON public.students FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Faculty view all students"
  ON public.students FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role IN ('faculty', 'admin')
  ));

CREATE POLICY "Admin manage students"
  ON public.students FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'
  ));

-- ============================================================
-- FACULTY TABLE
-- ============================================================
CREATE TABLE public.faculty (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  department TEXT,
  qualification TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Faculty view own record"
  ON public.faculty FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "All authenticated can view faculty"
  ON public.faculty FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin manage faculty"
  ON public.faculty FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'
  ));

-- ============================================================
-- SUBJECTS TABLE
-- ============================================================
CREATE TABLE public.subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  faculty_id UUID REFERENCES public.faculty(id) ON DELETE SET NULL,
  description TEXT,
  credits INTEGER NOT NULL DEFAULT 3,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "All authenticated can view subjects"
  ON public.subjects FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin manage subjects"
  ON public.subjects FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'
  ));

CREATE POLICY "Faculty manage own subjects"
  ON public.subjects FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.faculty f WHERE f.user_id = auth.uid() AND f.id = subjects.faculty_id
  ));

-- ============================================================
-- ATTENDANCE TABLE
-- ============================================================
CREATE TABLE public.attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status attendance_status NOT NULL,
  marked_by UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(student_id, subject_id, date)
);

ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students view own attendance"
  ON public.attendance FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.students s WHERE s.id = attendance.student_id AND s.user_id = auth.uid()
  ));

CREATE POLICY "Faculty view and manage attendance"
  ON public.attendance FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role IN ('faculty', 'admin')
  ));

-- ============================================================
-- TIMETABLE TABLE
-- ============================================================
CREATE TABLE public.timetable (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  day TEXT NOT NULL CHECK (day IN ('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday')),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  room TEXT,
  batch TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.timetable ENABLE ROW LEVEL SECURITY;

CREATE POLICY "All authenticated view timetable"
  ON public.timetable FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Faculty and admin manage timetable"
  ON public.timetable FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role IN ('faculty', 'admin')
  ));

-- ============================================================
-- REMARKS TABLE
-- ============================================================
CREATE TABLE public.remarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  faculty_id UUID NOT NULL REFERENCES public.faculty(id) ON DELETE CASCADE,
  remark TEXT NOT NULL,
  type remark_type NOT NULL DEFAULT 'neutral',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.remarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students view own remarks"
  ON public.remarks FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.students s WHERE s.id = remarks.student_id AND s.user_id = auth.uid()
  ));

CREATE POLICY "Faculty manage remarks"
  ON public.remarks FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role IN ('faculty', 'admin')
  ));

-- ============================================================
-- ANNOUNCEMENTS TABLE
-- ============================================================
CREATE TABLE public.announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_by UUID NOT NULL REFERENCES public.users(id),
  target_role TEXT NOT NULL DEFAULT 'all',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "All authenticated view announcements"
  ON public.announcements FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Faculty and admin manage announcements"
  ON public.announcements FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role IN ('faculty', 'admin')
  ));

-- ============================================================
-- SYLLABUS TABLE
-- ============================================================
CREATE TABLE public.syllabus (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  unit_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.syllabus ENABLE ROW LEVEL SECURITY;

CREATE POLICY "All authenticated view syllabus"
  ON public.syllabus FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Faculty and admin manage syllabus"
  ON public.syllabus FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role IN ('faculty', 'admin')
  ));

-- ============================================================
-- FEEDBACK / CONTACT TABLE
-- ============================================================
CREATE TABLE public.feedback_contact (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status feedback_status NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.feedback_contact ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert feedback"
  ON public.feedback_contact FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin view and manage feedback"
  ON public.feedback_contact FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'
  ));

-- ============================================================
-- AUTO-CREATE USER ON SIGNUP TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, role, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    'pending',
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
