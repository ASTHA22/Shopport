type CommandHandler = (command: string) => void;

class VoiceCommandManager {
  private recognition: SpeechRecognition | null = null;
  private synthesis: SpeechSynthesis;
  private isListening: boolean = false;
  private commandHandler: CommandHandler;

  constructor(commandHandler: CommandHandler) {
    this.commandHandler = commandHandler;
    this.synthesis = window.speechSynthesis;
    
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

    this.recognition.onresult = (event) => {
      const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
      this.commandHandler(command);
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      this.speak('Sorry, I had trouble hearing you.');
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
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;
    this.synthesis.speak(utterance);
  }

  public isSupported(): boolean {
    return !!this.recognition;
  }
}

export default VoiceCommandManager;
