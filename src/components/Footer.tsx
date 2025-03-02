
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', path: '#features' },
        { name: 'Pricing', path: '#pricing' },
        { name: 'Chat', path: '/chat' },
        { name: 'Screen Sharing', path: '#screen-sharing' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', path: '#docs' },
        { name: 'API', path: '#api' },
        { name: 'Status', path: '#status' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', path: '#about' },
        { name: 'Blog', path: '#blog' },
        { name: 'Careers', path: '#careers' },
        { name: 'Legal', path: '#legal' },
      ]
    }
  ];

  return (
    <footer className="bg-secondary/50 border-t border-border/50 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 font-semibold text-xl">
              <span className="relative inline-flex h-8 w-8 items-center justify-center">
                <span className="absolute inset-0 h-full w-full bg-primary/20 rounded-md"></span>
                <span className="relative text-primary font-bold">W</span>
              </span>
              <span>WatcherMy</span>
            </div>
            <p className="text-muted-foreground text-sm mt-4 max-w-xs">
              Real-time communication platform for text chat and screen sharing that keeps you connected.
            </p>
          </div>
          
          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="font-medium text-sm">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-6 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} WatcherMy. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Privacy</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Terms</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
