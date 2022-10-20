import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BodyRoutingModule} from './body-routing.module';
import {HomeComponent} from './home.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';




@NgModule({
  declarations: [HomeComponent, EditBookComponent],
  imports: [
    CommonModule,
    BodyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class BodyModule { }
