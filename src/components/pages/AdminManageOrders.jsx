import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchOrderedDetails } from "../../redux/reducers/orderReducer";
import { format } from "date-fns";

const AdminManageOrders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { artworks, previewState, setEdit } = useSelector(
    (state) => state.admin
  );
  const [expandedArtworkId, setExpandedArtworkId] = useState(null);

  const toggleExpand = (artworkId) => {
    setExpandedArtworkId((prevId) => (prevId === artworkId ? null : artworkId));
  };
  useEffect(() => {
    console.log(orders);
  }, []);

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
            <th>Ordered Date</th>
            <th>Customer Email</th>
            <th>Order Status</th>
            <th>Order Complete Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((artwork, index) => (
            <React.Fragment key={artwork.artworkId + index}>
              <tr className="artwork-row" key={index}>
                <td> {format(new Date(), "MMMM do, yyyy")}</td>
                <td className="title-cell">{artwork.customerEmail}</td>
                <td> Complete</td>
                <td> {format(new Date(), "MMMM do, yyyy")}</td>
                <td className="action-buttons">
                  <button onClick={() => toggleExpand(artwork.artworkId)}>
                    {expandedArtworkId === artwork.artworkId
                      ? "Collapse"
                      : "Expand"}
                  </button>
                  {/* <button onClick={() => handleEdit(artwork)}>Edit</button> */}
                  {/* <button onClick={() => handleDelete(artwork.artworkId)}>
                    Delete
                  </button> */}
                </td>
              </tr>
              {expandedArtworkId === artwork.artworkId && (
                <tr className="expanded-row" key={artwork.artworkId}>
                  <td colSpan="5">
                    <div className="artwork-details">
                      {artwork.items.map((item, index) => (
                        <div key={index} className="expanded-details">
                          <div>
                            <strong>Images:</strong>
                            <div className="image-previews">
                              <img
                                key={1}
                                src={item.productImage[0]}
                                alt={`Artwork ${1}`}
                                className="artwork-image"
                              />
                              {/* {item.productImage.map((url, imgIndex) => (
                                <img
                                  key={imgIndex}
                                  src={url}
                                  alt={`Artwork ${imgIndex}`}
                                  className="artwork-image"
                                />
                              ))} */}
                            </div>
                          </div>
                          <div className="preview-material-boxes">
                            <strong>Materials and Sizes:</strong>
                            <div className="prev-mat-boxes-container">
                              <h3>{item.materialAndSize}</h3>
                              <ul>
                                <li>
                                  {item.materialAndSize} - ${item.price}
                                </li>
                              </ul>
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
