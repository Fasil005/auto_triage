import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const httpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const baseUrl = 'http://localhost:8000'; 

  const updatedReq = req.clone({
    url: `${baseUrl}${req.url.startsWith('/') ? req.url : '/' + req.url}`,
  });

  return next(updatedReq).pipe(
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        if (event.status === 200) {
          // ✅ Success modal or alert
          alert('✅ Success');
        } else {
          // ❓ Unknown success code
          alert(`⚠️ Received unexpected status: ${event.status}`);
        }
      }
      return event;
    }),
    catchError((error: HttpErrorResponse) => {
      // ❌ Error modal
      alert(`❌ Error occurred: ${error.message}`);
      return throwError(() => error);
    })
  );
};
