const Project = require('./model');

const projectResolver = (parent, args) => {
  return Project.findById(args.id);
};

const projectsResolver = () => {
  return Project.find();
};

module.exports = { projectResolver, projectsResolver };
