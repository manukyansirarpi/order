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
    setSelectedPizza(pizzas.length > 0 ? pizzas[0].id : "");
    setLoading(false);
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  const isLoading = loading || externalLoading;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!pizza) return;

    const newItem = {
      pizza,
      size: pizzaSize,
      price: pizza.sizes[pizzaSize],
      id: Date.now(), // Add a unique ID for better tracking
    };

    setCart([...cart, newItem]);

    // Show a brief animation
    const button = e.target.querySelector('button[type="submit"]');
    button.classList.add("added-to-cart");
    setTimeout(() => {
      button.classList.remove("added-to-cart");
    }, 700);
  };

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Your Perfect Pizza</h2>
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
        <form onSubmit={handleAddToCart}>
          <div>
            <div className="form-group">
              <label htmlFor="pizza-type">Choose Your Pizza</label>
              <select
                name="pizza-type"
                id="pizza-type"
                value={selectedPizza}
                onChange={(e) => setSelectedPizza(e.target.value)}
                disabled={isLoading}
              >
                {pizzas.length === 0 && (
                  <option value="">Loading pizzas...</option>
                )}
                {pizzas.map((pizza) => (
                  <option value={pizza.id} key={pizza.id}>
                    {pizza.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="pizza-size">Select Size</label>
              <div className="size-options">
                <span>
                  <input
                    checked={pizzaSize === "S"}
                    type="radio"
                    name="pizza-size"
                    value="S"
                    id="pizza-s"
                    onChange={(e) => setPizzaSize(e.target.value)}
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                    disabled={isLoading}
                  />
                  <label htmlFor="pizza-l">Large</label>
                </span>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading || !pizza}
              className="add-to-cart-btn"
            >
              <span className="btn-text">Add to Cart</span>
              <span className="btn-icon">🍕</span>
            </button>
          </div>

          {isLoading && orderStatus !== "success" && orderStatus !== "error" ? (
            <div className="loading">
              <span className="loading-text">Loading delicious pizzas...</span>
            </div>
          ) : (
            <div className="order-pizza">
              {pizza && (
                <>
                  <Pizza {...pizza}></Pizza>
                  <div className="price-tag">
                    <span className="price-label">Price:</span>
                    <span className="price-value">{intl.format(price)}</span>
                  </div>
                </>
              )}
            </div>
          )}
        </form>
      </div>
      {isLoading && orderStatus !== "success" && orderStatus !== "error" ? (
        <div className="loading-cart">
          <div className="loading"></div>
        </div>
      ) : (
        <Cart cart={cart} checkout={checkout} />
      )}
    </div>
  );
}
