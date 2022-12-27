import {createSelector} from '@ngrx/store';
import { AppState } from "../app.state";
import { selectProductsFeature } from "./products.seletors";

export const selectWalletFeature = (state: AppState) => state.wallet;

export const selectWalletAmount = createSelector(selectWalletFeature, (state) => state.amount);
export const selectWalletError = createSelector(
  selectWalletFeature,
  selectProductsFeature,
  (walletState, productState) => {
    const totalInBasket = productState.products
      .filter(p => p.inBasket).reduce((prev, curr) => prev + curr.price, 0);
    return totalInBasket > walletState.amount;
  }
);
