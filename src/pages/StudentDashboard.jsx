import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Award } from "lucide-react";
import Sidebar from "../components/dashboard/student/Sidebar";
import StatCard from "../components/dashboard/student/StatCard";

import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import LiveClassDisplayCard from "../components/dashboard/student/CourseCard";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (!token) {
      navigate("/student/signin"); // Redirect to login if token is missing
    }
  }, []);

  const stats = [
    { icon: Award, value: "29", label: "COURSES TO DO" },
    { icon: Award, value: "6", label: "OVERDUE COURSES" },
    { icon: Award, value: "1", label: "COMPLETED COURSES" },
  ];

  const rewards = [1, 2, 3, 4, 5];

  return (
    <div className="min-h-screen bg-background-primary flex flex-col">
      <DashboardNavbar />
      <div className="flex flex-col md:flex-row pt-16">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 p-4 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8 mt-8">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Rewards Section */}
          <div className="bg-background-secondary p-4 md:p-6 rounded-lg mb-6 md:mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-lg md:text-xl">REWARDS</h3>
              <button className="text-violet-400 hover:text-violet-300 text-sm md:text-base">
                VIEW ALL
              </button>
            </div>
            <div className="flex space-x-3 md:space-x-4 overflow-x-auto pb-2">
              {rewards.map((_, index) => (
                <div
                  key={index}
                  className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full bg-violet-700 flex items-center justify-center"
                >
                  <Award className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
              ))}
            </div>
          </div>

          {/* Courses Section */}
          <div className="bg-background-secondary p-4 md:p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h3 className="text-white text-lg md:text-xl">
                SCHEDULED LIVE CLASSESS{" "}
                <span className="text-3xl text-red-500">
                  (** All Classes will be held between 10 AM to 4PM)
                </span>
              </h3>
            </div>
            <div className="space-y-3 md:space-y-4">
              <LiveClassDisplayCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
