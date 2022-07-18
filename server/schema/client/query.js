const { GraphQLList, GraphQLID } = require('graphql');
const ClientType = require('./types');
const { clientResolver, clientsResolver } = require('./resolvers');

const getClientById = {
  type: ClientType,
  args: { id: { type: GraphQLID } },
  resolve: clientResolver,
};

const getAllClients = {
  type: new GraphQLList(ClientType),
  resolve: clientsResolver,
};

module.exports = { getClientById, getAllClients };
