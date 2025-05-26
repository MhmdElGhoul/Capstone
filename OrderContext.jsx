const addOrUpdateOrder = async (order) => {
  if (order.id) {
    // Update
    const res = await fetch(`http://localhost:5000/api/orders/${order.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    const updated = await res.json();
    setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
  } else {
    // Create
    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    const newOrder = await res.json();
    setOrders((prev) => [newOrder, ...prev]);
  }
};
