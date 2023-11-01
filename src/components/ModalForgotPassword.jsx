import { useJwt } from "../context/JwtContext";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Transition from "../utils/Transition";

const ModalForgotPassword = () => {
  //* UseStates
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const [otpState, setOtpState] = useState(true);
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    new_email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "",
    otp: "",
  });
  //* Untuk Password
  const [passwordError, setPasswordErr] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  //* Handle untuk mengisi Credentials
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
    console.log(credentials);
  };

  //* Handle untuk Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.email === "") {
      alert("Fill Email!");
    } else if (credentials.otp === "") {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/otp`,
          [credentials.email],
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        alert("Check OTP in your email's inbox / spam");
        setOtpState(false);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    } else if (passwordError) {
      e.target.password.setCustomValidity(passwordError);
    } else if (confirmPasswordError) {
      e.target.confirmPassword.setCustomValidity(confirmPasswordError);
    } else {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/settingschange`,
          [
            credentials.username,
            credentials.email,
            credentials.new_email,
            credentials.password,
            credentials.phoneNumber,
            credentials.otp,
          ],
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        alert("Change User Successful");
        setDropdownOpen(!dropdownOpen)
      } catch (error) {
        alert(error);
      }
    }
  };

  //* Handle untuk Validasi Passowrd
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

  //! The Return
  return (
    <div className="relative inline-flex">
      <a
        ref={trigger}
        className={`font-medium text-xs ${dropdownOpen && "bg-slate-200"}`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
        aria-modal="true"
      >
        Forgot password? Click here
      </a>

      <Transition
        className={`fixed inset-0 z-10 w-screen overflow-y-auto`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          // onFocus={() => setDropdownOpen(true)}
          // onBlur={() => setDropdownOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto overflow-x-">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-center">
                      <h3
                        className="text-xl font-semibold leading-6 text-gray-900 pb-10"
                        id="modal-title"
                      >
                        Forgot Password
                      </h3>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label className="block text-black text-sm font-bold mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            className="w-full px-3 py-2 border rounded-lg text-black"
                            placeholder="Your Email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-4">
                          {otpState && (
                            <button
                              type="button"
                              onClick={handleSubmit}
                              className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-lg mb-2"
                            >
                              Send OTP to e-mail
                            </button>
                          )}
                          {!otpState && (
                            <div>
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
                                <p className="text-red-600 font-bold">
                                  {passwordError}
                                </p>
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
                                <p className="text-red-600 font-bold">
                                  {confirmPasswordError}
                                </p>
                              </div>
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
                                type="button"
                                onClick={handleSubmit}
                                className=" bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-lg mb-2"
                              >
                                Submit
                              </button>
                            </div>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};
export default ModalForgotPassword;
