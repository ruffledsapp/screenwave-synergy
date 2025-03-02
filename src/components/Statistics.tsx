
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  increment: number;
}

export const Statistics = () => {
  const [stats, setStats] = useState<StatItem[]>([
    { label: 'Active Users', value: 0, increment: 25, suffix: '+' },
    { label: 'Messages Sent', value: 0, increment: 1250, suffix: 'k' },
    { label: 'Screen Shares', value: 0, increment: 840, suffix: '+' },
    { label: 'Uptime', value: 0, increment: 99.9, suffix: '%' }
  ]);
  
  const [animate, setAnimate] = useState(false);
  
  // Animate stats when they become visible
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setAnimate(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    const statsElement = document.getElementById('statistics-section');
    if (statsElement) observer.observe(statsElement);
    
    return () => observer.disconnect();
  }, []);
  
  // Increment the numbers to create counting animation
  useEffect(() => {
    if (!animate) return;
    
    const incrementStats = () => {
      setStats(prevStats => 
        prevStats.map(stat => {
          const targetValue = stat.increment;
          const currentValue = stat.value;
          
          // Calculate step based on target value
          const step = Math.max(1, Math.ceil(targetValue / 50));
          
          if (currentValue < targetValue) {
            const newValue = Math.min(currentValue + step, targetValue);
            return { ...stat, value: newValue };
          }
          return stat;
        })
      );
    };
    
    const interval = setInterval(incrementStats, 30);
    
    // Check if all stats have reached their target
    const allDone = stats.every(stat => stat.value >= stat.increment);
    if (allDone) clearInterval(interval);
    
    return () => clearInterval(interval);
  }, [stats, animate]);
  
  return (
    <section id="statistics-section" className="py-20 px-6 md:px-10 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-bold">WatcherMy by the Numbers</h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-3xl mx-auto">
            Real-time metrics from our growing community and platform performance.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={cn(
                "glass rounded-xl p-6 text-center transition-all duration-700",
                animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                animate && `transition-delay-${index * 150}`
              )}
              style={{ transitionDelay: animate ? `${index * 150}ms` : '0ms' }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
                <span>{stat.suffix}</span>
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
