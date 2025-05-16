import { contextData } from '@/context/AuthContext';
import { Bell, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DarkModeSwitcher from './DarkModeSwitcher';
import { IoCopy } from 'react-icons/io5';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { logout } = contextData();

  const toggleNotificationDropdown = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
    setShowProfileDropdown(false);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
    setShowNotificationDropdown(false);
  };

  return (
    <header className="bg-white dark:bg-bodydark/50 shadow-sm z-10 px-4 rounded-xl mx-3 my-3">
      <div className="flex items-center gap-2 justify-between h-14 px-2">
        <button
          aria-controls="sidebar"
          onClick={(e) => {
            e.stopPropagation();
            props.setSidebarOpen(!props.sidebarOpen);
          }}
          className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-gray-950 lg:hidden"
        >
          <span className="relative block h-5.5 w-5.5 cursor-pointer">
            <span className="du-block absolute right-0 h-full w-full">
              <span
                className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                  !props.sidebarOpen && '!w-full delay-300'
                }`}
              ></span>
              <span
                className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                  !props.sidebarOpen && 'delay-400 !w-full'
                }`}
              ></span>
              <span
                className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                  !props.sidebarOpen && '!w-full delay-500'
                }`}
              ></span>
            </span>
            <span className="absolute right-0 h-full w-full rotate-45">
              <span
                className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                  !props.sidebarOpen && '!h-0'
                }`}
              ></span>
              <span
                className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                  !props.sidebarOpen && '!h-0 !delay-200'
                }`}
              ></span>
            </span>
          </span>
        </button>

        {/* Dummy CopyRef */}
        <div className="flex items-center space-x-2 px-3 py-1 border dark:border-gray-800 border-gray-400 rounded">
          <span className="text-xs text-gray-700 dark:text-gray-500">
            kjbfl463
          </span>
          <IoCopy size={20} className="text-cyan-500" />
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-2">
          <Link
            to="/dashboard/practice"
            className="text-xs px-4 py-1 max-sm:hidden rounded border border-cyan-900 hover:bg-cyan-950 text-cyan-500 font-medium"
          >
            PRACTICE
          </Link>

          {/* Notifications with Dropdown */}
          <div className="relative">
            <button
              className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
              onClick={toggleNotificationDropdown}
            >
              <Bell size={20} />
            </button>

            {showNotificationDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-bodydark1/90 customBlur rounded-md shadow-lg overflow-hidden z-20 border border-gray-200 dark:border-gray-700">
                <div className="py-2">
                  <h3 className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
                    Notifications
                  </h3>

                  <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                    <Link
                      to="/dashboard/transactions"
                      className="block px-4 py-2 text-sm text-green-600 dark:text-green-400 font-medium"
                    >
                      View all transactions
                    </Link>
                    <Link
                      to="/dashboard/copy-trade-history"
                      className="block px-4 py-2 text-sm text-blue-600 dark:text-blue-400 font-medium"
                    >
                      View all trades
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DarkModeSwitcher />

          {/* User Profile with Dropdown */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 focus:outline-none"
              onClick={toggleProfileDropdown}
            >
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <User size={16} />
              </div>
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-bodydark1/90 customBlur rounded-md shadow-lg overflow-hidden z-20 border border-gray-200 dark:border-gray-700">
                <div className="py-1">
                  <Link
                    to="/dashboard"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LayoutDashboard size={16} className="mr-2" />
                    Dashboard
                  </Link>
                  <div
                    onClick={() => logout()}
                    className="flex cursor-pointer items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
