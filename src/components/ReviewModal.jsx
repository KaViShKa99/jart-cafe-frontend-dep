import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  submitReview,
  updateReviewStatus,
} from "../redux/reducers/reviewReducer";
import AlertBox from "../components/AlertBox";

const ReviewModal = ({
  isModalOpen,
  onRequestClose,
  artworkId,
  orderId,
  purchaseId,
}) => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.userProfile);

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userProfile && reviewText !== "" && rating != 0) {
      const reviewData = {
        artworkId: artworkId,
        rating: rating,
        reviewText: reviewText,
        username: userProfile.name,
        userEmail: userProfile.email,
        reviewedDate: new Date(),
      };
      // dispatch(submitReview(reviewData));
      // dispatch(
      //   updateReviewStatus({
      //     orderId: orderId,
      //     purchaseId: purchaseId,
      //     status: true,
      //   })
      // );
      // AlertBox(
      //   "success",
      //   "Success",
      //   "Your review has been added successfully."
      // );

      try {
        await dispatch(submitReview(reviewData)).unwrap(); // assuming you use `createAsyncThunk` and `unwrap` for handling promises
        await dispatch(
          updateReviewStatus({
            orderId: orderId,
            purchaseId: purchaseId,
            status: true,
          })
        ).unwrap();

        onRequestClose();
        setReviewText("");
        setRating("");
      } catch (error) {
        AlertBox(
          "error",
          "Error",
          "There was an error submitting your review."
        );
      }

      setReviewText("");
      setRating("");
      onRequestClose();
    } else {
      AlertBox(
        "error",
        "Error",
        "Please fill in both the text field and ratings."
      );
      setReviewText("");
      setRating("");
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onRequestClose}
      contentLabel="Review Modal"
      className="review-modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <h2>Leave a Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? "selected" : ""}`}
                onClick={() => handleStarClick(star)}
              >
                &#9733;
              </span>
            ))}
          </div>
          <textarea
            className="review-text"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
          ></textarea>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ReviewModal;
