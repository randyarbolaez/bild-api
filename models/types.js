const { objectType } = require("@nexus/schema");

const Profile = objectType({
  name: "Profile",
  definition(t) {
    t.model.id();
    t.model.bio();
    t.model.profilePicture();
    t.model.userId();
    t.model.user();
  },
});

const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.password();
    t.model.posts({
      pagination: false,
    });
    t.model.comments({
      pagination: false,
    });
    t.model.followers({
      pagination: false,
    });
    // t.model.following({
    //   pagination: false,
    // });
    t.model.random();
    t.model.profile();
  },
});

const Post = objectType({
  name: "Post",
  definition(t) {
    t.model.id();
    t.model.caption();
    t.model.picture();
    t.model.createdAt();
    t.model.comments({
      pagination: false,
    });
    t.model.user();
  },
});

const Comment = objectType({
  name: "Comment",
  definition(t) {
    t.model.id();
    t.model.content();
    t.model.post();
    t.model.user();
    t.model.createdAt();
  },
});

module.exports = {
  Profile,
  User,
  Post,
  Comment,
};
