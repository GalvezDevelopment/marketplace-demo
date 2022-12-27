import {NgModule} from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { BasketComponent } from "./components/basket/basket.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { ShowCaseComponent } from "./components/show-case/show-case.component";
import { CheckoutGuard } from "../core/guards/checkout.guard";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ShowCaseComponent
      },
      {
        path: 'basket',
        component: BasketComponent
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [CheckoutGuard]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
