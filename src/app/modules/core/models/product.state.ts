import { Product } from "./product.interface";

export interface ProductState {
  loading: boolean;
  products: ReadonlyArray<Product>;
}
