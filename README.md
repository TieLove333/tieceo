# TIE CEO - $1B Solo SaaS Challenge

## Project Overview

This project leverages Purity UI Dashboard, a modern and responsive dashboard template built with Chakra UI, to create a cutting-edge SaaS platform.

## 🚀 Technology Stack

- **Frontend**: Next.js 14
- **UI Framework**: 
  - [Chakra UI](https://chakra-ui.com/)
  - [Purity UI Dashboard](https://demos.creative-tim.com/purity-ui-dashboard/)
- **Database**: Supabase PostgreSQL
- **Styling**: Tailwind CSS
- **Icons**: React Icons

## 🔧 Installation and Setup

### Prerequisites

- Node.js LTS (recommended version)
- npm or yarn
- Supabase account

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/tie-ceo.git
   cd tie-ceo
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in Supabase and other necessary credentials

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 🎨 Purity UI Dashboard Integration

### Chakra UI Theme Customization

We've extended the default Chakra UI theme to match our design requirements. Key customizations are in `app/theme/theme.js`:

```typescript
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  },
  // Additional theme customizations
})
```

### Key UI Components

- **Sidebar**: Custom implementation in `app/components/dashboard/Sidebar.tsx`
- **Layout**: Responsive design with `RootLayoutClient`
- **Providers**: Wrapped with `ChakraProvider` for theme and styling consistency

## 💾 Database Integration

### Supabase Setup

- **ORM/Query Tool**: Custom `db.js` utility for database operations
- **Connection**: Managed through Supabase PostgreSQL
- **Authentication**: Supabase Auth (coming soon)

### Database Utility

The `db.js` utility provides a clean, abstracted way to interact with the database:

```typescript
// Example database operation
import { db } from './utils/db'

async function getUserData() {
  const { data, error } = await db
    .from('users')
    .select('*')
}
```

## 🚧 Development Guidelines

1. Always use the development server on port 3335
2. Commit and push changes only after team review
3. Keep environment variables secure and never commit sensitive information
4. Follow Chakra UI and Purity UI design principles

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Chakra UI Documentation](https://chakra-ui.com/docs)
- [Purity UI Dashboard Docs](https://demos.creative-tim.com/docs-purity-ui-dashboard/)
- [Supabase Documentation](https://supabase.com/docs)

## 🤝 Contributing

Please read `TIE-CEO-GUIDELINES.md` before contributing to the project.

## 📝 License

[Your License Here]

Made with ❤️ by Tie.ceo Team
