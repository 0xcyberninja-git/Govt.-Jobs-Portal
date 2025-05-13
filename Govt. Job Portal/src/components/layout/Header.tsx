import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import Logo from '../ui/Logo';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'Jobs', 
      path: '/jobs',
      dropdown: [
        { name: 'Central Government', path: '/jobs?category=central' },
        { name: 'State Government', path: '/jobs?category=state' },
        { name: 'PSU', path: '/jobs?category=psu' },
        { name: 'Banking', path: '/jobs?category=banking' },
        { name: 'Defence', path: '/jobs?category=defence' },
      ] 
    },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Admin', path: '/admin' },
  ];

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
            <span className="text-xl font-bold text-gray-900">GovtJobPortal</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.dropdown ? (
                  <button 
                    className="flex items-center space-x-1 text-gray-700 hover:text-primary-600"
                    onClick={() => toggleDropdown(link.name)}
                  >
                    <span>{link.name}</span>
                    <ChevronDown size={16} />
                  </button>
                ) : (
                  <Link 
                    to={link.path}
                    className={`text-gray-700 hover:text-primary-600 ${
                      location.pathname === link.path ? 'font-medium text-primary-600' : ''
                    }`}
                  >
                    {link.name}
                  </Link>
                )}

                {link.dropdown && activeDropdown === link.name && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search jobs..."
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-2">
            <div className="relative my-3">
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            
            <nav className="flex flex-col space-y-3 pb-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <>
                      <button 
                        className="flex items-center justify-between w-full text-left py-2 text-gray-700"
                        onClick={() => toggleDropdown(link.name)}
                      >
                        <span>{link.name}</span>
                        <ChevronDown size={16} className={activeDropdown === link.name ? "transform rotate-180" : ""} />
                      </button>
                      
                      {activeDropdown === link.name && (
                        <div className="pl-4 mt-1 space-y-2 border-l-2 border-gray-200">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              className="block py-1 text-sm text-gray-600 hover:text-primary-600"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link 
                      to={link.path}
                      className={`block py-2 text-gray-700 hover:text-primary-600 ${
                        location.pathname === link.path ? 'font-medium text-primary-600' : ''
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;