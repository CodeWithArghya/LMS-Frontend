import StarRating from "./StarRating";

export default function TestimonialCard({
  name,
  role,
  coursename,
  subject,
  outcomes,
  image,
}) {
  return (
    <div className="bg-[#1a1f2e] p-6 md:p-8 rounded-lg h-[340px] flex flex-col justify-between shadow-lg">
      {/* Instructor & Course Details */}
      <div>
        <div className="flex items-center gap-4 mb-4">
          <img
            src={image}
            alt={name}
            className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-indigo-400"
          />
          <div>
            <h3 className="text-white font-semibold text-lg">{coursename}</h3>
            <p className="text-indigo-400 text-sm md:text-base">{role}</p>
          </div>
        </div>

        {/* Star Rating */}
        <div className="mb-4">
          <StarRating />
        </div>

        {/* Course Info */}
        <p className="text-gray-300 text-sm md:text-base line-clamp-2">
          {name}
        </p>
        <p className="text-gray-300 text-sm md:text-base line-clamp-2">
          {subject}
        </p>
        <p className="text-gray-300 text-sm md:text-base line-clamp-2">
          {outcomes}
        </p>
      </div>

      {/* Button */}
      <div className="mt-4 flex justify-center">
        <a
          href="/student/signin"
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
        >
          View Course
        </a>
      </div>
    </div>
  );
}
