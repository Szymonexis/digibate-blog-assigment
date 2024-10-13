import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

import { BlogPostsFacade } from '../../store/blog-posts/blog-posts.facade';
import {
  LENGTH_DESCRIPTIONS_MAP,
  StrippedBlogPostData,
  STRUCTURE_DESCRIPTIONS_MAP,
} from '../../store/blog-posts/blog-posts.model';
import { ShowBlogPostDialogComponent } from '../show-blog-post-dialog/show-blog-post-dialog.component';
import { ELLIPSIS_BREAKPOINT } from './blog-post-list.model';

@Component({
  imports: [
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    ShowBlogPostDialogComponent,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  standalone: true,
  selector: 'app-blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrl: './blog-post-list.component.scss',
})
export class BlogPostListComponent extends OnDestroyMixin {
  private readonly _blogPostsFacade = inject(BlogPostsFacade);
  private readonly _dialog = inject(MatDialog);

  blogPosts$ = this._blogPostsFacade.blogPosts$;

  LENGTH_DESCRIPTIONS_MAP = LENGTH_DESCRIPTIONS_MAP;
  STRUCTURE_DESCRIPTIONS_MAP = STRUCTURE_DESCRIPTIONS_MAP;
  ELLIPSIS_BREAKPOINT = ELLIPSIS_BREAKPOINT;

  onShowBlogPost(blogPost: StrippedBlogPostData): void {
    this._blogPostsFacade.getBlogPost({ id: blogPost.blogPostId });

    const dialogRef = this._dialog.open(ShowBlogPostDialogComponent, {
      width: 'calc(100dvw - 8rem)',
      height: 'calc(100dvh - 4rem)',
      maxWidth: '100dvw',
    });

    dialogRef
      .afterClosed()
      .pipe(untilComponentDestroyed(this))
      .subscribe(() => {
        this._blogPostsFacade.clearSelectedBlogPost();
      });
  }
}
