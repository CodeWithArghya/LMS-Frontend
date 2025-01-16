import React from 'react';
import Sidebar from '../../components/dashboard/instructor/Sidebar';
import { Send } from 'lucide-react';
import { useNotices } from '../../hooks/useNotices';

export default function NoticesPage() {
  const { notices, addNotice } = useNotices();
  const [notice, setNotice] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!notice.trim()) return;
    addNotice(notice);
    setNotice('');
  };

  return (
    <div className="min-h-screen bg-background-primary">
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Notices</h1>
          </div>
          
          <div className="max-w-2xl bg-background-secondary p-6 rounded-lg">
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={notice}
                  onChange={(e) => setNotice(e.target.value)}
                  placeholder="Type your notice here..."
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </div>
            </form>

            <div className="space-y-4">
              {notices.map(notice => (
                <div key={notice.id} className="border-b border-gray-700 pb-4">
                  <p className="text-gray-300 mb-2">{notice.content}</p>
                  <span className="text-sm text-gray-500">{notice.date}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}