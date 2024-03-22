import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { GET_PROJECTS, GET_SINGLE_PROJECT } from "../queries/projectQueries";
import Spinner from "../components/Spinner";
import ClientInfo from "../components/ClientInfo";
import { FaPen, FaTrash } from "react-icons/fa";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import EditProjectForm from "../components/EditProjectForm";

const SingleProject = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { loading, error, data } = useQuery(GET_SINGLE_PROJECT, {
    variables: { id: projectId },
  });
  const res = useQuery(GET_PROJECTS);

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    update(cache, { data: { deleteProject } }) {
      const { allProjects } = cache.readQuery({
        query: GET_PROJECTS,
      });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          allProjects: allProjects.filter(
            (element) => element.id !== deleteProject.id
          ),
        },
      });
    },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error ? (
        <div className="mx-auto w-75 card py-4 px-5 mb-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            className="btn btn-outline-success w-25 d-inline ms-auto"
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
          <hr />
          {/* <button
            className="btn btn-primary mt-4 d-flex align-items-center justify-content-center btn-lg gap-2"
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            <FaPen />
            <>Edit Project</>
          </button> */}
          <EditProjectForm projectDetails={data.project} />
          <button
            className="btn btn-danger mt-4 d-flex align-items-center justify-content-center btn-lg gap-2"
            onClick={(event) => {
              event.preventDefault();
              deleteProject();
              navigate("/");
            }}
          >
            <FaTrash />
            <>Delete Project</>
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default SingleProject;
