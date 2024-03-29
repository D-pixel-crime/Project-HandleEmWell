import { gql, useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import ClientRow from "./ClientRow";
import Spinner from "./Spinner";

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      {!loading && !error && (
        <>
          <h2 className="mt-5">Clients</h2>
          <hr />
          <table className="table table-hover mt-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.allClients.map((element) => {
                return <ClientRow key={element.id} client={element} />;
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
export default Clients;
