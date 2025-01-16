import { useState, useEffect } from 'react';

export function useCalendarEvents() {
  const [events, setEvents] = useState({});

  useEffect(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  const addEvent = (date, event) => {
    const updatedEvents = {
      ...events,
      [date]: {
        description: event.description,
        time: event.time,
        type: event.type || 'general'
      }
    };
    setEvents(updatedEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
  };

  const deleteEvent = (date) => {
    const updatedEvents = { ...events };
    delete updatedEvents[date];
    setEvents(updatedEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
  };

  return {
    events,
    addEvent,
    deleteEvent
  };
}