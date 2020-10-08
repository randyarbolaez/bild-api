function newCommentSubscribe(parent, args, ctx, info) {
  return ctx.pubsub.asyncIterator("NEW_COMMENT");
}

const newComment = {
  subscribe: newCommentSubscribe,
  resolve: (payload) => {
    return payload;
  },
};

module.exports = {
  newComment,
};
