import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";

const ClientRow = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }], // this takes too much of re-requesting
    // update(cache, { data: { deleteClient } }) {
    //   const { allClients } = cache.readQuery({
    //     query: GET_CLIENTS,
    //   });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       allClients: allClients.filter(
    //         (client) => client.id !== deleteClient.id
    //       ),
    //     },
    //   });
    // },
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button
          className="d-flex btn btn-danger align-items-center"
          onClick={(e) => {
            e.preventDefault();
            deleteClient();
          }}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};
export default ClientRow;
