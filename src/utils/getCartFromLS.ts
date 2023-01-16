import { CartItem } from "../redux/slices/cart/types";
import { calcTotalPrice } from "./calcTotalPrice";

// pozwala wyciagnac zapisane w local storage pizze
export const getCartFromLS = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);
  console.log(data);

  return {
    items: items as CartItem[],
    totalPrice,
  };
};
