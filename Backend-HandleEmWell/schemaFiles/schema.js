import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

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
        return ClientSchemaModel.findById(parent.clientId);
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
        return ClientSchemaModel.findById(args.id);
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return ProjectSchemaModel.findById(args.id);
      },
    },
    allClients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return ClientSchemaModel.find();
      },
    },
    allProjects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return ProjectSchemaModel.find();
      },
    },
  },
});

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) }, // Making sure that null name is not added
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const resClient = ClientSchemaModel.create({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return resClient;
      },
    },
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const resDeleteClient = ClientSchemaModel.findByIdAndDelete(args.id);
        const deleteAllClientProjects = ProjectSchemaModel.deleteMany({
          clientId: args.id,
        });
        return resDeleteClient;
      },
    },

    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Yet To Start" },
              ongoing: { value: "On-Going" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Yet To Start",
        },
        description: { type: GraphQLNonNull(GraphQLString) },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const resProject = ProjectSchemaModel.create({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });
        return resProject;
      },
    },
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return ProjectSchemaModel.findByIdAndDelete(args.id);
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationType,
});
