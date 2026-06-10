import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await api.get(
        `/posts/${id}`
      );

      setTitle(response.data.title);
      setContent(response.data.content);

    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/posts/${id}`, {
        title,
        content,
      });

      alert("Post Updated");

      navigate("/dashboard");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="card shadow">

          <div className="card-body">

            <h2>Edit Post</h2>

            <form onSubmit={handleSubmit}>

              <input
                className="form-control mb-3"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />

              <textarea
                className="form-control mb-3"
                rows="6"
                value={content}
                onChange={(e) =>
                  setContent(e.target.value)
                }
              />

              <button
                className="btn btn-success"
              >
                Save Changes
              </button>

            </form>

          </div>

        </div>

      </div>
    </>
  );
}

export default EditPost;