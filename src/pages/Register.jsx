import React from "react";

const Register = () => {
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
        <h2 className="text-2xl mb-4">Register</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Your Email"
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
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-lg mb-2"
          >
            Register
          </button>
          <br />
          <a className="font-medium text-xs" href="/login">Already have an account? Login</a>
        </form>
      </div>
    </div>
  );
};

export default Register;
