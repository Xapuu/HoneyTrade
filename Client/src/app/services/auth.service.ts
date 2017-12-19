import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { Observable } from "rxjs/Observable";


import { SocketService } from './socket.service';

import { CookieService } from 'ngx-cookie';

const login = 'login'


@Injectable()
export class AutorizationService {
    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
        private socketService: SocketService
    ) { }

	
	
    // register(payload: UserPayload) {
    //     return this.http.post<UserPayload>(baseUrl + singUp, payload, {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    // }



    login(userData): Observable<any> {
        this.socketService.connect(); 
        this.socketService.sendUserEmail(userData.email);
        return this.http.post<any>(environment.apiBaseUrl + login, userData, {
            headers: {
                'Contet-Type': 'application/json'
            }
         })
    }
}