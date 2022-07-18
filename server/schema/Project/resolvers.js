const Project = require('./model');

const getProjectByIdResolver = (parent, args) => {
  return Project.findById(args.id);
};

const getAllProjectsResolver = () => {
  return Project.find();
};

const addProjectResolver = (parent, args) => {
  const project = new Project({
    name: args.name,
    description: args.description,
    status: args.status,
    clientId: args.clientId,
  });

  return project.save();
};

const deleteProjectResolver = (parent, args) => {
  return Project.findByIdAndRemove(args.id);
};

const updateProjectResolver = (parent, args) => {
  return Project.findByIdAndUpdate(
    args.id,
    {
      $set: {
        name: args.name,
        description: args.description,
        status: args.status,
      },
    },
    { new: true }
  );
};

module.exports = {
  getProjectByIdResolver,
  getAllProjectsResolver,
  addProjectResolver,
  deleteProjectResolver,
  updateProjectResolver,
};
