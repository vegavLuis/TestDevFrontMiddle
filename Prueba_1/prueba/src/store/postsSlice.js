import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/jsonplaceholder";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (userId) => {
    const posts = await api.getPostsByUser(userId);
    return Promise.all(
      posts.map(async (post) => ({
        ...post,
        comments: await api.getCommentsByPost(post.id),
      })),
    );
  },
);

const postsSlice = createSlice({
  name: "posts",
  initialState: { list: [], loading: false },
  reducers: {
    clearPosts: (s) => {
      s.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload;
      })
      .addCase(fetchPosts.rejected, (s) => {
        s.loading = false;
      });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
