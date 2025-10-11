# Price Check Frontend

A React application for checking prices of products at JB Hi-Fi

## Tech Stack

- **React 18** - UI library
- **TypeScript 5** - Type safety
- **Vite 6** - Build tool and dev server
- **Material-UI** - Component library
- **Zustand** - State management
- **React Router** - Routing
- **Chart.js** - Data visualization
- **ESLint 9 + Prettier** - Code quality and formatting

## Getting Started

### Prerequisites

- Node.js 22.11.0 or higher
- Yarn package manager

### Installation

```bash
yarn install
```

### Environment Variables

Create a `.env` file in the root directory:

```
PORT=3005
```

## Available Scripts

### `yarn dev`

Runs the app in development mode with hot module replacement (HMR).

- Opens automatically at [http://localhost:3005](http://localhost:3005)
- Changes are reflected instantly without full page reload
- TypeScript errors and linting warnings appear in the console

### `yarn build`

Builds the app for production to the `build` folder.

- Runs TypeScript compiler for type checking
- Creates optimized bundles with code splitting
- Minifies code and includes content hashes in filenames
- Ready for deployment

### `yarn preview`

Preview the production build locally before deploying.

- Serves the built app from the `build` folder
- Useful for testing production optimizations

### `yarn lint`

Runs ESLint to check for code quality issues.

- Checks for unused variables, React best practices, and more
- Enforces string literals without curly braces in JSX props

### `yarn lint:fix`

Automatically fixes ESLint issues where possible.

- Removes unnecessary curly braces from string props
- Fixes formatting issues
- Run this before committing code

### `yarn format`

Formats code with Prettier.

- Ensures consistent code style across the project
- Formats TypeScript, JavaScript, JSON, CSS, and Markdown files

### `yarn format:check`

Checks if code is properly formatted without making changes.

- Useful for CI/CD pipelines
- Returns error if any files need formatting

## Code Quality

This project uses:

- **ESLint v9** with TypeScript, React, and React Hooks plugins
- **Prettier** for consistent code formatting
- **TypeScript strict mode** for maximum type safety

### VSCode Setup

For the best development experience, install these extensions:

- ESLint
- Prettier - Code formatter

Add to your VSCode settings:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esrvscode.vscode-prettier",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Project Structure

```
price-check-fe/
├── src/
│   ├── components/      # React components
│   ├── hooks/           # Custom React hooks
│   ├── helpers/         # Utility functions
│   ├── types/           # TypeScript type definitions
│   ├── constants.ts     # App constants
│   ├── App.tsx          # Main app component
│   └── index.tsx        # Entry point
├── public/              # Static assets
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── eslint.config.js     # ESLint configuration
```

## Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Material-UI Documentation](https://mui.com/)
