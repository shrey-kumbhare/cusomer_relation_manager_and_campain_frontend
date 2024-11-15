import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomers } from "../services/api";
import "./Customer.css";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customersData = await getCustomers();
        setCustomers(customersData.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCustomers();
  }, []);

  const handleCreateOrder = (customerId) => {
    navigate(`/home/order/${customerId}`);
  };

  return (
    <div>
      <h2 className="heading">Customers</h2>
      <table className="customers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Total Spend</th>
            <th>Number of Visits</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td>{customer._id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.totalSpend}</td>
              <td>{customer.numVisits}</td>
              <td>
                <button
                  onClick={() => handleCreateOrder(customer._id)}
                  className="create-order-button"
                >
                  Create Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersList;
