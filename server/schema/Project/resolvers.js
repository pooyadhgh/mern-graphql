const { projects } = require('../../data');

const projectResolver = (parent, args) => {
  return projects.find((project) => project.id === args.id);
};

const projectsResolver = () => {
  return projects;
};

module.exports = { projectResolver, projectsResolver };
