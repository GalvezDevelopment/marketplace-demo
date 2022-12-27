export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  inBasket?: boolean;
  purchased?: boolean;
}
