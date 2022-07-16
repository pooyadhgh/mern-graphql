const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { getProjectById, getAllProjects } = require('./project/queries');
const { getClientById, getAllClients } = require('./client/queries');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    project: getProjectById,
    projects: getAllProjects,
    client: getClientById,
    clients: getAllClients,
  },
});

const graphQlSchema = new GraphQLSchema({
  query: RootQuery,
});

module.exports = graphQlSchema;
