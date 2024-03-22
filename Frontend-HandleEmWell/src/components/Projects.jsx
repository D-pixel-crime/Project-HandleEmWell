import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import Spinner from "./Spinner";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;
  return (
    <>
      {data.allProjects.length > 0 ? (
        <>
          <h2>Projects</h2>
          <hr />
          <div className="row mt-4 mb-4">
            {data.allProjects.map((element) => {
              return <ProjectCard key={element.id} project={element} />;
            })}
          </div>
        </>
      ) : (
        <>
          <p>No Projects ATM</p>
        </>
      )}
    </>
  );
};
export default Projects;
