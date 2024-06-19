import { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";

const materialDesign = [
  {
    id: 1,
    type: "Pop art",
    name: "Canvas",
    price: 30,
    imageUrl: "/imgs/canvas.jpeg",
    size: [
      { s: '12"x16"', p: 30.0 },
      { s: '8"x10"', p: 35.0 },
      { s: '18"x24"', p: 40.0 },
      { s: '24"x30"', p: 10.0 },
      { s: '30"x40"', p: 60.0 },
    ],
  },
  {
    id: 2,
    type: "Pop art",
    price: 34,
    name: "Poster",
    imageUrl: "/imgs/framed_poster.jpeg",
    size: [
      { s: '18"x24"', p: 30.0 },
      { s: '12"x18"', p: 20.0 },
      { s: '16"x20"', p: 60.0 },
      { s: '24"x36"', p: 70.0 },
    ],
  },
  {
    id: 3,
    type: "Cartoon art",
    price: 70,
    name: "Framed poster",
    imageUrl: "/imgs/poster.jpeg",
    size: [
      { s: '12"x16"', p: 30.0 },
      { s: '18"x24"', p: 35.0 },
      { s: '16"x20"', p: 40.0 },
    ],
  },
  {
    id: 4,
    type: "Vector art",
    price: 40,
    name: "Traditional Frames Canvas",
    imageUrl: "/imgs/prem_can_poster.jpeg",
    size: [
      { s: '8"x10"', p: 25 },
      { s: '16"x20"', p: 45 },
      { s: '24"x36"', p: 60 },
      { s: '11"x14"', p: 35 },
      { s: '24"x20"', p: 55 },
    ],
  },
  {
    id: 5,
    type: "Pet portrait",
    price: 60,
    name: "Premium Framed Canvas",
    imageUrl: "/imgs/trad_can_poster.jpeg",
    size: [
      { s: '12"x16"', p: "$50" },
      { s: '8"x10"', p: "$30" },
      { s: '18"x24"', p: "$60" },
      { s: '24"x30"', p: "$70" },
      { s: '30"x40"', p: "$80" },
    ],
  },
];

const SearchBar = ({ searchItem }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const filteredSuggestions = materialDesign.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    setSuggestions([]);
    searchItem(suggestions);
  };

  //   useEffect(() => {
  //     console.log(query);
  //   }, [query]);

  return (
    <div className="search-bar-container">
      <span className="search-icon">
        <IoSearchOutline />
      </span>
      <input
        type="text"
        className="search-bar"
        placeholder="Search for anything"
        value={query}
        onChange={handleInputChange}
      />
      {suggestions.length > 0 ? (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      ) : query ? (
        <div className="suggestions-list">No match results</div>
      ) : null}
    </div>
  );
};

export default SearchBar;
