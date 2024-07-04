import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { categories, materials, commonSizes } from "../../data/Data";
import JoditEditor from "jodit-react";

export const Admin = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const previewState = {
    category: "",
    title: "",
    description: "",
    price: "",
    lastPrice: 0,
    images: [],
    materials: [],
  };
  const initializeMaterialsSizes = () => {
    return materials.map((material) => ({
      material: material.name,
      sizes: commonSizes.map((size) => ({ size, price: "" })),
      expanded: false,
    }));
  };

  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [lastPrice, setLastPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [imageLinks, setImageLinks] = useState("");
  const [imageUrl, setImageUrl] = useState([]);
  const [materialsSizes, setMaterialsSizes] = useState(
    initializeMaterialsSizes()
  );
  const [artworks, setArtworks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newProductPreview, setNewProductPreview] = useState(previewState);
  const [expandedArtworkId, setExpandedArtworkId] = useState(null);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      const response = await axios.get(`${backendUrl}/artworks`);
      setArtworks(response.data);
    } catch (error) {
      console.error("Error fetching artworks:", error);
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = categories.find(
      (cat) => cat.id === parseInt(event.target.value)
    );
    setCategory(selectedCategory.id);
    setCategoryName(selectedCategory.name);
    updatePreview("category", selectedCategory.name);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    updatePreview("title", event.target.value);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
    updatePreview("description", value);
  };

  const handleLastPriceChange = (event) => {
    setLastPrice(event.target.value);
    updatePreview("lastPrice", event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
    updatePreview("price", event.target.value);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImages([...images, ...files]);
    if (files[0]) {
      const previewURL = URL.createObjectURL(files[0]);
      setImageUrl((prev) => [...prev, previewURL]);
    }
  };

  const imageLinkAdd = (e) => {
    e.preventDefault();
    console.log(imageLinks);
    if (imageLinks.trim() !== "") {
      setImageLinks("");
      setImageUrl((prev) => [...prev, imageLinks]);
    }
  };

  const handleRemoveImage = (e, index) => {
    e.preventDefault();
    setImageUrl(imageUrl.filter((url, id) => id !== index));
  };

  const handleSizePriceChange = (material, size, value) => {
    setMaterialsSizes((prevSizes) =>
      prevSizes.map((mat) =>
        mat.material === material
          ? {
              ...mat,
              sizes: mat.sizes.map((s) =>
                s.size === size ? { ...s, price: value } : s
              ),
            }
          : mat
      )
    );
    updatePreview("materials", materialsSizes); // Update materials in preview
  };

  const toggleSizeSection = (materialIndex) => {
    setMaterialsSizes((prevSizes) =>
      prevSizes.map((mat, index) =>
        index === materialIndex ? { ...mat, expanded: !mat.expanded } : mat
      )
    );
  };

  const updatePreview = (field, value) => {
    // Update newProductPreview state based on the field being updated
    setNewProductPreview((prevPreview) => ({
      ...prevPreview,
      [field]: value,
    }));
  };

  const removeSize = (material, index) => {
    setMaterialsSizes((prevSizes) => {
      const updatedSizes = prevSizes.map((mat) => {
        if (mat.material === material) {
          mat.sizes = mat.sizes.filter((_, i) => i !== index);
        }
        return mat;
      });
      return updatedSizes.filter((mat) => mat.sizes.length > 0);
    });
    updatePreview("materials", materialsSizes); // Update materials in preview
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let imageUrls = [];

    if (images.length > 0) {
      const uploadPromises = images.map(async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        try {
          const snapshot = await uploadBytes(storageRef, file);
          const url = await getDownloadURL(snapshot.ref);
          imageUrls.push(url);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      });

      await Promise.all(uploadPromises);
    }

    if (imageLinks.trim() !== "") {
      const links = imageLinks
        .split("\n")
        .map((link) => link.trim())
        .filter((link) => link !== "");
      imageUrls = [...imageUrls, ...links];
    }

    const filteredMaterialsSizes = materialsSizes.map((mat) => ({
      ...mat,
      sizes: mat.sizes.filter((s) => s.price !== "" && s.price !== null),
    }));

    const formData = {
      category: categoryName,
      title: title,
      description: description,
      price: price,
      lastPrice: lastPrice,
      //mages: imageUrls,
      images: imageUrl,
      materials: filteredMaterialsSizes,
    };

    try {
      if (isEditing) {
        await axios.put(`${backendUrl}/artworks/update/${editingId}`, formData);
      } else {
        const response = await axios.post(`${backendUrl}/artworks`, formData);
        console.log(response.data);
        setNewProductPreview(response.data); // Set preview for new product
      }
      fetchArtworks();
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const resetForm = () => {
    setCategory("");
    setCategoryName("");
    setTitle("");
    setDescription("");
    setPrice(0);
    setLastPrice(0);
    setImages([]);
    setImageLinks("");
    setImageUrl("");
    setMaterialsSizes(initializeMaterialsSizes());
    setIsEditing(false);
    setEditingId(null);
    setNewProductPreview(previewState); // Clear preview after submission
  };

  const handleEdit = (artwork) => {
    setCategoryName(artwork.category);
    setTitle(artwork.title);
    setDescription(artwork.description);
    setPrice(artwork.price);
    setLastPrice(artwork.lastPrice);
    setImageUrl(artwork.images);
    setMaterialsSizes(artwork.materials);
    setIsEditing(true);
    setEditingId(artwork.artworkId);
    setNewProductPreview(artwork); // Set preview for editing product
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/artworks/delete/${id}`);
      fetchArtworks();
    } catch (error) {
      console.error("Error deleting artwork:", error);
    }
  };

  const toggleExpand = (artworkId) => {
    setExpandedArtworkId((prevId) => (prevId === artworkId ? null : artworkId));
  };

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/doc/
      toolbarSticky: false,
    }),
    []
  );

  useEffect(() => {
    updatePreview("images", imageUrl);
  }, [imageUrl]);

  return (
    <div className="admin-container">
      <div className="admin-top-row">
        <form className="admin-form" onSubmit={handleSubmit}>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">Select a category</option>
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
          {/* <textarea
            id="imageLinks"
            name="imageLinks"
            value={imageLinks}
            onChange={handleImageLinksChange}
          ></textarea> */}

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
            {imageUrl &&
              imageUrl.map((url, index) => (
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
          {materialsSizes.map((material, materialIndex) => (
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

          <button type="submit">{isEditing ? "Update" : "Submit"}</button>

          {isEditing && (
            <button className="cancel-btn" onClick={() => resetForm()}>
              Cancel
            </button>
          )}
        </form>

        {/* Preview section */}
        {/* {newProductPreview && ( */}
        <div className="preview-section">
          <h3>Preview:</h3>
          <p>Category: {newProductPreview.category}</p>
          <p>Title: {newProductPreview.title}</p>
          {/* <p>Description: {newProductPreview.description}</p> */}
          <p>Price: ${newProductPreview.price}</p>
          <p>Last Price: ${newProductPreview.lastPrice}</p>
          <div>
            <strong>Images:</strong>
            <div className="image-previews">
              {newProductPreview.images &&
                newProductPreview.images.map((url, index) => (
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
            {newProductPreview.materials &&
              newProductPreview.materials.map((mat, matIndex) => (
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
                <tr className="artwork-row">
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
