import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private cookieService: CookieService
  ){}

  getCookie(key: string){
    this.cookieService.get(key);
  }
}
