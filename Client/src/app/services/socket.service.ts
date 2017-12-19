import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { CookieService } from 'ngx-cookie';
import { NotificationService } from './notification.service';
import { MessageService } from './message.service';

import { CompilerConfig } from '@angular/compiler/src/config';

@Injectable()
export class SocketService {
  private url = 'http://localhost:3000/';  
  private socket;
  

  constructor(
    private cookieService: CookieService,
    private notificationService: NotificationService,
    private messageService: MessageService
  ){}

  disconnect(){
    this.socket.disconnect();
  }

  connect(email: string) {
      this.socket = io(this.url);
     
      if(email){
        this.socket.emit('userEmail', email);
      }
      this.socket.on('notifications', nots => {
        this.notificationService.updateNotifications(nots);
      })

      this.socket.on('unreadMessageCount', count => {
        console.log(count)
        this.messageService.updateUnreadMessageCount(count);
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