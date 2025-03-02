
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CountdownTimer from '@/components/CountdownTimer';
import { 
  ArrowRight, 
  Check, 
  MessageSquare, 
  Share2, 
  Shield, 
  Code, 
  Sparkles
} from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const Launch = () => {
  const [email, setEmail] = useState('');
  
  // Calculate launch date (30 days from now)
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);
  
  // Feature roadmap
  const roadmapItems = [
    {
      version: 'v1.0',
      title: 'Initial Release',
      date: 'Coming Soon',
      status: 'upcoming',
      features: [
        'Basic Chat Functionality',
        'One-to-One Screen Sharing',
        'User Authentication',
        'Basic Analytics via Gypbit'
      ]
    },
    {
      version: 'v1.2',
      title: 'Enterprise Features',
      date: 'Q3 2023',
      status: 'planned',
      features: [
        'Group Screen Sharing',
        'Recording Sessions',
        'Advanced Gypbit Integration',
        'Admin Dashboard'
      ]
    },
    {
      version: 'v2.0',
      title: 'Full Platform Release',
      date: 'Q4 2023',
      status: 'roadmap',
      features: [
        'Mobile Applications',
        'API for Custom Integrations',
        'Extended Analytics',
        'White-labeling Options'
      ]
    }
  ];
  
  // Handle email subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email to subscribe.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would send to a backend API
    console.log("Subscribing email:", email);
    
    toast({
      title: "Successfully Subscribed!",
      description: "You'll be notified when WatcherMy launches.",
      variant: "default"
    });
    
    setEmail('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-10 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="mr-2 h-4 w-4" />
              Coming Soon
            </span>
            <h1 className="font-bold text-balance">
              The Future of <span className="text-primary">Real-Time</span> Communication
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
              WatcherMy is preparing to revolutionize how teams collaborate with seamless chat 
              and screen sharing enhanced by Gypbit integration.
            </p>
          </div>
          
          <CountdownTimer 
            targetDate={launchDate}
            title="Official Launch Countdown"
            subtitle="The wait is almost over. Get ready for a new era of communication."
          />
        </div>
      </section>
      
      {/* Email Subscription */}
      <section className="py-12 px-6 md:px-10">
        <div className="max-w-3xl mx-auto glass rounded-xl p-8 md:p-10">
          <h3 className="text-2xl font-semibold text-center mb-6">Be the First to Know</h3>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Notify Me
            </button>
          </form>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            We'll never share your email with anyone else.
          </p>
        </div>
      </section>
      
      {/* Product Roadmap */}
      <section className="py-24 px-6 md:px-10 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-bold">Product Roadmap</h2>
            <p className="text-muted-foreground text-lg mt-4 max-w-3xl mx-auto">
              Our development timeline and upcoming features
            </p>
          </div>
          
          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <div key={index} className="glass rounded-xl p-8 relative">
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                  item.status === 'upcoming' ? 'bg-primary/20 text-primary' :
                  item.status === 'planned' ? 'bg-orange-500/20 text-orange-500' :
                  'bg-purple-500/20 text-purple-500'
                }`}>
                  {item.status}
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="md:w-1/3">
                    <h3 className="text-2xl font-bold">{item.version}</h3>
                    <h4 className="text-xl">{item.title}</h4>
                    <p className="text-muted-foreground mt-2">{item.date}</p>
                  </div>
                  
                  <div className="md:w-2/3">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {item.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start">
                          <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Tech Stack */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-bold mb-12">Powered By Modern Technology</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="glass p-6 rounded-xl flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-primary/10 mb-4">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold">React + TypeScript</h3>
            </div>
            
            <div className="glass p-6 rounded-xl flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-primary/10 mb-4">
                <Share2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold">WebRTC</h3>
            </div>
            
            <div className="glass p-6 rounded-xl flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-primary/10 mb-4">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold">Socket.io</h3>
            </div>
            
            <div className="glass p-6 rounded-xl flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-primary/10 mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold">Gypbit Integration</h3>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-6 md:px-10 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-10 md:p-16 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10">
              <h2 className="font-bold">Want to be a Beta Tester?</h2>
              
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-6">
                Get exclusive early access to WatcherMy before the official launch and help shape the future of the platform.
              </p>
              
              <div className="mt-10">
                <Link
                  to="/chat"
                  className="inline-flex items-center px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] group"
                >
                  <span className="flex items-center justify-center">
                    Apply for Beta Access
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

export default Launch;
