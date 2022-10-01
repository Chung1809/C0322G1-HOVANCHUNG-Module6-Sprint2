import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {CartComponent} from "./cart/cart.component";
import {DetailComponent} from "./detail/detail.component";
import {BodyComponent} from "./body/body.component";


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cart',
    component: CartComponent
  }
  ,{
    path: 'detail',
    component: DetailComponent
  }
  ,{
    path: '',
    component: BodyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
