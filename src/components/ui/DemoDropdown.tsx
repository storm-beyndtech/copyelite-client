import { useState } from 'react';
import { contextData } from '@/context/AuthContext';
import { ChevronDown, Wallet2Icon } from 'lucide-react';

export default function DemoDropdown() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, fetchUser } = contextData(); // fetchUser is used to refresh user data
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const handleTopUp = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${url}/deposits/reset-demo-balance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await res.json();
      if (res.ok) {
        await fetchUser(user._id); // refresh user data after top up
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-3 border border-gray-800 px-4 py-2 rounded-lg shadow-sm bg-black dark:bg-blue-800/20 dark:border-blue-400 text-sm font-medium hover:bg-opacity-70 focus:outline-none"
      >
        <Wallet2Icon /> <span>${user.demo?.toLocaleString()} </span>
        <ChevronDown />
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-lg shadow-lg bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 p-4 space-y-3">
          <div className="text-sm text-gray-800 dark:text-gray-400 uppercase font-semibold">
            Demo
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-50">
            ${user.demo?.toLocaleString()}
          </div>
          <button
            onClick={handleTopUp}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold"
          >
            {loading ? 'Topping up...' : 'Top up to $10,000'}
          </button>
        </div>
      )}
    </div>
  );
}
