# 🏭 Manufacturing Inventory Management System  

A full-stack web application designed to help manufacturing units track inventory, monitor stock levels, and receive real-time low-stock alerts.  

This project simplifies inventory tracking by allowing users to:  
✔ Add new items  
✔ Update quantities (+ / – buttons)  
✔ Delete items  
✔ Monitor dashboard metrics  
✔ Get automatic low-stock alerts  
✔ Sync dashboard updates in real-time  


## 🚀 Tech Stack  


### 🔹 Frontend  
- React.js  
- CSS (custom UI styling)  
- React Toast Notifications  


### 🔹 Backend  
- FastAPI (Python)  
- SQLAlchemy ORM  
- SQLite Database  



## 📊 Features  


### ✅ Dashboard Overview  
- Displays Total Items  
- Displays Total Stock Quantity  
- Displays Low Stock Count (Live Updating)  


### 📦 Inventory Management  
- Add new inventory items  
- Specify item type, quantity & minimum stock threshold  
- Update quantity with + / – buttons  
- Delete items with confirmation popup  
- Status badge shows **LOW** or **OK**  


### 🔔 Alerts  
- Automatic Low Stock Warning Toast  
- Real-time dashboard updates  
- Prevents negative stock updates  



## 🏗 System Workflow  

1️⃣ User adds inventory item  
2️⃣ Backend stores item in database  
3️⃣ Dashboard fetches summary & alerts  
4️⃣ When stock drops below threshold → **Alert Triggered**  
5️⃣ Dashboard auto-refreshes stock count  



## 💾 Database  

Simple & lightweight using SQLite  

Stored fields include:  
- Item name  
- Category  
- Quantity  
- Minimum Threshold  
- Status  



## 🎯 Why This Project?  

This project demonstrates:  
✔ Full-stack development  
✔ Real-time UI updates  
✔ API integration  
✔ Clean UI/UX  
✔ Proper state management  
✔ Scalable backend structure  

Perfect for:  
🎒 Portfolio projects  
🧠 Learning backend + frontend integration  
🏭 Practical manufacturing use-cases  



## 📌 Future Enhancements (Optional)  

🚀 Role-based authentication  
📈 Reports & analytics  
☁ Cloud deployment  
🔄 CSV Import / Export  
