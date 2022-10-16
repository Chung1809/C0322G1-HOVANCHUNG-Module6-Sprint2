import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CartComponent} from "../cart/cart.component";
import {BodyComponent} from "./body.component";
import {AuthGuard} from "../login/auth.guard.";


const routes: Routes = [
  {
    path: '',
    component: BodyComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BodyRoutingModule { }
