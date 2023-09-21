import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import DashboardAvatars from "../partials/dashboard/DashboardAvatars";
import FilterButton from "../components/DropdownFilter";
import Datepicker from "../components/Datepicker";
import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../partials/dashboard/DashboardCard03";
import DashboardCard04 from "../partials/dashboard/DashboardCard04";
import DashboardCard05 from "../partials/dashboard/DashboardCard05";
import DashboardCard06 from "../partials/dashboard/DashboardCard06";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";
import DashboardCard08 from "../partials/dashboard/DashboardCard08";
import DashboardCard09 from "../partials/dashboard/DashboardCard09";
import DashboardCard10 from "../partials/dashboard/DashboardCard10";
import DashboardCard11 from "../partials/dashboard/DashboardCard11";
import DashboardCard12 from "../partials/dashboard/DashboardCard12";
import DashboardCard13 from "../partials/dashboard/DashboardCard13";
import Banner from "../partials/Banner";
import Tabel from "../components/Tabel";

function ArsipPreview() {
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
          <div className="text-center mt-7 font-black text-2xl">
            Preview Arsip
          </div>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Cards */}
            <a href="/arsip">
              <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                <svg
                  className="w-6 h-6 fill-current opacity-50 shrink-0"
                  viewBox="0 0 24 24"
                >
                  <path d="m10.978 14.999v3.251c0 .412-.335.75-.752.75-.188 0-.375-.071-.518-.206-1.775-1.685-4.945-4.692-6.396-6.069-.2-.189-.312-.452-.312-.725 0-.274.112-.536.312-.725 1.451-1.377 4.621-4.385 6.396-6.068.143-.136.33-.207.518-.207.417 0 .752.337.752.75v3.251h9.02c.531 0 1.002.47 1.002 1v3.998c0 .53-.471 1-1.002 1zm-1.5-7.506-4.751 4.507 4.751 4.507v-3.008h10.022v-2.998h-10.022z" />
                </svg>
                <span className="hidden xs:block ml-2">Kembali</span>
              </button>
            </a>
            <br />
            <br />
            <div className="flex">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 w1/4 p-4">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <table className="min-w-full border text-left text-sm font-light dark:border-neutral-500">
                    <tr className="border-b dark:border-neutral-500">
                      <th scope="col" className="px-2 py-2">Kode Arsip</th>
                      <td>kodasdasdsadsadsae</td>
                    </tr>
                    <tr className="border-b dark:border-neutral-500">
                      <th scope="col" className="px-2 py-2">Waktu Upload</th>
                      <td>kodasdasdsadsadsae</td>
                    </tr>
                    <tr className="border-b dark:border-neutral-500">
                      <th scope="col" className="px-2 py-2">Nama File</th>
                      <td>kodasdasdsadsadsae</td>
                    </tr>
                    <tr className="border-b dark:border-neutral-500">
                      <th scope="col" className="px-2 py-2">Kategori</th>
                      <td>kodasdasdsadsadsae</td>
                    </tr>
                    <tr className="border-b dark:border-neutral-500">
                      <th scope="col" className="px-2 py-2">Jenis File</th>
                      <td>kodasdasdsadsadsae</td>
                    </tr>
                    <tr className="border-b dark:border-neutral-500">
                      <th scope="col" className="px-2 py-2">Petugas Upload</th>
                      <td>kodasdasdsadsadsae</td>
                    </tr>
                    <tr className="border-b dark:border-neutral-500">
                      <th scope="col" className="px-2 py-2">Keterangan</th>
                      <td>kodasdasdsadsadsae</td>
                    </tr>
                  </table>
                  
                </div>
              </div>
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 w">
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              {/* Line chart (Acme Plus) */}
              {/* <DashboardCard01 /> */}
              {/* Line chart (Acme Advanced) */}
              {/* <DashboardCard02 /> */}
              {/* Line chart (Acme Professional) */}
              {/* <DashboardCard03 /> */}
              {/* Bar chart (Direct vs Indirect) */}
              {/* <DashboardCard04 /> */}
              {/* Line chart (Real Time Value) */}
              {/* <DashboardCard05 /> */}
              {/* Doughnut chart (Top Countries) */}
              {/* <DashboardCard06 /> */}
              {/* Table (Top Channels) */}
              {/* <DashboardCard07 /> */}
              {/* Line chart (Sales Over Time) */}
              {/* <DashboardCard08 /> */}
              {/* Stacked bar chart (Sales VS Refunds) */}
              {/* <DashboardCard09 /> */}
              {/* Card (Customers) */}
              {/* <DashboardCard10 /> */}
              {/* Card (Reasons for Refunds) */}
              {/* <DashboardCard11 /> */}
              {/* Card (Recent Activity) */}
              {/* <DashboardCard12 /> */}
              {/* Card (Income/Expenses) */}
              {/* <DashboardCard13 /> */}
            </div>
          </div>
        </main>

        {/* <Banner /> */}
      </div>
    </div>
  );
}

export default ArsipPreview;
