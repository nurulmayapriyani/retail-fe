import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import CustomerGroup from "./pages/CustomerGroup";
import CustomerStore from "./pages/CustomerStore";
import Product from "./pages/Product";
import Target from "./pages/Target";
import PurchaseOrder from "./pages/PurchaseOrder"
import SidebarNav from "./components/sidebar";
import reportWebVitals from "./reportWebVitals";
import WarehouseStock from "./pages/WarehouseStock";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {<Navbar />}
    {/* {<SidebarNav/>} */}
    <BrowserRouter>
      <Routes>
        <Route path="/customer-group" element={<CustomerGroup />}/>
        <Route path="/customer-store" element={<CustomerStore/>}/>
        <Route path="/target" element={<Target/>}/>
        <Route path="/product" element={<Product/>}/>
        {/* <Route path="/purchase-order" element={<PurchaseOrder/>}/> */}
        <Route path="/warehouse-stock" element={<WarehouseStock/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
