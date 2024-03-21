import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { GET_SINGLE_PROJECT } from "../queries/projectQueries";
import Spinner from "../components/Spinner";
import ClientInfo from "../components/ClientInfo";

const SingleProject = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { loading, error, data } = useQuery(GET_SINGLE_PROJECT, {
    variables: { id: projectId },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error ? (
        <div className="mx-auto w-75 card p-5">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            className="btn btn-warning btn-sm w-25 d-inline ms-auto"
          >
            Back
          </button>
          <div className="mt-4">
            <h1>{data.project.name}</h1>
            <p>{data.project.description}</p>
          </div>

          <div className="mt-4">
            <h5>Project Status: </h5>
            <p className="lead">{data.project.status}</p>
          </div>
          <hr />
          <ClientInfo client={data.project.client} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default SingleProject;
