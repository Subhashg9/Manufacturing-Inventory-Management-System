import React, { useEffect, useState } from "react";
import api from "../api";

export default function Dashboard({ reload }) {

  const [summary, setSummary] = useState({
    total_items: 0,
    total_quantity: 0
  });

  const [lowStock, setLowStock] = useState(0);

  // 🔥 Loads when page opens + anytime reload changes
  useEffect(() => {
    loadSummary();
    loadAlerts();
  }, [reload]);

  function loadSummary() {
    api.get("/summary")
      .then(res => setSummary(res.data))
      .catch(() => console.log("Summary load failed"));
  }

  function loadAlerts() {
    api.get("/alerts")
      .then(res => setLowStock(res.data.length))
      .catch(() => console.log("Alert load failed"));
  }

  return (
    <div>

      <div className="cards">

        <div className="card">
          <p>Total Items</p>
          <h2>{summary.total_items}</h2>
        </div>

        <div className="card">
          <p>Total Quantity</p>
          <h2>{summary.total_quantity}</h2>
        </div>

        <div className="card warning">
          <p>Low Stock Items</p>
          <h2>{lowStock}</h2>
        </div>

      </div>

    </div>
  );
}
