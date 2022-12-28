import { Injectable } from "@angular/core";
import { IProductService } from "../../core/models/show-case-service.interface";
import { delay, Observable, of, take } from "rxjs";
import { Product } from "../../core/models/product.interface";
import { deepCopy } from "../../core/utils/utils";
import { HomeModule } from "../home.module";

@Injectable({
  providedIn: HomeModule
})
export class ShowCaseMockService implements IProductService {
  private products = [
    {
      "id": 1,
      "name": "Product 1",
      "price": 9.99,
      "image": "https://via.placeholder.com/150"
    },
    {
      "id": 2,
      "name": "Product 2",
      "price": 4.99,
      "image": "https://via.placeholder.com/150"
    },
    {
      "id": 3,
      "name": "Product 3",
      "price": 3.99,
      "image": "https://via.placeholder.com/150"
    },
    {
      "id": 4,
      "name": "Product 4",
      "price": 4.99,
      "image": "https://via.placeholder.com/150"
    },
    {
      "id": 5,
      "name": "Product 5",
      "price": 2.99,
      "image": "https://via.placeholder.com/150"
    },
    {
      "id": 6,
      "name": "Product 6",
      "price": 3.99,
      "image": "https://via.placeholder.com/150"
    },
    {
      "id": 7,
      "name": "Product 7",
      "price": 7.99,
      "image": "https://via.placeholder.com/150"
    },
    {
      "id": 8,
      "name": "Product 8",
      "price": 6.99,
      "image": "https://via.placeholder.com/150"
    },
    {
      "id": 9,
      "name": "Product 9",
      "price": 8.99,
      "image": "https://via.placeholder.com/150"
    },
    {
      "id": 10,
      "name": "Product 10",
      "price": 5.99,
      "image": "https://via.placeholder.com/150"
    },
    {
      "id": 11,
      "name": "Product 11",
      "price": 1.99,
      "image": "https://via.placeholder.com/150"
    },
    {
      "id": 12,
      "name": "Product 12",
      "price": 2.99,
      "image": "https://via.placeholder.com/150"
    },
    {
      "id": 13,
      "name": "Product 13",
      "price": 3.99,
      "image": "https://via.placeholder.com/150"
    },
    {
      "id": 14,
      "name": "Product 14",
      "price": 2.99,
      "image": "https://via.placeholder.com/150"
    },
    {
      "id": 15,
      "name": "Product 15",
      "price": 99.99,
      "image": "https://via.placeholder.com/150"
    }
  ];

  constructor() {
  }

  getProducts(): Observable<Product[]> {
    return of(deepCopy(this.products)).pipe(delay(2000));
  }

  purchase(productsIds: number[]): Observable<any> {
    const productList = deepCopy(this.products);
    productsIds.forEach(productId => {
      const productFound = productList.find((p: Product) => p.id === productId);
      if (productFound) {
        productFound.purchased = true;
      }
    });
    this.products = productList;
    return of(true).pipe(take(1),delay(1000));
  }
}
