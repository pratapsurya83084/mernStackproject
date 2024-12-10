import React, { useContext } from 'react';
import AppContext  from '../../context/AppContext';  // Assuming you have the AppContext imported
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  console.log("This is auth user:", user);

  const handleLogout = () => {
    // Clear user data or token from localStorage, if needed
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };

  
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-sm profile-card">
            <div className="row g-4 p-4 align-items-center">
              {/* Profile Image */}
              <div className="col-12 col-md-4 text-center">
                <img
                  src={user?.profilePicture || "https://via.placeholder.com/150"}
                  alt="User Profile"
                  className="rounded-circle img-fluid border border-primary"
                />
              </div>

              {/* Profile Info */}
              <div className="col-12 col-md-8 text-center text-md-start">
                <h3 className="profile-header">{user?.name || "N/A"}</h3>
                <p className="profile-subtext">{user?.email || "N/A"}</p>
                <p className="profile-subtext">login status : {user?.login || "N/A"}</p>

                <div className="d-flex justify-content-center justify-content-md-start mt-3">
                  <button className="btn btn-primary me-3">Edit Profile</button>
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
