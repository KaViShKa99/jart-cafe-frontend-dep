import Navbar from "./Navbar";
import ProductView from "./ProductView";
import Categories from "./Categories";

const Home = () => {
  return (
    <div className="main-container">
      <Navbar />
      {/* <div className="categories">categories</div> */}
      <Categories />
      <ProductView />
      {/* <div className="gallery">image gallery</div> */}
    </div>
  );
};

export default Home;
