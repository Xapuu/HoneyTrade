import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { HeaderService } from '../../services/heeader.service';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private headerService: HeaderService,
    private socketService: SocketService,
    private router: Router
  ) { 

  }

  ngOnInit() {
    console.log('ADMIIIIIIIIIIIIIIIIIIIIIIIIIIN')
  }

  logout() {
    console.log('logout admin')
    this.cookieService.removeAll();
    this.headerService.updateLoggedin(false);
    this.headerService.updateisAdmin(false);
    this.socketService.disconnect();
  }

}
