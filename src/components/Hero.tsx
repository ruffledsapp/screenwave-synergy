
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Share2, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      const moveX = (x - 0.5) * 30;
      const moveY = (y - 0.5) * 30;
      
      const glowX = x * 100;
      const glowY = y * 100;
      
      heroRef.current.style.setProperty('--moveX', `${moveX}px`);
      heroRef.current.style.setProperty('--moveY', `${moveY}px`);
      heroRef.current.style.setProperty('--glowX', `${glowX}%`);
      heroRef.current.style.setProperty('--glowY', `${glowY}%`);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const features = [
    {
      icon: <MessageSquare className="h-5 w-5" />,
      text: "Real-time chat"
    },
    {
      icon: <Share2 className="h-5 w-5" />,
      text: "Screen sharing"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      text: "Secure connection"
    }
  ];

  return (
    <div 
      ref={heroRef}
      className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-28 pb-20"
      style={{
        '--moveX': '0px',
        '--moveY': '0px',
        '--glowX': '50%',
        '--glowY': '50%'
      } as React.CSSProperties}
    >
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at var(--glowX) var(--glowY), rgba(var(--primary-rgb), 0.15) 0%, rgba(var(--primary-rgb), 0) 50%)',
        }}
      />
      
      {/* Abstract Shapes */}
      <div className="absolute top-1/4 -left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      
      {/* Floating Elements */}
      <div 
        className="absolute top-48 right-[20%] w-20 h-20 rounded-2xl glass animate-float"
        style={{ 
          transform: 'translate(calc(var(--moveX) * -0.2), calc(var(--moveY) * -0.2)) rotate(10deg)',
          animationDelay: '0s'
        }}
      />
      <div 
        className="absolute bottom-48 left-[25%] w-16 h-16 rounded-full glass animate-float"
        style={{ 
          transform: 'translate(calc(var(--moveX) * 0.3), calc(var(--moveY) * 0.3))', 
          animationDelay: '0.5s'
        }}
      />
      <div 
        className="absolute top-[40%] left-[15%] w-12 h-12 rounded-lg glass animate-float"
        style={{ 
          transform: 'translate(calc(var(--moveX) * 0.4), calc(var(--moveY) * 0.4)) rotate(-10deg)',
          animationDelay: '1s'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 animate-fade-in">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
          Now Available
        </div>
        
        <h1 className="font-bold text-balance">
          Communicate and Share <br className="hidden sm:block" />
          <span className="text-primary">Effortlessly</span> in Real-Time
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6 text-pretty">
          WatcherMy brings together chat and screen sharing in one elegant platform. 
          Stay connected with your team, friends, or clients with crystal-clear communication.
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="inline-flex items-center px-4 py-2 rounded-full bg-secondary text-foreground text-sm"
            >
              {feature.icon}
              <span className="ml-2">{feature.text}</span>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link
            to="/chat"
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium text-base shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] group"
          >
            <span className="flex items-center justify-center">
              Start Communicating
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
          
          <Link
            to="#features"
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-secondary text-foreground font-medium text-base hover:bg-secondary/80 transition-all"
          >
            Learn More
          </Link>
        </div>
      </div>
      
      {/* UI Preview Card */}
      <div 
        className="relative mt-20 w-full max-w-4xl mx-auto animate-fade-in"
        style={{ animationDelay: '0.3s' }}
      >
        <div 
          className="glass rounded-2xl overflow-hidden shadow-xl shadow-primary/5 border-t border-white/50 p-4"
          style={{ transform: 'translate(calc(var(--moveX) * -0.05), calc(var(--moveY) * -0.05))' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <div className="flex-1 text-center text-xs text-muted-foreground">WatcherMy Interface Preview</div>
          </div>
          
          <div className="w-full aspect-[16/9] bg-secondary/50 rounded-lg flex items-center justify-center text-muted-foreground animate-pulse-subtle">
            <span>App Interface Preview</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
