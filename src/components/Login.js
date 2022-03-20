import React, {useState} from "react";
import {useNavigate} from "react-router-dom"
const Login = (props) => {
    let history = useNavigate();
    const [credentials, setCredentials] = useState({"email":"", "password": ""});
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };
      
    const handleSubmit = async (e) =>{
e.preventDefault();
const response = await fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
    },
    body: JSON.stringify({email: credentials.email, password: credentials.password})
  });
  const json = await response.json();
  
  if(json.success){
      props.showAlert("Logged in Successfully", "success");
      localStorage.setItem("token", json.authToken);
      history("/");
  }
  else{
    props.showAlert("Please fill details correctly!", "danger");
  }
}
    return (
    <div>
        <h2>Login to continue</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            value={credentials.email}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value = {credentials.password}
            onChange = {onChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
