import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AppState } from '../';
import * as blogPostsActions from './blog-posts.actions';
import { BlogPostData, CreateBlogPostRequest } from './blog-posts.model';
import * as blogPostsSelectors from './blog-posts.selectors';

@Injectable()
export class BlogPostsFacade {
  private readonly _store = inject(Store<AppState>);

  blogPosts$ = this._store.pipe(select(blogPostsSelectors.selectBlogPosts));
  selectedBlogPost$ = this._store.pipe(select(blogPostsSelectors.selectSelectedBlogPost));
  createdBlogPost$ = this._store.pipe(select(blogPostsSelectors.selecteCreatedBlogPost));

  getBlogPosts(): void {
    this._store.dispatch(blogPostsActions.getBlogPosts());
  }

  getBlogPost(payload: Pick<BlogPostData, 'id'>): void {
    this._store.dispatch(blogPostsActions.getBlogPost(payload));
  }

  createBlogPost(payload: CreateBlogPostRequest): void {
    this._store.dispatch(blogPostsActions.createBlogPost(payload));
  }

  clearSelectedBlogPost(): void {
    this._store.dispatch(blogPostsActions.clearSelectedBlogPost());
  }
}
