import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import VoiceCommandManager from '../lib/voiceCommands';
import { useToast } from '@/hooks/use-toast';

interface VoiceControlProps {
  onSearch: (query: string) => void;
  onNavigate: (path: string) => void;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
}

export function VoiceControl({ 
  onSearch, 
  onNavigate, 
  isListening, 
  setIsListening 
}: VoiceControlProps) {
  const [voiceManager, setVoiceManager] = useState<VoiceCommandManager | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const manager = new VoiceCommandManager((command) => {
      console.log('Processing command:', command);
      
      if (command.includes('search for') || command.includes('find')) {
        const query = command
          .replace('search for', '')
          .replace('find', '')
          .trim();
        onSearch(query);
        manager.speak(`Searching for ${query}`);
      } else if (command.includes('go to') || command.includes('open')) {
        const path = command
          .replace('go to', '')
          .replace('open', '')
          .trim();
        onNavigate(path);
        manager.speak(`Navigating to ${path}`);
      } else if (command.includes('help')) {
        manager.speak('You can say: search for products, go to products, or find jackets');
      } else {
        manager.speak('Sorry, I didn\'t understand that command. Try saying help for available commands.');
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
