import React, { useEffect } from "react";
import { BookOpen, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/dashboard/admin/Sidebar";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";

export default function AdminDash() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (!token) {
      navigate("/pages/admin/admin-login"); // Redirect to login if token is missing
    }
  }, []);

  return (
    <div className="min-h-screen bg-background-primary flex flex-col">
      <DashboardNavbar />
      <div className="flex flex-col md:flex-row pt-16">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 mt-8">
              <h1 className="text-xl md:text-2xl font-bold text-white mb-2">
                Admin Dashboard
              </h1>
              <p className="text-violet-200 text-sm md:text-base">
                Admin Control Panel
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"></div>
          </div>
        </main>
      </div>
    </div>
  );
}
