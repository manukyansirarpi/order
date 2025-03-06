import { useState, useEffect } from "react";
import Pizza from "./Pizza";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export default function Order() {
  const [pizzas, setPizzas] = useState([]);
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

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form>
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
          <div className="test">
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
        <div className="order-pizza">
          {loading ? (
            <>loading...</>
          ) : (
            <>
              <Pizza {...pizza}></Pizza>
              <p>{price}</p>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
