import { useEffect } from "react";
import Navbar from "../Navbar";
import ProductGallery from "../ProductGallery";
import Categories from "../Categories";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/reducers/productsReducer";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className="home-container">
      <Navbar />
      <Categories />
      <ProductGallery />
    </div>
  );
};

export default Home;
