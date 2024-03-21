import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";

const ClientInfo = ({ client }) => {
  return (
    <>
      <h5 className="mt-4">Client Information: </h5>
      <ul className="list-group">
        <li className="list-group-item d-flex gap-2 align-items-center">
          <FaIdBadge className="icon" />
          {client.name}
        </li>
        <li className="list-group-item d-flex gap-2 align-items-center">
          <FaEnvelope className="icon" />
          {client.email}
        </li>
        <li className="list-group-item d-flex gap-2 align-items-center">
          <FaPhone className="icon" />
          {client.phone}
        </li>
      </ul>
    </>
  );
};
export default ClientInfo;
