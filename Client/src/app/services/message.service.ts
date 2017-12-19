import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Notification } from "../models/notification.model";


@Injectable()
export class MessageService {
    private messageCountSource = new Subject<number>();

    public messageCountRecieved$ = this.messageCountSource.asObservable();

    constructor(
    ){};

    updateUnreadMessageCount(data){
        this.messageCountSource.next(data);
    }
}