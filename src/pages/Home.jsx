import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import {
  FaLaptopCode,
  FaPaintBrush,
  FaRobot,
  FaChartLine,
  FaUserShield,
  FaUsers,
  FaChalkboardTeacher,
  FaBookOpen,
} from "react-icons/fa";

export default function Home() {
  const features = [
    {
      id: 1,
      icon: (
        <FaLaptopCode className="text-pink-500 text-5xl md:text-6xl animate-bounce" />
      ),
      text: "Learn With Fun Assessment",
    },
    {
      id: 2,
      icon: (
        <FaPaintBrush className="text-green-500 text-5xl md:text-6xl animate-spin" />
      ),
      text: "Learn & Draw",
    },
    {
      id: 3,
      icon: (
        <FaUserShield className="text-blue-500 text-5xl md:text-6xl animate-bounce" />
      ),
      text: "Parental Monitoring",
    },
    {
      id: 4,
      icon: (
        <FaRobot className="text-purple-500 text-5xl md:text-6xl animate-spin" />
      ),
      text: "AI based Automation",
    },
    {
      id: 5,
      icon: (
        <FaChartLine className="text-yellow-500 text-5xl md:text-6xl animate-bounce" />
      ),
      text: "Latest Technology E-Learning",
    },
  ];

  const [totalCourses, setTotalCourses] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalIns, setTotalIns] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDynamicdata = async () => {
      try {
        const response = await axios.get(
          "http://13.204.77.147:8000/api/home/dynamicdisplay/"
        );
        setTotalCourses(response.data.totalcourses);
        setTotalStudents(response.data.totalstudents);
        setTotalIns(response.data.totalins);
      } catch (err) {
        setError("Failed to fetch dynamic data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDynamicdata();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-100 to-blue-100 font-baloo overflow-hidden relative">
      <motion.h1
        className="text-4xl sm:text-5xl md:text-7xl text-pink-600 font-extrabold text-center pt-16 md:pt-20 drop-shadow-lg cursor-pointer"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        whileHover={{ scale: 1.2, rotate: 10, color: "#FF69B4" }}
      >
        🎉 Learn With Fun 🎨
      </motion.h1>

      {/* Floating Images */}
      <motion.img
        src={image3}
        className="absolute top-20 left-2 sm:left-10 w-24 sm:w-32 md:w-40 rounded-xl animate-floating"
        initial={{ y: -40 }}
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        alt="Drawing"
      />
      <motion.img
        src={image2}
        className="absolute top-24 right-2 sm:right-10 w-24 sm:w-32 md:w-40 rounded-xl animate-floating"
        initial={{ y: 30 }}
        animate={{ y: [0, -40, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        alt="Computer Learning"
      />

      {/* Tagline */}
      <motion.p
        className="text-center text-xl sm:text-2xl md:text-3xl text-purple-700 font-fredoka mt-24 cursor-pointer"
        animate={{ opacity: [0, 1, 0.8, 1], scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 5 }}
        whileHover={{ scale: 1.2, color: "#FF4500" }}
      >
        🌟 Learning + Drawing + Technology = Super Fun 🌟
      </motion.p>

      {/* Features Section */}
      <div className="py-16 px-4">
        <h3 className="text-center text-3xl sm:text-4xl font-bold text-blue-500 mb-10 drop-shadow-lg animate-pulse font-fredoka cursor-pointer">
          🚀 Explore Our Features 🚀
        </h3>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl w-64 md:w-72 text-center border-4 border-yellow-300 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              whileHover={{
                scale: 1.15,
                rotate: [0, 5, -5, 0],
                boxShadow: "0px 0px 20px 5px #facc15",
              }}
            >
              {feature.icon}
              <motion.p
                className="mt-6 text-base sm:text-lg font-bold text-gray-700 font-fredoka"
                animate={{ rotate: [-5, 5, -5], scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3, delay: index }}
                whileHover={{ scale: 1.3, color: "#FF6347" }}
              >
                {feature.text}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-br from-blue-100 to-pink-100 px-4">
        <h3 className="text-center text-3xl sm:text-4xl font-bold text-purple-600 mb-10 font-fredoka">
          Our Achievements
        </h3>
        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
          <motion.div
            className="bg-white p-8 rounded-3xl shadow-xl border-4 border-blue-300 w-full md:w-72 text-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            <FaUsers className="text-4xl text-pink-500 mb-4 animate-bounce" />
            <p className="text-lg font-bold text-gray-800">Enrolled Students</p>
            <p className="text-2xl text-purple-700 font-extrabold mt-2">
              {totalStudents}
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-3xl shadow-xl border-4 border-green-300 w-full md:w-72 text-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            <FaChalkboardTeacher className="text-4xl text-green-500 mb-4 animate-bounce" />
            <p className="text-lg font-bold text-gray-800">Total Teachers</p>
            <p className="text-2xl text-purple-700 font-extrabold mt-2">
              {totalIns}
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-3xl shadow-xl border-4 border-yellow-300 w-full md:w-72 text-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            <FaBookOpen className="text-4xl text-yellow-500 mb-4 animate-bounce" />
            <p className="text-lg font-bold text-gray-800">Courses Offered</p>
            <p className="text-2xl text-purple-700 font-extrabold mt-2">
              {totalCourses}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Video Section */}
      <div className="py-20 bg-gradient-to-r from-pink-100 to-yellow-100">
        <h3 className="text-center text-3xl font-bold text-green-600 mb-10 font-baloo">
          Benefits of E-Learning for Kids
        </h3>
        <div className="flex justify-center">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/1SZle1skb84
"
            title="Kids Learning"
            className="rounded-3xl shadow-2xl border-8 border-blue-400"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
