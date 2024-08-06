import { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/reducers/productsReducer";
import Fuse from "fuse.js";
import { addToSearchArray } from "../redux/reducers/searchItemReducer";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [hideSuggestion, setHideSuggestions] = useState(false);
  const normalizeString = (str) => str.toLowerCase().replace(/\s+/g, "");

  const options = {
    keys: ["title"],
    includeMatches: true,
    threshold: 0.3,
    matchAllTokens: true,
    includeScore: true,
    maxPatternLength: 32,
    // minMatchCharLength: 3,
  };

  useEffect(() => {
    if (query.length > 0) {
      const fuse = new Fuse(products, options);

      const normalizedQuery = normalizeString(query);
      const result = fuse
        .search(normalizedQuery)
        .map(({ item }) => {
          const title = item.title;
          const normalizedTitle = normalizeString(title);

          const queryIndex = normalizedTitle.indexOf(normalizedQuery);

          if (queryIndex !== -1) {
            const words = title.split(" ");
            const normalizedWords = words.map((word) => normalizeString(word));

            const queryWordIndex = normalizedWords.findIndex((normalizedWord) =>
              normalizedWord.includes(normalizedQuery)
            );

            if (queryWordIndex !== -1) {
              const start = queryWordIndex;
              const end = queryWordIndex + 3;
              const snippet = words.slice(start, end).join(" ");
              return { displayText: snippet, product: item };
            }
          }
          return null;
        })
        .filter((item) => item !== null);

      
      setSuggestions(result);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleInputChange = (e) => {
    setHideSuggestions(false);
    setQuery(e.target.value);
  };
  // const handleFocus = () => {
  //   console.log("Input field is focused");
  //   setHideSuggestions(false);
  // };
  // const handleBlur = () => {
  //   console.log("Input field is not focused");
  //   setHideSuggestions(true);
  // };

  const handleSuggestionClick = (suggestion) => {

    dispatch(addToSearchArray(suggestion));
    setQuery(suggestion.displayText);
    setSuggestions([]);
    setHideSuggestions(true)
    navigate("/search");
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [query]);

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
        // onFocus={handleFocus}
        // onBlur={handleBlur}
      />

      {suggestions.length > 0 && !hideSuggestion? (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.displayText}
            </li>
          ))}
        </ul>
      ) : query && !hideSuggestion? (
        <div className="suggestions-list">No match results</div>
      ) : null}
    </div>
  );
};

export default SearchBar;
