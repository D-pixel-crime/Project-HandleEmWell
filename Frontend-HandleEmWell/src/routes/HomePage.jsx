import Projects from "../components/Projects";
import AddClientModal from "../modals/AddClientModal";
import Clients from "../components/Clients";
import AddProjectModal from "../modals/AddProjectModal";

const HomePage = () => {
  return (
    <>
      <Projects />
      <hr />
      <div className="d-flex justify-content-between gap-3 mb-4 mt-4">
        <AddClientModal />
        <AddProjectModal />
      </div>
      <hr />
      <Clients />
    </>
  );
};
export default HomePage;
