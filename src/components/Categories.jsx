import { useState, useEffect } from "react";
import { useStateContext } from "./StateContext";
const Categories = () => {
  const { setSelectCategory } = useStateContext();
  const [activeCategory, setActiveCategory] = useState(0);
  const handleCategoryClick = (index, name) => {
    setActiveCategory(index);
    setSelectCategory(name);
  };
  const categories = [
    {
      name: "Pop art",
      imageUrl: "src/assets/c1.jpeg",
    },
    {
      name: "Vector art",
      imageUrl: "src/assets/c2.jpeg",
    },
    {
      name: "Pet portrait",
      imageUrl: "src/assets/c3.jpeg",
    },
    {
      name: "Cartoon art",
      imageUrl: "src/assets/c4.jpeg",
    },
  ];
  useEffect(() => {
    setSelectCategory("Pop art");
    console.log(activeCategory);
  }, []);

  return (
    <div className="categorie-list">
      <span className="home-headline">Unique Finds Market!</span>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => handleCategoryClick(index, category.name)}
            className={activeCategory === index ? "active" : ""}
          >
            <img src={category.imageUrl} alt="Product" />
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
