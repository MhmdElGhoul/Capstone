import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { OrderProvider } from "./OrderContext";
import SupplierPortal from "./SupplierPortal";
import SupplierPage from "./SupplierPage";
import "./App.css";

function App() {
  return (
    <OrderProvider>
      <Router>
        <nav className="nav-bar">
          <Link to="/">Supplier Portal</Link>
          <Link to="/supplier">Supplier Page</Link>
        </nav>

        <Routes>
          <Route path="/" element={<SupplierPortal />} />
          <Route path="/supplier" element={<SupplierPage />} />
        </Routes>
      </Router>
    </OrderProvider>
  );
}

export default App;
