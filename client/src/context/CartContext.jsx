import { createContext, useReducer, useState } from "react";
import PropTypes from "prop-types";
import { CartReducer } from "../store/CartReducer";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, dispatchCart] = useReducer(CartReducer, []);
  const [isCartViewed, setIsCartViewed] = useState(false);

  const addToCart = (itemId) => {
    setIsCartViewed(false);
    dispatchCart({
      type: "ADD_TO_CART",
      payload: itemId,
    });
  };

  const removeFromCart = (itemId) => {
    dispatchCart({
      type: "REMOVE_FROM_CART",
      payload: itemId,
    });
  };

  const clearCart = () => {
    dispatchCart({
      type: "CLEAR_CART",
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isCartViewed,
        setIsCartViewed,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node,
};

export { CartContext, CartProvider };
