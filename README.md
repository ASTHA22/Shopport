# Shopport - Voice-Assisted Shopping Assistant

A modern voice-controlled shopping application for apparel with a beautiful UI. Shop hands-free using natural voice commands while enjoying a responsive and intuitive interface.

Demo link: https://drive.google.com/file/d/1gLEuX40PlhmoKtinK02-pSy7eXRe4kYH/view?usp=drive_link 

Webpage link: https://34680d0d-3e53-4650-808e-1197903732ff-00-101n04iji6inm.kirk.repl.co

![Shopport Screenshot](https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070)

## Features

- 🗣️ **Voice Control**: Natural language voice commands for browsing and shopping
- 🛍️ **Smart Product Search**: Search products using voice or text
- 🛒 **Real-time Cart Management**: Add, update, or remove items seamlessly
- 📱 **PWA Support**: Install as a native app on any device
- 🎯 **Responsive Design**: Beautiful UI that works on all screen sizes
- 🔍 **Natural Language Processing**: Smart command interpretation using Compromise.js

## Tech Stack

- **Frontend**:
  - React with TypeScript
  - Shadcn UI Components
  - TailwindCSS for styling
  - React Query for state management
  - Wouter for routing

- **Backend**:
  - Express.js
  - PostgreSQL with Drizzle ORM
  - Natural Language Processing with Compromise.js

## Voice Commands

The application responds to natural voice commands such as:
- "Show me jackets"
- "Search for blue shirts"
- "Add this to cart"
- "Go to products"

## Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
cd shopport
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
# Create a PostgreSQL database and set the DATABASE_URL environment variable
npm run db:push
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Development

The project uses a modern full-stack JavaScript architecture:
- Frontend code is in `client/src`
- Backend routes are in `server/routes.ts`
- Database schema is in `db/schema.ts`

## Progressive Web App

Shopport is a Progressive Web App (PWA) that can be installed on:
- iOS devices via Safari
- Android devices via Chrome
- Desktop via supported browsers

## Deployment

The application is configured for deployment on various platforms:
```bash
# Build for production
npm run build

# Start production server
npm run start
```

## Future Features

- Voice-based size recommendations
- Virtual try-on capabilities
- Advanced voice analytics
- Personalized product recommendations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
