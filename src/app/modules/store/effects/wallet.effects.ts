import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { chargeWallet, initializeWallet, loadWallet } from "../actions/wallet.actions";
import { concatMap, map, mergeMap } from "rxjs";
import { ElectronService } from "../../core/services/electron.service";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { selectWalletAmount } from "../selectors/wallet.selectors";
import { removeBasketProducts } from "../actions/products.actions";

@Injectable()
export class WalletEffects {
  loadWallet$ = createEffect(() => this.actions$.pipe(
    ofType(loadWallet),
    mergeMap(() => this.store.select(selectWalletAmount).pipe(
      concatMap(hardCodedAmount => this.electronSrv.getWallet().pipe(
        map(desktopAmount => {
          const typeObj = { type: initializeWallet.type, amount: hardCodedAmount };
          if (desktopAmount && desktopAmount > 0) {
            return { ...typeObj, amount: desktopAmount }
          }
          return typeObj;
        })
      ))
    ))
  ));

  chargeWallet$ = createEffect(() => this.actions$.pipe(
    ofType(chargeWallet),
    map(() => ({ type: removeBasketProducts.type }))
  ));

  constructor(private readonly actions$: Actions,
              private readonly store: Store<AppState>,
              private readonly electronSrv: ElectronService) {
  }
}
