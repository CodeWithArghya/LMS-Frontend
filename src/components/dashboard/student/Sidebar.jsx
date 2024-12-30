import { BookOpen, MessageSquare, LogOut, User } from 'lucide-react';
import { colors } from '../../../styles/theme';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { icon: BookOpen, label: 'Dashboard' },
    { icon: BookOpen, label: 'Courses' },
    { icon: MessageSquare, label: 'Forum' },
    { icon: User, label: 'Account' },
    { icon: MessageSquare, label: 'Messages' }
  ];

  return (
    <div className="w-64 bg-background-secondary p-6">
      <div className="flex items-center space-x-4 mb-8">
        <img 
          src="https://htmlcolorcodes.com/assets/images/colors/violet-color-solid-background-1920x1080.png" 
          alt="Profile" 
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h2 className="text-white font-semibold">Welcome</h2>
          <p className="text-violet-300 text-sm">Student</p>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(item.label.toLowerCase())}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
              activeTab === item.label.toLowerCase() 
                ? 'bg-violet-700 text-white' 
                : 'text-violet-200 hover:bg-violet-900'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}

        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-violet-200 hover:bg-violet-900 mt-8">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}