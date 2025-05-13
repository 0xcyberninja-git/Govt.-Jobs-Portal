import React from 'react';
import { Briefcase } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-700 to-indigo-800 ${className}`}>
      <Briefcase className="w-5 h-5 text-white" />
    </div>
  );
};

export default Logo;