import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const AdminManageOrders = () => {
  const { cartArray } = useSelector((state) => state.cartItems);

  return (
    <div className="ordered-products-container">
      <nav className="admin-nav-bar">
        <NavLink to="/admin">Home</NavLink>
        <NavLink to="/admin/ordered-items">Ordered Products</NavLink>
      </nav>
      <h2>Ordered Products</h2>
      <table className="ordered-products-table">
        <thead>
          <tr>
            <th>Customer Email</th>
            <th>Ordered Date</th>
            <th>Order Status</th>
            <th>Order Complete Date</th>
          </tr>
        </thead>
        <tbody>
          {cartArray.map((order, index) => (
            <tr key={index}>
              <td>{order.category}</td>
              <td>{order.category}</td>
              <td>{order.category}</td>
              <td>{order.category}</td>
              {/* <td>{order.customerEmail}</td>
              <td>{order.orderedDate}</td>
              <td>{order.status}</td>
              <td>{order.completeDate}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManageOrders;
