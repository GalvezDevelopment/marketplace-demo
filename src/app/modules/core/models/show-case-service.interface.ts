import { Observable } from "rxjs";
import { Product } from "./product.interface";

export interface IProductService {
  getProducts(): Observable<Product[]>;
  purchase(productsIds: number[]): Observable<void>;
}
