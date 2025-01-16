import { useState } from 'react';
import TimePicker from '../../common/TimePicker/TimePicker';

export default function LiveClassForm() {
  const [formData, setFormData] = useState({
    subjectName: '',
    duration: '',
    teacher: '',
    topic: '',
    date: '',
    time: { hours: '12', minutes: '00', period: 'AM' },
    joinLink: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTimeChange = (time) => {
    setFormData(prev => ({
      ...prev,
      time
    }));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Schedule Live Class</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="subjectName" className="block text-sm font-medium text-gray-300 mb-1">
            Subject Name
          </label>
          <input
            type="text"
            id="subjectName"
            name="subjectName"
            value={formData.subjectName}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white text-sm"
            placeholder="Enter subject name"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-1">
              Class Duration
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white text-sm"
              placeholder="e.g., 1 hour"
              required
            />
          </div>

          <div>
            <label htmlFor="teacher" className="block text-sm font-medium text-gray-300 mb-1">
              Teacher
            </label>
            <input
              type="text"
              id="teacher"
              name="teacher"
              value={formData.teacher}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white text-sm"
              placeholder="Enter teacher's name"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-1">
            Topic
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white text-sm"
            placeholder="Enter class topic"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Time
            </label>
            <TimePicker onChange={handleTimeChange} />
          </div>
        </div>

        <div>
          <label htmlFor="joinLink" className="block text-sm font-medium text-gray-300 mb-1">
            Join Link
          </label>
          <input
            type="url"
            id="joinLink"
            name="joinLink"
            value={formData.joinLink}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white text-sm"
            placeholder="Enter meeting link"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded-lg transition-colors text-sm"
        >
          Schedule Class
        </button>
      </form>
    </div>
  );
}