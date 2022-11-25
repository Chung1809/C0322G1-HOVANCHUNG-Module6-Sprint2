import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CartComponent} from "./cart.component";
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    CartComponent
  ],
    imports: [
        CommonModule,
        CartRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule
    ]
})
export class CartModule { }
