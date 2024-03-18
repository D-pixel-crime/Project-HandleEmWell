import Clients from "./components/Clients";
import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import AddClientModal from "./modals/AddClientModal";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        allClients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        allProjects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:1023/graphql",
  cache: cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <AddClientModal />
      <div className="container">
        <Clients />
      </div>
    </ApolloProvider>
  );
}

export default App;
