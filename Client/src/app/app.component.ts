import { Component, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  
  title = 'app';

  constructor(
    private cookieService: CookieService
  ){}

  getCookie(key: string): void{
    this.cookieService.get(key);
  }

  ngOnDestroy(): void {
    this.cookieService.removeAll();
  }

}
