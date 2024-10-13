import { createReducer, on } from '@ngrx/store';

import * as blogPostActions from './blog-posts.actions';
import { errored, initialState, loadedWithData, loading } from './blog-posts.model';

export const blogPostsReducer = createReducer(
  initialState,
  on(blogPostActions.getBlogPost, (state) => ({
    ...state,
    selectedBlogPost: {
      ...state.selectedBlogPost,
      ...loading,
    },
  })),
  on(blogPostActions.getBlogPostSuccess, (state, { type: __, ...blogPostData }) => ({
    ...state,
    selectedBlogPost: {
      ...state.selectedBlogPost,
      ...loadedWithData(blogPostData),
    },
  })),
  on(blogPostActions.getBlogPostFailure, (state, { type: __, ...error }) => ({
    ...state,
    selectedBlogPost: {
      ...state.selectedBlogPost,
      ...errored(error.error),
    },
  })),

  on(blogPostActions.getBlogPosts, (state) => ({
    ...state,
    blogPosts: {
      ...state.blogPosts,
      ...loading,
    },
  })),
  on(blogPostActions.getBlogPostsSuccess, (state, { blogPosts }) => ({
    ...state,
    blogPosts: {
      ...state.blogPosts,
      ...loadedWithData(blogPosts),
    },
  })),
  on(blogPostActions.getBlogPostsFailure, (state, { type: __, ...error }) => ({
    ...state,
    blogPosts: {
      ...state.blogPosts,
      ...errored(error.error),
    },
  })),

  on(blogPostActions.createBlogPost, (state) => ({
    ...state,
    createdBlogPost: {
      ...state.createdBlogPost,
      ...loading,
    },
  })),
  on(blogPostActions.createBlogPostSuccess, (state, { type: __, ...createdBlogPost }) => ({
    ...state,
    createdBlogPost: {
      ...state.createdBlogPost,
      ...loadedWithData(createdBlogPost),
    },
  })),
  on(blogPostActions.createBlogPostFailure, (state, { type: __, ...error }) => ({
    ...state,
    createdBlogPost: {
      ...state.createdBlogPost,
      ...errored(error.error),
    },
  })),

  on(blogPostActions.clearSelectedBlogPost, (state) => ({
    ...state,
    selectedBlogPost: {
      ...state.selectedBlogPost,
      ...loadedWithData(null),
    },
  }))
);
