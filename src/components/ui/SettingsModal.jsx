import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Transition } from '@headlessui/react';
import useThemeStore from '../../stores/useThemeStore';

const SettingsModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { 
    isDark, 
    colorTheme, 
    sidebarMode,
    toggleDarkMode, 
    setColorTheme,
    setSidebarMode
  } = useThemeStore();

  const themes = [
    { name: 'blue', color: 'bg-blue-500' },
    { name: 'green', color: 'bg-green-500' },
    { name: 'purple', color: 'bg-purple-500' },
    { name: 'orange', color: 'bg-orange-500' },
    { name: 'teal', color: 'bg-teal-500' },
    { name: 'pink', color: 'bg-pink-500' },
  ];

  const sidebarModes = [
    { id: 'static', label: 'Static', icon: 'fas fa-bars' },
    { id: 'slim', label: 'Slim', icon: 'fas fa-indent' },
    { id: 'horizontal', label: 'Horizontal', icon: 'fas fa-ellipsis-h' }
  ];

  return (
    <Transition show={isOpen}>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <Transition.Child
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
        </Transition.Child>

        <div className="fixed inset-y-0 end-0 flex max-w-full ps-10">
          <Transition.Child
            enter="transform transition ease-in-out duration-300"
            enterFrom="translate-x-full rtl:-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full rtl:-translate-x-full"
          >
            <div className="w-screen max-w-md">
              <div className="flex h-full flex-col bg-white dark:bg-gray-800 shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t('settings.title')}
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <i className="fas fa-times text-xl" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  {/* Color Scheme */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                      {t('settings.colorScheme')}
                    </h3>
                    <div className="flex gap-3">
                      <button
                        onClick={() => !isDark && toggleDarkMode()}
                        className={`flex items-center justify-center w-16 h-12 rounded-lg border-2 transition-colors ${
                          !isDark 
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                        }`}
                      >
                        <i className="fas fa-sun text-yellow-500" />
                      </button>
                      <button
                        onClick={() => isDark && toggleDarkMode()}
                        className={`flex items-center justify-center w-16 h-12 rounded-lg border-2 transition-colors ${
                          isDark 
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                        }`}
                      >
                        <i className="fas fa-moon text-blue-500" />
                      </button>
                    </div>
                  </div>

                  {/* Theme Colors */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                      {t('settings.themeColor')}
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {themes.map((theme) => (
                        <button
                          key={theme.name}
                          onClick={() => setColorTheme(theme.name)}
                          className={`flex flex-col items-center p-3 rounded-lg border-2 transition-colors ${
                            colorTheme === theme.name
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full ${theme.color} mb-2`} />
                          <span className="text-xs text-gray-700 dark:text-gray-300 capitalize">
                            {theme.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sidebar Mode */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                      Menu Mode
                    </h3>
                    <div className="space-y-2">
                      {sidebarModes.map((mode) => (
                        <button
                          key={mode.id}
                          onClick={() => setSidebarMode(mode.id)}
                          className={`w-full flex items-center p-3 rounded-lg border-2 transition-colors ${
                            sidebarMode === mode.id
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                          }`}
                        >
                          <i className={`${mode.icon} text-gray-600 dark:text-gray-400 me-3`} />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {mode.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </div>
    </Transition>
  );
};

export default SettingsModal;