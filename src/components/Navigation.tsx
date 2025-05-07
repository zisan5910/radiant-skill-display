import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { cn } from '../lib/utils';
import { Menu, X } from 'lucide-react';
import { NavigationItem } from './NavigationItems';

interface NavigationProps {
  navigationItems: NavigationItem[];
  activeSection: string;
  scrollToSection: (section: string) => void;
  language: 'en' | 'bn';
  setLanguage: (lang: 'en' | 'bn') => void;
}

const Navigation = ({
  navigationItems,
  activeSection,
  scrollToSection,
  language,
  setLanguage,
}: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <button
          onClick={() => scrollToSection('profile')}
          className="text-2xl font-bold text-slate-800 hover:text-indigo-600 transition-colors"
        >
          Ridoan
        </button>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-slate-600 hover:text-slate-800">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage('en')}
            className={cn(
              'px-3 py-1 rounded-md text-sm font-medium transition-colors',
              language === 'en' ? 'bg-indigo-500 text-white' : 'text-slate-600 hover:bg-slate-100'
            )}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('bn')}
            className={cn(
              'px-3 py-1 rounded-md text-sm font-medium transition-colors',
              language === 'bn' ? 'bg-indigo-500 text-white' : 'text-slate-600 hover:bg-slate-100'
            )}
          >
            বাংলা
          </button>
        </div>

        {/* Desktop Navigation */}
        <div
          className={cn(
            'hidden md:flex items-center gap-6',
            isMobileMenuOpen ? 'flex flex-col absolute top-full left-0 w-full bg-white shadow-md rounded-b-md py-4' : ''
          )}
        >
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              to={item.id}
              smooth={true}
              duration={500}
              offset={-64}
              className={cn(
                'text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-2',
                activeSection === item.id ? 'text-indigo-700 font-medium' : ''
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden absolute top-full left-0 w-full bg-white shadow-md rounded-b-md py-4"
        >
          <div className="flex flex-col items-center gap-4">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                smooth={true}
                duration={500}
                offset={-64}
                className={cn(
                  'text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-2',
                  activeSection === item.id ? 'text-indigo-700 font-medium' : ''
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navigation;
