import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountComponent} from './account.component';
import {BasicInfoComponent} from './basic-info/basic-info.component';
import {OrderListComponent} from './order-list/order-list.component';
// import {ChangePasswordComponent} from './change-password/change-password.component';
import {OrderDetailsComponent} from './order-details/order-details.component';


const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {path: '', redirectTo: 'basic-info'},
      {path: 'basic-info', component: BasicInfoComponent},
      {path: 'order-list', component: OrderListComponent},
      {path: 'order-details/:id', component: OrderDetailsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
