
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CountdownProps {
  targetDate: Date;
  title: string;
  subtitle: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC<CountdownProps> = ({ 
  targetDate, 
  title, 
  subtitle 
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ 
    days: 0, 
    hours: 0, 
    minutes: 0, 
    seconds: 0 
  });
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        // Handle countdown completed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    
    calculateTimeLeft();
    const timerId = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timerId);
  }, [targetDate]);
  
  return (
    <section className="py-16 px-6 md:px-10">
      <div className="max-w-4xl mx-auto glass rounded-2xl p-8 md:p-12 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        
        <div className="relative z-10 text-center">
          <h2 className="font-bold text-3xl md:text-4xl">{title}</h2>
          <p className="text-muted-foreground mt-4 mb-10 text-lg">{subtitle}</p>
          
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(timeLeft).map(([key, value]) => (
              <div key={key} className="flex flex-col items-center">
                <div className="bg-background/80 backdrop-blur-sm w-full py-5 rounded-lg mb-2">
                  <span className="text-3xl md:text-4xl font-bold">{value}</span>
                </div>
                <span className="text-sm md:text-base capitalize text-muted-foreground">
                  {key}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-10">
            <button
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Notified
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;
