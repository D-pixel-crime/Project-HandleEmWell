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

export const GET_SINGLE_PROJECT = gql`
  query getSingleProject($id: ID!) {
    project(id: $id) {
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
