import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowCaseComponent } from './show-case.component';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Product } from "../../../core/models/product.interface";
import { Store } from "@ngrx/store";
import { productInitialState } from "../../../store/reducers/products.reducers";
import { ProductState } from "../../../core/models/product.state";
import { TestScheduler } from "rxjs/testing";
import { selectLoading, selectProducts } from "../../../store/selectors/products.seletors";
import { By } from "@angular/platform-browser";
import { SharedModule } from "../../../shared/shared.module";
import { ProductInfoComponent } from "../../../shared/components/product-info/product-info.component";

describe('ShowCaseComponent', () => {
  let component: ShowCaseComponent;
  let fixture: ComponentFixture<ShowCaseComponent>;
  let store: MockStore<ProductState>;
  const initialState = productInitialState;

  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowCaseComponent],
      providers: [
        provideMockStore({ initialState })
      ],
      imports: [SharedModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ShowCaseComponent);
    component = fixture.componentInstance;
    store = TestBed.get<Store>(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a loading message', () => {
    testScheduler.run(helpers => {
      store.overrideSelector(selectLoading, true);
      store.overrideSelector(selectProducts, []);
      const expected = helpers.cold('a', { a: true });
      const loadingState = store.select(selectLoading);
      helpers.expectObservable(loadingState).toEqual(expected);
      component.ngOnInit();
      fixture.detectChanges();
      const loadingLabel = fixture.debugElement.query(By.css('p'));
      expect(loadingLabel).toBeTruthy();
    });
  });

  it('should show products when loaded', () => {
    testScheduler.run((helpers => {
      const products = [{ id: 1, name: 'Product 1', price: 1.99, image: '' } as Product];
      store.overrideSelector(selectLoading, false);
      store.overrideSelector(selectProducts, products);
      const expected = helpers.cold('a', { a: [...products] });
      const productsSelector = store.select(selectProducts);
      helpers.expectObservable(productsSelector).toEqual(expected);
      component.ngOnInit();
      fixture.detectChanges();
      const productsDOM = fixture.debugElement.query(By.directive(ProductInfoComponent));
      expect(productsDOM).toHaveSize(1);
    }));
  });
});
