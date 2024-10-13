import { BlogPostsEffects } from './blog-posts/blog-posts.effects';
import { BlogPostsFacade } from './blog-posts/blog-posts.facade';
import { BlogPostsState } from './blog-posts/blog-posts.model';
import { blogPostsReducer } from './blog-posts/blog-posts.reducer';

export interface AppState {
  blogPostsStore: BlogPostsState;
}

export const effects = [BlogPostsEffects];

export const facades = [BlogPostsFacade];

export const reducers = {
  blogPostsStore: blogPostsReducer,
};
