const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const {
  ensureAuthenticated,
  uploadMiddleware,
} = require("../middleware/auth");

router.post(
  "/create",
  ensureAuthenticated,
  uploadMiddleware.single("media"),
  postController.createPost
);
router.get("/", postController.getPosts);
router.post("/:id/like", ensureAuthenticated, postController.likePost);
router.post("/:id/comment", ensureAuthenticated, postController.addComment);

module.exports = router;
