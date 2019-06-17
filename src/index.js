const { prisma } = require('./generated/prisma-client') // This is how your schema definitions gets into this file for use
const { GraphQLServer } = require('graphql-yoga');

const resolvers = {
  Query: {
    info: () => `This is a string!!`,
    feed: (parent, args, context, info) => {
      return context.prisma.links();
    },
    // TODO : Read single link record
  },

  Mutation: {

  	post: (parant, args, context) => {
  		return context.prisma.createLink({
        url: args.url,
        description: args.description
      });
  	},

    // TODO: Update

  	deleteLink: (parent, args, context) =>{
  		return context.prisma.deleteLink({
        id: args.id,
      });
  	}
  },
  /*Link:{
  	//Each resolver receives the data of the previous level of a graphQL query generally tagged as "parent or root"
  	id: (parent) => parent.id,
  	description: (parent) => parent.description,
  	url: (parent) => parent.url
  }*/
  // This link resolver can be entirely removed though as graphQL server can infer what links look like.
}

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
  context: { prisma } // Schema defs gets attached to the resolvers here
})

server.start(() => console.log(`Server is running on http://localhost:4000`))