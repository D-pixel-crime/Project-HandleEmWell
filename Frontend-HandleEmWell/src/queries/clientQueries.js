import { gql, useQuery } from "@apollo/client";

export const GET_CLIENTS = gql`
  query getClients {
    allClients {
      id
      name
      email
      phone
    }
  }
`;
