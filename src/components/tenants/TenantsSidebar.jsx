import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Transition } from '@headlessui/react';
import useThemeStore from '../../stores/useThemeStore';
import { cn } from '../../utils/cn';

// Tenants menu configuration
const tenantsMenuConfig = [
  {
    id: 'tenants-overview',
    title: 'navigation.overview',
    path: '/tenants',
    icon: 'fas fa-tachometer-alt'
  },
  {
    id: 'tenants-list',
    title: 'navigation.tenantsList',
    path: '/tenants/list',
    icon: 'fas fa-list'
  },
  {
    id: 'subscription-plans',
    title: 'navigation.subscriptionPlans',
    path: '/tenants/plans',
    icon: 'fas fa-credit-card'
  }
];

// Horizontal Sidebar Component
const HorizontalTenantsSidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="px-4 py-2">
        <div className="flex items-center space-x-6 overflow-x-auto scrollbar-hide">
          {tenantsMenuConfig.map(item => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.id}
                to={item.path}
                className={cn(
                  'flex items-center p-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap',
                  active ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
              >
                <i className={`${item.icon} w-4 h-4 mx-1`} />
                {t(item.title)}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Slim Sidebar Component
const SlimTenantsSidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { sidebarCollapsed, toggleSidebar } = useThemeStore();
  const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 });
  const sidebarRef = useRef(null);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleItemClick = (item, event) => {
    event.preventDefault();
    navigate(item.path);
  };

  const showTooltip = (text, event) => {
    if (window.innerWidth < 1024) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const isRTL = document.dir === 'rtl';
    setTooltip({
      show: true,
      text,
      x: isRTL ? rect.left - 8 : rect.right + 8,
      y: rect.top + rect.height / 2
    });
  };

  const hideTooltip = () => {
    setTooltip({ show: false, text: '', x: 0, y: 0 });
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      {!sidebarCollapsed && (
        <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden" onClick={toggleSidebar} />
      )}

      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed inset-y-0 start-0 z-50 bg-white dark:bg-gray-800 shadow-lg border-e border-gray-200 dark:border-gray-700 lg:static lg:inset-0 transition-all duration-300 w-16 ${
          sidebarCollapsed ? 'ltr:-translate-x-full rtl:translate-x-full lg:translate-x-0' : 'translate-x-0'
        }`}
      >
        <nav className="py-4 pb-10 overflow-y-auto scrollbar-hide" style={{height: 'calc(100vh - 4rem)'}}>
          <div className="space-y-1">
            {tenantsMenuConfig.map(item => {
              const active = isActive(item.path);
              return (
                <div key={item.id} className="relative p-2">
                  <button
                    onClick={(e) => handleItemClick(item, e)}
                    onMouseEnter={(e) => showTooltip(t(item.title), e)}
                    onMouseLeave={hideTooltip}
                    className="flex items-center text-sm font-medium transition-all duration-200 justify-center bg-transparent hover:bg-transparent py-2 px-2 flex-1"
                  >
                    <i className={cn(
                      item.icon,
                      'flex-shrink-0 transition-all duration-200 w-8 h-8 p-2 rounded-lg flex items-center justify-center text-base',
                      active ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800/30' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                    )} />
                  </button>
                </div>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Tooltip */}
      {tooltip.show && window.innerWidth >= 1024 && (
        <div 
          className="fixed z-[60] px-2 py-1 text-sm bg-gray-900 dark:bg-gray-700 text-white rounded shadow-lg pointer-events-none"
          style={{
            [document.dir === 'rtl' ? 'right' : 'left']: document.dir === 'rtl' ? `${window.innerWidth - tooltip.x}px` : `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translateY(-50%)'
          }}
        >
          {tooltip.text}
          <div className={`absolute top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-transparent ${
            document.dir === 'rtl' 
              ? 'end-0 translate-x-1 border-s-4 border-s-gray-900 dark:border-s-gray-700'
              : 'start-0 -translate-x-1 border-e-4 border-e-gray-900 dark:border-e-gray-700'
          }`} />
        </div>
      )}
    </>
  );
};

// Static Sidebar Component
const StaticTenantsSidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebar } = useThemeStore();
  const sidebarRef = useRef(null);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const renderMenuItem = (item, level = 0) => {
    const active = isActive(item.path);

    return (
      <div key={item.id}>
        <div className="relative p-2">
          <Link
            to={item.path}
            className={cn(
              'flex items-center text-sm font-medium transition-all duration-200 justify-start px-2 py-2.5 rounded-md',
              active ? 'nav-link-active' : 'nav-link-inactive',
              level > 0 && 'ms-4'
            )}
          >
            <i className={cn(item.icon, 'flex-shrink-0 transition-all duration-200 w-4 h-4 me-1')} />
            <span className="truncate">{t(item.title)}</span>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      {!sidebarCollapsed && (
        <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden" onClick={toggleSidebar} />
      )}

      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed inset-y-0 start-0 z-50 bg-white dark:bg-gray-800 shadow-lg border-e border-gray-200 dark:border-gray-700 lg:static lg:inset-0 transition-all duration-300 w-64 ${
          sidebarCollapsed ? 'ltr:-translate-x-full rtl:translate-x-full lg:translate-x-0' : 'translate-x-0'
        }`}
      >
        <nav className="py-4 pb-10 overflow-y-auto scrollbar-hide" style={{height: 'calc(100vh - 4rem)'}}>
          <div>
            <div className="sidebar-section">Tenants Management</div>
            <div className="space-y-1">
              {tenantsMenuConfig.map(item => renderMenuItem(item))}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Tenants Management v1.0
          </div>
        </div>
      </div>
    </>
  );
};

// Main Tenants Sidebar Component
const TenantsSidebar = () => {
  const { sidebarMode } = useThemeStore();

  switch (sidebarMode) {
    case 'horizontal':
      return <HorizontalTenantsSidebar />;
    case 'slim':
      return <SlimTenantsSidebar />;
    case 'static':
    default:
      return <StaticTenantsSidebar />;
  }
};

export default TenantsSidebar;