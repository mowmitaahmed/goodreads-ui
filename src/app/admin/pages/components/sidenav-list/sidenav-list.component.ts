import {Component, Input, OnInit} from '@angular/core';
import {MenuAdmin} from '../../../../interfaces/menu-admin';
// import {MenuCtrService} from '../../../../services/menu-ctr.service';


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  // @Input() product?: Product;
  @Input() menuItems ?: MenuAdmin[];
  @Input() menuParentId !: string;

  parentMenu: MenuAdmin[] = [];

  
  constructor(
    // private menuCtrService: MenuCtrService
  ) {
    console.log('menuItems: ',this.menuItems);
  }

  ngOnInit() {
    // this.parentMenu = this?.menuItems.filter(item => item.parentId === this.menuParentId);
  }

  // onClick(menuId) {
  //   this.menuCtrService.toggleMenuItemAdmin(menuId);
  //   this.menuCtrService.closeOtherSubMenusAdmin(this.menuItems, menuId);
  // }


}