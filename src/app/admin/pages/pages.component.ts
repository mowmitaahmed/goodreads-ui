import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Meta } from '@angular/platform-browser';
import { MenuAdmin } from '../../interfaces/menu-admin';
import { menuItemsSuperAdmin } from '../../core/utils/admin-menu';
// import {MenuCtrService} from '../../services/menu-ctr.service';
import { NavigationEnd, Router } from '@angular/router';
// import {AdminService} from '../../services/admin.service';
import { AdminRoleEnum } from '../../enum/admin-role.enum';
console.log('menuItemsSuperAdmin: ',menuItemsSuperAdmin);
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit, AfterViewInit {
  @Output() @ViewChild('sidenav', { static: true }) sidenav: any;
  @Input() isAdminMenu = false;
  @Input()
  sideNavMenuList!: any[];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => {
        return result.matches;
      })
    );

  isMidDevice$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Medium)
    .pipe(
      map((result) => {
        return result.matches;
      })
    );

  // Store Data
  menuList: MenuAdmin[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private meta: Meta,
    // private menuCtrService: MenuCtrService,
    private router: Router
  ) // private adminService: AdminService,
  {}

  ngOnInit(): void {
    this.menuList = menuItemsSuperAdmin;
  }

  ngAfterViewInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (window.innerWidth <= 599) {
          this.sidenav.close();
        }
      }
    });
  }
}
