const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');
const ClientType = require('../client/types');
const { getClientRelatedResolver } = require('../client/resolvers');

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: getClientRelatedResolver,
    },
  }),
});

module.exports = ProjectType;
