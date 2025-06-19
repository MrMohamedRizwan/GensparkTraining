import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { UserService } from './services/UserService';
import { AuthGuard } from './auth-guard';
import { provideStore } from '@ngrx/store';
import { userReducer } from './ngrx/user.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({users:userReducer}),
    ProductService,
    UserService,

    AuthGuard
  ]
};
