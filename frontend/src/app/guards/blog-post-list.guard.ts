import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { BlogPostsFacade } from '../store/blog-posts/blog-posts.facade';

export const blogPostListGuard: CanActivateFn = () => {
  const blogPostsFacade = inject(BlogPostsFacade);

  blogPostsFacade.getBlogPosts();

  return true;
};
