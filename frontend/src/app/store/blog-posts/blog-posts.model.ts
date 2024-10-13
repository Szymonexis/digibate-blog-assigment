import { HttpErrorResponse } from '@angular/common/http';

export enum LENGTH {
  SHORT = 'SHORT',
  MEDIUM = 'MEDIUM',
  LONG = 'LONG',
}

export enum STRUCTURE {
  LIST_FORMAT = 'LIST_FORMAT',
  INTERVIEW_STYLE = 'INTERVIEW_STYLE',
  TUTORIAL = 'TUTORIAL',
  STORY = 'STORY',
}

export const LENGTH_DESCRIPTIONS_MAP: { [key in LENGTH]: string } = {
  SHORT: 'Short',
  MEDIUM: 'Medium',
  LONG: 'Long',
};

export const STRUCTURE_DESCRIPTIONS_MAP: { [key in STRUCTURE]: string } = {
  INTERVIEW_STYLE: 'Interview',
  LIST_FORMAT: 'List',
  TUTORIAL: 'Tutorial',
  STORY: 'Story',
};

export const LENGTH_DESCRIPTIONS = Object.entries(LENGTH_DESCRIPTIONS_MAP) as [LENGTH, string][];

export const STRUCTURE_DESCRIPTIONS = Object.entries(STRUCTURE_DESCRIPTIONS_MAP) as [
  STRUCTURE,
  string,
][];

export interface LoadableState<T> {
  data: T | null;
  isLoading: boolean;
  error: HttpErrorResponse | null;
}

const initialLoadableState: LoadableState<any> = {
  data: null,
  isLoading: false,
  error: null,
};

export type StrippedBlogPostData = Omit<BlogPostData, 'blogPost' | 'companyDetailsJSON'>;

export interface BlogPostsState {
  blogPosts: LoadableState<StrippedBlogPostData[]>;
  selectedBlogPost: LoadableState<BlogPostData>;
  createdBlogPost: LoadableState<BlogPostData>;
}

export const initialState: BlogPostsState = {
  blogPosts: { ...initialLoadableState },
  createdBlogPost: { ...initialLoadableState },
  selectedBlogPost: { ...initialLoadableState },
};

export const loaded: Pick<LoadableState<unknown>, 'isLoading'> = {
  isLoading: false,
};

export const loading: Pick<LoadableState<unknown>, 'isLoading'> = {
  isLoading: true,
};

export const loadedWithData = <T>(data: T): Omit<LoadableState<T>, 'error'> => ({
  data,
  isLoading: false,
});

export const errored = (error: HttpErrorResponse): Omit<LoadableState<unknown>, 'data'> => ({
  isLoading: false,
  error,
});

// request types

export interface CreateBlogPostRequest {
  description: string;
  length: LENGTH;
  structure: STRUCTURE;
  companyDetailsJSON: string;
}

// response types

export interface BlogPostData {
  id: string;
  description: string;
  length: LENGTH;
  structure: STRUCTURE;
  companyDetailsJSON: CompanyDetailsJson;
  blogPostId: string;
  blogPost: BlogPost;
}

export interface CompanyDetailsJson {
  email: string;
  address: string;
  industry: string;
  createdAt: string;
  updatedAt: string;
  businessName: string;
  brandIdentity: BrandIdentity;
  fullBusinessName: string;
  numberOfEmployees: string;
  companyDescription: string;
  productDescription: string;
  sellPhysicalProducts: string;
}

export interface BrandIdentity {
  id: string;
  font: string;
  name: string;
  logos: string[];
  style: string;
  colors: any;
  slogan: string;
  website: string;
  mainColors: string[];
  description: string;
  toneOfVoice: string;
  productImages: any;
  brandAttributes: string[];
  secondaryColors: string[];
  languageOfContent: string;
}

export interface BlogPost {
  id: string;
  html: string;
}
