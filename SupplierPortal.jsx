import React, { useState, useContext } from "react";
import { OrderContext } from "./OrderContext";

export default function SupplierPortal() {
  const { orders, addOrUpdateOrder } = useContext(OrderContext);

  const [form, setForm] = useState({
    itemName: "",
    specification: "",
    quantity: "",
    unit: "",
    imageURL: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, imageURL: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.imageURL) return alert("Please upload an image");

    const newOrder = {
      id: Date.now(),
      ...form,
      status: "Pending", // status of order fulfillment
      supplierResponse: null, // supplier reply object
    };

    addOrUpdateOrder(newOrder);
    setForm({
      itemName: "",
      specification: "",
      quantity: "",
      unit: "",
      imageURL: "",
    });
  };

  // Accept or decline supplier reply
  const handleDecision = (id, decision) => {
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    addOrUpdateOrder({ ...order, status: decision });
  };

  return (
    <div className="container">
      <h1>Supplier Portal - Order Posting</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="itemName"
          placeholder="Item Name"
          value={form.itemName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="specification"
          placeholder="Specification"
          value={form.specification}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />
        <select name="unit" value={form.unit} onChange={handleChange} required>
          <option value="">Select Unit</option>
          <option value="kg">Kilogram</option>
          <option value="pcs">Pieces</option>
          <option value="litre">Litre</option>
        </select>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Post Order</button>
      </form>

      <h2>Orders</h2>
      {orders.length === 0 && <p>No orders posted yet.</p>}

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <h3>{order.itemName}</h3>
            <p>
              <strong>Specification:</strong> {order.specification}
            </p>
            <p>
              <strong>Quantity:</strong> {order.quantity} {order.unit}
            </p>
            {order.imageURL && (
              <a
                href={order.imageURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={order.imageURL}
                  alt={order.itemName}
                  className="order-image"
                />
              </a>
            )}
            <p>
              <strong>Status:</strong> {order.status}
            </p>

            {order.supplierResponse ? (
              <>
                <h4>Supplier Response:</h4>
                {order.supplierResponse.notAvailable ? (
                  <p>
                    <em>Not Available</em>
                  </p>
                ) : (
                  <>
                    <p>
                      <strong>Available Quantity:</strong>{" "}
                      {order.supplierResponse.availableQuantity}
                    </p>
                    <p>
                      <strong>Price:</strong> ${order.supplierResponse.price}
                    </p>
                    <p>
                      <strong>Well Received:</strong>{" "}
                      {order.supplierResponse.wellReceived ? "Yes" : "No"}
                    </p>
                  </>
                )}
                {order.status === "Pending" && (
                  <div>
                    <button
                      onClick={() => handleDecision(order.id, "Accepted")}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDecision(order.id, "Declined")}
                    >
                      Decline
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p>
                <em>Awaiting supplier response...</em>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
