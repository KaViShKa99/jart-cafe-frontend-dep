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

const AdminManageOrders = () => {
  const dispatch = useDispatch();
  const { orders, orderStatus, orderCompleteDate } = useSelector(
    (state) => state.order
  );

  const [expandedArtworkId, setExpandedArtworkId] = useState(null);

  const toggleStatus = (e, id) => {
    e.preventDefault();
    dispatch(updateStatus({ id: id, status: orderStatus }));
    dispatch(orderStatusChange(orderStatus));
  };

  const handleDateChange = (e, date, id) => {
    e.preventDefault();
    dispatch(updateCompletedDate({ id: id, date: date }));
    dispatch(orderCompleteDateChange(date));
  };

  const toggleExpand = (artworkId) => {
    setExpandedArtworkId((prevId) => (prevId === artworkId ? null : artworkId));
  };

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
          {orders.map((artwork, index) => (
            <React.Fragment key={artwork.orderId}>
              <tr className="artwork-row" key={index}>
                <td>
                  {artwork.orderedDate &&
                    format(artwork.orderedDate, "MMMM do, yyyy")}
                </td>
                <td className="title-cell">{artwork.customerEmail}</td>
                <td className="progress-btn">
                  <button
                    className={`status-button ${
                      orderStatus === "Complete" ? "complete" : "progress"
                    }`}
                    onClick={(e) => toggleStatus(e, artwork.orderId)}
                  >
                    {orderStatus}
                  </button>
                </td>
                <td>
                  <input
                    type="date"
                    className="date-picker"
                    value={format(
                      !orderCompleteDate
                        ? artwork.completedDate
                        : orderCompleteDate,
                      "yyyy-MM-dd"
                    )}
                    min={new Date().toLocaleDateString("en-CA")}
                    onChange={(e) =>
                      handleDateChange(e, e.target.value, artwork.orderId)
                    }
                  />
                </td>
                <td className="action-buttons">
                  <button onClick={() => toggleExpand(artwork.orderId)}>
                    {expandedArtworkId === artwork.orderId
                      ? "Collapse"
                      : "Expand"}
                  </button>
                  {/* <button onClick={() => handleEdit(artwork)}>Edit</button> */}
                  {/* <button onClick={() => handleDelete(artwork.artworkId)}>
                    Delete
                  </button> */}
                </td>
              </tr>
              {expandedArtworkId === artwork.orderId && (
                <tr className="expanded-row" key={artwork.orderId}>
                  <td colSpan="5">
                    <div className="artwork-details">
                      {artwork.items.map((item, index) => (
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
                                    <button className="download-button">
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
                                  <span className="value">{item.quantity}</span>
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
