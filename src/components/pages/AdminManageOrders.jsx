import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  fetchOrderedDetails,
  updateCompletedDate,
  updateStatus,
  orderStatusChange,
  orderCompleteDateChange,
} from "../../redux/reducers/orderReducer";
import { format } from "date-fns";
import { downloadImg } from "../../redux/reducers/fileDownloadReducer";
import axios from "axios";

const AdminManageOrders = () => {
  const dispatch = useDispatch();
  const [expandedOrderedRowId, setExpandedOrderedRowId] = useState(null);

  const { orders, orderStatus, orderCompleteDate } = useSelector(
    (state) => state.order
  );

  const toggleStatus = (e, order) => {
    e.preventDefault();
    const newStatus =
      order.orderStatus === "completed" ? "progress" : "completed";

    const newStatusFlag = order.orderStatus ? false : true;
    dispatch(updateStatus({ id: order.orderId, status: newStatusFlag }));
    dispatch(orderStatusChange({ id: order.orderId, status: newStatusFlag }));
  };

  const handleDateChange = (e, date, id) => {
    e.preventDefault();
    dispatch(updateCompletedDate({ id: id, date: date }));
    dispatch(orderCompleteDateChange({ id: id, completedDate: date }));
  };

  const toggleExpand = (id) => {
    setExpandedOrderedRowId((prevId) => (prevId === id ? null : id));
  };

  const imageHandle = (e, imageUrl) => {
    e.preventDefault();
    const fileName = imageUrl.split("/").pop();

    dispatch(downloadImg({ type: "user", fileName: fileName }));
  };

  useEffect(() => {
    // console.log(orderStatus);
  }, [orderStatus]);

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  useEffect(() => {
    dispatch(fetchOrderedDetails());
  }, []);

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
            <th>Ordered Date</th>
            <th>Customer Email</th>
            <th>Order Status</th>
            <th>Order Complete Date</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order, index) => (
              <React.Fragment key={order.orderId}>
                <tr className="artwork-row" key={index}>
                  <td>
                    {order.orderedDate &&
                      format(order.orderedDate, "MMMM do, yyyy h:mm a")}
                  </td>
                  <td className="title-cell">{order.customerEmail}</td>
                  <td className="progress-btn">
                    <button
                      className={`status-button ${
                        order.orderStatus ? "completed" : "progress"
                      }`}
                      onClick={(e) => toggleStatus(e, order)}
                    >
                      {order.orderStatus ? "completed" : "progress"}
                    </button>
                  </td>
                  <td>
                    <input
                      type="date"
                      className="date-picker"
                      value={
                        order.completedDate &&
                        format(order.completedDate, "yyyy-MM-dd")
                      }
                      min={new Date().toLocaleDateString("en-CA")}
                      onChange={(e) =>
                        handleDateChange(e, e.target.value, order.orderId)
                      }
                    />
                  </td>
                  <td className="action-buttons">
                    <button onClick={() => toggleExpand(order.orderId)}>
                      {expandedOrderedRowId === order.orderId
                        ? "Collapse"
                        : "Expand"}
                    </button>
                    {/* <button onClick={() => handleEdit(artwork)}>Edit</button> */}
                    {/* <button onClick={() => handleDelete(artwork.artworkId)}>
                    Delete
                  </button> */}
                  </td>
                </tr>
                {expandedOrderedRowId === order.orderId && (
                  <tr className="expanded-row" key={order.orderId}>
                    <td colSpan="5">
                      <div className="artwork-details">
                        {order.items.map((item, index) => (
                          <div key={index} className="expanded-details">
                            <div className="preview-box">
                              <strong>Order Details</strong>
                              <div className="prev-box-container">
                                <div className="details">
                                  <div className="detail-item">
                                    <span className="label">Design</span>
                                    <span className="value">
                                      <img
                                        key={2}
                                        src={item.productImage[0]}
                                        alt={`Artwork ${2}`}
                                        className="artwork-image"
                                      />
                                    </span>
                                  </div>

                                  <div className="detail-item">
                                    <span className="label">
                                      Sketch
                                      <button
                                        className="download-button"
                                        onClick={(e) =>
                                          imageHandle(e, item.uploadedImage)
                                        }
                                      >
                                        Download
                                      </button>
                                    </span>
                                    <span className="value">
                                      <img
                                        key={2}
                                        src={item.uploadedImage}
                                        alt={`Artwork ${2}`}
                                        className="artwork-image"
                                      />
                                    </span>
                                  </div>

                                  <div className="detail-item">
                                    <span className="label">Type</span>
                                    <span className="value">
                                      {item.physicalArt
                                        ? item.materialAndSize
                                        : "Digital Artwork"}
                                    </span>
                                  </div>
                                  <div className="detail-item">
                                    <span className="label">Quantity</span>
                                    <span className="value">
                                      {item.quantity}
                                    </span>
                                  </div>

                                  {!item.physicalArt && (
                                    <>
                                      <div className="detail-item">
                                        <span className="label">Figure</span>
                                        <span className="value">
                                          {item.figure
                                            ? item.figure
                                            : "No selected"}
                                        </span>
                                      </div>
                                      <div className="detail-item">
                                        <span className="label">Style</span>
                                        <span className="value">
                                          {item.style
                                            ? item.style
                                            : "No selected"}
                                          {/* {physicalArt.style || digitalArt.style
                                          ? isPhysical
                                            ? physicalArt.style.type
                                            : digitalArt.style.type
                                          : "No selected"} */}
                                        </span>
                                      </div>
                                    </>
                                  )}
                                  <div className="detail-item">
                                    <span className="label">Persons</span>
                                    <span className="value">
                                      {item.numOfPersons
                                        ? item.numOfPersons
                                        : "No selected"}
                                      {/* {physicalArt.numOfPersons ||
                                    digitalArt.numOfPersons
                                      ? isPhysical
                                        ? physicalArt.numOfPersons.name
                                        : digitalArt.numOfPersons.name
                                      : "No selected"} */}
                                    </span>
                                  </div>
                                  <div className="detail-item">
                                    <span className="label">Price</span>
                                    <span className="price">
                                      $ {item.price + item.eachPrice}
                                      {/* {isPhysical
                                      ? physicalArt.price +
                                        physicalArt.eachPrice
                                      : digitalArt.price + digitalArt.eachPrice} */}
                                    </span>
                                  </div>
                                </div>

                                <div className="total">
                                  <span className="label">Total</span>
                                  <span className="value">
                                    ${item.total}
                                    {/* {isPhysical
                                    ? physicalArt.total
                                    : digitalArt.total} */}
                                  </span>
                                </div>

                                <span className="note">
                                  {item.paintingNote}
                                  {/* {isPhysical
                                  ? physicalArt.paintingNote
                                  : digitalArt.paintingNote} */}
                                </span>
                                <span className="note">
                                  {item.designerNote}

                                  {/* {isPhysical
                                  ? physicalArt.designerNote
                                  : digitalArt.designerNote} */}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManageOrders;
