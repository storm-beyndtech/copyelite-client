import useColorMode from '../../hooks/useColorMode';
import { Sun, Moon } from 'lucide-react';

const DarkModeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <div className="grid place-content-center">
      <label
        className={`relative m-0 block h-6.5 w-12 rounded-full border-2 ${
          colorMode === 'dark'
            ? 'bg-black border-gray-800'
            : 'bg-gray-300 border-gray-300'
        }`}
      >
        <input
          type="checkbox"
          onChange={() => {
            if (typeof setColorMode === 'function') {
              setColorMode(colorMode === 'light' ? 'dark' : 'light');
            }
          }}
          className="dur absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
        />
        <span
          className={`absolute top-1/2 left-[2px] flex h-5 w-5 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white dark:bg-gray-800 duration-75 ease-linear ${
            colorMode === 'dark' && '!right-[2px] !translate-x-[110%]'
          }`}
        >
          <span className="dark:hidden">
            <Sun size={12} />
          </span>
          <span className="hidden dark:inline-block">
            <Moon size={12} className="text-gray-200" />
          </span>
        </span>
      </label>
    </div>
  );
};

export default DarkModeSwitcher;
