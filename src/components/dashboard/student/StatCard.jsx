import React from 'react';

export default function StatCard({ icon: Icon, value, label }) {
  return (
    <div className="bg-background-secondary p-6 rounded-lg">
      <div className="flex items-center justify-between">
        <Icon className="w-8 h-8 text-violet-400" />
        <span className="text-3xl font-bold text-white">{value}</span>
      </div>
      <p className="text-violet-200 mt-2 text-sm">{label}</p>
    </div>
  );
}