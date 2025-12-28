import React, { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";

export default function Inventory({ setReload }) {

  const [items,setItems]=useState([]);
  const [showConfirm,setShowConfirm] = useState(false);
  const [deleteId,setDeleteId] = useState(null);

  const [form,setForm]=useState({
    name:"",
    category:"",
    quantity:"",
    min_threshold:""
  });

  useEffect(()=>{ load(); },[]);

  function load(){
    api.get("/inventory")
      .then(res=>setItems(res.data))
      .catch(()=>toast.error("Failed to load inventory"));
  }

  function addItem(){
    if(!form.name || !form.category || !form.quantity || !form.min_threshold){
      toast.warning("Please fill all fields");
      return;
    }

    api.post("/inventory",{
      name:form.name,
      category:form.category,
      quantity:Number(form.quantity),
      min_threshold:Number(form.min_threshold)
    })
    .then(()=>{
      toast.success("Item added successfully");
      setForm({name:"",category:"",quantity:"",min_threshold:""});
      load();
      setReload(r=>r+1);   // 🔥 update dashboard
    })
    .catch(()=>toast.error("Failed to add item"));
  }

  function changeQty(id, change){

    api.patch(`/inventory/${id}/${change}`)
      .then(res => {

        const updated = res.data;

        // popup alert only when item becomes LOW
        if(updated.quantity <= updated.min_threshold){
          toast.warning(`Low Stock Alert: ${updated.name} = ${updated.quantity}`);
        } 
        else {
          toast.success("Quantity Updated");
        }

        load();                 
        setReload(r => r + 1);   // 🔥 refresh dashboard NOW
      })
      .catch(()=>toast.error("Update failed"));
  }

  function confirmDelete(id){
    setDeleteId(id);
    setShowConfirm(true);
  }

  function deleteItem(){
    api.delete(`/inventory/${deleteId}`)
      .then(()=>{
        toast.success("Item deleted");
        setShowConfirm(false);
        setDeleteId(null);
        load();
        setReload(r=>r+1);   // 🔥 dashboard refresh
      })
      .catch(()=>toast.error("Delete failed"));
  }

  return(
    <div>

      {/* ===== Add Row ===== */}
      <div className="controls">

        <input
          className="search"
          placeholder="Item name..."
          value={form.name}
          onChange={e=>setForm({...form,name:e.target.value})}
        />

        <input
          className="filter"
          placeholder="Enter item type..."
          value={form.category}
          onChange={e=>setForm({...form,category:e.target.value})}
        />

        <input
          className="filter"
          placeholder="Quantity"
          value={form.quantity}
          onChange={e=>setForm({...form,quantity:e.target.value})}
        />

        <input
          className="filter"
          placeholder="Threshold"
          value={form.min_threshold}
          onChange={e=>setForm({...form,min_threshold:e.target.value})}
        />

        <button className="add-btn" onClick={addItem}>
          + ADD NEW ITEM
        </button>

      </div>


      {/* ===== TABLE ===== */}
      <table className="inventory-table">

        <thead>
          <tr>
            <th>ITEM NAME</th>
            <th>ITEM TYPE</th>
            <th>QUANTITY</th>
            <th>THRESHOLD</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>

        <tbody>
        {items.map(x=>(
          <tr key={x.id}>

            <td>{x.name}</td>
            <td>{x.category}</td>

            <td>
              <button onClick={()=>changeQty(x.id,-1)}>-</button>
              &nbsp; {x.quantity} &nbsp;
              <button onClick={()=>changeQty(x.id,1)}>+</button>
            </td>

            <td>{x.min_threshold}</td>

            <td className={x.quantity<=x.min_threshold?"status-low":"status-ok"}>
              {x.quantity<=x.min_threshold ? "LOW" : "OK"}
            </td>

            <td>
              <button onClick={()=>confirmDelete(x.id)}>
                Delete
              </button>
            </td>

          </tr>
        ))}
        </tbody>

      </table>


      {/* ===== Confirm Delete Popup ===== */}
      {showConfirm && (
        <div className="overlay">
          <div className="confirm-box">
            <h3>Delete Item?</h3>
            <p>This action cannot be undone.</p>

            <div className="confirm-actions">
              <button onClick={()=>setShowConfirm(false)}>
                Cancel
              </button>

              <button className="danger" onClick={deleteItem}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
