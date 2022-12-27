import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, map, mergeMap, of, switchMap, take, tap } from "rxjs";
import { ShowCaseService } from "../../home/services/show-case.service";
import { AppState } from "../app.state";
import { selectBasket, selectBasketTotal, selectProducts } from "../selectors/products.seletors";
import { Product } from "../../core/models/product.interface";
import { chargeWallet } from "../actions/wallet.actions";
import { loadedProducts, loadProducts, purchaseProducts } from "../actions/products.actions";
import { Store } from "@ngrx/store";

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(loadProducts),
    mergeMap(() => this.showCaseSrv.getProducts().pipe(
      map(products => ({ type: loadedProducts.type, products })),
      catchError(() => EMPTY)
    ))
  ));

  purchaseProducts$ = createEffect(() => this.actions$.pipe(
    ofType(purchaseProducts),
    mergeMap(() => this.store.select(selectBasket).pipe(
      take(1),
      switchMap((products: Product[]) => this.showCaseSrv.purchase(products.map(p => p.id)).pipe(
        map(() => ({
          type: chargeWallet.type,
          amount: products.reduce((prev, curr) => prev + curr.price, 0)
        })),
      ))
    ))
  ));

  constructor(private readonly actions$: Actions,
              private readonly store: Store<AppState>,
              private readonly showCaseSrv: ShowCaseService) {
  }
}
