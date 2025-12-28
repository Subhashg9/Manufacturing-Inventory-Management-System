import { useEffect, useState } from "react";
import api from "../api";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    api.get("/alerts").then(res => setAlerts(res.data));
  }, []);

  return (
    <div>
      <h2>Low Stock Alerts</h2>

      {alerts.length === 0 && <p>No alerts 🎉</p>}

      {alerts.map(a=>(
        <div key={a.id} style={{color:"red"}}>
          {a.name} — Qty {a.quantity} (Threshold {a.min_threshold})
        </div>
      ))}
    </div>
  );
}
