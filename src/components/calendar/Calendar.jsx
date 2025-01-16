import { useState } from 'react';
import CalendarGrid from './CalendarGrid';
import EventModal from './EventModal';
import { useCalendarEvents } from '../../hooks/useCalendarEvents';

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { events, addEvent, deleteEvent } = useCalendarEvents();

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDate(null);
  };

  const handleAddEvent = (event) => {
    if (selectedDate && event) {
      addEvent(selectedDate, event);
      handleCloseModal();
    }
  };

  const handleDeleteEvent = (date) => {
    deleteEvent(date);
    handleCloseModal();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Class Calendar</h2>
      
      <div className="flex justify-center">
        <div className="w-full min-w-[280px]">
          <CalendarGrid 
            onDateClick={handleDateClick}
            events={events}
          />
        </div>
      </div>

      {showModal && (
        <EventModal
          date={selectedDate}
          onClose={handleCloseModal}
          onSave={handleAddEvent}
          onDelete={handleDeleteEvent}
          existingEvent={events[selectedDate]}
        />
      )}
    </div>
  );
}