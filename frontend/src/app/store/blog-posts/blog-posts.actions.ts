import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { BlogPostData, CreateBlogPostRequest, StrippedBlogPostData } from './blog-posts.model';

export const getBlogPost = createAction(
  '[BlogPostsStore] Get blog post',
  props<Pick<BlogPostData, 'id'>>()
);
export const getBlogPostSuccess = createAction(
  '[BlogPostsStore] Get blog post success',
  props<BlogPostData>()
);
export const getBlogPostFailure = createAction(
  '[BlogPostsStore] Get blog post failure',
  props<{ error: HttpErrorResponse }>()
);

export const getBlogPosts = createAction('[BlogPostsStore] Get blog posts');
export const getBlogPostsSuccess = createAction(
  '[BlogPostsStore] Get blog posts success',
  props<{ blogPosts: StrippedBlogPostData[] }>()
);
export const getBlogPostsFailure = createAction(
  '[BlogPostsStore] Get blog posts failure',
  props<{ error: HttpErrorResponse }>()
);

export const createBlogPost = createAction(
  '[BlogPostsStore] Create blog post',
  props<CreateBlogPostRequest>()
);
export const createBlogPostSuccess = createAction(
  '[BlogPostsStore] Create blog post success',
  props<BlogPostData>()
);
export const createBlogPostFailure = createAction(
  '[BlogPostsStore] Create blog post failure',
  props<{ error: HttpErrorResponse }>()
);

export const clearSelectedBlogPost = createAction('[BlogPostsStore] Clear selected blog post');
