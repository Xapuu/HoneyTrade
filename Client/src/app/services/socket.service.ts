import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { CookieService } from 'ngx-cookie';
import { NotificationService } from './notification.service';
import { CompilerConfig } from '@angular/compiler/src/config';

@Injectable()
export class SocketService {
  private url = 'http://localhost:3000/';  
  private socket;
  

  constructor(
    private cookieService: CookieService,
    private notificationService: NotificationService
  ){}

  disconnect(){
    this.socket.disconnect();
  }

  connect() {
      this.socket = io(this.url);
     
      this.socket.on('notifications', nots => {
        this.notificationService.updateNotifications(nots);
      })
      return () => {
        this.socket.disconnect();
      };  
  }  

  sendUserEmail(email){
    console.log('sending email');
    this.socket.emit('userEmail', email);
  }
}