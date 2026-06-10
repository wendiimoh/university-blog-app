import Navbar from "../components/Navbar";

function Profile() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="card shadow-sm">
          <div className="card-body">

            <div className="text-center mb-4">

              <img
                src="https://ui-avatars.com/api/?name=Wendy"
                alt="Profile"
                className="rounded-circle"
              />

              <h2 className="mt-3">
                {user?.fullname}
              </h2>

            </div>

            <hr />

            <p>
              <strong>Email:</strong>{" "}
              {user?.email}
            </p>

            <p>
              <strong>Role:</strong>{" "}
              Student Blogger
            </p>

          </div>
        </div>

      </div>
    </>
  );
}

export default Profile;