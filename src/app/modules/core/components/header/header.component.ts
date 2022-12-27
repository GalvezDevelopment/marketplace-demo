import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectBasketCount } from "../../../store/selectors/products.seletors";
import { AppState } from "../../../store/app.state";
import { selectWalletAmount } from "../../../store/selectors/wallet.selectors";
import { loadWallet } from "../../../store/actions/wallet.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  productsCount$: Observable<number> = new Observable<number>();
  wallet$: Observable<number> = new Observable<number>();

  constructor(private readonly store: Store<AppState>) {
  }

  ngOnInit() {
    this.productsCount$ = this.store.select(selectBasketCount);
    this.wallet$ = this.store.select(selectWalletAmount);
    this.store.dispatch(loadWallet());
  }

}
