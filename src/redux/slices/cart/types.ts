export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
  count: number;
};

// Koszyk w ktorym je wsadzamy i liczymy summe
export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
