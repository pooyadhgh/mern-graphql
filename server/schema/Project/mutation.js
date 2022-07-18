const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLEnumType,
  GraphQLID,
} = require('graphql');
const ProjectType = require('./types');
const {
  addProjectResolver,
  deleteProjectResolver,
  updateProjectResolver,
} = require('./resolvers');

const addProject = {
  type: ProjectType,
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
    status: {
      type: new GraphQLEnumType({
        name: 'ProjectStatus',
        values: {
          new: { value: 'Not Started' },
          progress: { value: 'In Progress' },
          completed: { value: 'Completed' },
        },
      }),
      defaultValue: 'Not Started',
    },
    clientId: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve: addProjectResolver,
};

const deleteProject = {
  type: ProjectType,
  args: {
    id: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: deleteProjectResolver,
};

const updateProject = {
  type: ProjectType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: {
      type: new GraphQLEnumType({
        name: 'ProjectStatusUpdate',
        values: {
          new: { value: 'Not Started' },
          progress: { value: 'In Progress' },
          completed: { value: 'Completed' },
        },
      }),
    },
  },
  resolve: updateProjectResolver,
};

module.exports = { addProject, deleteProject, updateProject };
