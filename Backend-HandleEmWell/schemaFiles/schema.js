import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { clients, projects } from "../sampleData.js";

import { ClientSchemaModel } from "../models/Client.js";
import { ProjectSchemaModel } from "../models/Project.js";

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    clientId: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },

    //relations in graphQL
    client: {
      type: ClientType,
      resolve(parent, args) {
        return clients.find((element) => element.id === parent.clientId);
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    client: {
      type: ClientType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return clients.find((client) => client.id === args.id);
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return projects.find((project) => project.id === args.id);
      },
    },
    allClients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return clients;
      },
    },
    allProjects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return projects;
      },
    },
  },
});

export const schema = new GraphQLSchema({ query: RootQueryType });
