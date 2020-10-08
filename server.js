const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { GraphQLServer, PubSub } = require("graphql-yoga");
const { makeSchema } = require("@nexus/schema");
const { nexusSchemaPrisma } = require("nexus-plugin-prisma/schema");
const { Query } = require("./resolvers/Query");
const { Mutation } = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const { Profile, User, Post, Comment, NewComment } = require("./models/types");

const pubsub = new PubSub();

module.exports = () => {
  return new GraphQLServer({
    schema: makeSchema({
      types: [
        Query,
        Mutation,
        Subscription,
        Post,
        User,
        Profile,
        Comment,
        NewComment,
      ],
      plugins: [nexusSchemaPrisma({ experimentalCRUD: true })],
      outputs: {
        schema: __dirname + "/schema.graphql",
        typegen: __dirname + "/prisma/nexus.ts",
      },
    }),
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    context: (request) => {
      return {
        ...request,
        prisma,
        pubsub,
      };
    },
  });
};
