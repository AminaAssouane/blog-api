const { Router } = require("express");
const postsController = require("../controllers/postsController");
const authenticateToken = require("../middleware/authMiddleware");

const postsRouter = Router();

postsRouter.get("/", postsController.getPosts);
postsRouter.get(
  "/unpublished",
  authenticateToken,
  postsController.getUnpublishedPosts,
);
postsRouter.get("/all", authenticateToken, postsController.getAllPosts);
postsRouter.post("/", authenticateToken, postsController.postPost);
postsRouter.put("/:postId", authenticateToken, postsController.putPost);
postsRouter.delete("/:postId", authenticateToken, postsController.deletePost);

postsRouter.get("/:postId", postsController.getPostById);

postsRouter.get("/:postId/comments", postsController.getComments);
postsRouter.post("/:postId/comments", postsController.postComment);
postsRouter.delete(
  "/:postId/comments/:commentId",
  authenticateToken,
  postsController.deleteComment,
);

module.exports = postsRouter;
