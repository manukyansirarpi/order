import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";

import { CartContext } from "./context/cartContext";

import Order from "./Order";
import Header from "./Header";
import PizzaOfTheDay from "./PizaOfTheDay";

const App = () => {
  const cartHook = useState([]);
  return (
    <StrictMode>
      <CartContext.Provider value={cartHook}>
        <div>
          <Header />
          <Order />
          <PizzaOfTheDay />
        </div>
      </CartContext.Provider>
    </StrictMode>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
