import React, { useState, useEffect, useMemo } from "react";
import { categories, materials, commonSizes } from "../../data/Data";
import JoditEditor from "jodit-react";
import { useDispatch, useSelector } from "react-redux";
import {
  createArtwork,
  handleReset,
  enableEdit,
  updateItem,
  cancelEdit,
  deleteArtwork,
  handleEditChange,
  handleRemoveSize,
  toggleSizeChange,
  handleSizePrice,
  handleLinkChange,
  fetchProducts,
  categoryChange,
  titleChange,
  descriptionChange,
  lastPriceChange,
  priceChange,
  uploadImages,
  removeImages,
  handleRemove,
} from "../../redux/reducers/adminReducer";
import { NavLink } from "react-router-dom";

export const Admin = () => {
  const dispatch = useDispatch();
  const { artworks, previewState, setEdit } = useSelector(
    (state) => state.admin
  );
  const { category, title, images, price, lastPrice, materials, description } =
    useSelector((state) => state.admin.previewState);

  const [categoryName, setCategoryName] = useState("");
  const [imageLinks, setImageLinks] = useState("");
  const [imageUrl, setImageUrl] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newProductPreview, setNewProductPreview] = useState(previewState);
  const [expandedArtworkId, setExpandedArtworkId] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [previewState]);

  const handleCategoryChange = (event) => {
    event.preventDefault();
    dispatch(categoryChange(event.target.value));
  };

  const handleTitleChange = (event) => {
    event.preventDefault();
    dispatch(titleChange(event.target.value));
  };

  const handleDescriptionChange = (value) => {
    dispatch(descriptionChange(value));
  };

  const handleLastPriceChange = (event) => {
    event.preventDefault();
    dispatch(lastPriceChange(event.target.value));
  };

  const handlePriceChange = (event) => {
    event.preventDefault();
    dispatch(priceChange(event.target.value));
  };

  const handleFileChange = async (event) => {
    event.preventDefault();
    dispatch(uploadImages(event.target.files[0]));
  };

  const imageLinkAdd = (e) => {
    e.preventDefault();
    dispatch(handleLinkChange(imageLinks));
    setImageLinks("");
  };

  const handleRemoveImage = (e, index) => {
    e.preventDefault();
    const url = images.filter((url, id) => id === index);
    console.log(url[0]);
    dispatch(removeImages(url[0]));
    dispatch(handleRemove(index));
  };

  const handleSizePriceChange = (material, size, value) => {
    dispatch(
      handleSizePrice({
        material: material,
        size: size,
        value: value,
      })
    );
  };

  const toggleSizeSection = (materialIndex) => {
    dispatch(toggleSizeChange({ materialIndex }));
  };

  const updatePreview = (field, value) => {
    setNewProductPreview((prevPreview) => ({
      ...prevPreview,
      [field]: value,
    }));
  };

  const removeSize = (material, index) => {
    dispatch(
      handleRemoveSize({
        material: material,
        index: index,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (setEdit) {
      dispatch(updateItem(previewState));
      dispatch(handleReset());
      dispatch(cancelEdit());
    } else {
      dispatch(createArtwork(previewState));
      dispatch(handleReset());
    }
  };

  const handleEdit = (artwork) => {
    dispatch(handleEditChange(artwork));
  };

  const handleDelete = async (id) => {
    dispatch(deleteArtwork(id));
  };

  const toggleExpand = (artworkId) => {
    setExpandedArtworkId((prevId) => (prevId === artworkId ? null : artworkId));
  };

  const config = useMemo(
    () => ({
      readonly: false,
      toolbarSticky: false,
    }),
    []
  );

  useEffect(() => {
    updatePreview("images", imageUrl);
  }, [imageUrl]);

  return (
    <div className="admin-container">
      <nav className="admin-nav-bar">
        <NavLink to="/admin">Home</NavLink>
        <NavLink to="/admin/ordered-items">Ordered Products</NavLink>
      </nav>
      <div className="admin-top-row">
        <form className="admin-form" onSubmit={handleSubmit}>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={category && category.id}
            onChange={handleCategoryChange}
          >
            <option value="0">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
          <label htmlFor="description">Description</label>
          <JoditEditor
            value={description}
            onChange={handleDescriptionChange}
            config={config}
          />
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            name="price"
            value={price}
            onChange={handlePriceChange}
            min={0}
          />
          <label htmlFor="lastPrice">Last Price</label>
          <input
            id="lastPrice"
            type="number"
            name="lastPrice"
            value={lastPrice}
            onChange={handleLastPriceChange}
            min={0}
          />
          <label htmlFor="images">Images</label>
          <input
            id="images"
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
          />
          <label htmlFor="imageLinks">Image Links (One per line)</label>
          <input
            id="imageLinks"
            name="imageLinks"
            value={imageLinks}
            onChange={(event) => setImageLinks(event.target.value)}
          />
          <button className="add-btn" onClick={imageLinkAdd}>
            Add
          </button>
          <div className="added-images-container">
            {images &&
              images.map((url, index) => (
                <div key={index}>
                  <img
                    key={index}
                    src={url}
                    alt={`Artwork ${index}`}
                    className="artwork-image"
                  />
                  <button
                    className="remove-btn"
                    onClick={(e) => handleRemoveImage(e, index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
          </div>
          <label>Materials and Sizes</label>
          {materials.map((material, materialIndex) => (
            <div key={materialIndex} className="material-size-section">
              <div
                className="material-header"
                onClick={() => toggleSizeSection(materialIndex)}
              >
                <span>{material.material}</span>
                <span>{material.expanded ? "-" : "+"}</span>
              </div>
              {material.expanded && (
                <div className="sizes-list">
                  {material.sizes.map((size, sizeIndex) => (
                    <div key={sizeIndex} className="size-item">
                      <span>{size.size}</span>
                      <input
                        type="number"
                        value={size.price}
                        onChange={(e) =>
                          handleSizePriceChange(
                            material.material,
                            size.size,
                            e.target.value
                          )
                        }
                      />
                      <button
                        type="button"
                        onClick={() => removeSize(material.material, sizeIndex)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button type="submit">{setEdit ? "Update" : "Submit"}</button>
          {setEdit && (
            <button
              className="cancel-btn"
              onClick={() => dispatch(cancelEdit())}
            >
              Cancel
            </button>
          )}
        </form>

        {/* Preview section */}
        {/* {newProductPreview && ( */}
        <div className="preview-section">
          <h3>Preview:</h3>
          <p>Category: {category && category.name}</p>
          <p>Title: {title}</p>
          <p>Price: ${price}</p>
          <p>Last Price: ${lastPrice}</p>
          <div>
            <strong>Images:</strong>
            <div className="image-previews">
              {images &&
                images.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Artwork ${index}`}
                    className="artwork-image"
                  />
                ))}
            </div>
          </div>
          <div className="preview-material-boxes">
            <strong>Materials and Sizes:</strong>
            {materials &&
              materials.map((mat, matIndex) => (
                <div key={matIndex} className="prev-mat-boxes-container">
                  <h3>{mat.material}</h3>
                  <ul>
                    {mat.sizes.map((size, index) => (
                      <li key={index}>
                        {size.size} - ${size.price}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
        {/* )} */}
      </div>

      {/* Artworks table section */}
      <div className="table-section">
        <h2>Artworks</h2>
        <table className="artworks-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Title</th>
              <th>Price</th>
              <th>Last Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {artworks.map((artwork) => (
              <React.Fragment key={artwork.artworkId}>
                <tr className="artwork-row" key={artwork.artworkId}>
                  <td>{artwork.category}</td>
                  <td className="title-cell">{artwork.title}</td>
                  <td>{artwork.price}</td>
                  <td>{artwork.lastPrice}</td>
                  <td className="action-buttons">
                    <button onClick={() => toggleExpand(artwork.artworkId)}>
                      {expandedArtworkId === artwork.artworkId
                        ? "Collapse"
                        : "Expand"}
                    </button>
                    <button onClick={() => handleEdit(artwork)}>Edit</button>
                    <button onClick={() => handleDelete(artwork.artworkId)}>
                      Delete
                    </button>
                  </td>
                </tr>
                {/* Expanded view */}
                {expandedArtworkId === artwork.artworkId && (
                  <tr className="expanded-row">
                    <td colSpan="5">
                      <div className="expanded-details">
                        {/* <p>Description: {artwork.description}</p> */}
                        <div>
                          <strong>Images:</strong>
                          <div className="image-previews">
                            {artwork.images.map((url, index) => (
                              <img
                                key={index}
                                src={url}
                                alt={`Artwork ${index}`}
                                className="artwork-image"
                              />
                            ))}
                          </div>
                        </div>
                        <div className="preview-material-boxes">
                          <strong>Materials and Sizes:</strong>
                          {artwork.materials.map((mat, matIndex) => (
                            <div
                              key={matIndex}
                              className="prev-mat-boxes-container"
                            >
                              <h3>{mat.material}</h3>
                              <ul>
                                {mat.sizes.map((size, index) => (
                                  <li key={index}>
                                    {size.size} - ${size.price}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
