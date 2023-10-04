import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

function Aplikasi() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}
            <div className="text-center mt-7 font-black text-2xl">
              {" "}
              Aplikasi{" "}
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 items-center px-20 md:grid-cols-2 lg:grid-cols-3">
              {/* Soar */}
              <div class="relative mt-6 flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div class="p-6">
                  <img src="src\icons\soarLogo.svg" alt="" />
                  <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    Security Orchestration Automation and Response
                  </h5>
                  <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased"></p>
                </div>
                <div class="p-6 pt-0 flex justify-between items-center">
                  <span
                    class="font-medium text-blue-gray-900 hover:text-indigo-500"
                    href="#"
                  >
                    http://10.12.239.188
                  </span>
                  <a
                    onClick={() => {
                      navigator.clipboard.writeText("http://10.12.239.188");
                      alert("Copied to clipboard. Please paste in Browser.");
                    }}
                    class="bg-indigo-100 hover:bg-indigo-200 text-blue-900 py-2 px-4 rounded inline-flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    Copy
                  </a>
                </div>
              </div>

              {/* Siem */}
              <div class="relative mt-6 flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div class="p-6">
                  <img src="src\icons\siemLogo.svg" alt="" />
                  <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    Security Information and Event Management{" "}
                  </h5>
                  <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased"></p>
                </div>
                <div class="p-6 pt-0 flex justify-between items-center">
                  <span
                    class="font-medium text-blue-gray-900 hover:text-indigo-500"
                    href="#"
                  >
                    http://10.12.35.136:5601
                  </span>
                  <a
                    onClick={() => {
                      navigator.clipboard.writeText("http://10.12.35.136:5601");
                      alert("Copied to clipboard. Please paste in Browser.");
                    }}
                    class="bg-indigo-100 hover:bg-indigo-200 text-blue-900 py-2 px-4 rounded inline-flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    Copy
                  </a>
                </div>
              </div>

              {/* NSM */}
              <div class="relative mt-6 flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div class="p-6">
                  <img src="src\icons\nsmLogo.svg" alt="" />
                  <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased pt-10">
                    Network Security Manager{" "}
                  </h5>
                  <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased"></p>
                </div>
                <div class="p-6 pt-0 flex justify-between items-center">
                  <span
                    class="font-medium text-blue-gray-900 hover:text-indigo-500"
                    href="#"
                  >
                    https://10.10.12.5
                  </span>
                  <a
                    onClick={() => {
                      navigator.clipboard.writeText("http://10.10.12.5");
                      alert("Copied to clipboard. Please paste in Browser.");
                    }}
                    class="bg-indigo-100 hover:bg-indigo-200 text-blue-900 py-2 px-4 rounded inline-flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    Copy
                  </a>
                </div>
              </div>

              {/* EDM */}
              <div class="relative mt-6 flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div class="p-6">
                  <img src="src\icons\edmLogo.svg" alt="" />
                  <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased pt-10">
                    Executive Dashboard and Monitoring{" "}
                  </h5>
                  <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased"></p>
                </div>
                <div class="p-6 pt-0 flex justify-between items-center">
                  <span
                    class="font-medium text-blue-gray-900 hover:text-indigo-500"
                    href="#"
                  >
                    http://10.12.100.101
                  </span>
                  <a
                    onClick={() => {
                      navigator.clipboard.writeText("http://10.12.100.101");
                      alert("Copied to clipboard. Please paste in Browser.");
                    }}
                    class="bg-indigo-100 hover:bg-indigo-200 text-blue-900 py-2 px-4 rounded inline-flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    Copy
                  </a>
                </div>
              </div>

              {/* Malware Analyzer */}
              <div class="relative mt-6 flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div class="p-6">
                  <img src="src\icons\maLogo.png" alt="" />
                  <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased pt-10">
                    Malware Analyzer{" "}
                  </h5>
                  <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased"></p>
                </div>
                <div class="p-6 pt-0 flex justify-between items-center">
                  <span
                    class="font-medium text-blue-gray-900 hover:text-indigo-500"
                    href="#"
                  >
                    http://10.12.60.74
                  </span>
                  <a
                    onClick={() => {
                      navigator.clipboard.writeText("http://10.12.60.74");
                      alert("Copied to clipboard. Please paste in Browser.");
                    }}
                    class="bg-indigo-100 hover:bg-indigo-200 text-blue-900 py-2 px-4 rounded inline-flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    Copy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* <Banner /> */}
      </div>
    </div>
  );
}

export default Aplikasi;
