import React, { useState } from "react";
// import axios from "axios";
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [material, setMaterial] = useState("");
  const [materialName, setMaterialName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [newSize, setNewSize] = useState({ s: "", p: "" });

  const handleCategoryChange = (event) => {
    const selectedCategory = categories.find(
      (cat) => cat.id === parseInt(event.target.value)
    );
    setCategory(selectedCategory.id);
    setCategoryName(selectedCategory.name);
  };

  const handleMaterialChange = (event) => {
    const selectedMaterial = materials.find(
      (mat) => mat.id === parseInt(event.target.value)
    );
    setMaterial(selectedMaterial.id);
    setMaterialName(selectedMaterial.name);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newImagePreviews = files.map((file) => URL.createObjectURL(file));
    setImageFiles([...imageFiles, ...files]);
    setImagePreviews([...imagePreviews, ...newImagePreviews]);
  };

  const handleNewSizeChange = (field, value) => {
    setNewSize({ ...newSize, [field]: value });
  };

  const addNewSize = () => {
    if (newSize.s && newSize.p) {
      setSizes([...sizes, newSize]);
      setNewSize({ s: "", p: "" });
    }
  };

  const removeImage = (index) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const removeSize = (index) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Upload images to Firebase Storage and get URLs
    // const uploadPromises = imageFiles.map((file) => {
    //   console.log(file.name);
    //   // const storageRef = storage.ref(`images/${file.name}`);
    //   const storageRef = ref(storage, `images/${file.name}`);
    //   uploadBytes(storageRef, file).then(() => {
    //     alert("image uploaded");
    //   });
    //   // return storageRef
    //   //   .put(file)
    //   //   .then((snapshot) => snapshot.ref.getDownloadURL());
    // });

    const uploadPromises = imageFiles.map(async (file) => {
      console.log(file.name);
      const storageRef = ref(storage, `images/${file.name}`);

      // Upload the file and get the download URL
      try {
        const snapshot = await uploadBytes(storageRef, file);
        console.log("Image uploaded successfully");
        return getDownloadURL(snapshot.ref);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    });

    try {
      const imageUrls = await Promise.all(uploadPromises);
      console.log(imageUrls);
      const formData = {
        category,
        material,
        price,
        images: imageUrls,
        sizes,
      };

      // const response = await axios.post("/api/admin/submit", formData);
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

        <label htmlFor="material">Material</label>
        <select
          name="material"
          id="material"
          value={material}
          onChange={handleMaterialChange}
        >
          <option value="">Select a material</option>
          {materials.map((mat) => (
            <option key={mat.id} value={mat.id}>
              {mat.name}
            </option>
          ))}
        </select>

        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="text"
          name="price"
          value={price}
          onChange={handlePriceChange}
        />

        <label htmlFor="images">Images</label>
        <input
          id="images"
          type="file"
          name="images"
          multiple
          onChange={handleFileChange}
        />

        {imagePreviews.map((image, index) => (
          <div key={index} className="image-preview">
            <img
              src={image}
              alt={`Preview ${index}`}
              style={{ width: "100px", height: "auto" }}
            />
            <button type="button" onClick={() => removeImage(index)}>
              Remove
            </button>
          </div>
        ))}

        <label>Sizes</label>
        {sizes.map((size, index) => (
          <div key={index} className="size-input">
            <span>{size.s}</span>
            <span> - ${size.p}</span>
            <button type="button" onClick={() => removeSize(index)}>
              Remove
            </button>
          </div>
        ))}

        <div className="new-size-input">
          <label htmlFor="newSize">Select Size:</label>
          <select
            name="newSize"
            id="newSize"
            value={newSize.s}
            onChange={(e) => handleNewSizeChange("s", e.target.value)}
          >
            <option value="">Select a size</option>
            {commonSizes.map((size, index) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={newSize.p}
            onChange={(e) => handleNewSizeChange("p", e.target.value)}
            placeholder="Enter price"
          />
          <button type="button" onClick={addNewSize}>
            Add Size
          </button>
        </div>

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
          <strong>Material:</strong> {materialName}
        </p>
        <p>
          <strong>Price:</strong> {price}
        </p>
        <div>
          <strong>Images:</strong>
          <div className="image-previews">
            {imagePreviews.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Preview ${index}`}
                style={{ width: "100px", height: "auto", marginRight: "10px" }}
              />
            ))}
          </div>
        </div>
        <div>
          <strong>Sizes:</strong>
          <ul>
            {sizes.map((size, index) => (
              <li key={index}>
                {size.s} - ${size.p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
