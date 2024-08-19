import { useEffect } from "react";
import Navbar from "../Navbar";
import ProductGallery from "../ProductGallery";
import Categories from "../Categories";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/reducers/productsReducer";
import Footer from "../Footer";
import { IoPaperPlaneOutline } from "react-icons/io5";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const handleScrollToNextSection = () => {
    const nextSection = document.querySelector(".categorie-list");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="home-container">
      <Navbar />
      <div className="top-bg-image">
        <div className="bg-image">
          <img src="/imgs/home_bg1.jpg" alt="Background 1" />
        </div>
        <div className="top-bg-content">
          <h1>Discover Your Next Masterpiece</h1>
          <p>
            Explore a curated collection of unique art pieces from emerging
            artists around the world. Whether you’re looking to add a splash of
            color to your home or find a thoughtful gift, our diverse selection
            of Pop Art, Vector Art, and Portraits offers something for every
            taste. Start your art journey with us today!
          </p>
          <button className="learn-more-btn" onClick={handleScrollToNextSection}>
            Shop Now
          </button>
        </div>
      </div>
      <Categories />
      <ProductGallery />
      <div className="bottom-bg-image">
        <div className="bg-image">
          <img src="/imgs/home_bg2.jpg" alt="Background 2" />
        </div>
        <div className="bottom-bg-content">
          <h1>Stay Updated with Our Latest Art Collections!</h1>
          <p>
            Subscribe to our newsletter for the latest updates on unique art
            collections, special offers, and more.
          </p>
          <form>
            <input type="email" placeholder="sample@email.com" required />
            <button type="submit">
              {/* Subscribe  */}
              <IoPaperPlaneOutline />
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
