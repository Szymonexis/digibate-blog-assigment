import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  BlogPostData,
  CreateBlogPostRequest,
  StrippedBlogPostData,
} from '../../store/blog-posts/blog-posts.model';
import { BaseHttpService } from './base-http.service';

@Injectable()
export class HttpService extends BaseHttpService {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getBlogPosts(): Observable<StrippedBlogPostData[]> {
    const request = this._httpClient.get<StrippedBlogPostData[]>(`${this._apiUrl}/blog-post/all`);

    return this.handleRequest(request);
  }

  getBlogPost(id: string): Observable<BlogPostData> {
    const request = this._httpClient.get<BlogPostData>(`${this._apiUrl}/blog-post/${id}`);

    return this.handleRequest(request);
  }

  createBlogPost(payload: CreateBlogPostRequest): Observable<BlogPostData> {
    const request = this._httpClient.post<BlogPostData>(`${this._apiUrl}/blog-post`, payload);

    return this.handleRequest(request);
  }
}
