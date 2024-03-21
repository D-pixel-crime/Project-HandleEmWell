import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./routes/HomePage";
import NotFound from "./routes/NotFound";
import SingleProject from "./routes/SingleProject";

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
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="singleProject/:projectId"
              element={<SingleProject />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
