const {
  makeSchema,
  objectType,
  intArg,
  stringArg,
  arg,
} = require("@nexus/schema");

module.exports = {
  Query: objectType({
    name: "Query",
    definition(t) {
      t.crud.post();

      t.field("getOneUser", {
        type: "User",
        args: { userId: stringArg() },
        resolve: async (_, { userId }, ctx) => {
          return ctx.prisma.user.findOne({
            where: { id: userId },
          });
        },
      });

      t.field("user", {
        type: "User",
        nullable: true,
        resolve: async (_, args, ctx) => {
          if (!ctx.request.userId) {
            return null;
          }

          let user = await ctx.prisma.user.findOne({
            where: { id: ctx.request.userId },
          });

          return user;
        },
      });

      t.list.field("posts", {
        type: "Post",
        resolve: (_, args, ctx, info) => {
          return ctx.prisma.post.findMany({
            orderBy: [
              {
                createdAt: "desc",
              },
            ],
          });
        },
      });
    },
  }),
};
