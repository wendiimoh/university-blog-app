import { useState } from "react";
import api from "../services/api";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(
  localStorage.getItem("user")
);

    try {
      await api.post("/posts", {
        title,
        content,
        author_id: user.id,
      });

      alert("Post Created Successfully");

      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">

      <div className="card">
        <div className="card-body">

          <h2>Create Post</h2>

          <form onSubmit={handleSubmit}>

            <input
              className="form-control mb-3"
              placeholder="Post Title"
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <textarea
              className="form-control mb-3"
              rows="5"
              placeholder="Write your content..."
              onChange={(e) =>
                setContent(e.target.value)
              }
            />

            <button className="btn btn-success">
              Publish Post
            </button>

          </form>

        </div>
      </div>

    </div>
  );
}

export default CreatePost;