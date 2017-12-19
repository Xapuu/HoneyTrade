import { Injectable } from '@angular/core';

import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';

import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).map((event: HttpEvent<any>) => {
            return event;
        }).catch((err: any, caught) => {
            if (err instanceof HttpErrorResponse) {
                this.router.navigate(['error', { status: err.status }]);
                return Observable.throw(err);
            }
        });
    }
}