import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuantityCounter from "./QuantityCounter";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEditForms,
  updateProductInfo,
  uploadImageChange,
  personChange,
  styleChange,
  figureChange,
  designerNoteChange,
  clearUploadedImage,
  updateQuantityChange,
  updateTotal,
  materialSizeChange,
  materialNameChange,
  paintingNoteChange,
  clearStates,
} from "../redux/reducers/productBuyReducer";
import { addToCart, updateCartItem } from "../redux/reducers/cartItemReducer";
import { persons, styles, figures, materialDesign } from "../data/Data";

const ProductBuyForm = ({ props, editForm, close }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { digitalArt } = useSelector((state) => state.selectedProductInfo);
  const { physicalArt } = useSelector((state) => state.selectedProductInfo);
  const { cartArray } = useSelector((state) => state.cartItems);

  const [isPhysical, setIsPhysical] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);
  const [sizesArray, setSizesArray] = useState([]);

  const uploadedImage = physicalArt.uploadedImage || digitalArt.uploadedImage;

  const handlePerChange = (e) => {
    const id = e.target.value;
    dispatch(personChange({ id: id, isPhysical: isPhysical }));
  };

  const handleStyleChange = (e) => {
    const id = e.target.value;
    dispatch(styleChange(id));
  };

  const handleFiguresChange = (e) => {
    const id = e.target.value;
    dispatch(figureChange(id));
  };

  const designerInputTextChange = (e) => {
    dispatch(
      designerNoteChange({ note: e.target.value, isPhysical: isPhysical })
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      dispatch(
        uploadImageChange({ imageUrl: imageUrl, isPhysical: isPhysical })
      );
    }
  };

  const handleClearImage = (e) => {
    e.preventDefault();
    dispatch(clearUploadedImage());
  };

  const updateQuantity = (q) => {
    dispatch(updateQuantityChange({ quantity: q, isPhysical: isPhysical }));
  };

  const handleMaterialImageClick = (index, product) => {
    setSelectedIndex(index);
    const sizes = physicalArt.materials
      .filter((e, ind) => ind === product.id)
      .map((e) => e.sizes);
    setSizesArray(sizes[0]);
    dispatch(materialNameChange(product.material));
  };

  const handleSizeClick = (index, size) => {
    setSelectedSizeIndex(index);
    dispatch(materialSizeChange(size));
  };

  const paintingInputTextChange = (e) => {
    dispatch(paintingNoteChange(e.target.value));
  };

  useEffect(() => {
    dispatch(updateProductInfo({ props: props, editForm: editForm }));
  }, [props]);

  useEffect(() => {
    dispatch(updateTotal(isPhysical));
  }, [props, isPhysical, digitalArt, physicalArt]);

  // useEffect(() => {
  //   console.log(cartArray);
  // }, [cartArray]);

  // useEffect(() => {
  //   console.log("digitalArt", digitalArt);
  // }, [digitalArt]);
  // useEffect(() => {
  //   console.log("physicalArt", physicalArt);
  // }, [physicalArt]);

  const addTocart = (e) => {
    e.preventDefault();
    const newItem = isPhysical ? physicalArt : digitalArt;
    dispatch(addToCart(newItem));
    navigate("/cart");
    dispatch(clearStates());
  };

  const updateCartItems = (e) => {
    e.preventDefault();
    const updateItem = isPhysical ? physicalArt : digitalArt;
    console.log(updateItem);
    dispatch(updateCartItem(updateItem));
    close(false);
  };

  useEffect(() => {
    if (editForm) {
      dispatch(updateEditForms(props));
    }
  }, [editForm]);

  return (
    <div
      className={editForm ? "product-description-edit" : "product-description"}
    >
      {!editForm && (
        <>
          <div className="product-category">
            {props ? props.category : "category"}
          </div>
          <div className="product-price">
            <span className="original-price">
              <del>${props ? props.lastPrice : "0.00"}</del>
            </span>
            <span className="discount-price">
              ${props ? props.price : "0.00"}
            </span>
          </div>
          <div className="product-pharagraph">
            {props ? props.title : "title"}
          </div>
        </>
      )}

      {editForm && (
        <div className="new-product-details-edit">
          <img
            src={
              isPhysical
                ? physicalArt.productImage[0]
                : digitalArt.productImage[0]
            }
            alt="Product Image"
          />
          <span className="category">
            {isPhysical ? physicalArt.category : digitalArt.category}
          </span>

          <div className="details">
            <div className="detail-item">
              <span className="label">Type</span>
              <span className="value">
                {isPhysical
                  ? `${physicalArt.material} / ${
                      physicalArt.size && physicalArt.size.size
                    }`
                  : "Digital Artwork"}
              </span>
            </div>
            <div className="detail-item">
              <span className="label">Quantity</span>
              <span className="value">
                {isPhysical ? physicalArt.quantity : digitalArt.quantity}
              </span>
            </div>
            {!isPhysical && (
              <>
                <div className="detail-item">
                  <span className="label">Figure</span>
                  <span className="value">
                    {physicalArt.figure || digitalArt.figure
                      ? isPhysical
                        ? physicalArt.figure.name
                        : digitalArt.figure.name
                      : "No selected"}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="label">Style</span>
                  <span className="value">
                    {physicalArt.style || digitalArt.style
                      ? isPhysical
                        ? physicalArt.style.type
                        : digitalArt.style.type
                      : "No selected"}
                  </span>
                </div>
              </>
            )}
            <div className="detail-item">
              <span className="label">Persons</span>
              <span className="value">
                {physicalArt.numOfPersons || digitalArt.numOfPersons
                  ? isPhysical
                    ? physicalArt.numOfPersons.name
                    : digitalArt.numOfPersons.name
                  : "No selected"}
              </span>
            </div>
            <div className="detail-item">
              <span className="label">Price</span>
              <span className="price">
                $
                {isPhysical
                  ? physicalArt.price + physicalArt.eachPrice
                  : digitalArt.price + digitalArt.eachPrice}
              </span>
            </div>
          </div>

          <div className="total">
            <span className="label">Total</span>
            <span className="value">
              {" "}
              $ {isPhysical ? physicalArt.total : digitalArt.total}
            </span>
          </div>

          <span className="note">
            {isPhysical ? physicalArt.paintingNote : digitalArt.paintingNote}
          </span>
          <span className="note">
            {isPhysical ? physicalArt.designerNote : digitalArt.designerNote}
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
              // onClick={() => console.log("222")}
            >
              Digital Art
            </div>
            <div
              className={`toggle-option ${
                !isPhysical ? "active-physical" : ""
              }`}
              onClick={() => setIsPhysical(true)}
              // onClick={() => console.log("111")}
            >
              Physical Art
            </div>
          </div>
          {isPhysical && (
            <div className="physical-art-details">
              <label htmlFor="selected-material-design">
                Material : {physicalArt.material}
              </label>
              <div className="material-sizes">
                {materialDesign &&
                  materialDesign.map((product, index) => (
                    <div
                      key={index}
                      className="material-image-container"
                      onClick={() => handleMaterialImageClick(index, product)}
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
                Size : {physicalArt.size ? physicalArt.size.size : ""}
              </label>
              <div className="sizes-box">
                {materialDesign &&
                  sizesArray.map((size, index) => (
                    <div
                      key={index}
                      className="material-size-container"
                      onClick={() => handleSizeClick(index, size)}
                    >
                      <span
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
            <>
              {uploadedImage && (
                <div className="uploaded-image-preview">
                  <img
                    src={uploadedImage}
                    alt="Preview"
                    style={{ width: "100px", marginRight: "10px" }}
                  />
                  <button
                    className="image-close-button"
                    onClick={handleClearImage}
                  >
                    &#10005;
                  </button>
                </div>
              )}
            </>
          </div>
          <div className="select-options">
            <div className="number-persons">
              <label htmlFor="persons">Number of Person/Pet</label>
              <select
                name="persons"
                id="persons"
                onChange={handlePerChange}
                // value={person ? person.id : 1}
                value={
                  (isPhysical
                    ? physicalArt.numOfPersons?.id
                    : digitalArt.numOfPersons?.id) || 1
                }
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
                    // value={style ? style.id : 1}
                    value={digitalArt.style ? digitalArt.style.id : 1}
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
                    // value={figure ? figure.id : 1}
                    value={digitalArt.figure ? digitalArt.figure.id : 1}
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
                  // value={paintingNote}
                  value={physicalArt.paintingNote}
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
                // value={designerNote}
                value={
                  isPhysical
                    ? physicalArt.designerNote
                    : digitalArt.designerNote
                }
                onChange={designerInputTextChange}
              ></textarea>
            </div>
          </div>

          <div className="product-buy-quantity-btn">
            <label htmlFor="q-value">
              Quantity :{" "}
              {isPhysical ? physicalArt.quantity : digitalArt.quantity}
            </label>

            <QuantityCounter
              TotalQuantity={updateQuantity}
              initialQuantity={
                isPhysical ? physicalArt.quantity : digitalArt.quantity
              }
              product={editForm ? props : []}
              cartUpdate={false}
            />
            <label htmlFor="subtotal-value">
              Subtotal : $ {isPhysical ? physicalArt.total : digitalArt.total}
            </label>
          </div>

          {!editForm ? (
            <div className="cart-button">
              <button className="buy-it-now-btn">BUY IT NOW</button>
              <button className="add-to-cart-btn" onClick={addTocart}>
                ADD TO CART
              </button>
            </div>
          ) : (
            <div className="cart-button">
              <button className="save-to-cart-btn" onClick={updateCartItems}>
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
