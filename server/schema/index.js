const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { getProjectById, getAllProjects } = require('./project/queries');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    project: getProjectById,
    projects: getAllProjects,
  },
});

const graphQlSchema = new GraphQLSchema({
  query: RootQuery,
});

module.exports = graphQlSchema;
