import { useState } from "react";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

     localStorage.setItem(
  "token",
  response.data.token
);

localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);

      window.location.href = "/dashboard";
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="auth-container">

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-md-5">

            <div className="card auth-card shadow-lg">

              <div className="card-body p-4">

                <h1 className="text-center mb-4">
                  University Blog
                </h1>

                <form onSubmit={handleSubmit}>

                  <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                  />

                  <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                  />

                  <button
                    className="btn btn-primary w-100"
                  >
                    Login
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;