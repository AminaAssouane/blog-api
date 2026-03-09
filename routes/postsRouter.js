const { Router } = require("express");
const postsController = require("../controllers/postsController");

const postsRouter = Router();

postsRouter.get("/", postsController.getPosts);
postsRouter.post("/", postsController.postPost);
postsRouter.put("/:postId", postsController.putPost);
postsRouter.delete("/:postId", postsController.deletePost);

postsRouter.get("/:postId", postsController.getPostById);
module.exports = postsRouter;
