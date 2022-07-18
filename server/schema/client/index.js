const { getAllClients, getClientById } = require('./query');
const { addClient, deleteClient } = require('./mutation');

module.exports = { getAllClients, getClientById, addClient, deleteClient };
