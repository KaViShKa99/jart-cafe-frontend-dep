import { useState, useEffect } from "react";
import { useStateContext } from "./StateContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import productData from "../data/Data";

import QuantityCounter from "./QuantityCounter";

const ProductBuyForm = ({ props, editForm, close }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams();

  const { cartArray, setCartArray } = useStateContext();

  const [previousSizePrice, setPreviousSizePrice] = useState(0);
  const [data, setData] = useState([]);
  const [isPhysical, setIsPhysical] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);
  const [material, setMaterial] = useState("");
  const [sizesArray, setSizesArray] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");
  const [total, setTotal] = useState(0);
  const [designerNote, setDesignerNote] = useState("");
  const [paintingNote, setPaintingNote] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [person, setPerson] = useState(null);
  const [style, setStyle] = useState(null);
  const [figure, setFigure] = useState(null);

  const digitalArt = {
    artworkId: data && data.artworkId,
    price: data.price,
    category: data && data.category,
    productImage:
      data.images || data.productImage
        ? !editForm
          ? data.images[0]
          : data.productImage
        : null,
    uploadedImage: uploadedImage,
    numOfPersons: person,
    materials: data && data.materials,
    style: style,
    figure: figure,
    designerNote: designerNote,
    quantity: quantity,
    eachPrice: price,
    total: price * quantity,
    isDigitalArt: true,
  };

  const physicalArt = {
    artworkId: data && data.artworkId,
    price: data && data.price,
    category: data && data.category,
    material: material,
    size: size,
    materials: data && data.materials,
    productImage:
      data.images || data.productImage
        ? !editForm
          ? data.images[0]
          : data.productImage
        : null,
    uploadedImage: uploadedImage,
    numOfPersons: person,
    paintingNote: paintingNote,
    designerNote: designerNote,
    quantity: quantity,
    eachPrice: price,
    total: price * quantity,
    isDigitalArt: false,
  };

  const persons = [
    { id: 1, name: "1", value: 0 },
    { id: 2, name: "2 +$7.00", value: 7 },
    { id: 3, name: "3 +$14.00", value: 14 },
    { id: 4, name: "4 +$21.00", value: 21 },
    { id: 5, name: "5 or more +$28.00", value: 28 },
  ];
  const styles = [
    {
      id: 1,
      type: "Select a style",
      name: "",
      value: 0,
    },
    {
      id: 2,
      type: "head to shoulder",
      name: "(USD 17.00 to USD 108.00)",
      value: 17,
    },
    { id: 3, type: "half body", name: "(USD 18.00 to USD 140.00)", value: 18 },
    { id: 4, type: "full body", name: "(USD 34.00 to USD 210.00)", value: 34 },
  ];

  const figures = [
    { id: 1, name: "Select an option", value: 0 },
    { id: 2, name: "1 figure (USD 34.00)", value: 34 },
    { id: 3, name: "2 figure (USD 44.00)", value: 44 },
    { id: 4, name: "3 figure (USD 54.00)", value: 54 },
    { id: 5, name: "4 figure (USD 74.00)", value: 74 },
    { id: 6, name: "5 figure (USD 104.00)", value: 104 },
  ];

  const handleFiguresChange = (event) => {
    const selectedFigure = figures.find(
      (fig) => fig.id === parseInt(event.target.value)
    );
    if (!figure) {
      setPrice((pre) => pre + selectedFigure.value);
      setFigure(selectedFigure);
    } else {
      const prvFig = figures.find((fig) => fig.id === figure.id);
      console.log(figure);
      setPrice((pre) => pre - prvFig.value + selectedFigure.value);
      setFigure(selectedFigure);
    }
  };

  const handleStyleChange = (event) => {
    const selectedStyle = styles.find(
      (sty) => sty.id === parseInt(event.target.value)
    );
    console.log(selectedStyle);
    console.log(selectedStyle.value);
    console.log(!style);
    if (!style) {
      setPrice((pre) => pre + selectedStyle.value);
      setStyle(selectedStyle);
    } else {
      const prvSty = styles.find((sty) => sty.id === style.id);
      setPrice((pre) => pre - prvSty.value + selectedStyle.value);
      setStyle(selectedStyle);
    }
  };
  const handlePerChange = (event) => {
    const selectedPer = persons.find(
      (per) => per.id === parseInt(event.target.value)
    );
    if (!person) {
      setPrice((pre) => pre + selectedPer.value);
      setPerson(selectedPer);
    } else {
      const prvPer = persons.find((per) => per.id === person.id);
      setPrice((pre) => pre - prvPer.value + selectedPer.value);
      setPerson(selectedPer);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const paintingInputTextChange = (e) => {
    setPaintingNote(e.target.value);
  };

  const designerInputTextChange = (e) => {
    setDesignerNote(e.target.value);
  };

  const handleImageClick = (index, product) => {
    const matArry = data.materials;
    const sizeArray = matArry.filter((e) => e.material === product.material);
    setSizesArray(sizeArray[0].sizes);

    setSelectedSizeIndex(null);
    setSelectedIndex(index);
    setMaterial(product.material);
    //setPrice(!editForm ? data.price : data.eachPrice);
    setTotal(!editForm ? data.price : data.total);
  };

  const handleSizeClick = (index, size) => {
    console.log(size);
    setSelectedSizeIndex(index);

    setSize(size.size);
    setTotal(size.price);

    setPreviousSizePrice(size.price);
    setPrice((prev) =>
      !editForm ? size.price : prev - previousSizePrice + size.price
    );
  };

  const addTocart = (e) => {
    e.preventDefault();

    console.log(digitalArt);

    const newItem = isPhysical ? physicalArt : digitalArt;

    setCartArray((prevCartArray) => {
      if (prevCartArray.length !== 0) {
        const findItem = prevCartArray.find(
          (product) => product.artworkId == data.artworkId
        );
        console.log(findItem);
        if (findItem) {
          return [...prevCartArray];
        } else {
          return [...prevCartArray, newItem];
        }
      } else {
        return [newItem];
      }
    });
  };

  const updateCartItem = (e) => {
    e.preventDefault();

    console.log(data);
    console.log(
      data.image || data.productImage
        ? !editForm
          ? data.images[0]
          : data.productImage
        : null
    );
    console.log(physicalArt);

    const updateItem = isPhysical ? physicalArt : digitalArt;

    setCartArray((prevCartArray) => {
      if (prevCartArray.length !== 0) {
        const existingItemIndex = prevCartArray.findIndex(
          (product) => product.artworkId === data.artworkId
        );
        console.log(existingItemIndex);
        if (existingItemIndex !== -1) {
          const updatedCartArray = [...prevCartArray];
          updatedCartArray[existingItemIndex] = updateItem;
          return updatedCartArray;
        }
      }
    });
    close(false);
  };

  useEffect(() => {
    console.log(props);
    setData(props);
    if (props) {
      setTotal(editForm ? props.total : props.price);
      setQuantity(editForm ? props.quantity : 1);
      setPerson(props.numOfPersons ? props.numOfPersons : null);
      setStyle(props.style ? props.style : null);
      setFigure(props.figure ? props.figure : null);
      setPrice(props.eachPrice ? props.eachPrice : props.price);
    }
  }, [props]);

  useEffect(() => {
    let imageUrl;
    if (uploadedImage) {
      imageUrl = URL.createObjectURL(uploadedImage);
    }

    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [uploadedImage]);

  useEffect(() => {
    console.log(editForm);
    if (data.isDigitalArt) {
      setIsPhysical(!data.isDigitalArt);
    }
  }, [editForm]);

  useEffect(() => {
    console.log(isPhysical);
    if (isPhysical) {
      setPrice(
        (props.price ? props.price : props.price) +
          (props.numOfPersons ? props.numOfPersons.value : 0) +
          previousSizePrice
      );
    } else {
      setPrice(
        (props.price ? props.price : props.price) +
          (props.figure ? props.figure.value : 0) +
          (props.style ? props.style.value : 0) +
          (props.numOfPersons ? props.numOfPersons.value : 0)
      );
    }
  }, [isPhysical]);

  return (
    <div
      className={editForm ? "product-description-edit" : "product-description"}
    >
      {!editForm && (
        <>
          <div className="product-category">
            {data ? data.category : "category"}
          </div>
          <div className="product-price">
            <span className="original-price">
              <del>${data ? data.lastPrice : "100"}</del>
            </span>
            <span className="discount-price">
              ${!price ? (data ? data.price : "50") : price}
            </span>
          </div>
          <div className="product-pharagraph">
            {data ? data.title : "title"}
          </div>
        </>
      )}

      {editForm && data && (
        <div className="new-product-details-edit">
          <img src={data.productImage} alt="Product Image" />
          <span className="category">{data.category}</span>

          <div className="details">
            <div className="detail-item">
              <span className="label">Type</span>
              <span className="value">
                {!isPhysical
                  ? "Digital Artwork"
                  : data.material
                  ? `${data.material} / ${data.size}`
                  : `${material} / ${size}`}
              </span>
            </div>
            <div className="detail-item">
              <span className="label">Quantity</span>
              <span className="value">
                {!quantity ? data.quantity : quantity}
              </span>
            </div>
            {!isPhysical && (
              <>
                <div className="detail-item">
                  <span className="label">Figure</span>
                  <span className="value">
                    {figure ? figure.name : "No selected"}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="label">Style</span>
                  <span className="value">
                    {style ? style.type : "No selected"}
                  </span>
                </div>
              </>
            )}
            <div className="detail-item">
              <span className="label">Persons</span>
              <span className="value">
                {person ? person.name : "No selected"}
              </span>
            </div>

            <div className="detail-item">
              <span className="label">Price</span>
              <span className="price">$ {price}</span>
            </div>
          </div>

          <div className="total">
            <span className="label">Total</span>
            <span className="value">
              {/* {data.eachPrice
                ? data.eachPrice * (quantity || data.quantity)
                : 0} */}
              {price * quantity}
            </span>
          </div>

          <span className="note">
            {!paintingNote ? data.paintingNote : paintingNote}
          </span>
          <span className="note">
            {!designerNote ? data.designerNote : designerNote}
          </span>
        </div>
      )}

      <div className="product-form">
        <form className="product-form-body">
          <div
            className={`toggle-container ${
              isPhysical ? "is-physical" : "is-digital"
            }`}
          >
            <div
              className={`toggle-background ${
                isPhysical ? "is-physical" : "is-digital"
              }`}
            ></div>
            <div
              className={`toggle-option ${isPhysical ? "active-digital" : ""}`}
              onClick={() => setIsPhysical(false)}
            >
              Digital Art
            </div>
            <div
              className={`toggle-option ${
                !isPhysical ? "active-physical" : ""
              }`}
              onClick={() => setIsPhysical(true)}
            >
              Physical Art
            </div>
          </div>
          {isPhysical && (
            <div className="physical-art-details">
              <label htmlFor="selected-material-design">
                Material : {productData && material}
              </label>
              <div className="material-sizes">
                {productData &&
                  productData.map((product, index) => (
                    <div
                      key={index}
                      className="material-image-container"
                      onClick={() => handleImageClick(index, product)}
                    >
                      <img
                        id="selected-material-design"
                        src={product.image}
                        alt="Product"
                        className={selectedIndex === index ? "selected" : ""}
                      />
                      {selectedIndex === index && (
                        <div className="checkmark">&#10003; </div>
                      )}
                    </div>
                  ))}
              </div>
              <label htmlFor="selected-size">
                Size : {productData && size}
              </label>
              <div className="sizes-box">
                {productData &&
                  sizesArray.map((size, index) => (
                    <div
                      key={index}
                      className="material-size-container"
                      onClick={() => handleSizeClick(index, size)}
                    >
                      <span
                        // key={index}
                        id="selected-size"
                        className={selectedSizeIndex === index ? "select" : ""}
                      >
                        {size.size}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <label htmlFor="img">Upload your photo(s)</label>
          <div className="file-input-container">
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              className="file-input"
              onChange={handleFileChange}
            />
            <label htmlFor="img" className="file-input-label">
              Choose Image
            </label>
            {uploadedImage && (
              <img
                src={URL.createObjectURL(uploadedImage)}
                alt="Preview"
                style={{ width: "100px", height: "100px", marginRight: "10px" }}
              />
            )}
          </div>
          <div className="select-options">
            <div className="number-persons">
              <label htmlFor="persons">Number of Person/Pet</label>
              <select
                name="persons"
                id="persons"
                onChange={handlePerChange}
                value={person ? person.id : 1}
              >
                {persons.map((per) => (
                  <option key={per.id} value={per.id}>
                    {per.name}
                  </option>
                ))}
              </select>
            </div>
            {!isPhysical && (
              <div className="digital-image-details">
                <div className="digital-image-style">
                  <label htmlFor="styles">Style</label>
                  <select
                    name="styles"
                    id="styles"
                    onChange={handleStyleChange}
                    value={style ? style.id : 1}
                  >
                    {styles.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.type + " " + st.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="digital-image-figures">
                  <label htmlFor="figures">Figures</label>
                  <select
                    name="figures"
                    id="figures"
                    onChange={handleFiguresChange}
                    value={figure ? figure.id : 1}
                  >
                    {figures.map((fig) => (
                      <option key={fig.id} value={fig.id}>
                        {fig.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
          <div className="input-container">
            {isPhysical && (
              <div className="text-on-painting">
                <label htmlFor="text-on-painting">
                  Text on the painting (Optional)
                </label>
                <input
                  id="text-on-painting"
                  type="text"
                  name="Text on the painting"
                  value={paintingNote}
                  onChange={paintingInputTextChange}
                />
              </div>
            )}
            <div className="designer-note">
              <label htmlFor="designer-note">
                Note for designer (Optional)
              </label>
              <textarea
                id="designer-note"
                name="designer-note"
                rows="4"
                cols="50"
                value={designerNote}
                onChange={designerInputTextChange}
              ></textarea>
            </div>
          </div>

          <div className="product-buy-quantity-btn">
            <label htmlFor="q-value">Quantity : {quantity}</label>
            <QuantityCounter
              TotalQuantity={(e) => {
                setQuantity(e);
              }}
              initialQuantity={quantity}
              product={editForm ? props : []}
              cartUpdate={false}
            />
            <label htmlFor="subtotal-value">
              Subtotal :
              {/* {!editForm
                ? (total * quantity).toFixed(2)
                : data.eachPrice
                ? (data.eachPrice * quantity).toFixed(2)
                : total} */}
              {price * quantity}
            </label>
          </div>

          {!editForm ? (
            <div className="cart-button">
              <button className="buy-it-now-btn">Buy it now</button>
              <button className="add-to-cart-btn" onClick={addTocart}>
                ADD TO CART
              </button>
            </div>
          ) : (
            <div className="cart-button">
              {/* <button className="buy-it-now-btn">Remove</button> */}
              <button className="save-to-cart-btn" onClick={updateCartItem}>
                Save
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProductBuyForm;
