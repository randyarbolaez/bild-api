const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { GraphQLServer } = require("graphql-yoga");
const { makeSchema } = require("@nexus/schema");
const { nexusSchemaPrisma } = require("nexus-plugin-prisma/schema");
const { Query } = require("./resolvers/Query");
const { Mutation } = require("./resolvers/Mutation");
const { Profile, User, Post, Comment } = require("./models/types");

module.exports = () => {
  return new GraphQLServer({
    schema: makeSchema({
      types: [Query, Mutation, Post, User, Profile, Comment],
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
      };
    },
  });
};
