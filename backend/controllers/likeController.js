const db = require("../config/db");

const toggleLike = (req, res) => {
  const { user_id, post_id } = req.body;

  db.query(
    "SELECT * FROM likes WHERE user_id=? AND post_id=?",
    [user_id, post_id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length > 0) {
        db.query(
          "DELETE FROM likes WHERE user_id=? AND post_id=?",
          [user_id, post_id],
          (err) => {
            if (err) return res.status(500).json(err);

            res.json({
              message: "Like removed",
            });
          }
        );
      } else {
        db.query(
          "INSERT INTO likes(user_id, post_id) VALUES(?,?)",
          [user_id, post_id],
          (err) => {
            if (err) return res.status(500).json(err);

            res.json({
              message: "Post liked",
            });
          }
        );
      }
    }
  );
};

const getLikes = (req, res) => {
  const { postId } = req.params;

  db.query(
    "SELECT COUNT(*) AS likes FROM likes WHERE post_id=?",
    [postId],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json(result[0]);
    }
  );
};

module.exports = {
  toggleLike,
  getLikes,
};