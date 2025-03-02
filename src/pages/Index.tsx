
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Statistics from '@/components/Statistics';
import CountdownTimer from '@/components/CountdownTimer';
import { ArrowRight, MessageCircle, Share, Shield, Zap } from 'lucide-react';

const Index = () => {
  // Feature section data
  const features = [
    {
      icon: <MessageCircle className="h-8 w-8 text-primary" />,
      title: "Real-time Messaging",
      description: "Exchange messages instantly with individuals or groups. Enjoy rich text formatting, emoji reactions, and media sharing."
    },
    {
      icon: <Share className="h-8 w-8 text-primary" />,
      title: "Screen Sharing",
      description: "Share your screen with a single click. Perfect for presentations, troubleshooting, and collaborative work sessions."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Secure Communication",
      description: "End-to-end encryption ensures your conversations and shared content remain private and secure at all times."
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Seamless Integration",
      description: "Connects with your favorite tools and platforms for a unified workspace experience without switching contexts."
    }
  ];

  // Set the launch date to 30 days from now
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Statistics Section */}
      <Statistics />
      
      {/* Features Section */}
      <section id="features" className="py-24 px-6 md:px-10 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-bold">Powerful Features</h2>
            <p className="text-muted-foreground text-lg">
              Discover the tools that make WatcherMy the perfect solution for teams and individuals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass rounded-xl p-8 transition-all hover:shadow-md hover:translate-y-[-4px]"
              >
                <div className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Countdown Timer Section */}
      <CountdownTimer 
        targetDate={launchDate}
        title="Full Release Coming Soon"
        subtitle="Get ready for the complete WatcherMy experience with advanced screen sharing and Gypbit integration."
      />
      
      {/* CTA Section */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-2xl p-10 md:p-16 text-center space-y-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10">
              <h2 className="font-bold max-w-2xl mx-auto">
                Ready to Transform Your Communication Experience?
              </h2>
              
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-6">
                Join thousands of professionals who've already upgraded to the most elegant communication platform.
              </p>
              
              <div className="mt-10">
                <Link
                  to="/chat"
                  className="inline-flex items-center px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] group"
                >
                  <span className="flex items-center justify-center">
                    Get Started Now
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
