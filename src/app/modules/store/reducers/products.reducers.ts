import { createReducer, on } from "@ngrx/store";
import { ProductState } from "../../core/models/product.state";
import { Product } from "../../core/models/product.interface";
import { deepCopy } from "../../core/utils/utils";
import {
  enableDisableProduct,
  loadedProducts,
  loadProducts, purchasedProducts,
  purchaseProducts,
  removeBasketProducts
} from "../actions/products.actions";

export const productInitialState: ProductState = { loading: false, products: [] };

export const productsReducer = createReducer(
  productInitialState,
  on(loadProducts, (state) => {
    return { ...state, loading: true }
  }),
  on(loadedProducts, (state, { products }) => ({ ...state, loading: false, products })),
  on(enableDisableProduct, (state, { id }) => {
    const products = [...deepCopy(state.products)];
    const product = products.find(p => p.id === id);
    if (product) {
      product.inBasket = !product.inBasket;
    }
    return { ...state, products };
  }),
  on(purchaseProducts, (state) => {
    return { ...state, loading: true }
  }),
  on(purchasedProducts, (state, { loading }) => {
    return { ...state, loading };
  }),
  on(removeBasketProducts, (state) => {
    const products: Product[] = deepCopy(state.products);
    products.filter(p => p.inBasket).forEach(p => {
      p.inBasket = false;
    });
    return { ...state, products };
  })
);
