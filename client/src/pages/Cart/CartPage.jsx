import { useEffect } from "react";
import { useCart } from "../../hooks/useCart";

function Cart() {
  const { setIsCartViewed } = useCart();

  useEffect(() => {
    setIsCartViewed(true);
  }, [setIsCartViewed]);

  return <div></div>;
}

export default Cart;
