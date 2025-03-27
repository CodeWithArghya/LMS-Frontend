import {
  Home,
  BookOpen,
  CheckSquare,
  Bell,
  PenTool,
  LogOut,
  Menu,
  X,
  PencilIcon,
  GamepadIcon,
  KeyIcon,
  MessageCircle,
  PenIcon,
  User2Icon,
  UserCircle,
  MoveRight,
  BookCheck,
  CrossIcon,
  ContactIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Added missing import
import Cookies from "js-cookie";
import { FcAcceptDatabase } from "react-icons/fc";

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [firstName, setFirstName] = useState("Instructor");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const authData = localStorage.getItem("auth");

      if (!authData) {
        window.location.href = "/pages/admin/admin-login";
        return;
      }

      try {
        const { access_token } = JSON.parse(authData); // Extract access_token

        if (!access_token) {
          window.location.href = "/pages/admin/admin-login";
          return;
        }

        const response = await axios.get(
          "http://127.0.0.1:8000/auth/admin/profile/",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        setFirstName(response.data.first_name || "Administration"); // Set first name
        setLastName(response.data.last_name || "");
      } catch (err) {
        console.error("Failed to fetch user details:", err);
        setFirstName("Administration"); // Fallback if request fails
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    Cookies.remove("auth"); // Remove auth from cookies if used
    window.location.href = "/"; // Redirect to home
  };

  const menuItems = [
    {
      icon: Home,
      label: "Dashboard",
      path: "/pages/admin/admin-dashboard",
    },
    {
      icon: PenIcon,
      label: "Manage Courses ",
      path: "/pages/admin/manage-courses",
    },
    {
      icon: BookCheck,
      label: "Approved Courses List ",
      path: "/pages/admin/approved-course-list",
    },
    {
      icon: CrossIcon,
      label: "Rejected Courses List ",
      path: "/pages/admin/rejected-course-list",
    },

    {
      icon: User2Icon,
      label: "View Students",
      path: "/pages/admin/view-students",
    },
    {
      icon: UserCircle,
      label: "View Instructors",
      path: "/pages/admin/view-instructors",
    },
    {
      icon: ContactIcon,
      label: "View Contact/Query",
      path: "/pages/admin/view-query-messages",
    },

    {
      icon: MessageCircle,
      label: "AI Review/Feedback",
      path: "/pages/admin/view-aibased-review-results",
    },
  ];

  return (
    <>
      <div
        className={`
        fixed md:static inset-y-0 left-0 z-30 w-64 bg-background-secondary transform transition-transform duration-300 ease-in-out mt-16
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
      >
        <button
          className="md:hidden absolute -right-12 top-2 bg-violet-700 p-2 rounded-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>

        <div className="p-4">
          <div className="flex items-center space-x-4 mb-8">
            <img
              src="https://i.pravatar.cc/150"
              alt="Profile"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="text-white font-semibold">Welcome</h2>
              <p className="text-violet-300 text-sm">
                {firstName} <span> </span> {lastName}
              </p>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 text-violet-200 hover:bg-violet-900 transition-colors rounded-lg"
              >
                <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-sm md:text-base">{item.label}</span>
              </button>
            ))}

            <button
              className="w-full flex items-center space-x-3 px-4 py-3 text-violet-200 hover:bg-violet-900 transition-colors rounded-lg mt-8"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">Logout</span>
            </button>
          </nav>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden mt-16"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
