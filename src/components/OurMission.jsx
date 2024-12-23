export default function OurMission() {
  return (
    <div className="bg-gray-900 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-12">Our Mission</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Accessible Education",
              description: "Making quality education available to everyone, everywhere."
            },
            {
              title: "Innovation",
              description: "Continuously evolving our platform with cutting-edge technology."
            },
            {
              title: "Community",
              description: "Building a supportive learning community that empowers growth."
            }
          ].map((item, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-400 mb-4">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}