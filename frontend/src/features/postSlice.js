import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const createPost = createAsyncThunk(
  "posts/create",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/posts/create`,
        formData,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        window.location.replace = "/login";
      }
      return rejectWithValue(error);
    }
  }
);

const getPosts = createAsyncThunk(
  "posts/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/posts`,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        window.location.replace = "/login";
      }
      return rejectWithValue(error);
    }
  }
);
const likePost = createAsyncThunk("posts/like", async (postId) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/like`,
      {},
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      window.location.replace = "/login";
    }
    return rejectWithValue(error);
  }
});

const commentPost = createAsyncThunk(
  "posts/comment",
  async ({ postId, comment }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/comment`,
        { text: comment },
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        window.location.replace = "/login";
      }
      return rejectWithValue(error);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: { posts: [], loading: false, error: null, createPostError: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      });
  },
});

export { createPost, getPosts, likePost, commentPost };
export default postSlice.reducer;
