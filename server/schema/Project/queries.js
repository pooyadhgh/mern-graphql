const { GraphQLList, GraphQLID } = require('graphql');
const ProjectType = require('./types');
const { projectsResolver, projectResolver } = require('./resolvers');

const getProjectById = {
  type: ProjectType,
  args: { id: { type: GraphQLID } },
  resolve: projectResolver,
};

const getAllProjects = {
  type: new GraphQLList(ProjectType),
  resolve: projectsResolver,
};

module.exports = { getProjectById, getAllProjects };
