import { BehaviorSubject, combineLatest } from 'rxjs';

import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

import { PATHS } from './app.routes';
import { HttpService } from './core/http/http.service';
import { BlogPostsFacade } from './store/blog-posts/blog-posts.facade';

@Component({
  imports: [
    RouterModule,
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatTabsModule,
    MatProgressSpinnerModule,
  ],
  providers: [HttpService],
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent extends OnDestroyMixin implements OnInit {
  private readonly _blogPostsFacade = inject(BlogPostsFacade);
  private readonly _snackBar = inject(MatSnackBar);

  isLoading$ = new BehaviorSubject(false);
  error$ = new BehaviorSubject<HttpErrorResponse | null>(null);

  PATHS = PATHS;

  ngOnInit(): void {
    this._blogPostsFacade.blogPosts$
      .pipe(untilComponentDestroyed(this))
      .subscribe(({ isLoading }) => {
        this.isLoading$.next(isLoading);
      });

    combineLatest([
      this._blogPostsFacade.blogPosts$,
      this._blogPostsFacade.createdBlogPost$,
      this._blogPostsFacade.selectedBlogPost$,
    ])
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        ([
          { error: blogPostsError },
          { error: createdBlogPostError },
          { error: selectedBlogPostError },
        ]) => {
          if (blogPostsError) {
            this._snackBar.open((blogPostsError.error.message as string[])[0], 'Close');
          } else if (createdBlogPostError) {
            this._snackBar.open((createdBlogPostError.error.message as string[])[0], 'Close');
          } else if (selectedBlogPostError) {
            this._snackBar.open((selectedBlogPostError.error.message as string[])[0], 'Close');
          }
        }
      );
  }
}
