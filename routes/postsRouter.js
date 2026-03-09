const { Router } = require("express");
const postsController = require("../controllers/postsController");

const postsRouter = Router();

postsRouter.get("/", postsController.getPosts);
postsRouter.post("/", postsController.postPost);
postsRouter.put("/:postId", postsController.putPost);
postsRouter.delete("/:postId", postsController.deletePost);

postsRouter.get("/:postId", postsController.getPostById);

postsRouter.get("/:postId/comments", postsController.getComments);
postsRouter.post("/:postId/comments", postsController.postComment);
postsRouter.delete(
  "/:postId/comments/commentId",
  postsController.deleteComment,
);

module.exports = postsRouter;
