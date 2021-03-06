import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Signup = (props) => {
  let history = useNavigate(); // use navigate hook to navigate user to specific page
  
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  });
  
  const onChange = (e) => {
    // changes value of credentials state if value is changed
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // called when user clicks on submit button
    // checks if user already exists or length of password is less than 8
    e.preventDefault();
    const response = await fetch("http://localhost:3001/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    // if success is true then auth-token is saved in localStorage 
    if (json.success) {
      props.showAlert("Account created successfully!", "success");
      localStorage.setItem("token", json.authToken);
      history("/");
    } 
    // else alert is shown 
    else {
      props.showAlert("Please fill details correctly!", "danger");
    }
  };

  return (
    <div className="container">
      <h2>Sign in to use CloudBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
          Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            aria-describedby="nameHelp"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            minLength={8}
            required
        />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            minLength={8}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;
