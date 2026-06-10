import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.replace("/");
  };

  const toggleDarkMode = () => {
    const isDark =
      document.body.classList.contains(
        "dark-mode"
      );

    if (isDark) {
      document.body.classList.remove(
        "dark-mode"
      );

      localStorage.setItem(
        "theme",
        "light"
      );
    } else {
      document.body.classList.add(
        "dark-mode"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );
    }
  };

  return (
    <nav className="navbar navbar-dark bg-dark shadow">
      <div className="container d-flex justify-content-between">

        <Link
          className="navbar-brand fw-bold"
          to="/dashboard"
        >
          University Blog
        </Link>

        <div className="d-flex align-items-center gap-3">

          <Link
            className="text-white text-decoration-none"
            to="/dashboard"
          >
            Dashboard
          </Link>

          <Link
            className="text-white text-decoration-none"
            to="/create-post"
          >
            Create Post
          </Link>

          <Link
            className="text-white text-decoration-none"
            to="/my-posts"
          >
            My Posts
          </Link>

          <button
            className="btn btn-outline-warning"
            onClick={toggleDarkMode}
          >
            🌙
          </button>

          <div className="position-relative">

            <button
              className="btn btn-outline-light"
              onClick={() =>
                setShowMenu(!showMenu)
              }
            >
              {user?.fullname} ▼
            </button>

            {showMenu && (
              <div
                className="bg-white shadow rounded p-2 position-absolute"
                style={{
                  right: 0,
                  top: "45px",
                  minWidth: "220px",
                  zIndex: 999,
                }}
              >
                <Link
                  className="dropdown-item"
                  to="/profile"
                  onClick={() =>
                    setShowMenu(false)
                  }
                >
                  👤 Profile
                </Link>

                <hr />

                <button
                  className="btn btn-danger w-100"
                  onClick={logout}
                >
                  Logout
                </button>

              </div>
            )}

          </div>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;