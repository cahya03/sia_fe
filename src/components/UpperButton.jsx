import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const UpperButton = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className="sm:flex sm:justify-between sm:items-center mb-8">
      {/* Right: Actions */}
      <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
        {/* Tampil button */}
        <Link to="/arsip/tampil">
          <button
            className={`btn bg-indigo-500 hover:bg-indigo-600 text-white ${
              pathname === "/arsip/tampil" || pathname.includes("arsip/tampil")
                ? "bg-blue-800"
                : ""
            }`}
          >
            <svg
              className="w-6 h-6 fill-current opacity-50 shrink-0"
              viewBox="0 0 24 24"
            >
              <path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z" />
            </svg>
            <span className="hidden xs:block ml-2">Tampil</span>
          </button>
        </Link>

        {/* Unggah button */}
        <Link to="/arsip/unggah">
          <button
            className={`btn bg-indigo-500 hover:bg-indigo-600 text-white ${
              pathname === "/arsip/unggah" || pathname.includes("unggah")
                ? "bg-blue-800"
                : ""
            }`}
          >
            <svg
              className="w-6 h-6 fill-current opacity-50 shrink-0"
              viewBox="0 0 24 24"
            >
              <path d="M16 16h-3v5h-2v-5h-3l4-4 4 4zm3.479-5.908c-.212-3.951-3.473-7.092-7.479-7.092s-7.267 3.141-7.479 7.092c-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h3.5v-2h-3.5c-1.93 0-3.5-1.57-3.5-3.5 0-2.797 2.479-3.833 4.433-3.72-.167-4.218 2.208-6.78 5.567-6.78 3.453 0 5.891 2.797 5.567 6.78 1.745-.046 4.433.751 4.433 3.72 0 1.93-1.57 3.5-3.5 3.5h-3.5v2h3.5c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408z" />
            </svg>
            <span className="hidden xs:block ml-2">Unggah</span>
          </button>
        </Link>
        {/* Unduh button */}
        <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
          <svg
            className="w-6 h-6 fill-current opacity-50 shrink-0"
            viewBox="0 0 24 24"
          >
            <path d="M8 20h3v-5h2v5h3l-4 4-4-4zm11.479-12.908c-.212-3.951-3.473-7.092-7.479-7.092s-7.267 3.141-7.479 7.092c-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h3.5v-2h-3.5c-1.93 0-3.5-1.57-3.5-3.5 0-2.797 2.479-3.833 4.433-3.72-.167-4.218 2.208-6.78 5.567-6.78 3.453 0 5.891 2.797 5.567 6.78 1.745-.046 4.433.751 4.433 3.72 0 1.93-1.57 3.5-3.5 3.5h-3.5v2h3.5c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408z" />
          </svg>
          <span className="hidden xs:block ml-2">Unduh</span>
        </button>
        {/* Add view button*/}
        <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
          <svg
            className="w-4 h-4 fill-current opacity-50 shrink-0"
            viewBox="0 0 16 16"
          >
            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
          </svg>
          <span className="hidden xs:block ml-2">Add view</span>
        </button>
      </div>
    </div>
  );
};
export default UpperButton;
