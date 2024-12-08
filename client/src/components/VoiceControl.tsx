import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import VoiceCommandManager from '../lib/voiceCommands';
import { useToast } from '@/hooks/use-toast';
import { aiAgent } from '../lib/aiAgent';

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
    const manager = new VoiceCommandManager(async (command) => {
      console.log('Processing command:', command);
      
      const { intent, entities, response } = await aiAgent.processCommand(command);
      console.log('AI processed command:', { intent, entities, response });

      switch (intent) {
        case 'search':
          if (entities.product) {
            onSearch(entities.product);
            manager.speak(response);
          }
          break;
        case 'navigate':
          if (entities.product) {
            onNavigate(entities.product);
            manager.speak(response);
          }
          break;
        case 'help':
          manager.speak('You can say: search for products, go to products, find jackets, or show me blue shirts');
          break;
        default:
          manager.speak(response);
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
    if (!voiceManager) {
      toast({
        title: "Error",
        description: "Voice recognition is not supported in your browser",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      voiceManager.stop();
      setIsListening(false);
      voiceManager.speak("Voice assistant deactivated");
      setTimeout(() => {
        toast({
          title: "Voice Assistant Stopped",
          description: "No longer listening for commands",
        });
      }, 100);
    } else {
      voiceManager.start();
      setIsListening(true);
      setTimeout(() => {
        voiceManager.speak("Voice assistant activated. How can I help you?");
        toast({
          title: "Voice Assistant Active",
          description: "Listening for commands...",
        });
      }, 100);
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
