import {createAction, props} from '@ngrx/store';
import { Product } from "../../core/models/product.interface";

export const loadProducts = createAction('[Products] Load products');
export const loadedProducts = createAction('[Products] Products loaded', props<{ products: Product[] }>());
export const enableDisableProduct = createAction('[Products] Enable/Disable product', props<{ id: number }>());
export const removeProductBasket = createAction('[Products] Remove product from basket', props<{ id: number }>);
export const purchaseProducts = createAction('[Products] Purchase products');
export const removeBasketProducts = createAction('[Products] Remove all products');
