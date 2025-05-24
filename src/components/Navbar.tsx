import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import logo from '../assets/copyelite-logo.png';
import { Link } from 'react-router-dom';
import GTranslateProvider from './ui/GTranslateProvider';
import {
  companyDropDownLinks,
  marketDropDownLinks,
  toolsDropDownLinks,
} from '@/lib/utils';

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Handle screen resize
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (name: any) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header className="fixed top-0 left-0 z-999999 right-0 w-full">
      {/* Top Utility Nav */}
      <div
        className={`bg-gray-900/90 relative z-9 ${
          isScrolled ? '' : 'border-b-[40px] border-bodydark'
        } customBlur`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">
          <div className="hidden sm:flex items-center space-x-6">
            <a
              href="/economic-calendar"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Market News
            </a>
            <a
              href="/register"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Demo Account
            </a>
            <a
              href="/contact"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Contact Us
            </a>
          </div>
          <div className="flex items-center space-x-4 ml-auto">
            <Link to="/register">
              <button className="px-4 py-1 bg-transparent border border-blue-600 text-white text-sm rounded transition-colors">
                Sign up
              </button>
            </Link>

            <Link to="/login">
              <button className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors">
                Login
              </button>
            </Link>
            <div className="hidden sm:flex cursor-pointer">
              <GTranslateProvider />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div
        className={`transition-all duration-900 relative bg-bodydark ${
          isScrolled ? 'w-full' : 'max-w-6xl mx-auto mt-[-40px] '
        }`}
      >
        <div className={`max-w-6xl mx-auto px-5 py-4`}>
          {isMobile ? (
            <div className="flex justify-between items-center">
              <Link to="/" className="">
                <img src={logo} alt="logo" className="w-30" />
              </Link>
              <button
                className="text-white p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>

              {/* Mobile Menu */}
              {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-gray-900 border-t border-gray-800">
                  <div className="p-4 flex flex-col space-y-4">
                    <Link
                      to="/"
                      className="text-white hover:text-blue-400 transition-colors font-medium py-2"
                    >
                      HOME
                    </Link>

                    <div>
                      <button
                        className="flex justify-between items-center w-full py-2"
                        onClick={() => toggleDropdown('markets')}
                      >
                        <span className="text-white font-medium">MARKETS</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            activeDropdown === 'markets' ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {activeDropdown === 'markets' && (
                        <div className="ml-4 mt-2 space-y-2">
                          <p className="text-sm font-medium text-blue-400">
                            PRODUCTS
                          </p>
                          {marketDropDownLinks.map((link, i) => (
                            <Link
                              key={i}
                              to={link.to}
                              className="block text-sm text-white hover:text-blue-400 py-1"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <button
                        className="flex justify-between items-center w-full py-2"
                        onClick={() => toggleDropdown('company')}
                      >
                        <span className="text-white font-medium">COMPANY</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            activeDropdown === 'company' ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {activeDropdown === 'company' && (
                        <div className="ml-4 mt-2 space-y-2">
                          {companyDropDownLinks.map((link, i) => (
                            <Link
                              key={i}
                              to={link.to}
                              className="block text-sm text-white hover:text-blue-400 py-1"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <button
                        className="flex justify-between items-center w-full py-2"
                        onClick={() => toggleDropdown('tools')}
                      >
                        <span className="text-white font-medium">TOOLS</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            activeDropdown === 'tools' ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {activeDropdown === 'tools' && (
                        <div className="ml-4 mt-2 space-y-2">
                          {toolsDropDownLinks.map((link, i) => (
                            <Link
                              key={i}
                              to={link.to}
                              className="block text-sm text-white hover:text-blue-400 py-1"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <nav className="flex items-center">
                <ul className="flex gap-20 items-center z-99">
                  <li>
                    <a
                      href="/"
                      className="text-sm text-white hover:text-blue-400 transition-colors font-medium"
                    >
                      HOME
                    </a>
                  </li>

                  <li className="relative group">
                    <button
                      className="flex items-center text-sm text-white hover:text-blue-400 transition-colors font-medium"
                      onClick={() => toggleDropdown('markets')}
                    >
                      MARKETS
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform ${
                          activeDropdown === 'markets' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {activeDropdown === 'markets' && (
                      <div className="absolute top-full left-0 mt-2 w-[700px] bg-gray-900 border border-gray-800/40 p-6">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-2 grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-blue-400 mb-3">
                                PRODUCTS
                              </h4>
                              <ul className="space-y-2">
                                {marketDropDownLinks
                                  .slice(0, 5)
                                  .map((link, i) => (
                                    <li>
                                      <Link
                                        key={i}
                                        to={link.to}
                                        className="text-white hover:text-blue-400 transition-colors"
                                      >
                                        {link.label}
                                      </Link>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium text-transparent mb-3">
                                &nbsp;
                              </h4>
                              <ul className="space-y-2 mt-8">
                                {marketDropDownLinks
                                  .slice(5, 9)
                                  .map((link, i) => (
                                    <li>
                                      <Link
                                        key={i}
                                        to={link.to}
                                        className="text-white hover:text-blue-400 transition-colors"
                                      >
                                        {link.label}
                                      </Link>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                          <div className="col-span-1">
                            <h4 className="font-medium text-green-400 mb-2">
                              Access The Global Forex Market
                            </h4>
                            <p className="text-sm text-gray-300">
                              Access 1000+ Instruments at up to 1000:1 Leverage
                              through our MT4 and PRO Trader platforms
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>

                  <li>
                    <Link to="/" className="">
                      <img src={logo} alt="logo" className="w-30" />
                    </Link>
                  </li>

                  <li className="relative group">
                    <button
                      className="flex items-center text-sm text-white hover:text-blue-400 transition-colors font-medium"
                      onClick={() => toggleDropdown('company')}
                    >
                      COMPANY
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform ${
                          activeDropdown === 'company' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {activeDropdown === 'company' && (
                      <div className="absolute top-full left-0 mt-2 w-[700px] bg-gray-900 border border-gray-800/40 p-6">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-2 grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-blue-400 mb-3">
                                ABOUT US
                              </h4>
                              <ul className="space-y-2">
                                {companyDropDownLinks
                                  .slice(0, 5)
                                  .map((link, i) => (
                                    <li>
                                      <Link
                                        key={i}
                                        to={link.to}
                                        className="text-white hover:text-blue-400 transition-colors"
                                      >
                                        {link.label}
                                      </Link>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium text-blue-400 mb-3">
                                More
                              </h4>
                              <ul className="space-y-2">
                                {companyDropDownLinks
                                  .slice(5, 9)
                                  .map((link, i) => (
                                    <li>
                                      <Link
                                        key={i}
                                        to={link.to}
                                        className="text-white hover:text-blue-400 transition-colors"
                                      >
                                        {link.label}
                                      </Link>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                          <div className="col-span-1">
                            <h4 className="font-medium text-green-400 mb-2">
                              Trading Excellence
                            </h4>
                            <p className="text-sm text-gray-300">
                              With 15+ years in the market, we provide
                              innovative trading solutions to clients worldwide.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>

                  <li className="relative group">
                    <button
                      className="flex items-center text-sm text-white hover:text-blue-400 transition-colors font-medium"
                      onClick={() => toggleDropdown('tools')}
                    >
                      TOOLS
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform ${
                          activeDropdown === 'tools' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {activeDropdown === 'tools' && (
                      <div className="absolute top-full -right-0 mt-2 w-[700px] bg-gray-900 border border-gray-800/40 p-6">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-2 grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-blue-400 mb-3">
                                TRADING TOOLS
                              </h4>
                              <ul className="space-y-2">
                                {marketDropDownLinks
                                  .slice(0, 4)
                                  .map((link, i) => (
                                    <li>
                                      <Link
                                        key={i}
                                        to={link.to}
                                        className="text-white hover:text-blue-400 transition-colors"
                                      >
                                        {link.label}
                                      </Link>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium text-blue-400 mb-3">
                                PLATFORMS
                              </h4>
                              <ul className="space-y-2">
                                {marketDropDownLinks
                                  .slice(4, 8)
                                  .map((link, i) => (
                                    <li>
                                      <Link
                                        key={i}
                                        to={link.to}
                                        className="text-white hover:text-blue-400 transition-colors"
                                      >
                                        {link.label}
                                      </Link>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                          <div className="col-span-1">
                            <h4 className="font-medium text-green-400 mb-2">
                              Advanced AI Tools
                            </h4>
                            <p className="text-sm text-gray-300">
                              Our AI-powered trading tools help you analyze
                              markets and execute trades with precision.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
