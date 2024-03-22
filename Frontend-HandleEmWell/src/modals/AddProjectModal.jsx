import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { FaList } from "react-icons/fa";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "../components/Spinner";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";

const AddProjectModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");

  const { loading, error, data } = useQuery(GET_CLIENTS);

  //   const [addClient] = useMutation(ADD_CLIENT, {
  //     variables: { name, email, phone },
  //     update(cache, { data: { addClient } }) {
  //       const { allClients } = cache.readQuery({
  //         query: GET_CLIENTS,
  //       });
  //       cache.writeQuery({
  //         query: GET_CLIENTS,
  //         data: {
  //           allClients: [...allClients, addClient],
  //         },
  //       });
  //     },
  //   });

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { allProjects } = cache.readQuery({
        query: GET_PROJECTS,
      });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          allProjects: [...allProjects, addProject],
        },
      });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !description || !clientId) {
      return alert("Please fill in all the details");
    }

    console.log(name, description, status, clientId);
    addProject();
    setName("");
    setDescription("");
    setClientId("");
    setStatus("new");
  };

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error ? (
        <>
          <button
            type="button"
            className="btn btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div style={{ marginLeft: "0.35rem" }}>Add Project</div>
            </div>
          </button>

          <div
            className="modal fade"
            id="addProjectModal"
            aria-labelledby="addProjectModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="addProjectModalLabel">
                    Add Project
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(event) => {
                          setName(event.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(event) => {
                          setDescription(event.target.value);
                        }}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        id="status"
                        className="form-select"
                        value={status}
                        onChange={(event) => {
                          setStatus(event.target.value);
                        }}
                      >
                        <option value="new">Not Yet Started</option>
                        <option value="ongoing">On-Going</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="mb-5">
                      <label className="form-label">Client</label>
                      <select
                        id="client"
                        className="form-select"
                        value={clientId}
                        onChange={(event) => {
                          setClientId(event.target.value);
                        }}
                      >
                        <option value="">Select Client</option>
                        {data.allClients.map((element) => (
                          <option value={element.id} key={element.id}>
                            {element.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-primary mt-3"
                        type="submit"
                        data-bs-dismiss="modal"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default AddProjectModal;
