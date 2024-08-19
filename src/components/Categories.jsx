import { useState, useEffect } from "react";
// import { useStateContext } from "./StateContext";
import { categories } from "../data/Data";
import { useDispatch, useSelector } from "react-redux";
import { setSelectCategory } from "../redux/reducers/categoryReducer";

const Categories = () => {
  const dispatch = useDispatch();
  const selectCategory = useSelector(
    (state) => state.selectedCategory.category
  );
  const activeCategory = useSelector(
    (state) => state.selectedCategory.activeIndex
  );
  const category = useSelector((state) => state.selctedCategory);

  // const { setSelectCategory } = useStateContext();
  // const [activeCategory, setActiveCategory] = useState(0);
  const handleCategoryClick = (index, name) => {
    // setActiveCategory(index);
    dispatch(setSelectCategory({ name: name, index: index }));
    // setSelectCategory(name);
  };

  return (
    <div className="categorie-list">
      <span className="home-headline">
        <h1>Unique Finds Market!</h1>
      </span>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => handleCategoryClick(index, category.name)}
            className={activeCategory === index ? "active" : ""}
          >
            <img
              src={category.imageUrl}
              alt="Product"
              className={activeCategory === index ? "active" : ""}
            />
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
