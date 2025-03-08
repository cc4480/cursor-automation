# AI Agent Platform Frontend

A modern React application for managing AI agents and workflows.

## Features

- 🎨 Modern UI with Material-UI components
- 🌙 Dark/Light theme support
- 🌍 Internationalization (i18n)
- 📊 Real-time analytics and charts
- 🔄 State management with Redux Toolkit
- 🔒 Secure authentication and authorization
- 📱 Responsive design
- 🧪 Comprehensive testing setup
- 📝 TypeScript for type safety
- 🛠️ Development tools and linting

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/ai-agent-platform.git
cd ai-agent-platform/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment files:
```bash
cp .env.example .env
cp .env.example .env.development
cp .env.example .env.production
```

4. Update the environment variables in the `.env` files with your configuration.

## Development

Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Building for Production

Build the application:
```bash
npm run build
```

The production build will be available in the `build` directory.

## Testing

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## Linting and Formatting

Run ESLint:
```bash
npm run lint
```

Fix ESLint issues:
```bash
npm run lint:fix
```

Format code with Prettier:
```bash
npm run format
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── store/         # Redux store configuration
├── services/      # API and other services
├── utils/         # Utility functions
├── constants/     # Application constants
├── types/         # TypeScript type definitions
├── hooks/         # Custom React hooks
├── assets/        # Static assets
└── i18n/          # Internationalization files
```

## Available Scripts

- `npm start` - Start the development server
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier

## Dependencies

### Core
- React
- TypeScript
- Material-UI
- Redux Toolkit
- React Router
- Axios
- Chart.js
- i18next

### Development
- ESLint
- Prettier
- Husky
- lint-staged
- Jest
- Testing Library

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Material-UI](https://mui.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)
- [Chart.js](https://www.chartjs.org/)
- [i18next](https://www.i18next.com/) 