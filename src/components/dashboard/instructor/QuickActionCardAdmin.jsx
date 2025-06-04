import React from "react";

const colorMap = {
  orange: "bg-orange-600 hover:bg-orange-700",
  green: "bg-green-600 hover:bg-green-700",
  blue: "bg-blue-600 hover:bg-blue-700",
  emerald: "bg-emerald-600 hover:bg-emerald-700",
  red: "bg-red-600 hover:bg-red-700",
};

export default function QuickActionCardAdmin({
  title,

  color,
  icon: Icon,
  result,
}) {
  return (
    <div
      className={`${colorMap[color]} p-6 rounded-lg transition-colors cursor-pointer`}
    >
      <div className="flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-black  font-semibold  mb-3 text-3xl">{result}</p>
    </div>
  );
}
