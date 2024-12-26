export default function MissionCard({ icon, title, description }) {
  return (
    <div className="bg-[#1a1f2e] rounded-lg p-8 text-center hover:transform hover:scale-105 transition-transform duration-300">
      <div className="flex justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-300 text-lg">{description}</p>
    </div>
  );
}