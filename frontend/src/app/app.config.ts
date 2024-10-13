import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { HttpService } from './core/http/http.service';
import { effects, facades, reducers } from './store';

export const appConfig: ApplicationConfig = {
  providers: [
    HttpService,
    ...facades,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStore(reducers),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: true,
    }),
    provideEffects(effects),
  ],
};
