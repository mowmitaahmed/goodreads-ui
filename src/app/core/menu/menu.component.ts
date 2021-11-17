import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';

import {MenuSide} from '../../interfaces/menu-side';
import {CategoryMenu} from '../../interfaces/category-menu';
import {NavigationEnd, Router} from '@angular/router';

import {UserService} from '../../services/user.service';
// import {UserDataService} from '../../services/user-data.service';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {

  public showBackToTop = false;

  @ViewChild('sidenav', {static: true}) sidenav: any;

  scrollPosition = 0;
  count = 0;

  isUserAuth = false;
  user: User | undefined;


  // MENU
  menus: MenuSide[] = [
    {id: '1', name: 'Home', routerLink: '/'},
    {id: '2', name: 'Products', routerLink: '/all-product-list'},
    {id: '5', name: 'Blog', routerLink: '/blog'},
    {id: '6', name: 'About Us', routerLink: '/aboutus'},
    {id: '7', name: 'Contact Us', routerLink: '/contact'},
  ];


  // Category Menu
  categoryMenus: CategoryMenu[] = [];
  mCategoryMenus: MenuSide[] = [];


  constructor(
    private breakpointObserver: BreakpointObserver,
    // private menuCtrService: MenuCtrService,
    public router: Router,
    // private menuService: MenuService,
    private userService: UserService,
    // private userDataService: UserDataService,
  ) {
    window.addEventListener('scroll', this.scrolling, true);
  }

  ngOnInit(): void {

    this.userService.getUserStatusListener().subscribe(() => {
      this.isUserAuth = this.userService.getUserStatus();
      if (this.isUserAuth) {
        // this.getLoggedInUserInfo();
      }
    });
    this.isUserAuth = this.userService.getUserStatus();
    if (this.isUserAuth) {
      // this.getLoggedInUserInfo();
    }

  }


  /**
   * Convert Menu to Menu Sidenav
   */

  private convertMenuToSideMenu() {
    const deep1: any[] = [];
    const deep2: any[] = [];
    const deep3: any[] = [];
    this.categoryMenus.forEach((f, i) => {
      const fData = {
        ...f,
        ...{parentId: null, routerLink: `/product-list/${f.slug}`}
      };
      deep1.push(fData);
    });

    const finalArray = [...deep1, ...deep2, ...deep3];
    this.mCategoryMenus = finalArray as MenuSide[];
  }
  
  // Scroll Control
  private scrolling = () => {
    this.scrollPosition = window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop || 0;
  }
  
  // private getAllCategoryMenu() {
  //   this.menuService.getAllCategoryMenuNoRepeat()
  //     .subscribe(res => {
  //       this.categoryMenus = res.data;
  //       if (this.categoryMenus) {
  //         this.convertMenuToSideMenu();
  //       }
  //     }, error => {
  //       console.log(error);
  //     });
  // }

  // private getLoggedInUserInfo() {
  //   const select = 'fullName profileImg phoneNo';
  //   this.userDataService.getLoggedInUserInfo(select)
  //     .subscribe(res => {
  //       this.user = res.data;
  //     }, error => {
  //       console.log(error);
  //     });
  // }

  
  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.sidenav.close();
      }
    });
  }

}
