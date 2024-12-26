import MissionCard from './MissionCard';
import { Target, Star, Heart } from 'lucide-react';

export default function OurMission() {
  const missions = [
    {
      icon: <Target className="w-12 h-12 text-purple-500" />,
      title: "Empower Learning",
      description: "Provide accessible, high-quality education for everyone"
    },
    {
      icon: <Star className="w-12 h-12 text-pink-500" />,
      title: "Foster Excellence",
      description: "Support both students and instructors in achieving their best"
    },
    {
      icon: <Heart className="w-12 h-12 text-red-500" />,
      title: "Build Community",
      description: "Create a supportive environment for collaborative learning"
    }
  ];

  return (
    <div className="bg-[#0f1117] py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-16">Our Mission & Goals</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {missions.map((mission, index) => (
            <MissionCard
              key={index}
              icon={mission.icon}
              title={mission.title}
              description={mission.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}