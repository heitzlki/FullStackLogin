const {
  ApolloServer
} = require('apollo-server');
const mongoose = require('mongoose');

const {
  PORT,
  DATABASE
} = require('./config/env.js')

const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')

//Port server runs


//MongoDB connection
mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
  console.log('Connected to Database!');
});

//Apollo Server
const server = new ApolloServer({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true
  },
  typeDefs,
  resolvers,
  playground: true,
  context: (ctx) => ctx,
});

//Run Server
server.listen(PORT).then(() => {
  console.log(`🚀  Server ready at http://localhost:` + PORT);
});