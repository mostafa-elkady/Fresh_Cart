import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private _LoadingService: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._LoadingService.show();

    return next.handle(request).pipe(
      finalize(() => {
        this._LoadingService.hide();
      })
    );
  }
}