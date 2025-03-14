import { useState } from "react";
import CheckoutModal from "./CheckoutModal";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD", // feel free to change to your local currency
});

export default function Cart({ cart, checkout }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const current = cart[i];
    total += current.pizza.sizes[current.size];
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCheckout = (customerInfo) => {
    checkout(customerInfo);
    setIsModalOpen(false);
  };

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>Your Cart</h2>
        <span className="cart-count">
          {cart.length} {cart.length === 1 ? "item" : "items"}
        </span>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <p className="empty-cart-message">Your cart is empty</p>
          <p className="empty-cart-suggestion">
            Add some delicious pizzas to get started!
          </p>
        </div>
      ) : (
        <>
          <ul className="cart-items-list">
            {cart.map((item, index) => (
              <li key={item.id || index} className="cart-item">
                <div className="item-info">
                  <span className="item-name">{item.pizza.name}</span>
                  <div className="item-details">
                    <span className="size">{item.size}</span>
                    <span className="price">
                      {intl.format(item.pizza.sizes[item.size])}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <div className="cart-total">
              <span>Total:</span>
              <span>{intl.format(total)}</span>
            </div>
            <button
              onClick={handleOpenModal}
              className="checkout-btn"
              disabled={cart.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
