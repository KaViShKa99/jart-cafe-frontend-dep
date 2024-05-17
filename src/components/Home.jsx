import ReactSearchBox from "react-search-box";

const Home = () => {
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
    <div className="main-container">
      <div className="nav-bar">
        <nav>
          <span>Jart cafe</span>
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
              <li>favorites</li>
              <li>order</li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="categories">categories</div>
      <div className="gallery">image gallery</div>
    </div>
  );
};

export default Home;
