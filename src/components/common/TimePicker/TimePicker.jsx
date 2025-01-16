import { useState } from 'react';
import TimeInput from './TimeInput';
import AmPmToggle from './AmPmToggle';

export default function TimePicker({ onChange }) {
  const [time, setTime] = useState({ hours: '', minutes: '', period: 'AM' });

  const handleTimeChange = (type, value) => {
    const newTime = { ...time, [type]: value };
    setTime(newTime);
    onChange?.(newTime);
  };

  return (
    <div className="flex items-center gap-2">
      <TimeInput
        value={time.hours}
        onChange={(value) => handleTimeChange('hours', value)}
        max={12}
        min={1}
        placeholder="12"
      />
      <span className="text-gray-300 text-xl font-bold">:</span>
      <TimeInput
        value={time.minutes}
        onChange={(value) => handleTimeChange('minutes', value)}
        max={59}
        min={0}
        placeholder="00"
      />
      <AmPmToggle
        value={time.period}
        onChange={(value) => handleTimeChange('period', value)}
      />
    </div>
  );
}