# React ERP System

A modern React-based ERP (Enterprise Resource Planning) system built with cutting-edge technologies.

## 🚀 Features

- **Modern React** - Built with React 19+ and functional components
- **State Management** - Zustand for efficient state management
- **Routing** - React Router for navigation
- **Internationalization** - react-i18next for English/Arabic support with RTL/LTR
- **Theming** - Dynamic theme switching with 6 color schemes
- **Dark/Light Mode** - Automatic theme detection with manual toggle
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Authentication** - JWT-based auth with protected routes
- **API Layer** - Axios with interceptors for API communication
- **UI Components** - Reusable components with Headless UI
- **Charts** - ApexCharts integration ready
- **Notifications** - React Hot Toast for user feedback

## 🛠️ Tech Stack

- **React 19** - Frontend framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **React Router** - Client-side routing
- **React i18next** - Internationalization
- **Axios** - HTTP client
- **React Query** - Server state management
- **Headless UI** - Unstyled UI components
- **ApexCharts** - Data visualization
- **React Hot Toast** - Notifications

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── layout/          # Layout components
│   └── ProtectedRoute.jsx
├── pages/               # Page components
├── stores/              # Zustand stores
├── services/            # API services
├── hooks/               # Custom hooks
├── utils/               # Utility functions
├── locales/             # i18n translations
└── types/               # TypeScript types (if needed)
```

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## 🔐 Authentication

The system includes a mock authentication system. Use any email/password to login.

Default credentials for testing:
- Email: any valid email
- Password: any password

## 🌐 Internationalization

The system supports:
- **English (LTR)** - Left-to-right layout
- **Arabic (RTL)** - Right-to-left layout

Language can be switched using the language toggle in the header.

## 🎨 Theming

6 built-in color themes:
- Blue (default)
- Green
- Purple
- Orange
- Teal
- Pink

Themes can be switched using the palette icon in the header.

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🔧 Configuration

Environment variables can be set in `.env` file:

```env
VITE_API_URL=http://localhost:3001/api
```

## 📊 Charts Integration

ApexCharts is ready to use. Example usage:

```jsx
import Chart from 'react-apexcharts';

const options = {
  chart: { type: 'line' },
  xaxis: { categories: ['Jan', 'Feb', 'Mar'] }
};

const series = [{
  name: 'Sales',
  data: [30, 40, 35]
}];

<Chart options={options} series={series} type="line" height={350} />
```

## 🚀 Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting provider.

## 📄 License

This project is licensed under the MIT License."# ERP_SYSTEM_TEMPLATE" 
