const Client = require('./model');
const Project = require('../project/model');

const getClientByIdResolver = (parent, args) => {
  return Client.findById(args.id);
};

const getAllClientsResolver = () => {
  return Client.find();
};

const getClientRelatedResolver = (parent, args) => {
  return Client.findById(parent.clientId);
};

const addClientResolver = (parent, args) => {
  const client = new Client({
    name: args.name,
    email: args.email,
    phone: args.phone,
  });

  return client.save();
};

const deleteClientResolver = (parent, args) => {
  // Remove related projects
  Project.find({ clientId: args.id }).then((projects) => {
    projects.forEach((project) => project.remove());
  });

  return Client.findByIdAndRemove(args.id);
};

module.exports = {
  getClientByIdResolver,
  getAllClientsResolver,
  getClientRelatedResolver,
  addClientResolver,
  deleteClientResolver,
};
