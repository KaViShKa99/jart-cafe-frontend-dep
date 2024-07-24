import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchOrderedDetails } from "../../redux/reducers/orderReducer";

const AdminManageOrders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { artworks, previewState, setEdit } = useSelector(
    (state) => state.admin
  );
  useEffect(() => {
    console.log(orders);
    console.log(artworks);
  }, [orders]);

  useEffect(() => {
    dispatch(fetchOrderedDetails());
  }, []);
  // const click = (e) => {
  //   dispatch(fetchOrderedDetails());
  // };

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
          {/* {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.category}</td>
              <td>{order.category}</td>
              <td>{order.category}</td>
              <td>{order.category}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManageOrders;
