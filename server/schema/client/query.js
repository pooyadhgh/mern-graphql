const { GraphQLList, GraphQLID } = require('graphql');
const ClientType = require('./types');
const { getClientByIdResolver, getAllClientsResolver } = require('./resolvers');

const getClientById = {
  type: ClientType,
  args: { id: { type: GraphQLID } },
  resolve: getClientByIdResolver,
};

const getAllClients = {
  type: new GraphQLList(ClientType),
  resolve: getAllClientsResolver,
};

module.exports = { getClientById, getAllClients };
