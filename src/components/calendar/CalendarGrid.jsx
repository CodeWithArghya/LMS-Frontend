import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

export default function CalendarGrid({ onDateClick, events }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'class':
        return 'bg-green-500';
      case 'meeting':
        return 'bg-blue-500';
      case 'deadline':
        return 'bg-red-500';
      default:
        return 'bg-violet-500';
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-16 md:h-24 bg-gray-800/50 rounded-lg"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
      const event = events[dateString];

      days.push(
        <button
          key={day}
          onClick={() => onDateClick(dateString)}
          className={`h-16 md:h-24 p-2 rounded-lg transition-colors relative ${
            event ? 'bg-gray-800' : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          <span className="absolute top-2 left-2 text-xs md:text-sm">{day}</span>
          {event && (
            <div className="absolute bottom-2 left-2 right-2 space-y-1">
              <div className={`h-1 ${getEventColor(event.type)} rounded-full`}></div>
              {event.time && (
                <div className="flex items-center text-[10px] md:text-xs text-gray-400">
                  <Clock className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                  {event.time}
                </div>
              )}
            </div>
          )}
        </button>
      );
    }

    return days;
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <button onClick={handlePrevMonth} className="p-1 md:p-2 hover:bg-gray-700 rounded-lg">
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
        </button>
        <h3 className="text-base md:text-lg font-medium text-white">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button onClick={handleNextMonth} className="p-1 md:p-2 hover:bg-gray-700 rounded-lg">
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-2 mb-1 md:mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-xs md:text-sm text-gray-400">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {renderCalendar()}
      </div>
    </div>
  );
}