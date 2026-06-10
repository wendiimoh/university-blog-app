const express = require("express");

const router = express.Router();

const {
  toggleLike,
  getLikes,
} = require("../controllers/likeController");

router.post("/", toggleLike);

router.get("/:postId", getLikes);

module.exports = router;