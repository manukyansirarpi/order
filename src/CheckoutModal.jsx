import { useState, useContext } from "react";
import { CartContext } from "./context/cartContext";
import "./styles/checkout-modal.css";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function CheckoutModal({ isOpen, onClose, onCheckout }) {
  const [cart, setCart] = useContext(CartContext);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });

  // Calculate total price
  const total = cart.reduce(
    (sum, item) => sum + item.pizza.sizes[item.size],
    0,
  );

  // Handle removing an item from cart
  const handleRemoveItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // Handle changing pizza size
  const handleSizeChange = (index, newSize) => {
    const newCart = [...cart];
    const item = newCart[index];
    newCart[index] = {
      ...item,
      size: newSize,
      price: item.pizza.sizes[newSize],
    };
    setCart(newCart);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onCheckout(customerInfo);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="checkout-modal">
        <div className="modal-header">
          <h2>Checkout</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="cart-items">
            <h3>Your Order</h3>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <ul>
                {cart.map((item, index) => (
                  <li key={index} className="cart-item">
                    <div className="item-details">
                      <span className="item-name">{item.pizza.name}</span>
                      <div className="size-selector">
                        <label>Size:</label>
                        <select
                          value={item.size}
                          onChange={(e) =>
                            handleSizeChange(index, e.target.value)
                          }
                        >
                          {Object.keys(item.pizza.sizes).map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>
                      <span className="item-price">
                        {intl.format(item.pizza.sizes[item.size])}
                      </span>
                    </div>
                    <button
                      className="remove-item"
                      onClick={() => handleRemoveItem(index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="cart-total">
              <span>Total:</span>
              <span>{intl.format(total)}</span>
            </div>
          </div>

          {cart.length > 0 && (
            <form onSubmit={handleSubmit} className="customer-info">
              <h3>Delivery Information</h3>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="checkout-button"
                disabled={cart.length === 0}
              >
                Complete Order
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
