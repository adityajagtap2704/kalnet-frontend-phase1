import { configureStore } from "@reduxjs/toolkit";
import coursesReducer, {
  loadCourses,
  setFilter,
} from "@/store/redux/slices/coursesSlice";

jest.mock("@/lib/api", () => ({
  fetchCourses: jest.fn().mockResolvedValue({
    success: true,
    data: [
      {
        id: "c1",
        title: "React Fundamentals",
        description: "Learn React",
        duration: "8 weeks",
        level: "Beginner",
        price: 9999,
        curriculum: [],
        instructor: "Jane Doe",
        enrolledCount: 120,
        rating: 4.5,
        tags: ["react"],
      },
    ],
  }),
}));

function createStore() {
  return configureStore({ reducer: { courses: coursesReducer } });
}

describe("coursesSlice", () => {
  let store: ReturnType<typeof createStore>;

  beforeEach(() => {
    store = createStore();
  });

  it("has correct initial state", () => {
    const state = store.getState().courses;
    expect(state.items).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.filter).toBe("all");
  });

  it("sets loading true on loadCourses.pending", () => {
    store.dispatch(loadCourses.pending("", undefined));
    expect(store.getState().courses.loading).toBe(true);
    expect(store.getState().courses.error).toBeNull();
  });

  it("loads courses on fulfilled", async () => {
    await store.dispatch(loadCourses());
    const state = store.getState().courses;
    expect(state.loading).toBe(false);
    expect(state.items).toHaveLength(1);
    expect(state.items[0].title).toBe("React Fundamentals");
  });

  it("sets error on rejected", () => {
    store.dispatch(
      loadCourses.rejected(new Error("fail"), "", undefined, "Failed to load courses")
    );
    const state = store.getState().courses;
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Failed to load courses");
  });

  it("sets filter via setFilter", () => {
    store.dispatch(setFilter("Beginner"));
    expect(store.getState().courses.filter).toBe("Beginner");
  });

  it("resets filter to all", () => {
    store.dispatch(setFilter("Advanced"));
    store.dispatch(setFilter("all"));
    expect(store.getState().courses.filter).toBe("all");
  });
});
