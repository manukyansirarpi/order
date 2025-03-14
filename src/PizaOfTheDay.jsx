import { useContext } from "react";
import { usePizzaOfTheDay } from "./hooks/usePizzaOfTheDay";
import { CartContext } from "./context/cartContext";

// feel free to change en-US / USD to your locale
const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const PizzaOfTheDay = () => {
  const pizzaOfTheDay = usePizzaOfTheDay();
  const [cart, setCart] = useContext(CartContext);

  if (!pizzaOfTheDay) {
    return (
      <div className="pizza-of-the-day loading-container">
        <div className="loading"></div>
        <p>Discovering today's special pizza...</p>
      </div>
    );
  }

  // Default image if none is provided
  const defaultImage =
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80";

  const handleAddToCart = (e) => {
    e.preventDefault();

    const newItem = {
      pizza: pizzaOfTheDay,
      size: "M", // Default to medium size
      price: pizzaOfTheDay.sizes.M,
      id: Date.now(), // Add a unique ID for better tracking
    };

    setCart([...cart, newItem]);

    // Show a brief animation
    const button = e.target;
    button.classList.add("added-to-cart");
    setTimeout(() => {
      button.classList.remove("added-to-cart");
    }, 700);
  };

  return (
    <div className="pizza-of-the-day">
      <div className="section-header">
        <h2>Today's Special</h2>
        <div className="discount-badge">20% OFF</div>
      </div>
      <div className="pizza-of-the-day-content">
        <div className="pizza-of-the-day-info">
          <h3>{pizzaOfTheDay.name}</h3>
          <p className="description">{pizzaOfTheDay.description}</p>
          <div className="pizza-of-the-day-features">
            <span className="feature">
              <span className="feature-icon">🔥</span>
              <span className="feature-text">Chef's Choice</span>
            </span>
            <span className="feature">
              <span className="feature-icon">⭐</span>
              <span className="feature-text">Top Rated</span>
            </span>
          </div>
          <div className="pizza-of-the-day-price-container">
            <p className="pizza-of-the-day-price">
              <span className="price-label">Today's Price:</span>
              <span className="price-value">
                {intl.format(pizzaOfTheDay.sizes.M)}
              </span>
            </p>
            <button className="order-special-btn" onClick={handleAddToCart}>
              Add to Cart
              <span className="btn-icon">🍕</span>
            </button>
          </div>
        </div>
        <div className="pizza-of-the-day-image-container">
          <img
            className="pizza-of-the-day-image"
            src={pizzaOfTheDay.image || defaultImage}
            alt={pizzaOfTheDay.name}
          />
          {pizzaOfTheDay.category && (
            <span className="pizza-category">{pizzaOfTheDay.category}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PizzaOfTheDay;
