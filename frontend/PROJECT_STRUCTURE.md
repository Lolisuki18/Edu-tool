# Edu Tool Frontend

React + TypeScript + Tailwind CSS application

## 📁 Project Structure

```
src/
├── assets/          # Static assets (images, fonts, etc.)
├── components/      # Reusable components
│   ├── common/      # Common UI components (Button, Input, etc.)
│   └── layout/      # Layout components (Header, Footer, MainLayout)
├── constants/       # Application constants
│   ├── api.ts       # API endpoints
│   ├── config.ts    # App configuration
│   └── routes.ts    # Route paths
├── hooks/           # Custom React hooks
│   ├── useDebounce.ts
│   └── useLocalStorage.ts
├── pages/           # Page components
│   ├── HomePage.tsx
│   └── DashboardPage.tsx
├── services/        # API services
│   ├── api.service.ts
│   └── auth.service.ts
├── types/           # TypeScript type definitions
│   ├── api.types.ts
│   ├── common.types.ts
│   └── user.types.ts
└── utils/           # Utility functions
    ├── cn.ts         # Tailwind class merger
    ├── formatters.ts # Format functions
    └── helpers.ts    # Helper functions
```

## 🚀 Getting Started

### Install dependencies

\`\`\`bash
npm install
\`\`\`

### Run development server

\`\`\`bash
npm run dev
\`\`\`

### Build for production

\`\`\`bash
npm run build
\`\`\`

## 🛠 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **React Router** - Routing
- **Axios** - HTTP client
- **Vite** - Build tool

## 📝 Key Features

- ✅ Path aliases configured (`@/` points to `src/`)
- ✅ Tailwind CSS v4 with Vite plugin
- ✅ React Router setup
- ✅ API service layer with Axios
- ✅ Custom hooks (useDebounce, useLocalStorage)
- ✅ Reusable UI components (Button, Input)
- ✅ Layout components (Header, Footer, MainLayout)
- ✅ TypeScript types organized
- ✅ Utility functions

## 🔧 Environment Variables

Create a `.env` file:
\`\`\`
VITE_API_BASE_URL=http://localhost:8080/api
\`\`\`
