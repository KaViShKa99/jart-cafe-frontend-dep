import ReactSearchBox from "react-search-box";
import { FiShoppingCart } from "react-icons/fi";
import { GrFavorite } from "react-icons/gr";

const Navbar = () => {
  const data = [
    {
      key: "john",
      value: "John Doe",
    },
    {
      key: "jane",
      value: "Jane Doe",
    },
    {
      key: "mary",
      value: "Mary Phillips",
    },
    {
      key: "robert",
      value: "Robert",
    },
    {
      key: "karius",
      value: "Karius",
    },
  ];
  return (
    <div className="nav-bar">
      <nav>
        <span>Jart Cafe</span>
        <div className="search">
          <ReactSearchBox
            placeholder="Search for anything"
            value="Doe"
            data={data}
            callback={(record) => console.log(record)}
          />
        </div>
        <div className="link-container">
          <ul className="links">
            <li>Sign in</li>
            <li>
              <GrFavorite />
            </li>
            <li>
              <FiShoppingCart size="1rem" />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
