import { configureStore, createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: JSON.parse(localStorage.getItem("posts")) || [],
    searchTerm: "",
  },
  reducers: {
    addPost: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("posts", JSON.stringify(state.items));
    },
    deletePost: (state, action) => {
      state.items = state.items.filter((post) => post.id !== action.payload);
      localStorage.setItem("posts", JSON.stringify(state.items));
    },
    updatePost: (state, action) => {
      const index = state.items.findIndex((post) => post.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        localStorage.setItem("posts", JSON.stringify(state.items));
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { addPost, deletePost, updatePost, setSearchTerm } = postsSlice.actions;

export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
  },
});
