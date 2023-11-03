import React, { useState, useRef, useEffect } from "react";
import { useJwt } from "./../context/JwtContext";
import Transition from "../utils/Transition";
import axios from "axios";

const ModalFileAccess = () => {
  // kumpulan usestate
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const [data, setData] = useState([]);
  const { jwt } = useJwt();

  //* Use Effects
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });
  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });
  // for always fetching data when component loaded
  useEffect(() => {
    fetchAccessList();
  }, [dropdown]);

  //! Axios Functions
  //for fetching access
  const fetchAccessList = async () => {
    try {
      //alert ('trigger')
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/getaccesslist`,
        {
          jwt: jwt.jwt
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      //alert(JSON.stringify(response.data))
      setData(response.data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  // for delete access
  const deleteAccessList = async (id_access) => {
    alert(id_access)
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/deleteaccess`,
        {
          jwt: jwt.jwt,
          id_access: id_access
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const updatedData = data.filter((access) => access.id !== id_access);
      setData(updatedData)
      fetchAccessList();
    } catch (error) {
      console.error("Error deleting access: ", error);
    }
  };

  // for enable access
  const enableAccessList = async (id_access) => {
    try {
      alert(id_access)
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/enableaccess`,
        {
          jwt: jwt.jwt,
          id_access: id_access,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const updatedData = data.filter((access) => access.id !== id_access);
      setData(updatedData);
    } catch (error) {
      console.error("Error enabling access: ", error);
    }
  };

  //* Functions for Switch on-off approvedButton on the Modal
  const ApproveSwitch = ({isChecked}) => {

    const handleCheckboxChange = async () => {
      isChecked=(!isChecked);
    };

    return (
      <div>
        <label className="flex cursor-pointer select-none items-center">
          <div className="relative">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="sr-only"
            />
            <div
              className={`box block h-8 w-14 rounded-full ${
                isChecked ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <div
              className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
                isChecked ? "translate-x-full" : ""
              }`}
            ></div>
          </div>
        </label>
      </div>
    );
  };

  //* Main functions of the Table
  function FileAccessTable() {
    return (
      <div>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-8 py-4"></th>
              <th className="px-8 py-4">File Name</th>
              <th className="px-8 py-4">Path</th>
              <th className="px-8 py-4">Owner</th>
              <th className="px-8 py-4">Requester</th>
              <th className="px-8 py-4">Approved</th>
              <th className="px-8 py-4"></th>
            </tr>
          </thead>
          <tbody>{DisplayData}</tbody>
        </table>
      </div>
    );
  }
  //*
  //* Function for mapping the body of table
  const DisplayData = data.map((item) => {
    //alert(JSON.stringify(item))
    return (
      <>
        <tr>
          <td className="bg-gray-50 px-8 py-4">
            <button
              className="bg-red-600 hover:bg-red-800 py-1 px-1 rounded"
              onClick={() => deleteAccessList(item.id_access)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-white"
              >
                <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
              </svg>
            </button>
          </td>
          <td className="bg-gray-50 px-8 py-4">{item.filename}</td>
          <td className="bg-gray-50 px-8 py-4">{item.path}</td>
          <td className="bg-gray-50 px-8 py-4">{item.owner}</td>
          <td className="bg-gray-50 px-8 py-4">{item.requester}</td>
          <td className="bg-gray-50 px-8 py-4">
            <ApproveSwitch isChecked={item.is_enable} onClick={() => {enableAccessList(item.id_access);fetchAccessList()}}/>
          </td>
          <td className="bg-gray-50 px-8 py-4">
            <button className="bg-white py-1 px-1 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-black"
              >
                <path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z" />
              </svg>
            </button>
          </td>
        </tr>
      </>
    );
  });

  //! This is the Main Return for the Modal don't mess with this!
  return (
    <div className="relative inline-flex overflow-auto">
      <button
        ref={trigger}
        className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full ${
          dropdownOpen && "bg-slate-200"
        }`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
        aria-modal="true"
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-current text-slate-500 dark:text-slate-400"
            d="M12.451 17.337l-2.451 2.663h-2v2h-2v2h-6v-5l6.865-6.949c1.08 2.424 3.095 4.336 5.586 5.286zm11.549-9.337c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-3-3c0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2 2-.896 2-2z"
          />
        </svg>
      </button>

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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity "></div>
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
                        File Access
                      </h3>
                      <div className="overflow-auto">
                        <FileAccessTable />
                      </div>
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
export default ModalFileAccess;
