import { useState, useEffect, useContext } from "react";
import { CartContext } from "./context/cartContext";
import Pizza from "./Pizza";
import Cart from "./Cart";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export default function Order({
  checkout,
  orderStatus,
  loading: externalLoading,
}) {
  const [pizzas, setPizzas] = useState([]);
  const [cart, setCart] = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [selectedPizza, setSelectedPizza] = useState("");
  const [pizzaSize, setPizzaSize] = useState("M");

  const pizza = pizzas && pizzas.find((p) => p.id === selectedPizza);
  const price = pizza && pizza.sizes[pizzaSize];

  const fetchPizzas = async () => {
    await new Promise((res, rej) => {
      setTimeout(res, 1000);
    });
    const response = await fetch("/api/pizzas");
    const pizzas = await response.json();
    setPizzas(pizzas);
    setLoading(false);
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  const isLoading = loading || externalLoading;

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>
        {orderStatus === "success" && (
          <div className="order-success">
            <p>Your order has been placed successfully!</p>
          </div>
        )}
        {orderStatus === "error" && (
          <div className="order-error">
            <p>There was an error processing your order. Please try again.</p>
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCart([...cart, { pizza, size: pizzaSize, price }]);
          }}
        >
          <div>
            <div>
              <label htmlFor="pizza-type">Pizza Type</label>
              <select
                name="pizza-type"
                value={selectedPizza}
                onChange={(e) => setSelectedPizza(e.target.value)}
              >
                {pizzas.map((pizza) => (
                  <option value={pizza.id} key={pizza.id}>
                    {pizza.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pizza-size">Pizza Size</label>
              <div>
                <span>
                  <input
                    checked={pizzaSize === "S"}
                    type="radio"
                    name="pizza-size"
                    value="S"
                    id="pizza-s"
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor="pizza-s">Small</label>
                </span>
                <span>
                  <input
                    checked={pizzaSize === "M"}
                    type="radio"
                    name="pizza-size"
                    value="M"
                    id="pizza-m"
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor="pizza-m">Medium</label>
                </span>
                <span>
                  <input
                    checked={pizzaSize === "L"}
                    type="radio"
                    name="pizza-size"
                    value="L"
                    id="pizza-l"
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor="pizza-l">Large</label>
                </span>
              </div>
            </div>
            <button type="submit">Add to Cart</button>
          </div>

          {isLoading && orderStatus !== "success" && orderStatus !== "error" ? (
            <h3>loading...</h3>
          ) : (
            <div className="order-pizza">
              <Pizza {...pizza}></Pizza>
              <p>{price}</p>
            </div>
          )}
        </form>
      </div>
      {isLoading && orderStatus !== "success" && orderStatus !== "error" ? (
        <h2>loading ...</h2>
      ) : (
        <Cart cart={cart} checkout={checkout} />
      )}
    </div>
  );
}
