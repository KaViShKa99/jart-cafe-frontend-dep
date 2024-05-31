import Navbar from "./Navbar";
import ProductView from "./ProductView";
import Categories from "./Categories";

const Home = () => {
  return (
    <div className="main-container">
      <Navbar />
      <Categories />
      <ProductView />
    </div>
  );
};

export default Home;
