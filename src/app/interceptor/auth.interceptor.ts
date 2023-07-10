import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../service/authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {}

  // @ts-ignore
  intercept(httpRequest: HttpRequest<any>, httphandler: HttpHandler): Observable<HttpEvent<any>> {
   if (httpRequest.url.includes(`${this.authService.baseUrl}user/login`)){
     return httphandler.handle(httpRequest)
   }
    if (httpRequest.url.includes(`${this.authService.baseUrl}user/register`)){
      return httphandler.handle(httpRequest)
    }
    if (httpRequest.url.includes(`${this.authService.baseUrl}user/resetPassword`)){
      return httphandler.handle(httpRequest)
    }
    this.authService.loadToken();
    const token= this.authService.getToken();
    const request= httpRequest.clone({
      setHeaders:{ Authorization: `Bearer ${token}`}
    });
    return httphandler.handle(request)
  }
}
