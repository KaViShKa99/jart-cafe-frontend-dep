import { useState } from "react";
import { Pagination } from "rsuite";
import Review from "./Review";

const ReviewsContainer = () => {
  const reviews = [
    {
      rating: 5,
      comment:
        "Amazing artwork! The quality is outstanding and the colors are vibrant. Exceeded my expectations!",
      date: "2024-06-10",
      username: "ArtLover123",
    },
    {
      rating: 4,
      comment:
        "Great product, but shipping took longer than expected. The print quality is excellent though.",
      date: "2024-06-09",
      username: "HappyCustomer99",
    },
    {
      rating: 3,
      comment:
        "The art is good, but the frame was a bit damaged upon arrival. Customer service was helpful in resolving the issue.",
      date: "2024-06-08",
      username: "ArtEnthusiast123",
    },
    {
      rating: 5,
      comment:
        "Absolutely love it! Perfect gift for my friend's birthday. Highly recommend!",
      date: "2024-06-07",
      username: "ArtFanatic456",
    },
    {
      rating: 4,
      comment:
        "Very nice print, but I wish there were more size options available. Overall, I'm satisfied with the purchase.",
      date: "2024-06-06",
      username: "ArtCollector007",
    },
    {
      rating: 2,
      comment:
        "The print quality was not as good as I expected. Colors look a bit faded. Not very happy with it.",
      date: "2024-06-05",
      username: "DisappointedCustomer",
    },
  ];
  const [filterOption, setFilterOption] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  const sortedAndFilteredReviews = () => {
    let filteredReviews = reviews;
    if (filterOption !== "all") {
      filteredReviews = reviews.filter(
        (review) => review.rating === parseInt(filterOption)
      );
    }

    switch (sortOption) {
      case "newest":
        return filteredReviews.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      case "highest":
        return filteredReviews.sort((a, b) => b.rating - a.rating);
      case "lowest":
        return filteredReviews.sort((a, b) => a.rating - b.rating);
      default:
        return filteredReviews;
    }
  };

  return (
    <div className="product-review">
      <h2>Reviews</h2>
      <div className="filter-sort-options">
        <label htmlFor="filter">Filter by Rating: </label>
        <select id="filter" value={filterOption} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
        <label htmlFor="sort">Sort by: </label>
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="newest">Newest Review</option>
          <option value="highest">Highest Review</option>
          <option value="lowest">Lowest Review</option>
        </select>
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
          total={reviews.length}
          limit={reviewsPerPage}
          activePage={currentPage}
          onChangePage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ReviewsContainer;
