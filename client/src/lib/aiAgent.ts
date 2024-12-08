import nlp from 'compromise';
import numbers from 'compromise-numbers';

nlp.extend(numbers);

interface AIResponse {
  intent: string;
  entities: {
    product?: string;
    category?: string;
    size?: string;
    color?: string;
    price?: number;
  };
  confidence: number;
  response: string;
}

class AIAgent {
  private static instance: AIAgent;
  private commands: Map<string, RegExp>;

  private constructor() {
    this.commands = new Map([
      ['search', /(?:search for|find|show me|looking for)\s+(.+)/i],
      ['navigate', /(?:go to|open|navigate to)\s+(.+)/i],
      ['filter', /(?:filter|show)\s+(\w+)\s+(?:by|in|with)\s+(.+)/i],
      ['cart', /(?:add|remove|update)\s+(.+)\s+(?:to|from|in)\s+(?:the\s+)?cart/i],
    ]);
  }

  public static getInstance(): AIAgent {
    if (!AIAgent.instance) {
      AIAgent.instance = new AIAgent();
    }
    return AIAgent.instance;
  }

  public async processCommand(command: string): Promise<AIResponse> {
    const doc = nlp(command);
    let intent = 'unknown';
    let entities = {};
    let confidence = 0;
    let response = '';

    // Try to match known command patterns
    for (const [cmdIntent, pattern] of this.commands) {
      if (pattern.test(command)) {
        intent = cmdIntent;
        confidence = 0.8;
        break;
      }
    }

    // Extract entities using compromise
    const terms = doc.match('#Noun+').out('array');
    const colors = doc.match('#Color').out('array');
    const numbers = doc.numbers().out('array');
    const sizes = doc.match('(small|medium|large|xl|xxl)').out('array');

    entities = {
      product: terms[0],
      category: terms[1],
      color: colors[0],
      size: sizes[0],
      price: numbers[0]
    };

    // Generate appropriate response
    switch (intent) {
      case 'search':
        response = `I'll help you find ${terms.join(' ')}`;
        break;
      case 'navigate':
        response = `Taking you to ${terms.join(' ')}`;
        break;
      case 'filter':
        response = `Filtering ${terms[0]} by ${terms[1]}`;
        break;
      case 'cart':
        response = `I'll ${command.includes('add') ? 'add' : 'update'} that in your cart`;
        break;
      default:
        response = "I'm not sure what you want. Try saying 'help' for available commands.";
        confidence = 0.2;
    }

    return {
      intent,
      entities,
      confidence,
      response
    };
  }
}

export const aiAgent = AIAgent.getInstance();
