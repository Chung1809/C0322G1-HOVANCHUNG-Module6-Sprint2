import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InformationUserComponent} from './information-user.component';


const routes: Routes = [
  {
    path: 'information',
    component: InformationUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationRoutingModule { }
