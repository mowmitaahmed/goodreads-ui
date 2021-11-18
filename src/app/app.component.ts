import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {DATABASE_KEY} from './core/utils/global-variable';
import {NavigationEnd, Router} from '@angular/router';
import {UserService} from './services/user.service';
import {isPlatformBrowser, registerLocaleData} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(
    private userService: UserService,
    public router: Router,
    @Inject(PLATFORM_ID) public platformId: any
  ) {
    this.userService.autoUserLoggedIn();
  }
  ngOnInit(): void {
    // localStorage.setItem(DATABASE_KEY.userCart,DATABASE_KEY.userCart);
  }
  title = 'Goodreads';
}
