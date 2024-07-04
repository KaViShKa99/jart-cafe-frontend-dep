import { useState, useEffect } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ProductImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const [selectImage, setSelectImage] = useState("");

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectImage(images[newIndex]);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectImage(images[newIndex]);
  };

  const goToImage = (index, image) => {
    setSelectImage(image);
    setCurrentIndex(index);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
      transformOrigin: "center center",
    });
  };

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isModalOpen]);

  if (images === null) {
    return (
      <div className="gallery-container">
        <h2>Images not found</h2>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <div className="gallery-wrapper">
        <div className="image-container">
          {/* <h2>image</h2> */}
          {images && images.length > 0 && (
            <img
              src={
                !isModalOpen
                  ? currentIndex === 0
                    ? images[currentIndex]
                    : selectImage
                  : images[0]
              }
              alt="gallery"
              style={zoomStyle}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => openModal(currentIndex)}
            />
          )}
        </div>
      </div>
      <div className="thumbnail-container">
        <button onClick={goToPrevious} className="left-arrow">
          <MdOutlineKeyboardArrowLeft />
        </button>
        {images &&
          images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`thumbnail ${index}`}
              className={`thumbnail ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToImage(index, image)}
            />
          ))}
        <button onClick={goToNext} className="right-arrow">
          <MdOutlineKeyboardArrowRight />
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <button onClick={goToPrevious} className="modal-left-arrow">
            <MdOutlineKeyboardArrowLeft />
          </button>
          {images && images.length > 0 && (
            <img
              src={currentIndex === 0 ? images[0] : selectImage}
              alt="full-size gallery"
              className="full-image"
            />
          )}
          <button onClick={goToNext} className="modal-right-arrow">
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductImageGallery;
