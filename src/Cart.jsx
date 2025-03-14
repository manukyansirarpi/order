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
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span className="size">{item.size}</span> –
            <span className="type">{item.pizza.name}</span> –
            <span className="price">
              {intl.format(item.pizza.sizes[item.size])}
            </span>
          </li>
        ))}
      </ul>
      <p>Total: {intl.format(total)}</p>
      <button onClick={handleOpenModal} disabled={cart.length === 0}>
        Checkout
      </button>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
