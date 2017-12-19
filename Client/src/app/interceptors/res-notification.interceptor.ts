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
import { NotificationService } from '../services/notification.service';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private notificationService: NotificationService,
        private cookieService: CookieService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).map((event: HttpEvent<any>) => {
            console.log('in interceptor');
            if (event instanceof HttpResponse) {
               let notifications = event.body.notifications;
               if(notifications){
                let arr: Notification[] = notifications;
                this.cookieService.putObject('notifications', arr);
                this.notificationService.updateNotifications(notifications);
               }
              }
            return event;
        }).catch((err: any, caught) => {
            if (err instanceof HttpErrorResponse) {
                this.router.navigate(['error', { status: err.status }]);
                return Observable.throw(err);
            }
        });
    }
}