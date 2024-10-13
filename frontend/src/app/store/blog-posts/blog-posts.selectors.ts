import { createSelector } from '@ngrx/store';

import { AppState } from '../';
import { BlogPostsState } from './blog-posts.model';

export const selectBlogPostsStore = (state: AppState): BlogPostsState => state.blogPostsStore;

export const selectBlogPosts = createSelector(selectBlogPostsStore, (state) => state.blogPosts);

export const selectSelectedBlogPost = createSelector(
  selectBlogPostsStore,
  (state) => state.selectedBlogPost
);

export const selecteCreatedBlogPost = createSelector(
  selectBlogPostsStore,
  (state) => state.createdBlogPost
);
