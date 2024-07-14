import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
function Register() {
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setIsLoading(true)
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          username,
          email,
          password,
        }
      );
      // console.log(res);
      navigate("/login");
    } catch (error) {
      setErr(error.response.data.message);
    }finally{
      setIsLoading(false);
    }
  };
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled = {isLoading}>Register</button>
          {err && <span>{err}</span>}
          <Link  to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
