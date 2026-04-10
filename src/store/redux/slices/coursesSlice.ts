import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Course } from "@/types";
import { fetchCourses } from "@/lib/api";

interface CoursesState {
  items: Course[];
  loading: boolean;
  error: string | null;
  filter: string;
}

const initialState: CoursesState = {
  items: [],
  loading: false,
  error: null,
  filter: "all",
};

export const loadCourses = createAsyncThunk(
  "courses/loadCourses",
  async (_, { rejectWithValue }) => {
    const response = await fetchCourses();
    if (!response.success) {
      return rejectWithValue(response.message || "Failed to load courses");
    }
    return response.data;
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to load courses";
      });
  },
});

export const { setFilter } = coursesSlice.actions;
export default coursesSlice.reducer;
