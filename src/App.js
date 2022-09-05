import "./App.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavBar } from "./components/NavBar";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import { getCartItems } from "./features/cart/cartSlice";

function App() {
  const { isOpen } = useSelector((state) => state.modal);
  const { isLoading, apiError } = useSelector((state) => state.cart);
  const disptach = useDispatch();

  useEffect(() => {
    disptach(getCartItems());
    // eslint-disable-next-line
  }, []);

  return isLoading ? (
    <div className="loading">
      <h1>Loading...</h1>
    </div>
  ) : apiError ? (
    // to avoid writing styling for errors , have used loading styling here
    <div className="loading">
      <h1> {apiError}</h1>
    </div>
  ) : (
    <main>
      {isOpen && <Modal />}
      <NavBar />
      <CartContainer />
    </main>
  );
}

export default App;
