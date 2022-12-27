import { NgModule } from '@angular/core';
import { BasketComponent } from './components/basket/basket.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from "./home-routing.module";
import { CoreModule } from "../core/core.module";
import { SharedModule } from "../shared/shared.module";
import { ShowCaseComponent } from './components/show-case/show-case.component';
import { MatInputModule } from "@angular/material/input";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from "@angular/material/form-field";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { MARKETPLACE_MAT_FORM_FIELD_OPTIONS } from "../core/tokens/mat-form-field.token";

@NgModule({
  declarations: [
    BasketComponent,
    HomeComponent,
    ShowCaseComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
    MatInputModule,
    CoreModule,
    MatFormFieldModule,
    MatDividerModule,
    MatCardModule
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useExisting: MARKETPLACE_MAT_FORM_FIELD_OPTIONS
    }
  ],
})
export class HomeModule { }
