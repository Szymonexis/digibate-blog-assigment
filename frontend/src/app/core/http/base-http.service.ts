import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http';

export const enum ErrorTypes {
  HTTP_ERROR = 'HTTP_ERROR',
}

export class BaseHttpService {
  protected readonly _apiUrl = 'http://localhost:3000';

  protected handleError(error: HttpErrorResponse): Observable<never> {
    console.log({ error });

    return throwError(() => error);
  }

  protected handleRequest<T>(requestObservable: Observable<T>): Observable<T> {
    return requestObservable.pipe(catchError((error) => this.handleError(error)));
  }
}
