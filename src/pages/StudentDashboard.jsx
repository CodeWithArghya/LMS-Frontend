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
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (!token) {
      navigate("/student/signin"); // Redirect to login if token is missing
    }
  }, []);
  const [approvedCourse, setApprovedCourse] = useState(0);
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(
          `http://15.207.247.182:8000/api/displaycount/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch details");
        }

        const result = await response.json();

        if (result.result) {
          setApprovedCourse(result.result.approved_count);
        } else {
          throw new Error("No data found");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCourseDetails();
  }, []);

  const [assessment, setAssessment] = useState(0);
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(
          `http://15.207.247.182:8000/api/displayassessmentcount/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch details");
        }

        const result = await response.json();

        if (result) {
          setAssessment(result.assessment);
        } else {
          throw new Error("No data found");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCourseDetails();
  }, []);

  const stats = [
    { icon: Award, value: approvedCourse, label: "TOTAL COURSES" },
    { icon: Award, value: assessment, label: "TOTAL ASSESSMENTS" },
    { icon: Award, value: "", label: "Comming Soon.." },
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
