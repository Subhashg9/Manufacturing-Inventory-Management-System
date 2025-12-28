import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {

  const [reload, setReload] = useState(0);

  return (
    <>
      <div className="container">

        <h1 className="title">
          <span className="icon">🏭</span>
          Manufacturing Inventory Management
        </h1>

        <Dashboard reload={reload}/>
        <hr style={{marginTop:"40px"}}/>
        <Inventory reload={reload} setReload={setReload}/>

      </div>

      <ToastContainer position="top-right" autoClose={2000}/>
    </>
  );
}
