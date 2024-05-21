import { useState } from "react";
const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const handleCategoryClick = (index) => {
    setActiveCategory(index);
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
  return (
    <div className="categorie-list">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => handleCategoryClick(index)}
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
