const db = require("../config/db");

// CREATE POST
const createPost = (req, res) => {
  const { title, content, author_id } = req.body;

  const sql =
    "INSERT INTO posts(title, content, author_id) VALUES(?,?,?)";

  db.query(
    sql,
    [title, content, author_id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Post Created Successfully",
      });
    }
  );
};

// GET ALL POSTS
const getPosts = (req, res) => {
  const sql = `
    SELECT
      posts.*,
      users.fullname
    FROM posts
    JOIN users
      ON posts.author_id = users.id
    ORDER BY posts.created_at DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

// GET SINGLE POST
const getPostById = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM posts WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result[0]);
    }
  );
};

// UPDATE POST
const updatePost = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  db.query(
    "UPDATE posts SET title=?, content=? WHERE id=?",
    [title, content, id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Post updated successfully",
      });
    }
  );
};

// DELETE POST
const deletePost = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM posts WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Post deleted successfully",
      });
    }
  );
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};