import Navbar from "../Navbar";
import ProductGallery from "../ProductGallery";
import Categories from "../Categories";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <Categories />
      <ProductGallery />
    </div>
  );
};

export default Home;
