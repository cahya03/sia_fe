import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useJwt } from './../context/JwtContext';
import JWT from "jsonwebtoken"


const Login = () => {
 
  const { setJwt, setDecodedToken } = useJwt();
  const navigate = useNavigate();
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
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const { jwt } = response.data;
      JWT.verify(jwt, import.meta.env.VITE_JWT_SECRET, { algorithms: ['HS256'] }, (err, decoded) => {
        if (err) {
          // Token verification failed
          console.error('Token verification failed:', err);
        } else {
          // Token is valid
          console.log('Token is valid');
          setJwt({ jwt: jwt });
          setDecodedToken(decoded);
          navigate("/");
        }
      });
    } catch (error) {
      alert("Failed to login");
    }
  };

  
  async function checkPermission () {
    localStorage.setItem('permission',false)
    axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/permissions`
    ).then(()=>{
      localStorage.setItem('permission',true)
    })
    setTimeout(()=> {
      localStorage.getItem('permission') == 'true' ? localStorage.setItem('permission',false) : window.location.replace(`${import.meta.env.VITE_BACKEND_URL}/permissions`)
    },1000)
  }

  let render = 0
  useEffect( () => {
    if (render == 0 ) {
      checkPermission()
    }
    render += 1;
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover"
      style={{
        backgroundImage: "url('src/images/tni-au-apel.svg')",
      }}
    >
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-l text-center font-semibold">
          SATSIBER DISPAMSANAU ARCHIVE SYSTEM
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
          <a className="font-medium text-xs" href="/register">
            Don't have an account? Register
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
