import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectLoading, selectProducts } from "../../../store/selectors/products.seletors";
import { AppState } from "../../../store/app.state";
import { Product } from "../../../core/models/product.interface";
import { loadProducts } from "../../../store/actions/products.actions";

@Component({
  selector: 'app-show-case',
  templateUrl: './show-case.component.html',
  styleUrls: ['./show-case.component.scss']
})
export class ShowCaseComponent implements OnInit {
  loading$: Observable<boolean> = new Observable<boolean>();
  products$: Observable<ReadonlyArray<Product>> = new Observable<ReadonlyArray<Product>>();

  constructor(private readonly store: Store<AppState>) {
  }

  ngOnInit() {
    this.loading$ = this.store.select(selectLoading);
    this.products$ = this.store.select(selectProducts);
    this.store.dispatch(loadProducts());
  }
}
