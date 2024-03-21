const ProjectCard = ({ project }) => {
  return (
    <div className="col-md-4">
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="card-title">{project.name}</h5>
              <h6 className="card-subtitle">Status: {project.status}</h6>
            </div>
            <button className="btn btn-outline-info">
              <a
                href={`/singleProject/${project.id}`}
                className="link-underline link-underline-opacity-0"
              >
                View
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectCard;
