function postedBy(parent, args, context) {
  return context.prisma.link({ id: parent.id }).postedBy()
}

module.exports = {
  postedBy,
}

/*
We’re first fetching the Link using the prisma client instance and then invoke postedBy on it. 
Notice that the resolver needs to be called postedBy because it resolves the postedBy field 
from the Link type in schema.graphql.
*/