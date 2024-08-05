import { useState, useEffect } from "react";
import { Pagination, Dropdown } from "rsuite";
import Review from "./Review";
import { useDispatch, useSelector } from "react-redux";
import { sortedReview } from "../redux/reducers/reviewReducer";

const ReviewsContainer = () => {
  const dispatch = useDispatch();
  const { productReviewsById, sortOption } = useSelector(
    (state) => state.review
  );

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;

  const currentReviews = productReviewsById.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  return (
    <div className="product-review">
      <div className="filter-sort-options">
        <label htmlFor="sort">Sort by: </label>
        <Dropdown
          trigger={["click", "hover"]}
          activeKey={sortOption}
          onSelect={(e) => dispatch(sortedReview(e))}
          title={sortOption}
        >
          <Dropdown.Item eventKey="Newest">Newest</Dropdown.Item>
          <Dropdown.Item eventKey="Highest">Highest Ratings</Dropdown.Item>
          <Dropdown.Item eventKey="Lowest">Lowest Ratings</Dropdown.Item>
        </Dropdown>
      </div>

      {currentReviews.length > 0 ? (
        currentReviews.map((review, index) => (
          <Review key={index} review={review} />
        ))
      ) : (
        <p>No reviews available.</p>
      )}

      <div className="review-pagination">
        <Pagination
          prev
          last
          next
          first
          size="md"
          total={productReviewsById.length}
          limit={reviewsPerPage}
          activePage={currentPage}
          onChangePage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ReviewsContainer;
