import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import useThemeStore from './stores/useThemeStore';
import useAuthStore from './stores/useAuthStore';
import { createRoutes } from './router/routes';
import './locales/i18n';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { initializeTheme } = useThemeStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            {createRoutes(isAuthenticated).map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
          
          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--toast-bg)',
                color: 'var(--toast-color)',
              },
              success: {
                iconTheme: {
                  primary: 'rgb(34, 197, 94)',
                  secondary: 'white',
                },
              },
              error: {
                iconTheme: {
                  primary: 'rgb(239, 68, 68)',
                  secondary: 'white',
                },
              },
            }}
          />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;