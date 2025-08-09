import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import useThemeStore from '../../stores/useThemeStore';
import useAuthStore from '../../stores/useAuthStore';
import { cn } from '../../utils/cn';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { 
    isDark, 
    language, 
    sidebarMode,
    toggleDarkMode, 
    setLanguage, 
    toggleSidebar,
    setSidebarMode
  } = useThemeStore();
  const { user, logout } = useAuthStore();
  
  const handleLanguageToggle = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    logout();
    // Redirect will be handled by route protection
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 z-50">
      <div className="flex h-16">
        {/* Left Section - Logo, System Name, Toggle (Same width as sidebar) */}
        <div className={`flex items-center justify-between px-4 border-e border-b border-gray-200 dark:border-gray-700 ${
          sidebarMode === 'slim' ? 'w-16' : 'w-64'
        }`}>
          {sidebarMode !== 'slim' && (
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-chart-line text-white text-lg" />
              </div>
              <h1 className="ltr:ml-3 rtl:mr-3 text-xl font-semibold text-gray-900 dark:text-white">
                ERP
              </h1>
            </div>
          )}
          
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
          >
            <i className="fas fa-bars text-xl" />
          </button>
          
          {sidebarMode !== 'horizontal' && (
            <button
              onClick={() => setSidebarMode(sidebarMode === 'static' ? 'slim' : 'static')}
              className="hidden lg:flex p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <i className={`fas ${sidebarMode === 'static' ? 'fa-indent' : 'fa-outdent'} text-xl`} />
            </button>
          )}
        </div>

        {/* Right Section - Main Content Area */}
        <div className="flex-1 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-lg">
            <div className="relative">
              <div className="absolute inset-y-0 ltr:left-0 rtl:right-0 ltr:pl-3 rtl:pr-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full ltr:pl-10 rtl:pr-10 ltr:pr-3 rtl:pl-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                placeholder={t('common.search')}
              />
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse ltr:ml-4 rtl:mr-4">
            {/* Language Toggle */}
            <button
              onClick={handleLanguageToggle}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <i className="fas fa-language text-xl" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'} text-xl`} />
            </button>

            {/* Notifications */}
            <Link
              to="/notifications"
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 relative"
            >
              <i className="fas fa-bell text-xl" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white dark:ring-gray-800" />
            </Link>

            {/* User Menu */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User avatar"
                />
              </Menu.Button>
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute ltr:right-0 rtl:left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 origin-top-right">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={cn(
                            'block px-4 py-2 text-sm text-gray-700 dark:text-gray-300',
                            active && 'bg-gray-100 dark:bg-gray-700'
                          )}
                        >
                          <i className="fas fa-user w-4 h-4 me-1" />
                          {t('common.profile')}
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/notifications"
                          className={cn(
                            'block px-4 py-2 text-sm text-gray-700 dark:text-gray-300',
                            active && 'bg-gray-100 dark:bg-gray-700'
                          )}
                        >
                          <i className="fas fa-bell w-4 h-4 me-1" />
                          {t('common.notifications')}
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/settings"
                          className={cn(
                            'block px-4 py-2 text-sm text-gray-700 dark:text-gray-300',
                            active && 'bg-gray-100 dark:bg-gray-700'
                          )}
                        >
                          <i className="fas fa-cog w-4 h-4 me-1" />
                          {t('navigation.settings')}
                        </Link>
                      )}
                    </Menu.Item>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                                              className={cn(
                            'block px-4 py-2 text-sm text-gray-700 dark:text-gray-300',
                            active && 'bg-gray-100 dark:bg-gray-700'
                          )}
                        >
                          <i className="fas fa-sign-out-alt w-4 h-4 me-1" />
                          {t('common.logout')}
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;