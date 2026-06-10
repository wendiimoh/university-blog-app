import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});
  const [newComment, setNewComment] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await api.get("/posts");

    setPosts(response.data);

    response.data.forEach((post) => {
      fetchComments(post.id);
      fetchLikes(post.id);
    });
  };

  const fetchComments = async (postId) => {
    const response =
      await api.get(`/comments/${postId}`);

    setComments((prev) => ({
      ...prev,
      [postId]: response.data,
    }));
  };

  const fetchLikes = async (postId) => {
    const response =
      await api.get(`/likes/${postId}`);

    setLikes((prev) => ({
      ...prev,
      [postId]: response.data.likes,
    }));
  };

const handleLike = async (postId) => {
  try {
    await api.post("/likes", {
      user_id: user.id,
      post_id: postId,
    });

    fetchLikes(postId);

  } catch (error) {
    console.error(error);
  }
};
  const submitComment = async (postId) => {
    await api.post("/comments", {
      comment: newComment[postId],
      user_id: user.id,
      post_id: postId,
    });

    setNewComment({
      ...newComment,
      [postId]: "",
    });

    fetchComments(postId);
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this post?"
      )
    )
      return;

    await api.delete(`/posts/${id}`);

    fetchPosts();
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      post.content
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h2>
              Welcome back,
              {" "}
              {user?.fullname}
              {" "}
              👋
            </h2>

            <p>
              Create, edit, comment
              and like posts.
            </p>
          </div>
        </div>

        <input
          className="form-control mb-4"
          placeholder="🔍 Search posts..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="card shadow-sm mb-4"
          >
            <div className="card-body">

              <h3>{post.title}</h3>

              <p>{post.content}</p>

              <small className="text-muted">
                By {post.fullname}
              </small>

              <br />

              <small className="text-muted">
                🕒{" "}
                {new Date(
                  post.created_at
                ).toLocaleString()}
              </small>

              <div className="mt-3">

                <button
                  className="btn btn-outline-danger btn-sm me-2"
                  onClick={() =>
                    handleLike(post.id)
                  }
                >
                  ❤️ {likes[post.id] || 0}
                </button>

                {user?.id ===
                  post.author_id && (
                  <>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() =>
                        navigate(
                          `/edit-post/${post.id}`
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleDelete(
                          post.id
                        )
                      }
                    >
                      Delete
                    </button>
                  </>
                )}

              </div>

              <hr />

              <h5>Comments</h5>

              {comments[post.id]?.map(
                (comment) => (
                  <div
                    key={comment.id}
                    className="border rounded p-2 mb-2"
                  >
                    <strong>
                      {comment.fullname}
                    </strong>

                    <div>
                      {comment.comment}
                    </div>
                  </div>
                )
              )}

              <input
                className="form-control mt-3"
                placeholder="Write comment..."
                value={
                  newComment[post.id] ||
                  ""
                }
                onChange={(e) =>
                  setNewComment({
                    ...newComment,
                    [post.id]:
                      e.target.value,
                  })
                }
              />

              <button
                className="btn btn-primary mt-2"
                onClick={() =>
                  submitComment(post.id)
                }
              >
                Add Comment
              </button>

            </div>
          </div>
        ))}

      </div>
    </>
  );
}

export default Dashboard;