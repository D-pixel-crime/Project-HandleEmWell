import logo from "../logo.png";

const Header = () => {
  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="container">
        <a href="/" className="navbar-brand logo">
          <div className="d-flex align-items-center">
            <img src={logo} alt="logo" />
            <div>HandleEmWell</div>
          </div>
        </a>
      </div>
    </nav>
  );
};
export default Header;
