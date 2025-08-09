import { create } from 'zustand';
import { subscribeWithSelector, persist } from 'zustand/middleware';

const useThemeStore = create(
  persist(
    (set, get) => ({
      // Theme state
      isDark: false,
      colorTheme: 'blue',
      language: 'en',
      direction: 'ltr',
      sidebarCollapsed: false,
      sidebarMode: 'static', // 'static', 'slim', 'horizontal'

      // Theme actions
      toggleDarkMode: () => {
        const newIsDark = !get().isDark;
        set({ isDark: newIsDark });
        
        // Apply to document
        if (newIsDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      setColorTheme: (theme) => {
        set({ colorTheme: theme });
        
        // Remove all theme classes
        const themes = ['theme-blue', 'theme-green', 'theme-purple', 'theme-orange', 'theme-teal', 'theme-pink'];
        themes.forEach(t => document.documentElement.classList.remove(t));
        
        // Add new theme class
        document.documentElement.classList.add(`theme-${theme}`);
      },

      setLanguage: (lang) => {
        const newDirection = lang === 'ar' ? 'rtl' : 'ltr';
        set({ language: lang, direction: newDirection });
        
        // Apply to document
        document.documentElement.setAttribute('dir', newDirection);
        document.documentElement.setAttribute('lang', lang);
      },

      toggleSidebar: () => {
        set({ sidebarCollapsed: !get().sidebarCollapsed });
      },

      setSidebarMode: (mode) => {
        set({ sidebarMode: mode });
      },

      cycleSidebarMode: () => {
        const { sidebarMode } = get();
        const modes = ['static', 'slim', 'horizontal'];
        const currentIndex = modes.indexOf(sidebarMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        set({ sidebarMode: modes[nextIndex] });
      },

      // Initialize theme on app start
      initializeTheme: () => {
        const { isDark, colorTheme, language, direction } = get();
        
        // Apply dark mode
        if (isDark) {
          document.documentElement.classList.add('dark');
        }
        
        // Apply color theme
        document.documentElement.classList.add(`theme-${colorTheme}`);
        
        // Apply language and direction
        document.documentElement.setAttribute('dir', direction);
        document.documentElement.setAttribute('lang', language);
      },
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({
        isDark: state.isDark,
        colorTheme: state.colorTheme,
        language: state.language,
        direction: state.direction,
        sidebarCollapsed: state.sidebarCollapsed,
        sidebarMode: state.sidebarMode,
      }),
    }
  )
);

export default useThemeStore;