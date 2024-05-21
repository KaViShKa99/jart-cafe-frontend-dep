import ReactSearchBox from "react-search-box";
import { FiShoppingCart } from "react-icons/fi";
import { GrFavorite } from "react-icons/gr";
import { IoSearchOutline } from "react-icons/io5";

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
            placeholder="Search in Jart Cafe"
            value="Doe"
            data={data}
            callback={(record) => console.log(record)}
            leftIcon={<IoSearchOutline />}
            iconBoxSize="48px"
            autoFocus
            dropdownHoverColor="#fff0e8"
          />
        </div>
        <div className="link-container">
          <ul className="links">
            <li className="sign-in">Sign in</li>
            <li>
              <GrFavorite />
            </li>
            <li className="cart-container">
              <FiShoppingCart size="1rem" />
              <div className="cart-counter">3</div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
