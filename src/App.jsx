import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Order from "./Order";
import PizzaOfTheDay from "./PizaOfTheDay";

const App = () => {
  return (
    <StrictMode>
      <div>
        <h1 className="logo">Padre Gino's</h1>
        <Order />
        <PizzaOfTheDay />
      </div>
    </StrictMode>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
