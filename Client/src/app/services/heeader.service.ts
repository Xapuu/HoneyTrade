import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Notification } from "../models/notification.model";


@Injectable()
export class HeaderService {
    private loggedInSource = new Subject<boolean>();

    public loggedIn$ = this.loggedInSource.asObservable();

    constructor(){};

    updateLoggedin(data){
        this.loggedInSource.next(data)
    }
}