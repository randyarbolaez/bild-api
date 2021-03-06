const { makeSchema, objectType, stringArg } = require("@nexus/schema");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { prisma } = require("nexus-plugin-prisma");
require("dotenv").config();

module.exports = {
  Mutation: objectType({
    name: "Mutation",
    definition(t) {
      t.crud.deleteOnePost();

      t.field("signup", {
        type: "User",
        args: {
          name: stringArg(),
          email: stringArg(),
          password: stringArg(),
          bio: stringArg(),
          profilePicture: stringArg(),
        },
        resolve: async (
          _,
          { name, email, password, bio, profilePicture },
          ctx
        ) => {
          email = email.toLowerCase();
          let hash = bcrypt.hashSync(password, 10);

          const user = await ctx.prisma.user.create({
            data: {
              name,
              email,
              password: hash,
              profile: {
                create: {
                  bio,
                  profilePicture,
                },
              },
            },
          });

          const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

          ctx.response.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
            sameSite: "none",
            secure: true,
          });

          return user;
        },
      });

      t.field("signin", {
        type: "User",
        args: {
          email: stringArg(),
          password: stringArg(),
        },
        resolve: async (_, { email, password }, ctx) => {
          email = email.toLowerCase();
          let user = await ctx.prisma.user.findMany({
            where: {
              email,
            },
          });
          user = user[0];
          if (!user) {
            throw new Error(`Please check email.`);
          }

          const passwordMatch = bcrypt.compareSync(password, user.password);

          if (!passwordMatch) {
            throw new Error(`Incorrect password.`);
          }

          const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

          ctx.response.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
            sameSite: "none",
            secure: true,
          });

          return user;
        },
      });

      t.field("signout", {
        type: "User",
        resolve: (_, args, ctx) => {
          ctx.response.clearCookie("token", {
            httpOnly: true,
            path: "/",
            sameSite: "none",
            secure: true,
          });
          return { Message: "hello" };
        },
      });

      t.field("createPost", {
        type: "Post",
        args: {
          caption: stringArg(),
          picture: stringArg(),
        },
        resolve: (_, { caption, picture }, ctx) => {
          return ctx.prisma.post.create({
            data: {
              caption,
              picture,
              user: {
                connect: { id: ctx.request.userId },
              },
            },
          });
        },
      });

      t.field("createComment", {
        type: "Comment",
        args: {
          content: stringArg(),
          postId: stringArg(),
        },
        resolve: (_, { content, postId }, ctx) => {
          return ctx.prisma.comment.create({
            data: {
              content,
              post: {
                connect: { id: postId },
              },
              user: {
                connect: { id: ctx.request.userId },
              },
            },
          });
        },
      });

      t.field("deleteComment", {
        type: "Comment",
        args: {
          commentId: stringArg(),
        },
        resolve: (_, { commentId }, ctx) => {
          return ctx.prisma.comment.delete({
            where: {
              id: commentId,
            },
          });
        },
      });

      t.field("followUser", {
        type: "Profile",
        args: {
          userToFollowId: stringArg(),
          userThatFollowsId: stringArg(),
        },
        resolve: async (_, { userToFollowId, userThatFollowsId }, ctx) => {
          // console.log(
          //   { userThatFollowsId, userToFollowId },
          //   ctx,
          //   " | DSKFJHJKSDF"
          // );

          const res = ctx.prisma.profile.findOne({
            where: {
              userId: userThatFollowsId,
            },
          });

          const UserToFollowRes = await ctx.prisma.user.findOne({
            where: {
              id: userToFollowId,
            },
          });

          let expandedData = await res.userFollowing();

          console.log(expandedData, "DSFJKSDJKFHJSKD");

          // need to figure out a way to keep the user in userFollowing

          return ctx.prisma.profile.update({
            where: {
              userId: userThatFollowsId,
            },
            data: {
              userFollowing: {
                set: expandedData,
              },
            },
          });
          // return updatedUser;
          // return ctx.prisma.comment.create({
          //   data: {
          //     content,
          //     post: {
          //       connect: { id: postId },
          //     },
          //     user: {
          //       connect: { id: ctx.request.userId },
          //     },
          //   },
          // });
          return { Message: userToFollowId };
        },
      });
    },
  }),
};
