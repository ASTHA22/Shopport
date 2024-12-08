import type { SpeechRecognition, SpeechRecognitionEvent, SpeechRecognitionError } from './types';

type CommandHandler = (command: string) => void;

class VoiceCommandManager {
  private recognition: SpeechRecognition | null = null;
  private synthesis: SpeechSynthesis;
  private isListening: boolean = false;
  private commandHandler: CommandHandler;

  constructor(commandHandler: CommandHandler) {
    this.commandHandler = commandHandler;
    this.synthesis = window.speechSynthesis;
    
    // Cancel any ongoing speech
    this.synthesis.cancel();
    
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      this.setupRecognition();
    }
  }

  private setupRecognition() {
    if (!this.recognition) return;

    this.recognition.continuous = true;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[event.results.length - 1];
      if (result.isFinal) {
        const command = result[0].transcript.toLowerCase();
        console.log('Voice command received:', command);
        this.speak(`Processing command: ${command}`);
        this.commandHandler(command);
      }
    };

    this.recognition.onerror = (event: SpeechRecognitionError) => {
      console.error('Speech recognition error:', event.error);
      this.speak('Sorry, I had trouble hearing you. Please try again.');
    };

    this.recognition.onend = () => {
      if (this.isListening) {
        console.log('Restarting recognition...');
        this.recognition?.start();
      }
    };
  }

  public start() {
    if (!this.recognition) {
      this.speak('Speech recognition is not supported in this browser.');
      return;
    }

    if (!this.isListening) {
      this.recognition.start();
      this.isListening = true;
    }
  }

  public stop() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  public speak(text: string) {
    // Cancel any ongoing speech
    this.synthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = 'en-US';
    
    // Add error handling
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
    };
    
    // Ensure voices are loaded
    if (this.synthesis.getVoices().length === 0) {
      this.synthesis.addEventListener('voiceschanged', () => {
        this.synthesis.speak(utterance);
      }, { once: true });
    } else {
      this.synthesis.speak(utterance);
    }
  }

  public isSupported(): boolean {
    return !!this.recognition;
  }
}

export default VoiceCommandManager;
