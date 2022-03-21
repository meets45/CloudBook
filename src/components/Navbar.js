import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  let location = useLocation();
  let history = useNavigate();

  const handleLogout = () => {
    // If user clicks on logout then auth-token is removed from the storage and user is redirected to login page
    localStorage.removeItem("token");
    props.showAlert("Logged out successfully!", "success");
    history("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            CloudBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <form
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              // if auth-token is not present in user's storage the login and sign up button is shown
              <form>
                <Link
                  className="btn btn-primary mx-1 my-1"
                  role="button"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-1 my-1"
                  role="button"
                  to="/signup"
                >
                  SignUp
                </Link>
              </form>
            ) : (
              // else user is shown the home page and profile button
              <form className="d-flex align-items-right">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                   className={`nav-link ${
                    location.pathname === "/profile" ? "active" : ""
                  }`}
                  role="button"
                  to="/profile"
                >
                  Profile
                </Link>
                </li>
                </ul>
                <button
                  className="btn btn-primary mx-1"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </form>
            )}
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
