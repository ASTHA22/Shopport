import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import VoiceCommandManager from '../lib/voiceCommands';
import { useToast } from '@/hooks/use-toast';

interface VoiceControlProps {
  onSearch: (query: string) => void;
  onNavigate: (path: string) => void;
}

export function VoiceControl({ onSearch, onNavigate }: VoiceControlProps) {
  const [isListening, setIsListening] = useState(false);
  const [voiceManager, setVoiceManager] = useState<VoiceCommandManager | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const manager = new VoiceCommandManager((command) => {
      if (command.includes('search for')) {
        const query = command.replace('search for', '').trim();
        onSearch(query);
        manager.speak(`Searching for ${query}`);
      } else if (command.includes('go to')) {
        const path = command.replace('go to', '').trim();
        onNavigate(path);
        manager.speak(`Navigating to ${path}`);
      }
    });

    setVoiceManager(manager);

    return () => {
      if (voiceManager) {
        voiceManager.stop();
      }
    };
  }, [onSearch, onNavigate]);

  const toggleListening = () => {
    if (!voiceManager) return;

    if (isListening) {
      voiceManager.stop();
      setIsListening(false);
      toast({
        title: "Voice Assistant Stopped",
        description: "No longer listening for commands",
      });
    } else {
      voiceManager.start();
      setIsListening(true);
      toast({
        title: "Voice Assistant Active",
        description: "Listening for commands...",
      });
      voiceManager.speak("Voice assistant activated. How can I help you?");
    }
  };

  if (!voiceManager?.isSupported()) {
    return null;
  }

  return (
    <Button
      variant={isListening ? "destructive" : "default"}
      size="icon"
      onClick={toggleListening}
      className="fixed bottom-4 right-4 rounded-full w-12 h-12"
    >
      {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
    </Button>
  );
}
