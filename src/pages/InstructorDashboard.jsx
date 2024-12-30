import React from 'react';
import { BookOpen, Video, Users, Calendar, UserPlus, HelpCircle } from 'lucide-react';
import Sidebar from '../components/dashboard/instructor/Sidebar';
import QuickActionCard from '../components/dashboard/instructor/QuickActionCard';
import AnnouncementList from '../components/dashboard/instructor/AnnouncementList';

export default function InstructorDashboard() {
  const quickActions = [
    {
      icon: BookOpen,
      title: "Online Course",
      description: "Create a self-paced online training course",
      color: "orange"
    },
    {
      icon: Video,
      title: "Live Class",
      description: "Schedule a live class in your class calendar",
      color: "green"
    },
    {
      icon: Calendar,
      title: "Class Calendar",
      description: "View your live class calendar",
      color: "blue"
    },
    {
      icon: Video,
      title: "Quick Meetings",
      description: "Start an instant live online meeting",
      color: "emerald"
    },
    {
      icon: UserPlus,
      title: "Add Student",
      description: "Create a new student profile",
      color: "blue"
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      description: "Learn how to use the LMS",
      color: "red"
    }
  ];

  const announcements = [
    {
      date: "6/30/2020 2:35 PM",
      content: "End of Year Reports (Reception to Year 10)"
    },
    {
      date: "5/15/2020 5:20 PM",
      content: "RETURNING TO SCHOOL THOUGHTS DAY"
    },
    {
      date: "4/25/2020 2:15 PM",
      content: "Check your live lesson schedule out this weekend ready for Monday"
    }
  ];

  return (
    <div className="min-h-screen bg-background-primary flex">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-violet-200 mb-8">Control Panel</p>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <QuickActionCard key={index} {...action} />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8">
          <AnnouncementList announcements={announcements} />

          <div className="bg-background-secondary rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Live Classes Now</h2>
            <p className="text-violet-300">No active classes at the moment. Please check the calendar for more.</p>
          </div>
        </div>
      </div>
    </div>
  );
}