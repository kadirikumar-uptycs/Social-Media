import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const createPost = createAsyncThunk("posts/create", async (formData) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/posts/create`,
    formData,
    { withCredentials: true }
  );
  return data;
});

const getPosts = createAsyncThunk("posts/get", async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/posts`,
    { withCredentials: true }
  );
  return data;
});
const likePost = createAsyncThunk("posts/like", async (postId) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/like`,
    {},
    { withCredentials: true }
  );
  return data;
});

const commentPost = createAsyncThunk(
  "posts/comment",
  async ({ postId, comment }) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/comment`,
      { text: comment },
      { withCredentials: true }
    );
    return data;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export { createPost, getPosts, likePost, commentPost };
export default postSlice.reducer;
