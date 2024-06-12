const express = require("express");

const { v4: uuidv4 } = require("uuid");
const comments = require("../data/comments.js");
//other data
const posts = require("../data/posts.js");
const users = require("../data/users.js");
const { post } = require("./comments.js");

const router = express.Router();

//get comments/readComment
router.get("/", (req, res) => {
  res.json(comments);
});
//
router.post("/", (req, res, next) => {
  const { userId, postId, body } = req.body;
  console.log(`userid: ${userId},postId: ${postId} and ${body}`);

  if (!userId || !postId || !body) {
    next();
  }
  const newComments = { id: comments.length + 1, userId, postId, body };
  comments.push(newComments);
  res.status(201).json(newComments);
});
//updated
router.patch("/:id", (req, res) => {
  const commentId = req.params.id;

  const { userId, postId, body } = req.body;
  const commentE = comments.findIndex((comment) => comment.id == commentId);
  if (commentE == -1) {
    res.statusCode(404).send({ error: "invalid id" });
  }
  //update the
  let commentEdited = { ...comments[commentE], userId, postId, body };
  comments[commentE] = commentEdited;
  res.json(editedComment);
});
///delete
router.delete("/:id", (req, res) => {
  let comId = req.params.id;
  const comment = comments.find((c, i) => {
    if (c.id == comId) {
      comments.splice(i, 1);
      return true;
    }
  });
  if (comment) return res.json(comment);
  else {
    return res.statusCode(404).send({ error: "message" });
  }
});
///

module.exports = router;
