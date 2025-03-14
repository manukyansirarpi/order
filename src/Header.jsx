import { useState, useContext } from "react";
import { CartContext } from "./context/cartContext";
import CheckoutModal from "./CheckoutModal";

export default function Header({ checkout }) {
  const [cart] = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <header>
      <nav>
        <h1 className="logo">Padre Gino's Pizza</h1>
        <div className="nav-cart" onClick={handleOpenModal}>
          🛒<span className="nav-cart-number">{cart.length}</span>
        </div>
      </nav>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCheckout={handleCheckout}
      />
    </header>
  );
}
