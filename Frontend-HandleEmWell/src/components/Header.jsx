import { Icon } from "@iconify/react";

const Header = () => {
  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="container">
        <a href="/" className="navbar-brand logo fs-1">
          <div className="d-flex align-items-center">
            <Icon icon="eos-icons:project-outlined" />
            <div>HandleEmWell</div>
          </div>
        </a>
      </div>
    </nav>
  );
};
export default Header;
