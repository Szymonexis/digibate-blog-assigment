import { Routes } from '@angular/router';

import { BlogPostListComponent } from './components/blog-post-list/blog-post-list.component';
import { CreateBlogPostComponent } from './components/create-blog-post/create-blog-post.component';
import { HttpService } from './core/http/http.service';
import { blogPostListGuard } from './guards/blog-post-list.guard';

export enum PATHS {
  CREATE = 'create',
  SHOW = 'list',
}

export const routes: Routes = [
  {
    path: `${PATHS.CREATE}`,
    component: CreateBlogPostComponent,
    providers: [HttpService],
  },
  {
    path: `${PATHS.SHOW}`,
    component: BlogPostListComponent,
    providers: [HttpService],
    canActivate: [blogPostListGuard],
  },
  { path: '', redirectTo: `/${PATHS.CREATE}`, pathMatch: 'full' },
  { path: '**', redirectTo: `/${PATHS.CREATE}`, pathMatch: 'full' },
];
