import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {environment} from '../environments/environment';
// import {AdminAuthGuard} from './auth-guard/admin-auth.guard';
// import {AdminAuthStateGuard} from './auth-guard/admin-auth-state.guard';
import {CustomPreloadingStrategy} from './core/utils/preloading-strategy';

const routes: Routes = [
  // ADMIN
  {
    path: environment.adminBaseUrl,
    loadChildren: () => import('./admin/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    // preloadingStrategy: CustomPreloadingStrategy,
    relativeLinkResolution: 'legacy',
    // initialNavigation: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule],
  providers: [
    // CustomPreloadingStrategy, 
    // AdminAuthGuard, 
    // AdminAuthStateGuard
  ]
})
export class AppRoutingModule {
}
