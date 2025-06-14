import StarRating from "./StarRating";
import { motion } from "framer-motion";

export default function TestimonialCard({
  name,
  role,
  coursename,
  subject,
  outcomes,
  image,
}) {
  return (
    <motion.div
      whileHover={{ scale: 0.9, rotate: 1 }}
      whileTap={{ scale: 0.98 }}
      className="bg-gradient-to-br from-pink-200 via-yellow-100 to-blue-100 p-4 md:p-6 rounded-3xl h-[400px] flex flex-col justify-between shadow-2xl border-4 border-blue-300 transition-transform duration-300"
    >
      {/* Instructor & Course Details */}
      <div>
        <div className="flex items-center gap-4 mb-4">
          <motion.img
            src={image}
            alt={name}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-yellow-400 shadow-md"
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ duration: 0.5 }}
          />
          <div>
            <h3 className="text-pink-700 font-extrabold text-lg md:text-xl font-fredoka">
              {coursename}
            </h3>
            <p className="text-purple-500 text-sm md:text-base font-semibold">
              {role}
            </p>
          </div>
        </div>

        {/* Star Rating */}
        <div className="mb-4">
          <StarRating />
        </div>

        {/* Course Info */}
        <p className="text-gray-700 text-sm md:text-base font-medium font-baloo mb-1">
          {name}
        </p>
        <p className="text-gray-700 text-sm md:text-base font-medium font-baloo mb-1">
          {subject}
        </p>
        <p className="text-gray-700 text-sm md:text-base font-medium font-baloo mb-1 line-clamp-2">
          {outcomes}
        </p>
      </div>

      {/* Button */}
      <div className="mt-4 flex justify-center">
        <motion.a
          href="/student/signin"
          className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
          whileHover={{ scale: 1.15 }}
        >
          Start Learning
        </motion.a>
      </div>
    </motion.div>
  );
}
