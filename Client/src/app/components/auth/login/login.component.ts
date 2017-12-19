import { Component, OnInit } from '@angular/core';
import { AutorizationService } from '../../../services/auth.service';
import { CompilerConfig } from '@angular/compiler/src/config';
import { HeaderService } from '../../../services/heeader.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private model: {
    email: string,
    password: string
  } = { email: '', password: '' }

  constructor(
    private authService: AutorizationService,
    private headerService: HeaderService,
    private cookieService: CookieService,
    private router: Router,
    private socketService: SocketService
  ) { }

  ngOnInit() {
  }

  public login() {
    this.authService.login(this.model).subscribe(data => {
        this.cookieService.put('token', data.token);
        this.cookieService.put('userEmail', data.user.email);
        this.headerService.updateLoggedin(true);
        this.router.navigateByUrl('/home');
    }
    );

  }

}