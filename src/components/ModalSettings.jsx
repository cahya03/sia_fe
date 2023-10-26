import { useNavigate } from "react-router-dom";
import { useJwt } from "../context/JwtContext";
import React, { useState } from "react";
import axios from "axios";

const SettingsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const { decodedToken } = useJwt();
  //navigate untuk pindah halaman
  const navigate = useNavigate();

  //confirm OTP state
  const [otpState, setOtpState] = useState(true);

  // credentials yang menampung formdata
  const [credentials, setCredentials] = useState({
    username: decodedToken.username,
    email: decodedToken.email,
    new_email: decodedToken.email,
    password: "",
    confirmPassword: "",
    phoneNumber: decodedToken.phone_number,
    role: decodedToken.role,
    otp: ""
  });

  // handle untuk mengisi credentials
  const handleDelete = async (e) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/settingsdelete`,
        [
          credentials.email,
          credentials.otp,
        ],
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );
      alert("Delete User Successful");
      navigate("/login");
    } catch (error) {
      alert(error);
    }
  };

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
            `${import.meta.env.VITE_BACKEND_URL}/otp`,
            [
              credentials.email
            ],
            {
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
              },
            }
          );
          alert("Check OTP in your email's inbox / spam");
          setOtpState(false);
        } catch (error) {
          alert(error);
          console.log(error);
        }
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
                "Accept": "application/json",
              },
            }
          );
          alert("Change User Successful");
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
    <>
      <div
        class="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      class="h-6 w-5 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 0c-5.083 0-8.465 4.949-3.733 13.678 1.596 2.945-1.725 3.641-5.09 4.418-3.073.709-3.187 2.235-3.177 4.904l.004 1h23.99l.004-.969c.012-2.688-.093-4.223-3.177-4.935-3.438-.794-6.639-1.49-5.09-4.418 4.719-8.912 1.251-13.678-3.731-13.678m0 1c1.89 0 3.39.764 4.225 2.15 1.354 2.251.866 5.824-1.377 10.06-.577 1.092-.673 2.078-.283 2.932.937 2.049 4.758 2.632 6.032 2.928 2.303.534 2.412 1.313 2.401 3.93h-21.998c-.01-2.615.09-3.396 2.401-3.93 1.157-.266 5.138-.919 6.049-2.94.387-.858.284-1.843-.304-2.929-2.231-4.115-2.744-7.764-1.405-10.012.84-1.412 2.353-2.189 4.259-2.189"
                      />
                    </svg>
                  </div>
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      class="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Account Details
                    </h3>
                    <div className="relative py-6 flex-auto">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label className="block text-black text-sm font-bold mb-2">
                            Username
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg text-black"
                            placeholder="Fill if change Username"
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
                            className="w-full px-3 py-2 border rounded-lg text-black"
                            placeholder="Fill if change Email"
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
                            className="w-full px-3 py-2 border rounded-lg text-black"
                            placeholder="Fill if change Phone Number"
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
                            placeholder="Skip if not changing password"
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
                            placeholder="Skip if not changing password"
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
                          <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg"
                            name="role"
                            value={credentials.role}
                            onChange={handleChange}
                            disabled="true"
                          />
                        </div>
                        {otpState &&
                          <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-lg mb-2"
                          >
                            Send OTP to e-mail
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
                              className=" bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-lg mb-2"
                            >
                              Change User Data
                            </button>
                            <button
                              type="button"
                              class="  justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto m-5"
                              onClick={handleDelete}>
                              Delete Account
                            </button>

                          </div>
                        }
                        <br />

                      </form>
                    </div>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        By using this account, you are agreed to Satsiber Dispamsanau terms and conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsModal;
