import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = new FormData(e.currentTarget);

  //   const email = data.get("email");
  //   const password = data.get("password");
  //   axios
  //     .post(`${process.env.BACKEND_URL}/login`, {
  //       email: email,
  //       password: password,
  //     })
  //     .then(function (response) {
  //       if (
  //         response.data == `Password Salah` ||
  //         response.data == "Email Tidak Valid"
  //       ) {
  //         document.getElementById("alertobj").style.backgroundColor = "#790252"
  //       } else{
  //         localStorage.setItem('user', response.data.username)
  //         localStorage.setItem('id', response.data.id)
  //         localStorage.setItem('email', response.data.email)
  //         localStorage.setItem('token', response.data.token)
  //         navigate('/')
  //       }
  //     })
  //     .catch(function(error){
  //       document.getElementById("alertobj").style.backgroundColor = "#790252"
  //       console.log(error);
  //     });
  // };

  // const [email, SetEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const response = await axios.post("/api/login", {
  //     email,
  //     password,
  //   });

  //   if (response.status === 200) {
  //     localStorage.setItem("user", response.data.username);
  //     localStorage.setItem("id", response.data.id);
  //     localStorage.setItem("email", response.data.email);
  //     localStorage.setItem("token", response.data.token);
  //     navigate("/");
  //   } else {

  //   }
  // };
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', credentials); // Replace with your API endpoint
      // Handle successful login (e.g., set user token in localStorage)
      console.log(response.data);
      navigate('/');
    } catch (error) {
      // Handle login error (e.g., show error message)
      console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover"
      style={{
        backgroundImage: "url('src/images/tni-au-apel.jpg')",
      }}
    >
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-l text-center font-semibold">
          SISTEM INFORMASI ARSIP TNI AU
        </h1>
        <hr className="mb-8" />
        <h2 className="text-2xl mb-4">Login</h2>
        {/* <div className="container col-md-4">
          <div class="alert mt-5" id="alertobj">
            <strong>Login Failed!</strong> Wrong Credentials.
          </div>
        </div> */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Your Email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Your Password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-lg mb-4"
          >
            Log In
          </button>
          <br />
          <a className="font-medium text-xs" href="/register">Don't have an account? Register</a>
        </form>
      </div>
    </div>
  );
};

export default Login;
