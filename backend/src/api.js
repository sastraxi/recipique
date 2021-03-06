const { ApolloServer, gql } = require('apollo-server');
const recipes = require('./testdata/recipes');
const Symbol = require('./util/symbol');

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
    ordinal: Int
  }

  type Recipe {
    id: Int!
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
    recipeById(id: Int!): Recipe
  }
`;

const stepMapper = ({ local, optional, ...step }) => ({
  ...step,
  optional: optional || false,
  local: local && local.map(({ key, value }) => ({
    key,
    value: Symbol.parse(value).format(),
  })),
});

const recipeMapper = ({ steps, ...recipe }) => ({
  ...recipe,
  steps: steps.map(stepMapper),
});

const resolvers = {
  Query: {
    recipes: () => recipes.map(recipeMapper),
    recipeById: (ctx, { id }) => {
      const recipe = recipes.find(r => r.id === id);
      return recipe && recipeMapper(recipe);
    },
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers, cors: true });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
