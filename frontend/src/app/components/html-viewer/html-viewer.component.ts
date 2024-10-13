import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-html-viewer',
  templateUrl: './html-viewer.component.html',
  styleUrl: './html-viewer.component.scss',
})
export class HtmlViewerComponent implements AfterViewInit {
  iframe = viewChild.required<ElementRef<HTMLIFrameElement>>('iframe');

  htmlContent = input.required<string>();

  ngAfterViewInit() {
    if (this.iframe().nativeElement) {
      const iframeDoc =
        this.iframe().nativeElement.contentDocument ||
        this.iframe().nativeElement.contentWindow?.document;

      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(this.htmlContent());
        iframeDoc.close();
      }
    }
  }
}
