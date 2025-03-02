
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Update header background based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Chat', path: '/chat' },
    { name: 'Features', path: '#features' },
    { name: 'About', path: '#about' },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path || 
           (path.startsWith('#') && location.hash === path);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 py-4",
        scrolled ? "glass shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 font-semibold text-xl md:text-2xl"
        >
          <span className="relative inline-flex h-8 w-8 items-center justify-center">
            <span className="absolute inset-0 h-full w-full bg-primary/20 rounded-md animate-pulse-subtle"></span>
            <span className="relative text-primary font-bold">W</span>
          </span>
          <span className="animate-fade-in">WatcherMy</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "font-medium transition-all duration-300 hover:text-primary relative",
                isActive(item.path) 
                  ? "text-primary after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full" 
                  : "text-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link 
            to="/chat" 
            className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-medium shadow-sm transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            Launch App
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "absolute top-full left-0 right-0 glass md:hidden transition-all duration-300 overflow-hidden",
          mobileMenuOpen ? "max-h-[400px] py-4 border-t border-border/30" : "max-h-0"
        )}
      >
        <nav className="flex flex-col space-y-3 px-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "py-2 font-medium transition-all",
                isActive(item.path) ? "text-primary" : "text-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-border/30">
            <Link 
              to="/chat" 
              className="block w-full py-3 text-center rounded-md bg-primary text-primary-foreground font-medium"
            >
              Launch App
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
