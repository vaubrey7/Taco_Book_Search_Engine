// sets up our typeDefs and resolvers and then makes the connection between models and schemas
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = { typeDefs, resolvers };