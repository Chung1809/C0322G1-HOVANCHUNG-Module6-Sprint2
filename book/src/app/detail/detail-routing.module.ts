import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateBookComponent} from "../management-book/create-book/create-book.component";
import {DetailComponent} from "./detail.component";
import {AuthGuard} from "../login/auth.guard.";



const routes: Routes = [
  {
    path: 'detail/:id',
    component: DetailComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailRoutingModule { }
