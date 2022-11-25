
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home.component';
import {NgModule} from '@angular/core';
import {EditBookComponent} from './edit-book/edit-book.component';





const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'edit/:id',
    component: EditBookComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BodyRoutingModule { }
