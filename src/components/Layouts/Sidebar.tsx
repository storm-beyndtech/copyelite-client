import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../../assets/copyelite-logo.svg';
import { contextData } from '../../context/AuthContext';
import SidebarDropdown from './SidebarDropdown';
import {
  Home,
  ScrollText,
  BarChart2,
  Coins,
  Gift,
  LogOut,
  Menu,
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const location = useLocation();
  const { pathname } = location;
  const { logout } = contextData();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`text-xs absolute left-0 top-0 z-999999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-gray-50/90 dark:bg-bodydark/30 duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={Logo} alt="Logo" className="h-9 w-auto" />
        </NavLink>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <Menu className="text-gray-400" />
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <ul className="mb-10 flex flex-col gap-1.5">
            <li>
              <NavLink
                to="/dashboard"
                className={`text-xs group relative flex items-center gap-2.5 rounded-sm py-2.5 px-7.5 text-gray-300 font-montserrat duration-300 ease-in-out hover:bg-black dark:hover:bg-black ${
                  pathname === '/dashboard' && 'bg-black'
                }`}
              >
                <Home strokeWidth={1.5} className="text-xl" />
                Dashboard
              </NavLink>
            </li>

            {/* Transactions drop down */}
            <SidebarDropdown
              title="Payments"
              icon={<ScrollText strokeWidth={1.5} className="text-xl" />}
              links={[
                { label: 'Deposit', href: 'deposit' },
                { label: 'Withdrawal', href: 'withdrawal' },
              ]}
            />

            <li>
              <NavLink
                to="/dashboard/copytrading"
                className={`text-xs group relative flex items-center gap-2.5 rounded-sm py-2.5 px-7.5 text-gray-300 font-montserrat duration-300 ease-in-out hover:bg-black dark:hover:bg-black ${
                  pathname === '/dashboard/copytrading' && 'bg-black'
                }`}
              >
                <BarChart2 strokeWidth={1.5} className="text-xl" />
                Copytrading
              </NavLink>
            </li>

            {/* Trade History drop down */}
            <SidebarDropdown
              title="Trade History"
              icon={<BarChart2 strokeWidth={1.5} className="text-xl" />}
              links={[
                { label: 'Copy Trade History', href: 'copy-trade-history' },
                { label: 'Demo Trade History', href: 'demo-trade-history' },
              ]}
            />

            <li>
              <NavLink
                to="/dashboard/all-transactions"
                className={`text-xs group relative flex items-center gap-2.5 rounded-sm py-2.5 px-7.5 text-gray-300 font-montserrat duration-300 ease-in-out hover:bg-black dark:hover:bg-black ${
                  pathname.includes('all-transactions') && 'bg-black'
                }`}
              >
                <Coins strokeWidth={1.5} className="text-xl" />
                All Transactions
              </NavLink>
            </li>
          </ul>

          <ul className="flex flex-col gap-1.5">
            {/* Market tools drop down */}
            <SidebarDropdown
              title="Market Tools"
              icon={<BarChart2 strokeWidth={1.5} className="text-xl" />}
              links={[
                { label: 'Technical Insights', href: 'technical-insights' },
                { label: 'Trading Courses', href: 'trading-courses' },
                { label: 'Econimic Calendar', href: 'econimic-calendar' },
              ]}
            />

            <li>
              <NavLink
                to="/dashboard/loyalty-status"
                className={`text-xs group relative flex items-center gap-2.5 rounded-sm py-2.5 px-7.5 text-gray-300 font-montserrat duration-300 ease-in-out hover:bg-black dark:hover:bg-black ${
                  pathname.includes('affiliate') && 'bg-black'
                }`}
              >
                <Gift strokeWidth={1.5} className="text-xl" />
                Loyalty Status
              </NavLink>
            </li>
          </ul>

          <ul className="flex flex-col gap-1.5">
            <SidebarDropdown
              title="More"
              icon={<BarChart2 strokeWidth={1.5} className="text-xl" />}
              links={[
                { label: 'Settings', href: 'settings' },
                { label: 'All Notifications', href: 'notifications' },
                { label: 'Account Verification', href: 'account-verification' },
                { label: 'Login History', href: 'login-history' },
              ]}
            />

            <li
              className="cursor-pointer text-xs group relative flex items-center gap-2.5 rounded-sm py-2.5 px-7.5 text-gray-300 font-montserrat duration-300 ease-in-out hover:bg-black dark:hover:bg-black"
              onClick={() => logout()}
            >
              <LogOut strokeWidth={1.5} className="text-xl" />
              Sign out
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
