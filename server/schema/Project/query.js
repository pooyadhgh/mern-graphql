const { GraphQLList, GraphQLID } = require('graphql');
const ProjectType = require('./types');
const {
  getAllProjectsResolver,
  getProjectByIdResolver,
} = require('./resolvers');

const getProjectById = {
  type: ProjectType,
  args: { id: { type: GraphQLID } },
  resolve: getProjectByIdResolver,
};

const getAllProjects = {
  type: new GraphQLList(ProjectType),
  resolve: getAllProjectsResolver,
};

module.exports = { getProjectById, getAllProjects };
