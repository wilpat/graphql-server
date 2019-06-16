const { GraphQLServer } = require('graphql-yoga');

let links = [{
	id: 'link-0',
	url: 'www.howtographql.com',
	description: 'Fullstack tutorial for GraphQL'
}];

let idCount = links.length;

getLink = (id) =>{
	return links.filter(link=>{
		return (link.id == `link-${id}`)
	})[0];
}
const resolvers = {
  Query: {
    info: () => `This is a string!!`,
    feed: () => links,
    link: (parent, args) => getLink(args.id)
  },
  Mutation: {
  	post: (parant, args) => {
  		const link = {
  			id: `link-${idCount++}`,
  			description: args.description,
  			url: args.url
  		}
  		links.push(link)
  		return link;
  	},
  	updateLink: (parent, args) =>{
  		let link = getLink(args.id);
    	let id = links.indexOf(link);
    	links[id].url = args.url;
    	links[id].description = args.description;
    	return links[id];
  	},
  	deleteLink: (parent, args) =>{
  		let link = getLink(args.id);
  		let id = links.indexOf(link);
  		links.splice(id,1);
  		return link;
  	}
  },
  Link:{
  	//Each resolver receives the data of the previous level of a graphQL query generally tagged as "parent or root"
  	id: (parent) => parent.id,
  	description: (parent) => parent.description,
  	url: (parent) => parent.url
  }
  // This link resolver can be entirely removed though as graphQL server can infer what links look like.
}

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))