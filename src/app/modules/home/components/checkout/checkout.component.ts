import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { Observable } from "rxjs";
import { selectBasketTotal } from "../../../store/selectors/products.seletors";
import { purchaseProducts } from 'src/app/modules/store/actions/products.actions';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  totalProducts$: Observable<number> = new Observable<number>();

  checkoutForm = new FormGroup({
    name: new FormGroup({
      first: new FormControl('', Validators.required),
      last: new FormControl('', Validators.required)
    }),
    address: new FormGroup({
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required)
    }, Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  get nameForm(): FormGroup {
    return this.checkoutForm.get('name') as FormGroup;
  }

  get addressForm(): FormGroup {
    return this.checkoutForm.get('address') as FormGroup;
  }

  constructor(public readonly store: Store<AppState>) {
  }

  ngOnInit() {
    this.totalProducts$ = this.store.select(selectBasketTotal);
  }

  pay(): void {
    if (this.checkoutForm.valid) {
      this.store.dispatch(purchaseProducts());
    }
  }

}
