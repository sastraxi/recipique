const { ApolloServer, gql } = require('apollo-server');
const recipes = require('./testdata/recipes');

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  type KeyValue {
    key: String!
    value: String!
  }

  type Step {
    text: String!
    local: [KeyValue!]
    optional: Boolean 
  }

  type Recipe {
    name: String!
    author: String!
    url: String
    servesFrom: Int
    servesTo: Int!
    provides: [String!]!
    steps: [Step!]!
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    recipes: [Recipe!]
  }
`;

const resolvers = {
  Query: {
    recipes: () => recipes,
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
