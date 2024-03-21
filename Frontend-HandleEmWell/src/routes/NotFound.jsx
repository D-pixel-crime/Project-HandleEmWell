import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center">
      <div
        className="alert alert-danger d-flex align-items-center justify-content-center gap-3"
        role="alert"
      >
        <FaExclamationTriangle /> <>Error! This Page Does Not Exist.</>
      </div>
      <div
        style={{
          textDecoration: "underline",
          cursor: "pointer",
          color: "red",
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </div>
    </div>
  );
};
export default NotFound;
