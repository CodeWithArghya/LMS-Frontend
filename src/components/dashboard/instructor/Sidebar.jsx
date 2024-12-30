import { Home, Users, BookOpen, Cog, MessageSquare } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { icon: Home, label: 'Home' },
    { icon: Users, label: 'Live Classes' },
    { icon: Users, label: 'Student Management' },
    { icon: BookOpen, label: 'Courses' },
    { icon: Cog, label: 'Management' },
    { icon: BookOpen, label: 'Resources' },
    { icon: Cog, label: 'Account Settings' }
  ];

  return (
    <div className="w-64 bg-background-secondary min-h-screen">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-8">
          <img 
            src="https://htmlcolorcodes.com/assets/images/colors/violet-color-solid-background-1920x1080.png" 
            alt="Profile" 
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-white font-medium">Teacher</h3>
            <p className="text-violet-300 text-sm">Administrator</p>
          </div>
        </div>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="w-full flex items-center space-x-3 px-4 py-3 text-violet-200 hover:bg-violet-900"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}