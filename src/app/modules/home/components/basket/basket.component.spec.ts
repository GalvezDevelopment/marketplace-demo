import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketComponent } from './basket.component';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Store } from "@ngrx/store";
import { ProductState } from "../../../core/models/product.state";
import { Product } from "../../../core/models/product.interface";
import { selectBasket, selectBasketTotal } from "../../../store/selectors/products.seletors";
import { TestScheduler } from "rxjs/testing";
import { ProductInfoComponent } from "../../../shared/components/product-info/product-info.component";
import { SharedModule } from "../../../shared/shared.module";

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  let mockStore: MockStore<ProductState>;
  const mockProduct: Product = { id: 1, name: 'Product 1', price: 1.99, image: '' };
  const initialState: ProductState = { loading: false, products: [mockProduct] };

  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasketComponent, ProductInfoComponent],
      providers: [
        provideMockStore<ProductState>({
          initialState,
          selectors: [
            { selector: selectBasket, value: [mockProduct] },
            { selector: selectBasketTotal, value: 0 },
          ]
        })
      ],
      imports: [SharedModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.get<Store>(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default-initial total value to zero', () => {
    expect(component.total).toEqual(0);
  });

  it('should get one product from the basket', () => {
    testScheduler.run(helpers => {
      const products = mockStore.select(selectBasket);
      const cold = helpers.cold('a', { a: [mockProduct] });
      helpers.expectObservable(products).toEqual(cold);
    });
  });

  it('should get the basket\' total price', () => {
    testScheduler.run(helpers => {
      mockStore.overrideSelector(selectBasketTotal, mockProduct.price);
      const totalExpected = mockStore.select(selectBasketTotal);
      const cold = helpers.cold('a', { a: mockProduct.price });
      helpers.expectObservable(totalExpected).toEqual(cold);
    });
  });
});
