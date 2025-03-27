import React, { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import axios from "axios";

export default function LiveClassDisplayCard() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/student/displayclasses/")
      .then((response) => setClasses(response.data.classes))
      .catch((error) => console.error("Error fetching live classes:", error));
  }, []);

  return (
    <div className="space-y-4">
      {classes.map((classItem) => (
        <div
          key={classItem.id}
          className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4"
        >
          {/* Icon */}
          <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-violet-400" />
          </div>

          {/* Class Details */}
          <div className="flex-1">
            <h4 className="text-white font-medium">
              Subject : {classItem.subjectName}
            </h4>
            <p className="text-red-400 text-sm">
              For Class - {classItem.for_class}
            </p>
            <h4 className="text-yellow-400 font-medium">
              Topic Name : {classItem.topic}
            </h4>
            <p className="text-yellow text-sm"></p>
            {/* Progress Bar */}
            <p className="text-green-400 text-sm">
              Class Duration {classItem.duration}{" "}
            </p>
            <h4 className="text-orange-600 font-medium">
              Class Time & Date : {classItem.datetime}
            </h4>
          </div>

          {/* Join Link */}
          <a
            href={classItem.joinLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-3 py-1 rounded-lg"
          >
            Join Class
          </a>
        </div>
      ))}
    </div>
  );
}
