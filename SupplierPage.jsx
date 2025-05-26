import React, { useContext, useState } from "react";
import { OrderContext } from "./OrderContext";

export default function SupplierPage() {
  const { orders, addOrUpdateOrder } = useContext(OrderContext);

  // Track response state per order id
  const [responses, setResponses] = useState({});

  const handleChange = (id, field, value) => {
    setResponses((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSubmitResponse = (order) => {
    const response = responses[order.id];
    if (!response) return alert("Please fill the response");

    if (response.notAvailable) {
      addOrUpdateOrder({
        ...order,
        supplierResponse: {
          notAvailable: true,
          availableQuantity: 0,
          price: 0,
          wellReceived: false,
        },
      });
    } else {
      if (
        !response.availableQuantity ||
        isNaN(response.availableQuantity) ||
        !response.price ||
        isNaN(response.price)
      ) {
        return alert("Please enter valid quantity and price");
      }

      addOrUpdateOrder({
        ...order,
        supplierResponse: {
          notAvailable: false,
          availableQuantity: Number(response.availableQuantity),
          price: Number(response.price),
          wellReceived: !!response.wellReceived,
        },
      });
    }
  };

  return (
    <div className="container">
      <h1>Supplier Page - Review Orders</h1>

      {orders.length === 0 && <p>No orders available.</p>}

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
            {order.supplierResponse ? (
              <div>
                <p>
                  <em>You have already responded.</em>
                </p>
                <p>
                  <strong>Not Available:</strong>{" "}
                  {order.supplierResponse.notAvailable ? "Yes" : "No"}
                </p>
                {!order.supplierResponse.notAvailable && (
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
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitResponse(order);
                }}
                className="response-form"
              >
                <label>
                  <input
                    type="checkbox"
                    checked={responses[order.id]?.notAvailable || false}
                    onChange={(e) =>
                      handleChange(order.id, "notAvailable", e.target.checked)
                    }
                  />{" "}
                  Not Available
                </label>

                {!responses[order.id]?.notAvailable && (
                  <>
                    <label>
                      Available Quantity:
                      <input
                        type="number"
                        min="0"
                        value={responses[order.id]?.availableQuantity || ""}
                        onChange={(e) =>
                          handleChange(
                            order.id,
                            "availableQuantity",
                            e.target.value
                          )
                        }
                        required
                      />
                    </label>
                    <label>
                      Price:
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={responses[order.id]?.price || ""}
                        onChange={(e) =>
                          handleChange(order.id, "price", e.target.value)
                        }
                        required
                      />
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={responses[order.id]?.wellReceived || false}
                        onChange={(e) =>
                          handleChange(
                            order.id,
                            "wellReceived",
                            e.target.checked
                          )
                        }
                      />{" "}
                      Well Received
                    </label>
                  </>
                )}

                <button type="submit">Submit Response</button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
