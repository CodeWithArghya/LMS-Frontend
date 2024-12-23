export default function StatCard({ icon, number, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-4xl mb-2">{icon}</span>
      <h3 className="text-2xl font-bold text-white mb-1">{number}</h3>
      <p className="text-gray-400">{label}</p>
    </div>
  );
}