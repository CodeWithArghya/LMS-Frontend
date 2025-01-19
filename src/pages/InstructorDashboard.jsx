import React, { useEffect } from "react";
import { BookOpen, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/dashboard/instructor/Sidebar";
import QuickActionCard from "../components/dashboard/instructor/QuickActionCard";
import NoticeBoard from "../components/dashboard/instructor/NoticeBoard";
import LiveClassForm from "../components/dashboard/instructor/LiveClassForm";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";

export default function InstructorDashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: BookOpen,
      title: "Create Course",
      description: "Create and publish a new course",
      color: "orange",
      onClick: () => navigate("/instructor/create-courses"),
    },
    {
      icon: Video,
      title: "Live Class",
      description: "Schedule a live class in your class calendar",
      color: "green",
      onClick: () => window.open("https://meet.google.com/landing", "_blank"),
    },
  ];

  return (
    <div className="min-h-screen bg-background-primary flex flex-col">
      <DashboardNavbar />
      <div className="flex flex-col md:flex-row pt-16">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 mt-8">
              <h1 className="text-xl md:text-2xl font-bold text-white mb-2">
                Dashboard
              </h1>
              <p className="text-violet-200 text-sm md:text-base">
                Control Panel
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {quickActions.map((action, index) => (
                <QuickActionCard key={index} {...action} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-background-secondary rounded-lg p-4 lg:p-6">
                <LiveClassForm />
              </div>
              <div className="bg-background-secondary rounded-lg p-4 lg:p-6">
                <NoticeBoard />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
