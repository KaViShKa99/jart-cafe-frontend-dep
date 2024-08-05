const Review = ({ review }) => {
  const { rating, reviewText, date, username, reviewedDate } = review;

  return (
    <div className="review">
      <div className="review-header">
        <div className="review-rating">
          {Array.from({ length: 5 }, (_, index) => (
            <span
              key={index}
              className={index < rating ? "star filled" : "star"}
            >
              &#9733;
            </span>
          ))}
        </div>
        <div className="review-details">
          <span className="review-username">{username}</span>
          <span className="review-date">
            {new Date(reviewedDate).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="review-comment">{reviewText}</div>
    </div>
  );
};

export default Review;
