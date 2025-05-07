
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail } from './icons';
import { cn } from '../lib/utils';
import LiveChat from './LiveChat';

const FloatingMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const isScrollingUp = touchY < touchStartY - 10;

      if (isScrollingUp && document.activeElement?.tagName === 'INPUT') {
        return;
      }
      setIsMenuOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="fixed bottom-6 right-6 flex flex-col items-end gap-2"
      ref={containerRef}
    >
      {isMenuOpen && (
        <motion.a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            const isMobile =
              /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
              );
            isMobile
              ? (window.location.href = 'mailto:ridoan.zisan@gmail.com')
              : window.open(
                  'https://mail.google.com/mail/?view=cm&fs=1&to=ridoan.zisan@gmail.com',
                  '_blank'
                );
            setIsMenuOpen(false);
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.05 }}
          className="bg-green-500 text-white p-4 rounded-full shadow-md hover:bg-green-600 transition-colors"
          title="Send Email"
        >
          <Mail size={24} />
        </motion.a>
      )}

      <LiveChat />

      <motion.button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'p-4 rounded-full shadow-md text-white transition-colors',
          isMenuOpen
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-500 hover:bg-blue-600'
        )}
        title={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <motion.div
          animate={{ rotate: isMenuOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Mail size={24} />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default FloatingMenu;
