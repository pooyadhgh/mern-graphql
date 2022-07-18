const { GraphQLNonNull, GraphQLString } = require('graphql');
const ClientType = require('./types');
const { addClientResolver, deleteClientResolver } = require('./resolvers');

const addClient = {
  type: ClientType,
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    phone: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: addClientResolver,
};

const deleteClient = {
  type: ClientType,
  args: {
    id: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: deleteClientResolver,
};

module.exports = { addClient, deleteClient };
