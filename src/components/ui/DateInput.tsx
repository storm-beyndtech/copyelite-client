import { useRef } from 'react';
import { Calendar } from 'lucide-react';

const DateInput = ({ value, onChange, error }:any) => {
  const dateInputRef = useRef<any>(null);

  const handleClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  return (
    <div className="relative">
      {/* The visible input mimic */}
      <div
        onClick={handleClick}
        className={`w-full border rounded-md py-3 px-4 pr-10 flex items-center justify-between cursor-pointer ${
          error
            ? 'border-red-500'
            : 'dark:bg-gray-900 dark:border-gray-700 dark:text-white bg-white border-gray-300 text-gray-900'
        }`}
      >
        <span>{value || 'DD/MM/YYYY'}</span>
        <Calendar className="w-5 h-5 text-gray-400 dark:text-gray-300" />
      </div>

      {/* The real input, invisible but triggers the native date picker */}
      <input
        type="date"
        ref={dateInputRef}
        value={value}
        onChange={onChange}
        className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
      />

      {error && (
        <p className="mt-1 text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};

export default DateInput;