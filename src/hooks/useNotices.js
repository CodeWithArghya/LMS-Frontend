import { useState, useEffect } from 'react';

export function useNotices() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const savedNotices = localStorage.getItem('notices');
    if (savedNotices) {
      setNotices(JSON.parse(savedNotices));
    }
  }, []);

  const addNotice = (content) => {
    const newNotice = {
      id: Date.now(),
      content,
      date: new Date().toLocaleString()
    };
    const updatedNotices = [newNotice, ...notices];
    setNotices(updatedNotices);
    localStorage.setItem('notices', JSON.stringify(updatedNotices));
  };

  const deleteNotice = (id) => {
    const updatedNotices = notices.filter(notice => notice.id !== id);
    setNotices(updatedNotices);
    localStorage.setItem('notices', JSON.stringify(updatedNotices));
  };

  return {
    notices,
    addNotice,
    deleteNotice
  };
}