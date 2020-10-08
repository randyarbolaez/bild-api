const { verify } = require("jsonwebtoken");

require("dotenv").config();

const getUserId = (context) => {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const verifiedToken = verify(token, process.env.APP_SECRET);
    return verifiedToken && verifiedToken.userId;
  }
};

module.exports = { getUserId };
