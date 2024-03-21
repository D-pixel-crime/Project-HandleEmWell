import Projects from "../components/Projects";
import AddClientModal from "../modals/AddClientModal";
import Clients from "../components/Clients";

const HomePage = () => {
  return (
    <>
      <Projects />
      <div className="d-flex gap-3 mb-4">
        <AddClientModal />
      </div>
      <Clients />
    </>
  );
};
export default HomePage;
