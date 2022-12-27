import { createSelector } from '@ngrx/store';
import { AppState } from "../app.state";
import { ProductState } from "../../core/models/product.state";
import { formatNumber } from "@angular/common";

export const selectProductsFeature = (state: AppState) => state.productList;

export const selectProducts = createSelector(selectProductsFeature, (a: ProductState) => a.products);
export const selectLoading = createSelector(selectProductsFeature, (a: ProductState) => a.loading);
export const selectBasket = createSelector(
  selectProductsFeature,
  (a: ProductState) => a.products.filter(product => product.inBasket)
);
export const selectBasketCount =
  createSelector(selectProductsFeature, (a: ProductState) => a.products.filter(p => p.inBasket).length);
export const selectBasketTotal =
  createSelector(selectProductsFeature, (a: ProductState) => +formatNumber(a.products.filter(p => p.inBasket)
    .reduce((prev, curr) => prev + curr.price, 0), 'en-US', '1.1-2'));
