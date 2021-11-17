import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandleInterceptor } from './core/error-handler/error-handle.interceptor';
import { SharedModule } from './shared/shared.module';
import { AuthUserInterceptor } from './auth-interceptor/auth-user.interceptor';

import { environment } from '../environments/environment';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoadingBarModule,
    LoadingBarRouterModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandleInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthUserInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
