const Client = require('./model');

const clientResolver = (parent, args) => {
  return Client.findById(args.id);
};

const clientsResolver = () => {
  return Client.find();
};

const clientRelatedResolver = (parent, args) => {
  return Client.findById(parent.clientId); // check again!!
};

module.exports = { clientResolver, clientsResolver, clientRelatedResolver };
