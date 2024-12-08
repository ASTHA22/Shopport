# Shopport - Voice-Assisted Shopping Platform

Shopport is a modern, voice-controlled shopping platform that allows users to browse and purchase apparel using natural language commands. It combines the power of voice recognition with an intuitive shopping experience.

## 🌟 Features

- **Voice Control**: Natural language commands for browsing and shopping
- **Smart Search**: AI-powered product search and recommendations
- **Real-time Cart Management**: Dynamic cart updates with instant price calculations
- **Responsive Design**: Beautiful UI that works on all devices
- **PWA Support**: Install as a standalone app on mobile devices

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for blazing-fast development
- Shadcn UI + Tailwind CSS for styling
- React Query for state management
- Wouter for lightweight routing

### Backend
- Express.js server
- PostgreSQL database
- Drizzle ORM for type-safe database operations
- WebSocket support for real-time features

### AI & Voice Features
- Web Speech API for voice recognition
- Natural Language Processing using Compromise.js
- (Planned) Integration with AI services for:
  - Personalized product recommendations
  - Smart size/fit assistance
  - Advanced voice analytics

## 🚀 Getting Started

### Prerequisites
- Node.js v20 or higher
- PostgreSQL 16
- npm or yarn package manager

### Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/shopport.git
cd shopport
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables
\`\`\`bash
# Create a .env file with the following
DATABASE_URL=postgresql://user:password@localhost:5432/shopport
\`\`\`

4. Initialize the database
\`\`\`bash
npm run db:push
\`\`\`

5. Start the development server
\`\`\`bash
npm run dev
\`\`\`

The application will be available at \`http://localhost:5000\`

## 📖 Voice Commands

Users can interact with the application using various voice commands:

- "Search for blue shirts"
- "Show me dresses"
- "Find jackets under $100"
- "Add this item to cart"
- "Navigate to products"

## 🔄 Workflow

The application follows a modern development workflow:

1. **Development**: \`npm run dev\`
2. **Building**: \`npm run build\`
3. **Production**: \`npm run start\`

## 🔜 Upcoming Features

- Integration with OpenAI/Anthropic for advanced product recommendations
- Virtual try-on capabilities
- Voice-based size and fit assistance
- Advanced voice analytics for better user understanding
- Personalized shopping experiences based on user preferences

## 📱 Progressive Web App

Shopport is available as a Progressive Web App (PWA), allowing users to:
- Install it on their devices
- Access it offline
- Receive push notifications
- Get app-like experience on mobile devices

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
