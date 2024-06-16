import React, { useState } from "react";
import axios from "axios";
import { storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

export const Admin = () => {
  const categories = [
    { id: 1, name: "Pop art" },
    { id: 2, name: "Cartoon art" },
    { id: 3, name: "Vector art" },
    { id: 4, name: "Pet portrait" },
  ];

  const materials = [
    { id: 1, name: "Canvas" },
    { id: 2, name: "Poster" },
    { id: 3, name: "Framed poster" },
    { id: 4, name: "Traditional Framed Canvas" },
    { id: 5, name: "Premium Framed Canvas" },
  ];

  const commonSizes = ['12"x16"', '8"x10"', '18"x24"', '24"x30"', '30"x40"'];

  const initializeMaterialsSizes = () => {
    return materials.map((material) => ({
      material: material.name,
      sizes: commonSizes.map((size) => ({ size, price: "" })),
    }));
  };

  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [imageLinks, setImageLinks] = useState("");
  const [materialsSizes, setMaterialsSizes] = useState(
    initializeMaterialsSizes()
  );
  const [newSize, setNewSize] = useState({
    material: "",
    design: "",
    price: "",
  });

  const handleCategoryChange = (event) => {
    const selectedCategory = categories.find(
      (cat) => cat.id === parseInt(event.target.value)
    );
    setCategory(selectedCategory.id);
    setCategoryName(selectedCategory.name);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImages([...images, ...files]);
  };

  const handleImageLinksChange = (event) => {
    setImageLinks(event.target.value);
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
  };

  const handleNewSizeChange = (field, value) => {
    setNewSize({ ...newSize, [field]: value });
  };

  const addNewSize = () => {
    if (newSize.material && newSize.design && newSize.price) {
      setMaterialsSizes((prevSizes) => {
        const existingMaterial = prevSizes.find(
          (mat) => mat.material === newSize.material
        );
        if (existingMaterial) {
          existingMaterial.sizes.push({
            size: newSize.design,
            price: newSize.price,
          });
        } else {
          prevSizes.push({
            material: newSize.material,
            sizes: [{ size: newSize.design, price: newSize.price }],
          });
        }
        return [...prevSizes];
      });
      setNewSize({ material: "", design: "", price: "" });
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
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
      const links = imageLinks.split("\n").map((link) => link.trim());
      imageUrls = [...imageUrls, ...links];
    }

    try {
      const formData = {
        category: categoryName,
        title: title,
        description: description,
        price: price,
        images: imageUrls,
        materials: materialsSizes,
      };

      console.log(formData);

      const response = await axios.post(
        "http://localhost:8080/api/artworks",
        formData
      );
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="admin-container">
      <form onSubmit={handleSubmit}>
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
        <ReactQuill
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />

        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="text"
          name="price"
          value={price}
          onChange={handlePriceChange}
        />

        <label>Choose Images</label>
        <input type="file" name="images" multiple onChange={handleFileChange} />

        <label>Paste Image Links (one per line)</label>
        <textarea
          value={imageLinks}
          onChange={handleImageLinksChange}
          rows="3"
          placeholder="Paste image links here..."
        />

        {images.map((image, index) => (
          <div key={index} className="image-preview">
            <img
              src={URL.createObjectURL(image)}
              alt={`Preview ${index}`}
              style={{ width: "100px", height: "auto" }}
            />
            <button type="button" onClick={() => removeImage(index)}>
              Remove
            </button>
          </div>
        ))}

        <label>Sizes</label>
        {materialsSizes.map((mat, matIndex) => (
          <div key={matIndex} className="material-section">
            <button
              type="button"
              className="material-dropdown"
              onClick={() => {
                const updatedSizes = [...materialsSizes];
                updatedSizes[matIndex].expanded =
                  !updatedSizes[matIndex].expanded;
                setMaterialsSizes(updatedSizes);
              }}
            >
              {mat.material}
            </button>
            {mat.expanded && (
              <div className="size-list">
                {mat.sizes.map((size, index) => (
                  <div key={index} className="size-input">
                    <span>{size.size}</span>
                    <input
                      type="text"
                      value={size.price}
                      onChange={(e) =>
                        handleSizePriceChange(
                          mat.material,
                          size.size,
                          e.target.value
                        )
                      }
                      placeholder="Enter price"
                    />
                    <button
                      type="button"
                      onClick={() => removeSize(mat.material, index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      <div className="preview-section">
        <h2>Preview</h2>
        <p>
          <strong>Category:</strong> {categoryName}
        </p>
        <p>
          <strong>Title:</strong> {title}
        </p>
        {/* <p>
          <strong>Description:</strong> {description}
        </p> */}
        <p>
          <strong>Price:</strong> {price}
        </p>
        <div>
          <strong>Images:</strong>
          <div className="image-previews">
            {images.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt={`Preview ${index}`}
                style={{ width: "100px", height: "auto", marginRight: "10px" }}
              />
            ))}
            {imageLinks.split("\n").map((link, index) => (
              <img
                key={index + images.length}
                src={link}
                alt={`Link ${index}`}
                style={{ width: "100px", height: "auto", marginRight: "10px" }}
              />
            ))}
          </div>
        </div>
        <div>
          <strong>Materials and Sizes:</strong>
          {materialsSizes.map((mat, matIndex) => (
            <div key={matIndex}>
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
    </div>
  );
};
