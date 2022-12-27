import { Component, Input } from '@angular/core';
import { Product } from "../../../core/models/product.interface";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { enableDisableProduct } from "../../../store/actions/products.actions";

export enum ProductInfoView {
  ShowCase,
  Basket
};

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {
  @Input() view: ProductInfoView;
  @Input() product!: Product;

  public productInfoView = ProductInfoView;

  constructor(public readonly store: Store<AppState>) {
    this.view = ProductInfoView.ShowCase;
  }

  addProduct(): void {
    this.store.dispatch(enableDisableProduct({ id: this.product.id }));
  }

  removeProduct(): void {
    this.addProduct();
  }
}
