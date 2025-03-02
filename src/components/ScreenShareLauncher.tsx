
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share, Monitor, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface ScreenShareLauncherProps {
  onComplete?: () => void;
}

const ScreenShareLauncher: React.FC<ScreenShareLauncherProps> = ({ onComplete }) => {
  const [isStarting, setIsStarting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'requesting' | 'active' | 'error'>('idle');
  const navigate = useNavigate();

  const handleStartScreenShare = async () => {
    try {
      setIsStarting(true);
      setStatus('requesting');
      
      // Request screen sharing permission from browser
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      
      // This would normally connect to WebRTC or other service
      console.log('Screen sharing started', stream.id);
      
      // Update status
      setStatus('active');
      toast({
        title: "Screen Share Active",
        description: "Your screen is now being shared",
      });
      
      // Store stream info in sessionStorage so chat page can access it
      sessionStorage.setItem('screenShareActive', 'true');
      sessionStorage.setItem('screenShareStreamId', stream.id);
      
      // Navigate to chat after successful screen share
      setTimeout(() => {
        navigate('/chat');
        if (onComplete) onComplete();
      }, 1000);
      
      // Add listener for when user stops sharing
      stream.getVideoTracks()[0].addEventListener('ended', () => {
        console.log('User ended screen share');
        sessionStorage.removeItem('screenShareActive');
        sessionStorage.removeItem('screenShareStreamId');
        setStatus('idle');
      });
    } catch (error) {
      console.error('Error starting screen share:', error);
      setStatus('error');
      toast({
        title: "Screen Share Failed",
        description: "Could not start screen sharing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-secondary/30 rounded-xl p-6 shadow-lg">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Monitor className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Launch Screen Sharing</h3>
        <p className="text-muted-foreground">
          Start sharing your screen to begin a collaborative session
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center p-3 bg-background rounded-lg">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
            status === 'active' ? 'bg-green-100' : 'bg-primary/10'
          }`}>
            {status === 'active' ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Share className="h-4 w-4 text-primary" />
            )}
          </div>
          <div>
            <p className="font-medium">Browser Screen Sharing</p>
            <p className="text-sm text-muted-foreground">
              {status === 'idle' && "Ready to start"}
              {status === 'requesting' && "Requesting permission..."}
              {status === 'active' && "Screen sharing active"}
              {status === 'error' && "Error starting screen share"}
            </p>
          </div>
        </div>

        <Button 
          className="w-full" 
          onClick={handleStartScreenShare}
          disabled={isStarting || status === 'active'}
        >
          {isStarting ? "Starting..." : "Start Screen Share"}
        </Button>
        
        {status === 'error' && (
          <div className="flex items-center text-sm text-red-500 mt-2">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span>Could not start screen sharing. Please check your browser permissions.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScreenShareLauncher;
