import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomers } from "../services/api";
import "./Customer.css";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customersData = await getCustomers();
        if (Array.isArray(customersData)) {
          setCustomers(customersData); // Set customers only if it's an array
        } else {
          setError("No valid customer data available");
        }
      } catch (err) {
        setError("Failed to fetch customers");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleCreateOrder = (customerId) => {
    navigate(`/home/order/${customerId}`);
  };

  if (loading) {
    return <div>Loading customers...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 className="heading">Customers</h2>
      {customers.length === 0 ? (
        <p>No customers available</p> // If there are no customers, show this message
      ) : (
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
      )}
    </div>
  );
};

export default CustomersList;
