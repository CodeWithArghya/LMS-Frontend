import {
  Home,
  BookOpen,
  CheckSquare,
  Bell,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/instructor/dashboard" },
    { icon: BookOpen, label: "Courses", path: "/instructor/create-courses" },
    { icon: Bell, label: "Notices", path: "/instructor/notices" },
    { icon: CheckSquare, label: "Assessment", path: "/instructor/assessment" },
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
              src="https://htmlcolorcodes.com/assets/images/colors/violet-color-solid-background-1920x1080.png"
              alt="Profile"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="text-white font-semibold">Welcome</h2>
              <p className="text-violet-300 text-sm">Instructor</p>
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
              onClick={() => {
                navigate("/");
                setIsMobileMenuOpen(false);
              }}
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
