const { prisma } = require('./generated/prisma-client') // This is how your schema definitions gets into this file for use
const { GraphQLServer } = require('graphql-yoga');
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Subscription = require('./resolvers/Subscription')
const Vote = require('./resolvers/Vote')
const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
}

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  }, // Schema defs gets attached to the resolvers here
})

server.start(() => console.log(`Server is running on http://localhost:4000`))