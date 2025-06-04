import React, { useEffect, useState } from "react";
import { BookOpen, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/dashboard/instructor/Sidebar";
import QuickActionCard from "../components/dashboard/instructor/QuickActionCard";
import NoticeBoard from "../components/dashboard/instructor/NoticeBoard";
import LiveClassForm from "../components/dashboard/instructor/LiveClassForm";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";

export default function InstructorDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (!token) {
      navigate("/instructor/signin"); // Redirect to login if token is missing
    }
  }, []);
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
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
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
                Dashboard
              </h1>
            </div>
            <div>
              <p className="text-yellow-500  text-2xl">
                <p className="text-yellow-500 text-2xl">
                  <p className="text-yellow-500 text-2xl">
                    {`${currentDate.getDate().toString().padStart(2, "0")}-${(
                      currentDate.getMonth() + 1
                    )
                      .toString()
                      .padStart(
                        2,
                        "0"
                      )}-${currentDate.getFullYear()} ${currentDate
                      .getHours()
                      .toString()
                      .padStart(2, "0")}:${currentDate
                      .getMinutes()
                      .toString()
                      .padStart(2, "0")}:${currentDate
                      .getSeconds()
                      .toString()
                      .padStart(2, "0")}`}
                  </p>
                </p>
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
