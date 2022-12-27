import { Injectable } from '@angular/core';
import { delay, map, Observable } from "rxjs";
import { Product } from "../../core/models/product.interface";
import { HttpClient } from "@angular/common/http";
import { IProductService } from "../../core/models/show-case-service.interface";
import { HomeModule } from "../home.module";
import { ShowCaseMockService } from "./show-case.mock.service";

@Injectable({
  providedIn: HomeModule,
  useClass: ShowCaseMockService
})
export class ShowCaseService implements IProductService {
  private readonly ENDPOINT = '/api/products'

  constructor(private readonly http: HttpClient) {
  }

  getProducts(): Observable<any> {
    return this.http.get<any[]>('assets/mock-products.json').pipe(delay(1000), map(this.mapProducts.bind(this)));
  }

  purchase(productsIds: number[]): Observable<void> {
    return this.http.post<void>(this.ENDPOINT, { products: productsIds });
  }

  private mapProducts(products: any[]): Product[] {
    return products.map(({ id, name, price, image }) => ({
      id,
      name,
      price,
      image
    } as Product));
  }
}
