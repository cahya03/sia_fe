import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import satsiber from '../images/logo-satsiber.png'


function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <img src={satsiber} alt="" />
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Pages
              </span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname === "/" || pathname.includes("dashboard")
                    ? "bg-slate-900"
                    : ""
                }`}
              >
                <NavLink
                  end
                  to="/"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname === "/" || pathname.includes("dashboard")
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current ${
                          pathname === "/" || pathname.includes("dashboard")
                            ? "text-indigo-500"
                            : "text-slate-400"
                        }`}
                        d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                      />
                      <path
                        className={`fill-current ${
                          pathname === "/" || pathname.includes("dashboard")
                            ? "text-indigo-600"
                            : "text-slate-600"
                        }`}
                        d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                      />
                      <path
                        className={`fill-current ${
                          pathname === "/" || pathname.includes("dashboard")
                            ? "text-indigo-200"
                            : "text-slate-400"
                        }`}
                        d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Dashboard
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Explore */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname === "/explore" || pathname.includes("explore")
                    ? "bg-slate-900"
                    : ""
                }`}
              >
                <NavLink
                  end
                  to="/explore"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname === "/explore" || pathname.includes("explore")
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current ${
                          pathname === "/explore" || pathname.includes("explore")
                            ? "text-indigo-500"
                            : "text-slate-400"
                        }`}
                        d="M10.538 7.674c-.292.129-.519.291-.714.477l-.646-.161c.259-.293.593-.552 1.015-.746.432-.194.886-.292 1.351-.332l-.098.51c-.313.041-.616.121-.908.252zm1.458.444c1.025 0 1.847.616 1.847 1.378 0 .77-.821 1.385-1.847 1.385-1.015 0-1.847-.616-1.847-1.385 0-.762.832-1.378 1.847-1.378zm-.826 1.379c0 .35.369.626.826.626.467 0 .837-.277.837-.626 0-.343-.37-.62-.837-.62-.457 0-.826.277-.826.62zm-1.313-2.674c.562-.251 1.178-.389 1.793-.421l.098-.495c-.767.017-1.534.179-2.236.495-.702.315-1.242.753-1.62 1.247l.638.169c.313-.396.766-.736 1.327-.995zm9.643 12.177c.276 0 .5-.224.5-.5s-.224-.5-.5-.5-.5.224-.5.5.224.5.5.5zm-.5-17h-14l-5 14v6h24v-6l-5-14zm-7.004 3c3.315 0 6.006 2.017 6.006 4.497 0 2.487-2.69 4.503-6.006 4.503s-5.994-2.017-5.994-4.503c0-2.48 2.679-4.497 5.994-4.497zm10.004 15h-13v-1.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v1.5h-1v-1.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v1.5h-1v-1.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v1.5h-2v-3h20v3z"
                      />
                      <path
                        className={`fill-current ${
                          pathname === "/explore" || pathname.includes("explore")
                            ? "text-indigo-600"
                            : "text-slate-600"
                        }`}
                        d="M10.538 7.674c-.292.129-.519.291-.714.477l-.646-.161c.259-.293.593-.552 1.015-.746.432-.194.886-.292 1.351-.332l-.098.51c-.313.041-.616.121-.908.252zm1.458.444c1.025 0 1.847.616 1.847 1.378 0 .77-.821 1.385-1.847 1.385-1.015 0-1.847-.616-1.847-1.385 0-.762.832-1.378 1.847-1.378zm-.826 1.379c0 .35.369.626.826.626.467 0 .837-.277.837-.626 0-.343-.37-.62-.837-.62-.457 0-.826.277-.826.62zm-1.313-2.674c.562-.251 1.178-.389 1.793-.421l.098-.495c-.767.017-1.534.179-2.236.495-.702.315-1.242.753-1.62 1.247l.638.169c.313-.396.766-.736 1.327-.995zm9.643 12.177c.276 0 .5-.224.5-.5s-.224-.5-.5-.5-.5.224-.5.5.224.5.5.5zm-.5-17h-14l-5 14v6h24v-6l-5-14zm-7.004 3c3.315 0 6.006 2.017 6.006 4.497 0 2.487-2.69 4.503-6.006 4.503s-5.994-2.017-5.994-4.503c0-2.48 2.679-4.497 5.994-4.497zm10.004 15h-13v-1.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v1.5h-1v-1.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v1.5h-1v-1.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v1.5h-2v-3h20v3z"
                      />
                      <path
                        className={`fill-current ${
                          pathname === "/explore" || pathname.includes("explore")
                            ? "text-indigo-200"
                            : "text-slate-400"
                        }`}
                        d=" 1z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Explore
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Aplikasi */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname === "/aplikasi" || pathname.includes("aplikasi")
                    ? "bg-slate-900"
                    : ""
                }`}
              >
                <NavLink
                  end
                  to="/aplikasi"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname === "/aplikasi" || pathname.includes("aplikasi")
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current ${
                          pathname === "/aplikasi" || pathname.includes("aplikasi")
                            ? "text-indigo-500"
                            : "text-slate-400"
                        }`}
                        d="M22 6v16h-20v-16h20zm2-6h-24v24h24v-24zm-12.879 14l-4.707-4.707-1.414 1.414 3.293 3.293-3.293 3.293 1.414 1.414 4.707-4.707zm7.879 3h-7v2h7v-2z"
                      />
                      <path
                        className={`fill-current ${
                          pathname === "/aplikasi" || pathname.includes("aplikasi")
                            ? "text-indigo-600"
                            : "text-slate-600"
                        }`}
                        d="M22 6v16h-20v-16h20zm2-6h-24v24h24v-24zm-12.879 14l-4.707-4.707-1.414 1.414 3.293 3.293-3.293 3.293 1.414 1.414 4.707-4.707zm7.879 3h-7v2h7v-2z"
                      />
                      <path
                        className={`fill-current ${
                          pathname === "/aplikasi" || pathname.includes("aplikasi")
                            ? "text-indigo-200"
                            : "text-slate-400"
                        }`}
                        d=" 1z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Aplikasi
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
