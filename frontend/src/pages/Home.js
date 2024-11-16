import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import CustomerForm from "../components/Ingestion/CustomerForm";
import OrderForm from "../components/Ingestion/OrderForm";
import AudienceForm from "../components/Ingestion/AudienceForm";
import CampaignList from "../components/CampaignListing/CampaignList";
import ListCustomerslist from "../components/ListCustomerslist";
import HomePage from "../pages/HomePage";
import "./Home.css";

const Home = ({ profile, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await onLogout();
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/home/customers">Create Customer</Link>
          </li>
          <li>
            <Link to="/home/listCustomers">Check Customer</Link>
          </li>
          <li>
            <Link to="/home/orders">Create Order</Link>
          </li>
          <li>
            <Link to="/home/audience">Create Audience</Link>
          </li>
          <li>
            <Link to="/home/campaigns">Campaign List</Link>
          </li>
          <li className="logout-button">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>

      <div className="content">
        <Routes>
          <Route path="/customers" element={<CustomerForm />} />
          <Route path="/listCustomers" element={<ListCustomerslist />} />
          <Route path="/orders" element={<OrderForm />} />
          <Route path="/order/:customerId" element={<OrderForm />} />
          <Route path="/audience" element={<AudienceForm />} />
          <Route path="/campaigns" element={<CampaignList />} />
          <Route path="/" element={<HomePage Profile={profile} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
