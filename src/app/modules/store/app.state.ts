import { ProductState } from "../core/models/product.state";
import { ActionReducerMap } from "@ngrx/store";
import { productsReducer } from "./reducers/products.reducers";
import { WalletState } from "../core/models/wallet.state";
import { walletReducers } from "./reducers/wallet.reducers";

export interface AppState {
  productList: ProductState;
  wallet: WalletState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  productList: productsReducer,
  wallet: walletReducers
};
