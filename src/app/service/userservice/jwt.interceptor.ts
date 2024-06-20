import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  //call teh each http request
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('JWT_Token');
    //if token exits and the url is not  send the token in header beacuse this urls header need to send dif token in header
    if (token  && !request.url.includes('/user/refresh-token')) {
    // Clone the request and add the Authorization header with the token
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
        // Pass the request to the next handler in the chain and catch any errors
    return next.handle(request).pipe(
      catchError((error: any) => {
        // If we get a 401 response, that means we are unauthorized not refresh token
        //if errror 401 and url is not refresh token then call the refresh token 
        if (error instanceof HttpErrorResponse && error.status === 401 && !request.url.includes('/user/refresh-token'))
          //error object is an instance of HttpErrorResponse  thuis mean there is no other type of erro eg:network error,server error
          {
          return this.authService.refreeToken().pipe(
            switchMap((response: any) => {
              // Update local storage with new tokens
              localStorage.setItem('JWT_Token', response.token);
              localStorage.setItem('JWT_Refresh_Token', response.refreshToken);

              // Clone the original request and add the new access token to the Authorization header
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.token}`
                }
              });
              // Retry the original request with the new token
              return next.handle(request);
            }),
            catchError((error: any) => {
              this.authService.logout();
              return throwError(()=>error);
            })
          );
        }
        // no refresh token in there appear error
        return throwError(()=>error);
      })
    );
  }
 
}
