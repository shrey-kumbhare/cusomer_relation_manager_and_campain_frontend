import React, { useState, useEffect } from "react";
import { getCustomers } from "../services/api";
import "./Customer.css";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersList;
