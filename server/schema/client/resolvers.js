const { clients } = require('../../data');

const clientResolver = (parent, args) => {
  return clients.find((client) => client.id === args.id);
};

const clientsResolver = () => {
  return clients;
};

const clientRelatedResolver = (parent, args) => {
  return clients.find((client) => client.id === parent.id);
};

module.exports = { clientResolver, clientsResolver, clientRelatedResolver };
