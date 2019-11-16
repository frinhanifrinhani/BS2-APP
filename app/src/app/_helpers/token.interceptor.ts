
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthenticationService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.includes('/auth/login')) {
      return next.handle(request);
    }

    request = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${this.auth.getToken()}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    return next.handle(request);
  }
}