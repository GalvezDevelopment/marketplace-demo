import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CheckoutComponent } from "./checkout.component";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { SharedModule } from "../shared/shared.module";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CheckoutComponent
      }
    ]),
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule
  ],
  exports: [RouterModule]
})
export class CheckoutModule { }
