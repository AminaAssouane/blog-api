const { Router } = require("express");
const postsController = require("../controllers/postsController");

const postsRouter = Router();

postsRouter.get("/", postsController.getPosts);
postsRouter.post("/", postsController.postPost);

module.exports = postsRouter;
