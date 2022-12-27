import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { Observable, tap } from "rxjs";
import { Product } from "../../../core/models/product.interface";
import { selectBasket, selectBasketTotal } from "../../../store/selectors/products.seletors";
import { ProductInfoView } from "../../../shared/components/product-info/product-info.component";
import { selectWalletError } from "../../../store/selectors/wallet.selectors";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  productInfoView = ProductInfoView;
  total: number;
  loading$: Observable<boolean> = new Observable<boolean>();
  products$: Observable<ReadonlyArray<Product>> = new Observable<ReadonlyArray<Product>>();
  productsTotal$: Observable<number> = new Observable<number>();
  wallet$: Observable<boolean> = new Observable<boolean>();

  constructor(private readonly store: Store<AppState>) {
    this.total = 0;
  }

  ngOnInit() {
    this.products$ = this.store.select(selectBasket);
    this.productsTotal$ = this.store.select(selectBasketTotal).pipe(tap(productsTotal => this.total = productsTotal));
    this.wallet$ = this.store.select(selectWalletError);
  }
}
