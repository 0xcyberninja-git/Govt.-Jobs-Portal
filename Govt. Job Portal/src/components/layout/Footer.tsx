import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <Logo className="text-white" />
              <span className="text-xl font-bold">GovtJobPortal</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted source for the latest government job opportunities across India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/jobs" className="text-gray-400 hover:text-white transition-colors">Browse Jobs</Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-400 hover:text-white transition-colors">Blog & News</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Job Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs?category=central" className="text-gray-400 hover:text-white transition-colors">
                  Central Government
                </Link>
              </li>
              <li>
                <Link to="/jobs?category=state" className="text-gray-400 hover:text-white transition-colors">
                  State Government
                </Link>
              </li>
              <li>
                <Link to="/jobs?category=psu" className="text-gray-400 hover:text-white transition-colors">
                  Public Sector Undertakings
                </Link>
              </li>
              <li>
                <Link to="/jobs?category=banking" className="text-gray-400 hover:text-white transition-colors">
                  Banking & Insurance
                </Link>
              </li>
              <li>
                <Link to="/jobs?category=defence" className="text-gray-400 hover:text-white transition-colors">
                  Defence & Police
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-gray-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 Government House, New Delhi, India - 110001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">+91 11 2123 4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">info@govtjobportal.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} GovtJobPortal. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-white text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;