import React, { useEffect, useState } from "react";
import QuickActionCardAdmin from "../components/dashboard/instructor/QuickActionCardAdmin";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/dashboard/admin/Sidebar";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import {
  User2Icon,
  BookCheck,
  MessageCircle,
  CrossIcon,
  PencilIcon,
} from "lucide-react";
export default function AdminDash() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (!token) {
      navigate("/pages/admin/admin-login"); // Redirect to login if token is missing
    }
  }, []);
  const [student, setStudent] = useState(0);
  const [instructor, setInstructor] = useState(0);
  const [pendingcourse, setPendingCourse] = useState(0);
  const [error, setError] = useState(null);
  const [rejectedCourse, setRejectedCourse] = useState(0);
  const [approvedCourse, setApprovedCourse] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const response = await fetch(
          `http://13.204.77.147:8000/api/displayuserreviewcount/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch details");
        }

        const result = await response.json();

        if (result.review) {
          setReviewCount(result.review); //
        } else {
          throw new Error("No data found");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReviewDetails();
  }, []);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await fetch(
          `http://13.204.77.147:8000/api/displayusercount/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch details");
        }

        const result = await response.json();

        if (result.result) {
          setStudent(result.result.student); //
          setInstructor(result.result.instructor);
        } else {
          throw new Error("No data found");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStudentDetails();
  }, []);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(
          `http://13.204.77.147:8000/api/displaycount/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch details");
        }

        const result = await response.json();

        if (result.result) {
          setPendingCourse(result.result.pending_count); //
          setApprovedCourse(result.result.approved_count);
          setRejectedCourse(result.result.rejected_count);
        } else {
          throw new Error("No data found");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCourseDetails();
  }, []);

  const quickActions = [
    {
      icon: User2Icon,
      title: "Total Registered Students",
      result: student,
      color: "orange",
    },
    {
      icon: User2Icon,
      title: "Total Registered Instructors",
      result: instructor,
      color: "green",
    },
    {
      icon: BookCheck,
      title: "Total Approved Course",
      result: approvedCourse,
      color: "blue",
    },
    {
      icon: CrossIcon,
      title: "Total Rejected Courses",
      result: rejectedCourse,
      color: "red",
    },
    {
      icon: PencilIcon,
      title: "Total Pending Courses",
      result: pendingcourse,
      color: "emerald",
    },
    {
      icon: MessageCircle,
      title: "Total Reviews",
      result: reviewCount,

      color: "blue",
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
                Admin Dashboard
              </h1>
              <div>
                <p className="text-yellow-500  text-2xl">
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
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {quickActions.map((action, index) => (
                <QuickActionCardAdmin
                  key={index}
                  result={action.result}
                  {...action}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"></div>
          </div>
        </main>
      </div>
    </div>
  );
}
