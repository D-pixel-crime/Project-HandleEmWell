import Projects from "../components/Projects";
import AddClientModal from "../modals/AddClientModal";
import Clients from "../components/Clients";
import AddProjectModal from "../modals/AddProjectModal";

const HomePage = () => {
  return (
    <>
      <Projects />
      <div className="d-flex justify-content-end gap-3 mb-4">
        <AddProjectModal />
      </div>
      <Clients />
      <div className="d-flex justify-content-end gap-3 mb-4 mt-4">
        <AddClientModal />
      </div>
    </>
  );
};
export default HomePage;
