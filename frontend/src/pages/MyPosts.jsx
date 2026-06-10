import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function MyPosts() {
  const [posts, setPosts] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await api.get("/posts");

    const myPosts = response.data.filter(
      (post) => post.author_id === user.id
    );

    setPosts(myPosts);
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2>My Posts</h2>

        {posts.map((post) => (
          <div
            key={post.id}
            className="card mb-3"
          >
            <div className="card-body">

              <h4>{post.title}</h4>

              <p>{post.content}</p>

            </div>
          </div>
        ))}

      </div>
    </>
  );
}

export default MyPosts;