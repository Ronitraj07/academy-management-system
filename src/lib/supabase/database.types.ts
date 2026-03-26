export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = 'student' | 'faculty' | 'admin' | 'pending';
export type AttendanceStatus = 'present' | 'absent' | 'late';
export type RemarkType = 'positive' | 'negative' | 'neutral' | 'warning';
export type FeedbackStatus = 'new' | 'read' | 'resolved';

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: UserRole;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          role?: UserRole;
          avatar_url?: string | null;
        };
        Update: {
          email?: string;
          name?: string;
          role?: UserRole;
          avatar_url?: string | null;
        };
      };
      students: {
        Row: {
          id: string;
          user_id: string;
          batch: string;
          class_name: string;
          roll_number: string | null;
          parent_email: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          batch: string;
          class_name: string;
          roll_number?: string | null;
          parent_email?: string | null;
        };
        Update: {
          batch?: string;
          class_name?: string;
          roll_number?: string | null;
          parent_email?: string | null;
        };
      };
      faculty: {
        Row: {
          id: string;
          user_id: string;
          department: string | null;
          qualification: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          department?: string | null;
          qualification?: string | null;
        };
        Update: {
          department?: string | null;
          qualification?: string | null;
        };
      };
      subjects: {
        Row: {
          id: string;
          name: string;
          code: string;
          faculty_id: string | null;
          description: string | null;
          credits: number;
          created_at: string;
        };
        Insert: {
          name: string;
          code: string;
          faculty_id?: string | null;
          description?: string | null;
          credits?: number;
        };
        Update: {
          name?: string;
          code?: string;
          faculty_id?: string | null;
          description?: string | null;
          credits?: number;
        };
      };
      attendance: {
        Row: {
          id: string;
          student_id: string;
          subject_id: string;
          date: string;
          status: AttendanceStatus;
          marked_by: string | null;
          created_at: string;
        };
        Insert: {
          student_id: string;
          subject_id: string;
          date: string;
          status: AttendanceStatus;
          marked_by?: string | null;
        };
        Update: {
          status?: AttendanceStatus;
        };
      };
      timetable: {
        Row: {
          id: string;
          subject_id: string;
          day: string;
          start_time: string;
          end_time: string;
          room: string | null;
          batch: string | null;
          created_at: string;
        };
        Insert: {
          subject_id: string;
          day: string;
          start_time: string;
          end_time: string;
          room?: string | null;
          batch?: string | null;
        };
        Update: {
          subject_id?: string;
          day?: string;
          start_time?: string;
          end_time?: string;
          room?: string | null;
          batch?: string | null;
        };
      };
      remarks: {
        Row: {
          id: string;
          student_id: string;
          faculty_id: string;
          remark: string;
          type: RemarkType;
          created_at: string;
        };
        Insert: {
          student_id: string;
          faculty_id: string;
          remark: string;
          type: RemarkType;
        };
        Update: {
          remark?: string;
          type?: RemarkType;
        };
      };
      announcements: {
        Row: {
          id: string;
          title: string;
          content: string;
          created_by: string;
          target_role: UserRole | 'all';
          created_at: string;
        };
        Insert: {
          title: string;
          content: string;
          created_by: string;
          target_role?: UserRole | 'all';
        };
        Update: {
          title?: string;
          content?: string;
          target_role?: UserRole | 'all';
        };
      };
      syllabus: {
        Row: {
          id: string;
          subject_id: string;
          unit_number: number;
          title: string;
          content: string;
          is_completed: boolean;
          created_at: string;
        };
        Insert: {
          subject_id: string;
          unit_number: number;
          title: string;
          content: string;
          is_completed?: boolean;
        };
        Update: {
          title?: string;
          content?: string;
          is_completed?: boolean;
        };
      };
      feedback_contact: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          status: FeedbackStatus;
          created_at: string;
        };
        Insert: {
          name: string;
          email: string;
          message: string;
          status?: FeedbackStatus;
        };
        Update: {
          status?: FeedbackStatus;
        };
      };
    };
  };
}
