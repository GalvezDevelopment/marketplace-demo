import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ShowCaseService } from "./show-case.service";
import { Product } from "../../core/models/product.interface";
import { delay, of, take } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import SpyObj = jasmine.SpyObj;

describe('ShowCaseService', () => {
  let mockService: SpyObj<ShowCaseService>;
  let service: ShowCaseService;
  const products: Product[] = [
    {
      "id": 1,
      "name": "Product 1",
      "price": 9.99,
      "image": "https://via.placeholder.com/150"
    }
  ];

  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('ShowCaseService', ['getProducts', 'purchase']);
    mockService.getProducts.and.returnValue(of(products).pipe(delay(1000)));
    mockService.purchase.and.returnValue(of(true).pipe(take(1),delay(1000)))

    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ShowCaseService,
          useValue: mockService
        }
      ],
      imports: [HttpClientTestingModule]
    }).compileComponents();
    service = TestBed.get(ShowCaseService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', () => {
    testScheduler.run(helpers => {
      const cold = helpers.hot('1000ms (a|)', { a: products });
      helpers.expectObservable(service.getProducts()).toEqual(cold);
    });
  });

  it('should purchase products', () => {
    testScheduler.run(helpers => {
      const hot = helpers.hot('1000ms (a|)', { a: true });
      helpers.expectObservable(service.purchase([1])).toEqual(hot);
    });
  });
});
