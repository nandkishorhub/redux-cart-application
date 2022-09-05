import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotals } from "../features/cart/cartSlice";
import { openModal } from "../features/modal/modalSlice";

const CartContainer = () => {
  const { cartItems, total, amount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
    // eslint-disable-next-line
  }, [cartItems]);

  return amount < 1 ? (
    <section className="cart">
      <header>
        <h2>your bag</h2>
        <h4 className="empty-cart">Cart is currently empty</h4>
      </header>
    </section>
  ) : (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      {cartItems.map((cartItem) => {
        return <CartItem key={cartItem.id} {...cartItem} />;
      })}
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total.toFixed(2)}</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={() => dispatch(openModal())}>
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
