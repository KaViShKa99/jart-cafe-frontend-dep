import { useState, useEffect } from "react";
import { Pagination, Dropdown } from "rsuite";
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
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const reviewsPerPage = 3;

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const sortedAndFilteredReviews = (e) => {
    console.log(e);
    setSortOption(e);
    // setSortOption(e.target.value);

    // let filteredReviews = reviews;
    // if (filterOption !== "all") {
    //   filteredReviews = reviews.filter(
    //     (review) => review.rating === parseInt(filterOption)
    //   );
    // }

    let sortedReviews = [...filteredReviews];
    switch (e) {
      // switch (e.target.value) {
      case "Newest":
        sortedReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "Highest":
        sortedReviews.sort((a, b) => b.rating - a.rating);
        break;
      case "Lowest":
        sortedReviews.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }

    setFilteredReviews(sortedReviews);
  };

  useEffect(() => {
    console.log(sortOption, filteredReviews);
  }, [sortOption]);

  return (
    <div className="product-review">
      <h2>Reviews</h2>
      <div className="filter-sort-options">
        <label htmlFor="sort">Sort by: </label>
        <Dropdown
          trigger={["click", "hover"]}
          activeKey={sortOption}
          onSelect={sortedAndFilteredReviews}
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
