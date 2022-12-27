import { CanActivate, Router } from '@angular/router';
import { map, Observable, tap } from "rxjs";
import { AppState } from "../../store/app.state";
import { Store } from "@ngrx/store";
import { selectBasketTotal } from "../../store/selectors/products.seletors";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {
  constructor(private readonly store: Store<AppState>, private readonly router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.store.select(selectBasketTotal).pipe(map(total => total > 0), tap(result => {
      if (!result) this.router.navigate(['/']);
    }));
  }
}
