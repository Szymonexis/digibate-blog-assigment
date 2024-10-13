import { catchError, map, of, switchMap } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { HttpService } from '../../core/http/http.service';
import * as blogPostsActions from './blog-posts.actions';

@Injectable()
export class BlogPostsEffects {
  private readonly _actions$ = inject(Actions);
  private readonly _httpService = inject(HttpService);

  getBlogPosts$ = createEffect(() =>
    this._actions$.pipe(
      ofType(blogPostsActions.getBlogPosts),
      switchMap(() => {
        return this._httpService.getBlogPosts().pipe(
          map((blogPosts) => blogPostsActions.getBlogPostsSuccess({ blogPosts })),
          catchError((error: HttpErrorResponse) =>
            of(blogPostsActions.getBlogPostsFailure({ error }))
          )
        );
      })
    )
  );

  getBlogPost$ = createEffect(() =>
    this._actions$.pipe(
      ofType(blogPostsActions.getBlogPost),
      switchMap((payload) => {
        return this._httpService.getBlogPost(payload.id).pipe(
          map((selectedBlogPost) => blogPostsActions.getBlogPostSuccess(selectedBlogPost)),
          catchError((error: HttpErrorResponse) =>
            of(blogPostsActions.getBlogPostFailure({ error }))
          )
        );
      })
    )
  );

  createBlogPost$ = createEffect(() =>
    this._actions$.pipe(
      ofType(blogPostsActions.createBlogPost),
      switchMap(({ type: __, ...payload }) => {
        return this._httpService.createBlogPost(payload).pipe(
          map((createdBlogPost) => blogPostsActions.createBlogPostSuccess(createdBlogPost)),
          catchError((error: HttpErrorResponse) =>
            of(blogPostsActions.createBlogPostFailure({ error }))
          )
        );
      })
    )
  );
}
