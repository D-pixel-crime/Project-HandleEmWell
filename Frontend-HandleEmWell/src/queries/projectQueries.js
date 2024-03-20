import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query getProjects {
    allProjects {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;
