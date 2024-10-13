import { isNil } from 'lodash-es';

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HttpService } from '../../core/http/http.service';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { BlogPostsFacade } from '../../store/blog-posts/blog-posts.facade';
import {
  CompanyDetailsJson,
  LENGTH,
  LENGTH_DESCRIPTIONS_MAP,
  STRUCTURE,
  STRUCTURE_DESCRIPTIONS_MAP,
} from '../../store/blog-posts/blog-posts.model';
import { HtmlViewerComponent } from '../html-viewer/html-viewer.component';

@Component({
  selector: 'app-show-blog-post-dialog',
  templateUrl: './show-blog-post-dialog.component.html',
  styleUrl: './show-blog-post-dialog.component.scss',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatProgressSpinnerModule,
    MatChipsModule,
    CommonModule,
    SafeHtmlPipe,
    HtmlViewerComponent,
  ],
  providers: [HttpService],
})
export class ShowBlogPostDialogComponent {
  private readonly _blogPostsFacade = inject(BlogPostsFacade);

  storeSelectedBlogPost$ = this._blogPostsFacade.selectedBlogPost$;

  LENGTH_DESCRIPTIONS_MAP = LENGTH_DESCRIPTIONS_MAP;
  STRUCTURE_DESCRIPTIONS_MAP = STRUCTURE_DESCRIPTIONS_MAP;
  LENGTH = LENGTH;
  STRUCTURE = STRUCTURE;

  onDownloadProvidedCompanyDetails(companyDetailsJSON: CompanyDetailsJson | undefined): void {
    if (isNil(companyDetailsJSON)) {
      return;
    }

    const companyDetailsJSONString = JSON.stringify(companyDetailsJSON);

    const blob = new Blob([companyDetailsJSONString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'company-details.json';

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
