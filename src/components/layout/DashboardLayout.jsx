import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Sidebar from './Sidebar';
import SettingsModal from '../ui/SettingsModal';
import useThemeStore from '../../stores/useThemeStore';

const DashboardLayout = ({ children, title, breadcrumbs = [] }) => {
  const { t } = useTranslation();
  useThemeStore();
  const [showSettings, setShowSettings] = useState(false);

  const { sidebarMode } = useThemeStore();
  
  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <Header />
      
      {/* Horizontal Sidebar */}
      {sidebarMode === 'horizontal' && (
        <div className="fixed top-16 left-0 right-0 z-40">
          <Sidebar />
        </div>
      )}
      
      <div className={`flex ${sidebarMode === 'horizontal' ? 'pt-32' : 'pt-16'}`}>
        {/* Vertical Sidebar */}
        {sidebarMode !== 'horizontal' && <Sidebar />}
        
        <main className="flex-1 min-w-0" style={{ 
          height: sidebarMode === 'horizontal' ? 'calc(100vh - 8rem)' : 'calc(100vh - 4rem)' 
        }}>
          <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {/* Page Header with Breadcrumbs */}
            <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
              <div className="px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {breadcrumbs.length > 0 && (
                      <nav className="flex items-center" aria-label="Breadcrumb">
                        <ol className="flex items-center gap-1 text-sm">
                          <li className="flex items-center">
                            <i className="fas fa-home text-primary-500 me-2" />
                          </li>
                          {breadcrumbs.map((crumb, index) => (
                            <li key={index} className="flex items-center">
                              <i className="fas fa-chevron-right text-gray-400 text-xs mx-2 rtl:rotate-180" />
                              {crumb.href ? (
                                <Link to={crumb.href} className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                                  {t(crumb.label)}
                                </Link>
                              ) : (
                                <span className="text-gray-900 dark:text-white font-medium">
                                  {t(crumb.label)}
                                </span>
                              )}
                            </li>
                          ))}
                        </ol>
                      </nav>
                    )}
                    {title && (
                      <div className="ms-4">
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {t(title)}
                        </h1>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="p-4 sm:p-6 lg:p-6">
              {children}
            </div>
          </div>
        </main>
      </div>
      
      {/* Floating Settings Button */}
      <button
        onClick={() => setShowSettings(true)}
        className="fixed bottom-6 end-6 z-40 w-12 h-12 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
      >
        <i className="fas fa-cog text-lg" />
      </button>
      
      {/* Settings Modal */}
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </div>
  );
};

export default DashboardLayout;