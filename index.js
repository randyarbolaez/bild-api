const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const createServer = require("./server");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

require("dotenv").config();

const server = createServer();

server.express.use(cookieParser());

server.express.use((req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }

  next();
});

server.express.use(async (req, res, next) => {
  if (!req.userId) return next();

  const user = await prisma.user.findOne(
    { where: { id: req.userId } },
    "{id, email}"
  );

  req.user = user;
  next();
});

const PORT = process.env.PORT || 4000;

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  () => console.log(`Server is running on http://localhost:${PORT}`)
);
