import { MenuAdmin } from "src/app/interfaces/menu-admin";

export const menuItemsSuperAdmin: MenuAdmin[] = [

    // Parent Dashboard
    {
      id: '1',
      title: 'Dashboard',
      icon: 'dashboard',
      hasSubMenu: false,
      parentId: null,
      routerLink: 'dashboard',
      href: null,
      target: null
    },
    {
      id: '2',
      title: 'Brand',
      icon: 'follow_the_signs',
      hasSubMenu: false,
      parentId: null,
      routerLink: "brands",
      href: null,
      target: null
    },
    {
      id: '3',
      title: 'Categories',
      icon: 'follow_the_signs',
      hasSubMenu: false,
      parentId: null,
      routerLink: "categories",
      href: null,
      target: null
    },  
    {
      id: '100',
      title: 'Products',
      icon: 'view_list',
      hasSubMenu: true,
      parentId: null,
      routerLink: null,
      href: null,
      target: null
    },
    {
      id: '4',
      title: 'Products List',
      icon: 'view_list',
      hasSubMenu: false,
      parentId:  '100',
      routerLink: "products",
      href: null,
      target: null
    },
    {
      id: '100b2',
      title: 'Add Product',
      icon: 'follow_the_signs',
      hasSubMenu: false,
      parentId: '100',
      routerLink: 'add-product',
      href: null,
      target: null
    },
    {
      id: '731',
      title: 'Gallery',
      icon: 'collections',
      hasSubMenu: true,
      parentId: null,
      routerLink: null,
      href: null,
      target: null
    },
    {
      id: '45x',
      title: 'Image Folder',
      icon: 'folder',
      hasSubMenu: false,
      parentId: '731',
      routerLink: 'image-folder',
      href: null,
      target: null
    },
    // Parent Gallery
    {
      id: '4',
      title: 'Image Gallery',
      icon: 'collections',
      hasSubMenu: false,
      parentId: '731',
      routerLink: 'image-gallery',
      href: null,
      target: null
    },


]

export const menuItemsAdmin: MenuAdmin[] = [

    // Parent Dashboard
    {
      id: '1',
      title: 'Dashboard',
      icon: 'dashboard',
      hasSubMenu: false,
      parentId: null,
      routerLink: 'dashboard',
      href: null,
      target: null
    },
    {
      id: '2',
      title: 'Brand',
      icon: 'brand',
      hasSubMenu: false,
      parentId: null,
      routerLink: null,
      href: null,
      target: null
    },
    

]
export const menuItemsEditor: MenuAdmin[] = [

    // Parent Dashboard
    {
      id: '1',
      title: 'Dashboard',
      icon: 'dashboard',
      hasSubMenu: false,
      parentId: null,
      routerLink: 'dashboard',
      href: null,
      target: null
    },
    {
      id: '2',
      title: 'Brand',
      icon: 'dashboard',
      hasSubMenu: false,
      parentId: null,
      routerLink: null,
      href: null,
      target: null
    },

]