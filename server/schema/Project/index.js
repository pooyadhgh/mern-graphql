const { getProjectById, getAllProjects } = require('./query');
const { addProject, deleteProject, updateProject } = require('./mutation');

module.exports = {
  getProjectById,
  getAllProjects,
  addProject,
  deleteProject,
  updateProject,
};
