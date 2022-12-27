import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoComponent, ProductInfoView } from './product-info.component';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { MemoizedSelector, Store } from "@ngrx/store";
import { productInitialState, productsReducer } from "../../../store/reducers/products.reducers";
import { ProductState } from "../../../core/models/product.state";
import { TestScheduler } from "rxjs/testing";
import { enableDisableProduct } from "../../../store/actions/products.actions";
import { Product } from "../../../core/models/product.interface";
import { By } from "@angular/platform-browser";
import { MatIconModule } from "@angular/material/icon";

describe('ProductInfoComponent', () => {
  let component: ProductInfoComponent;
  let fixture: ComponentFixture<ProductInfoComponent>;
  let mockStore: MockStore<ProductState>;
  let mockProductSelector: MemoizedSelector<ProductState, any>;
  let products: Product[];
  let initialState: ProductState;

  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  beforeEach(async () => {
    products = [{ id: 1, name: 'Product 1', price: 1.99, image: '' }];
    initialState = { ...productInitialState, products: [...products] };

    await TestBed.configureTestingModule({
      declarations: [ProductInfoComponent],
      imports: [MatIconModule],
      providers: [provideMockStore({ initialState })],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductInfoComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.get<Store>(Store);
    component.product = { id: 1, name: 'Product 1', price: 1.99, image: '' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the show case view by default', () => {
    expect(component.view).toEqual(ProductInfoView.ShowCase);
    const basketClass = fixture.debugElement.query(By.css('.basket'));
    expect(basketClass).not.toBeTruthy();
  });

  it('should show the basket view when specified', () => {
    component.view = ProductInfoView.Basket;
    fixture.detectChanges();
    expect(component.view).toEqual(ProductInfoView.Basket);
    const basketClass = fixture.debugElement.query(By.css('.basket'));
    expect(basketClass).toBeTruthy();

  });

  it('should trigger an action when clicking on it', () => {
    testScheduler.run(helpers => {
      const expected = helpers.cold('a', { a: enableDisableProduct({ id: 1 }) });
      component.addProduct();
      helpers.expectObservable(mockStore.scannedActions$).toEqual(expected);
    });
  });

  it ('should add the product to the basket', () => {
    const reducerResult = productsReducer(initialState, enableDisableProduct({ id: 1 }));
    expect(reducerResult.products[0]).toEqual({ ...component.product, inBasket: true });
  });

  it('should remove the product from the basket after added when clicking on it', () => {
    initialState.products[0].inBasket = true;
    const reducerResult = productsReducer(initialState, enableDisableProduct({ id: 1 }));
    expect(reducerResult.products[0]).toEqual({ ...component.product, inBasket: false });
  });

});
