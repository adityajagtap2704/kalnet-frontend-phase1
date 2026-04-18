import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EnrolledCourse {
  courseId: string;
  courseTitle: string;
  enrolledAt: string;
  progress: number; // 0–100
  nextLesson: string;
  instructor: string;
  accent: string;
  duration: string;
  completedLessons: number;
  totalLessons: number;
}

interface EnrollmentState {
  enrolled: EnrolledCourse[];
}

const initialState: EnrollmentState = {
  enrolled: [],
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    // Called after login to restore this user's saved enrollments
    loadUserEnrollment: (state, action: PayloadAction<EnrolledCourse[]>) => {
      state.enrolled = action.payload;
    },
    // Called on logout — wipes in-memory state (localStorage kept per-user)
    clearEnrollment: (state) => {
      state.enrolled = [];
    },
    enroll: (state, action: PayloadAction<EnrolledCourse>) => {
      const exists = state.enrolled.find((e) => e.courseId === action.payload.courseId);
      if (!exists) {
        state.enrolled.push(action.payload);
      }
    },
    updateProgress: (
      state,
      action: PayloadAction<{ courseId: string; progress: number; completedLessons: number; nextLesson?: string }>
    ) => {
      const course = state.enrolled.find((e) => e.courseId === action.payload.courseId);
      if (course) {
        course.progress = action.payload.progress;
        course.completedLessons = action.payload.completedLessons;
        if (action.payload.nextLesson) course.nextLesson = action.payload.nextLesson;
      }
    },
    unenroll: (state, action: PayloadAction<string>) => {
      state.enrolled = state.enrolled.filter((e) => e.courseId !== action.payload);
    },
  },
});

export const { loadUserEnrollment, clearEnrollment, enroll, updateProgress, unenroll } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
