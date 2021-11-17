export interface MenuAdmin {
    id: string;
    parentId?: string |any;
    title: string;
    routerLink?: string |any;
    hasSubMenu: boolean;
    href?: string | any;
    icon?: string;
    target?: string | any;
  }