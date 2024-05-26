import { useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToImage = (index) => {
    setCurrentIndex(index);
  };
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
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
  let img = images[currentIndex].imageUrl;

  return (
    <div className="gallery-container">
      <div className="gallery-wrapper">
        {/* <button onClick={goToPrevious} className="left-arrow">
          &#9664;
        </button> */}
        <div className="image-container">
          <img
            src={images[currentIndex]}
            alt="gallery"
            style={zoomStyle}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => openModal(currentIndex)}
          />
        </div>
        {/* <button onClick={goToNext} className="right-arrow">
          &#9654;
        </button> */}
      </div>
      <div className="thumbnail-container">
        <button onClick={goToPrevious} className="left-arrow">
          <MdOutlineKeyboardArrowLeft />
        </button>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`thumbnail ${index}`}
            className={`thumbnail ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToImage(index)}
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
          {/* <button onClick={closeModal} className="close-button">
            &times;
          </button> */}
          <button onClick={goToPrevious} className="modal-left-arrow">
            {/* &#9664; */}
            <MdOutlineKeyboardArrowLeft />
          </button>
          <img
            src={images[currentIndex]}
            alt="full-size gallery"
            className="full-image"
          />
          <button onClick={goToNext} className="modal-right-arrow">
            {/* &#9654; */}
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ImageGallery;
