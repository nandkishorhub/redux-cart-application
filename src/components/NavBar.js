import React from "react";
import { CartIcon } from "../icons";
import { useSelector } from "react-redux";

export const NavBar = () => {
  // useSelector have access to entire store here state means store
  // this store can have many slice state/data/sub state/reducer state
  // actually we can have differet slices as per feature and each slice will have separted reducer
  // so in store we have that segregation of slice managed data/state
  // here we have cart from cartSlice reducer
  const { amount } = useSelector((store) => store.cart);
  return (
    <nav>
      <div className="nav-center">
        <h3>Redux</h3>
        <div className="nav-container">
          <CartIcon />
          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};
