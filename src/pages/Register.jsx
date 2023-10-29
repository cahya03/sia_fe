import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { stringify } from "querystring";


const Register = () => {
  const [listState, setListState] = useState([])

  async function setList() {
    const arr = []
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/listrole`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );
    let x = response.data.map((e)=> {return  <option value={e}>{e}</option>})
    setListState(x)
  }

  let render = 0;
  useEffect(() => {
    if (render === 0) {
      setList()
    }
    render += 1; // 
  }, []);
  //navigate untuk pindah halaman
  const navigate = useNavigate();

  //confirm OTP state
  const [otpState, setOtpState] = useState(true);

  // credentials yang menampung formdata
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "",
    otp: ""
  });

  // handle untuk mengisi credentials
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  // handle untuk submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      credentials.username === "" ||
      credentials.email === "" ||
      credentials.phoneNumber === "" ||
      credentials.password === "" ||
      credentials.confirmPassword === "" ||
      credentials.role === ""
    ) {
      alert("Fill All Form!");
    } else if (passwordError) {
      e.target.password.setCustomValidity(passwordError);
    } else if (confirmPasswordError) {
      e.target.confirmPassword.setCustomValidity(confirmPasswordError);
    } else {
      if (credentials.otp === "") {
        try {

          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/otpform`,
            [
              credentials.username,
              credentials.email,
              credentials.phoneNumber,
              credentials.role,
            ],
            {
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",

              },

            }
          );
          alert("Your form are being reviewed, Contact HR for Requested OTP");
          setOtpState(false);
        } catch (error) {
          alert(error);
          console.log(error);
        }
      } else {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/register`,
            [
              credentials.username,
              credentials.email,
              credentials.password,
              credentials.phoneNumber,
              credentials.role,
              credentials.otp
            ],
            {
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
              },
            }
          );
          alert("Register Successful");
          navigate("/login");
        } catch (error) {
          alert(error);
        }
      }
    }

  };

  //state untuk password
  const [passwordError, setPasswordErr] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // handle untuk validasi password
  const handleValidation = (e) => {
    e.target.setCustomValidity("");

    const passwordInputValue = e.target.value.trim();
    const passwordInputFieldName = e.target.name;

    //for password
    if (passwordInputFieldName === "password") {
      const uppercaseRegExp = /(?=.*?[A-Z])/;
      const lowercaseRegExp = /(?=.*?[a-z])/;
      const digitsRegExp = /(?=.*?[0-9])/;
      const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
      const minLengthRegExp = /.{8,}/;

      const passwordLength = passwordInputValue.length;
      const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
      const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
      const digitsPassword = digitsRegExp.test(passwordInputValue);
      const specialCharPassword = specialCharRegExp.test(passwordInputValue);
      const minLengthPassword = minLengthRegExp.test(passwordInputValue);

      let errMsg = "";
      if (passwordLength === 0) {
        errMsg = "Password is empty";
      } else if (!uppercasePassword) {
        errMsg = "At least one Uppercase";
      } else if (!lowercasePassword) {
        errMsg = "At least one Lowercase";
      } else if (!digitsPassword) {
        errMsg = "At least one digit";
      } else if (!specialCharPassword) {
        errMsg = "At least one Special Characters";
      } else if (!minLengthPassword) {
        errMsg = "At least minumum 8 characters";
      } else {
        errMsg = "";
      }
      setPasswordErr(errMsg);
    }

    //for confirm password
    if (
      passwordInputFieldName === "confirmPassword" ||
      (passwordInputFieldName === "password" &&
        credentials.confirmPassword.length > 0)
    ) {
      if (credentials.confirmPassword !== credentials.password) {
        setConfirmPasswordError("Confirm password is not matched");
      } else {
        setConfirmPasswordError("");
      }
    }


  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover"
      i
      style={{
        backgroundImage: "url('src/images/tni-au-apel.svg')",
      }}
    >
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-l text-center font-semibold text-black">
          SATSIBER DISPAMSANAU ARCHIVE SYSTEM
        </h1>
        <hr className="mb-8" />
        <h2 className="text-2xl mb-4 text-black">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Your Name"
              name="username"
              value={credentials.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">
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
            <label className="block text-black text-sm font-bold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Your Phone Number"
              pattern="[0-9]{4}[0-9]{4}[0-9]{4}"
              name="phoneNumber"
              value={credentials.phoneNumber}
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
              onKeyUp={handleValidation}
            />
            <p className="text-red-600 font-bold">{passwordError}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Your Password"
              name="confirmPassword"
              value={credentials.confirmPassword}
              onChange={handleChange}
              onKeyUp={handleValidation}
            />
            <p className="text-red-600 font-bold">{confirmPasswordError}</p>
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">
              Role
            </label>
            <select
              type="role"
              className="w-full px-3 py-2 border rounded-lg"
              name="role"
              value={credentials.role}
              onChange={handleChange}
            >
              <option value=""></option>
              {listState}
            </select>
          </div>
          {otpState &&
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-lg mb-2"
            >
              Request OTP
            </button>}
          {!otpState &&
            <div>
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2">
                  OTP
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Requested OTP"
                  name="otp"
                  value={credentials.otp}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-lg mb-2"
              >
                Register
              </button>
            </div>
          }
          <br />
          <a className="font-medium text-xs" href="/login">
            Already have an account? Login
          </a>
        </form>
      </div>
    </div>
  );
};

export default Register;
