const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const {
  getProjectById,
  getAllProjects,
  addProject,
  deleteProject,
  updateProject,
} = require('./project');
const {
  getClientById,
  getAllClients,
  addClient,
  deleteClient,
} = require('./client');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    project: getProjectById,
    projects: getAllProjects,
    client: getClientById,
    clients: getAllClients,
  },
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    addClient,
    deleteClient,
    addProject,
    deleteProject,
    updateProject,
  },
});

const graphQlSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = graphQlSchema;
