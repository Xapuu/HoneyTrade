import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Notification } from "../models/notification.model";


@Injectable()
export class NotificationService {
    private notificationSource = new Subject<Notification[]>();

    public notificationsRecieved$ = this.notificationSource.asObservable();

    constructor(
    ){};

    updateNotifications(data){
        this.notificationSource.next(data);
    }
}