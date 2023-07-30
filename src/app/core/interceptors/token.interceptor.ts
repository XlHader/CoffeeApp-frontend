import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../shared/services/storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private storage: StorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.storage.get('token');

    request = request.clone({
      setHeaders: {
        authorization: `Bearer ${token}`
      }
    });

    return next.handle(request);
  }
}
