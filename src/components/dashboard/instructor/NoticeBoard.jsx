import { useState } from 'react';
import { Send, Trash2 } from 'lucide-react';
import { useNotices } from '../../../hooks/useNotices';

export default function NoticeBoard() {
  const [notice, setNotice] = useState('');
  const { notices, addNotice, deleteNotice } = useNotices();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!notice.trim()) return;
    addNotice(notice);
    setNotice('');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Notice Board</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={notice}
            onChange={(e) => setNotice(e.target.value)}
            placeholder="Type your notice here..."
            className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white text-sm"
          />
          <button
            type="submit"
            className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap text-sm"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </div>
      </form>

      <div className="space-y-4 max-h-[calc(100vh-24rem)] overflow-y-auto custom-scrollbar">
        {notices.map(notice => (
          <div 
            key={notice.id} 
            className="bg-gray-700/50 rounded-lg p-4 border-l-4 border-violet-500 group"
          >
            <div className="flex justify-between items-start gap-4">
              <p className="text-gray-200 break-words flex-1 text-sm">{notice.content}</p>
              <button
                onClick={() => deleteNotice(notice.id)}
                className="text-red-400 hover:text-red-300 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <span className="text-xs text-violet-400 block mt-2">{notice.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}