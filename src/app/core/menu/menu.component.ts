import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';

import {MenuSide} from '../../interfaces/menu-side';
import {CategoryMenu} from '../../interfaces/category-menu';
import {NavigationEnd, Router} from '@angular/router';
import {MenuCtrService} from '../../services/menu-ctr.service';
import {UserService} from '../../services/user.service';
import {UserDataService} from '../../services/user-data.service';
import {User} from '../../interfaces/user';
import {ReloadService} from '../../services/reload.service';
// import { navitems } from '../utils/nav-items';

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
    {id: '1', name: 'Home', routerLink: '/', parentId: null, hasSubMenu: false, depth: 0},
    {id: '2', name: 'Products', routerLink: '/all-product-list', parentId: null, hasSubMenu: false, depth: 0},
    {id: '3', name: 'Installation & Repair', routerLink: null, parentId: null, hasSubMenu: true, depth: 0},
    {id: '4', name: 'Offers', routerLink: null, parentId: null, hasSubMenu: true, depth: 0},
    {id: '5', name: 'Blog', routerLink: '/blog', parentId: null, hasSubMenu: false, depth: 0},
    {id: '6', name: 'About Us', routerLink: null, parentId: null, hasSubMenu: true, depth: 0},
    {id: '7', name: 'Contact Us', routerLink: '/contact', parentId: null, hasSubMenu: false, depth: 0},
  ];


  // Category Menu
  categoryMenus: CategoryMenu[] = [];
  mCategoryMenus: MenuSide[] = [];


  constructor(
    private breakpointObserver: BreakpointObserver,
    private menuCtrService: MenuCtrService,
    public router: Router,
    private reloadService: ReloadService,
    // private menuService: MenuService,
    private userService: UserService,
    private userDataService: UserDataService,
  ) {
    window.addEventListener('scroll', this.scrolling, true);
  }

  ngOnInit(): void {

    this.userService.getUserStatusListener().subscribe(() => {
      this.isUserAuth = this.userService.getUserStatus();
      if (this.isUserAuth) {
        this.getLoggedInUserInfo();
      }
    });
    this.isUserAuth = this.userService.getUserStatus();
    if (this.isUserAuth) {
      // this.getLoggedInUserInfo();
    }

    // this.navItems=navitems
    // console.log(navitems)
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


  private getLoggedInUserInfo() {
    const select = 'fullName profileImg phoneNo';
    this.userDataService.getLoggedInUserInfo(select)
      .subscribe(res => {
        this.user = res.data;
      }, error => {
        console.log(error);
      });
  }

  
  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.sidenav.close();
      }
    });
  }

}
