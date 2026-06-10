const db = require("../config/db");

const createComment = (req, res) => {
  const { comment, user_id, post_id } = req.body;

  const sql =
    "INSERT INTO comments(comment, user_id, post_id) VALUES(?,?,?)";

  db.query(
    sql,
    [comment, user_id, post_id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Comment Added Successfully"
      });
    }
  );
};

const getComments = (req, res) => {
  const { postId } = req.params;

  const sql = `
    SELECT
      comments.*,
      users.fullname
    FROM comments
    JOIN users
      ON comments.user_id = users.id
    WHERE comments.post_id = ?
    ORDER BY comments.created_at DESC
  `;

  db.query(sql, [postId], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

module.exports = {
  createComment,
  getComments
};