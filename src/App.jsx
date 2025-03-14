import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";

import { CartContext } from "./context/cartContext";
import "./styles/main.css";

import Order from "./Order";
import Header from "./Header";
import PizzaOfTheDay from "./PizaOfTheDay";

const App = () => {
  const cartHook = useState([]);
  const [cart, setCart] = cartHook;
  const [orderStatus, setOrderStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function checkout(customerInfo) {
    setLoading(true);
    setOrderStatus("processing");

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          customer: customerInfo,
        }),
      });

      if (response.ok) {
        setOrderStatus("success");
        setCart([]);
      } else {
        setOrderStatus("error");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      setOrderStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <StrictMode>
      <CartContext.Provider value={cartHook}>
        <div className="container">
          <Header checkout={checkout} />
          <Order
            checkout={checkout}
            orderStatus={orderStatus}
            loading={loading}
          />
          <PizzaOfTheDay />
        </div>
      </CartContext.Provider>
    </StrictMode>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
