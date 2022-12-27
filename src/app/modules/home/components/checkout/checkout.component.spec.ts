import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Product } from "../../../core/models/product.interface";
import { Store } from "@ngrx/store";
import { selectBasketTotal } from "../../../store/selectors/products.seletors";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDividerModule } from "@angular/material/divider";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TestScheduler } from "rxjs/testing";
import { AppState } from "../../../store/app.state";
import { purchaseProducts } from "../../../store/actions/products.actions";
import { By } from "@angular/platform-browser";

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let mockStore: MockStore<AppState>;
  const mockProduct: Product = { id: 1, name: 'Product 1', price: 1.99, image: '' };
  const initialState: AppState = {
    productList: { loading: false, products: [] },
    wallet: { amount: 100, error: false }
  };

  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            { selector: selectBasketTotal, value: mockProduct.price }
          ]
        })
      ],
      imports: [BrowserAnimationsModule, MatFormFieldModule, MatDividerModule, MatInputModule, ReactiveFormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the form be invalid at the beginning', () => {
    expect(component.checkoutForm.invalid).toBeTruthy();
  });

  it('should have a total more than zero', () => {
    testScheduler.run(helpers => {
      const total$ = mockStore.select(selectBasketTotal);
      const cold = helpers.cold('a', { a: mockProduct.price });
      helpers.expectObservable(total$).toEqual(cold);
    });
  });

  it('should not show the form when the amount is zero', () => {
    mockStore.overrideSelector(selectBasketTotal, 0);
    mockStore.refreshState();
    fixture.detectChanges();
    const emptyBasket = fixture.debugElement.query(By.css('.empty-basket'));
    expect(emptyBasket).toBeTruthy();
  });

  it('should dispatch a pay action when form is valid', () => {
    testScheduler.run(helpers => {
      const cold = helpers.cold('a', { a: purchaseProducts() });
      const mockDispatch = spyOn(mockStore, 'dispatch').and.callThrough();
      component.pay();
      expect(mockDispatch).not.toHaveBeenCalled();
      component.checkoutForm.setValue({
        name: { first: 'John', last: 'Cena' },
        address: { street: 'Lago 21', city: 'Unknown', state: 'Sonora' },
        email: 'ink@ink.co'
      });
      component.pay();
      expect(mockDispatch).toHaveBeenCalled();
      helpers.expectObservable(mockStore.scannedActions$).toEqual(cold);
    });
  });
});
