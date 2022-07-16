const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');
const ClientType = require('../client/types');
const { clientRelatedResolver } = require('../client/resolvers');

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: clientRelatedResolver,
    },
  }),
});

module.exports = ProjectType;
