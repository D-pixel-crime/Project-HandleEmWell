import { FaPen } from "react-icons/fa";
import { useLayoutEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PROJECT } from "../mutations/projectMutations";
import { GET_SINGLE_PROJECT } from "../queries/projectQueries";

const EditProjectForm = ({ projectDetails }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: projectDetails.id, name, description, status },
    refetchQueries: [
      { query: GET_SINGLE_PROJECT, variables: { id: projectDetails.id } },
    ],
  });

  useLayoutEffect(() => {
    setName(projectDetails.name);
    setDescription(projectDetails.description);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !description) {
      return alert("Please fill in all the details");
    }

    updateProject();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-flex btn-lg justify-content-center mt-3"
        data-bs-toggle="modal"
        data-bs-target="#editProjectForm"
      >
        <div className="d-flex align-items-center gap-1">
          <FaPen className="icon" />
          <div style={{ marginLeft: "0.35rem" }}>Edit Project Details</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="editProjectForm"
        aria-labelledby="editProjectFormLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editProjectFormLabel">
                Edit Project Details
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
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-warning mt-3"
                    type="submit"
                    data-bs-dismiss="modal"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditProjectForm;
