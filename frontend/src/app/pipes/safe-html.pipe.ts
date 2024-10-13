import { isNil } from 'lodash-es';

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}

  transform(value: string | undefined): SafeHtml {
    if (isNil(value)) {
      return '';
    }

    return this._sanitizer.bypassSecurityTrustHtml(value);
  }
}
