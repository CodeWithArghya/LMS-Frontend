import React from 'react';
import { Bell } from 'lucide-react';

export default function AnnouncementList({ announcements }) {
  return (
    <div className="bg-background-secondary rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="text-violet-400" />
        <h2 className="text-xl font-semibold text-white">Latest Announcements</h2>
      </div>
      <div className="space-y-4">
        {announcements.map((announcement, index) => (
          <div key={index} className="border-b border-violet-900 pb-4">
            <div className="flex justify-between text-sm text-violet-300 mb-1">
              <span>{announcement.date}</span>
            </div>
            <p className="text-violet-100">{announcement.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}