import { useState } from 'react';
import { X } from 'lucide-react';

export default function EventModal({ date, onClose, onSave, onDelete, existingEvent }) {
  const [description, setDescription] = useState(existingEvent?.description || '');
  const [time, setTime] = useState(existingEvent?.time || '');
  const [type, setType] = useState(existingEvent?.type || 'general');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      description,
      time,
      type
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background-secondary p-6 rounded-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">
            {existingEvent ? 'Edit Event' : 'Add New Event'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Date
            </label>
            <div className="text-white">{date}</div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white"
            >
              <option value="general">General</option>
              <option value="class">Class</option>
              <option value="meeting">Meeting</option>
              <option value="deadline">Deadline</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white"
              rows="4"
              placeholder="Enter event description..."
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4">
            {existingEvent && (
              <button
                type="button"
                onClick={() => onDelete(date)}
                className="px-4 py-2 text-red-400 hover:text-red-300"
              >
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}