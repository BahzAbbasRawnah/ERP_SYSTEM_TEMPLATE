import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Transition } from '@headlessui/react';
import useThemeStore from '../../stores/useThemeStore';
import { menuConfig } from '../../utils/menuConfig';
import { cn } from '../../utils/cn';

// Horizontal Sidebar Component
const HorizontalSidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState({});
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0, item: null });

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const toggleExpanded = (itemId, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    const item = menuConfig.find(i => i.id === itemId);
    
    if (!item.children || item.children.length === 0) {
      navigate(item.path);
      return;
    }
    
    const rect = event.currentTarget.getBoundingClientRect();
    setDropdownPosition({
      x: rect.left,
      y: rect.bottom + 4,
      item: item
    });
    
    setExpandedItems(prev => {
      const isCurrentlyExpanded = prev[itemId] || false;
      const newState = {};
      if (!isCurrentlyExpanded) {
        newState[itemId] = true;
      }
      return newState;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (expandedItems && Object.keys(expandedItems).length > 0) {
        if (!event.target.closest('.relative') && !event.target.closest('[style*="fixed"]') && !event.target.closest('button[data-dropdown-item]')) {
          setTimeout(() => {
            setExpandedItems({});
            setDropdownPosition({ x: 0, y: 0, item: null });
          }, 100);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [expandedItems]);

  const menuSections = [
    {
      title: 'Main',
      items: menuConfig.filter(item => ['dashboard', 'sales', 'inventory', 'crm'].includes(item.id))
    },
    {
      title: 'Management',
      items: menuConfig.filter(item => ['purchases', 'finance', 'hr'].includes(item.id))
    },
    {
      title: 'Tools',
      items: menuConfig.filter(item => ['pos', 'ecommerce', 'projects', 'logistics'].includes(item.id))
    },
    {
      title: 'System',
      items: menuConfig.filter(item => ['rbac', 'components', 'layouts'].includes(item.id))
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="px-4 py-2">
        <div className="flex items-center space-x-6 overflow-x-auto scrollbar-hide">
          {menuSections.map((section) => 
            section.items.map(item => {
              const hasChildren = item.children && item.children.length > 0;
              const active = isActive(item.path);
              const isExpanded = expandedItems[item.id] === true;
              
              return (
                <div key={item.id} className="relative">
                  {hasChildren ? (
                    <button
                      onClick={(e) => toggleExpanded(item.id, e)}
                      className={cn(
                        'flex items-center p-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap',
                        active ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      )}
                    >
                      <i className={`${item.icon} w-4 h-4 me-2`} />
                      {t(item.title)}
                      <i className={`fas fa-chevron-down w-3 h-3 ms-2 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`} />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className={cn(
                        'flex items-center py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap',
                        active ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      )}
                    >
                      <i className={`${item.icon} w-4 h-4 me-2`} />
                      {t(item.title)}
                    </Link>
                  )}
                </div>
              );
            })
          )}
        </div>
        
        {/* Portal dropdown */}
        {expandedItems && Object.keys(expandedItems).length > 0 && dropdownPosition.item && createPortal(
          <div 
            className="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-[99999] min-w-48"
            style={{
              left: `${dropdownPosition.x}px`,
              top: `${dropdownPosition.y}px`
            }}
          >
            {dropdownPosition.item.children.map(child => (
              <button
                key={child.id}
                data-dropdown-item="true"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(child.path);
                  setTimeout(() => {
                    setExpandedItems({});
                    setDropdownPosition({ x: 0, y: 0, item: null });
                  }, 50);
                }}
                className={cn(
                  'w-full flex items-center px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors first:rounded-t-md last:rounded-b-md text-left',
                  isActive(child.path) ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' : 'text-gray-700 dark:text-gray-300'
                )}
              >
                <i className={`${child.icon} w-4 h-4 me-2`} />
                {t(child.title)}
              </button>
            ))}
          </div>,
          document.body
        )}
      </div>
    </div>
  );
};

// Slim Sidebar Component
const SlimSidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { sidebarCollapsed, toggleSidebar } = useThemeStore();
  const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 });
  const [floatingMenu, setFloatingMenu] = useState(null);
  const sidebarRef = useRef(null);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleItemClick = (item, event) => {
    event.preventDefault();
    
    // If item has children, show floating menu
    if (item.children && item.children.length > 0) {
      const rect = event.currentTarget.getBoundingClientRect();
      const isRTL = document.dir === 'rtl';
      setFloatingMenu({
        item,
        x: isRTL ? rect.left - 8 : rect.right + 8,
        y: rect.top
      });
    } else {
      // Navigate directly for items without children
      navigate(item.path);
    }
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (floatingMenu && !event.target.closest('.floating-menu')) {
        setFloatingMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [floatingMenu]);

  const menuSections = [
    {
      title: 'Main',
      items: menuConfig.filter(item => ['dashboard', 'sales', 'inventory', 'crm'].includes(item.id))
    },
    {
      title: 'Management',
      items: menuConfig.filter(item => ['purchases', 'finance', 'hr'].includes(item.id))
    },
    {
      title: 'Tools',
      items: menuConfig.filter(item => ['pos', 'ecommerce', 'projects', 'logistics'].includes(item.id))
    },
    {
      title: 'System',
      items: menuConfig.filter(item => ['rbac', 'components', 'layouts'].includes(item.id))
    }
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      <Transition
        show={!sidebarCollapsed}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden" onClick={toggleSidebar} />
      </Transition>

      {/* Sidebar */}
      <Transition
        show={!sidebarCollapsed}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="ltr:-translate-x-full rtl:translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="ltr:-translate-x-full rtl:translate-x-full"
      >
        <div 
          ref={sidebarRef}
          className="fixed inset-y-0 start-0 z-50 bg-white dark:bg-gray-800 shadow-lg border-e border-gray-200 dark:border-gray-700 lg:static lg:inset-0 lg:translate-x-0 transition-all duration-300 w-16"
        >
          <nav className="py-4 pb-10 overflow-y-auto scrollbar-hide" style={{height: 'calc(100vh - 4rem)'}}>
            {menuSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <div className="space-y-1">
                  {section.items.map(item => {
                    const active = isActive(item.path);
                    return (
                      <div key={item.id} className="relative p-2 ">
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
              </div>
            ))}
          </nav>
        </div>
      </Transition>

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

      {/* Floating Menu */}
      {floatingMenu && createPortal(
        <div 
          className="floating-menu fixed z-[99999] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl py-2 min-w-48"
          style={{
            left: document.dir === 'rtl' ? 'auto' : `${floatingMenu.x}px`,
            right: document.dir === 'rtl' ? `${window.innerWidth - floatingMenu.x}px` : 'auto',
            top: `${floatingMenu.y}px`
          }}
        >
          <div className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
            {t(floatingMenu.item.title)}
          </div>
          <div className="py-1">
            {floatingMenu.item.children.map(child => (
              <Link
                key={child.id}
                to={child.path}
                onClick={() => setFloatingMenu(null)}
                className={cn(
                  'flex items-center px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
                  isActive(child.path) ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' : 'text-gray-700 dark:text-gray-300'
                )}
              >
                <i className={`${child.icon} w-4 h-4 me-3`} />
                {t(child.title)}
              </Link>
            ))}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

// Static Sidebar Component
const StaticSidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebar } = useThemeStore();
  const [expandedItems, setExpandedItems] = useState({});
  const sidebarRef = useRef(null);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isParentActive = (item) => {
    if (item.children) {
      return item.children.some(child => location.pathname === child.path || location.pathname.startsWith(child.path + '/'));
    }
    return location.pathname === item.path || location.pathname.startsWith(item.path + '/');
  };

  // Auto-expand parent menu based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    const findParentMenu = (items) => {
      for (const item of items) {
        if (item.children) {
          for (const child of item.children) {
            if (currentPath === child.path || currentPath.startsWith(child.path + '/')) {
              return item.id;
            }
          }
        }
      }
      return null;
    };
    
    const parentMenuId = findParentMenu(menuConfig);
    if (parentMenuId) {
      setExpandedItems({ [parentMenuId]: true });
    }
  }, [location.pathname]);

  const toggleExpanded = (itemId, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    setExpandedItems(prev => {
      const isCurrentlyExpanded = prev[itemId] || false;
      if (isCurrentlyExpanded) {
        // Close current menu
        return {};
      } else {
        // Open new menu and close others
        return { [itemId]: true };
      }
    });
  };

  const menuSections = [
    {
      title: 'Main',
      items: menuConfig.filter(item => ['dashboard', 'sales', 'inventory', 'crm'].includes(item.id))
    },
    {
      title: 'Management',
      items: menuConfig.filter(item => ['purchases', 'finance', 'hr'].includes(item.id))
    },
    {
      title: 'Tools',
      items: menuConfig.filter(item => ['pos', 'ecommerce', 'projects', 'logistics'].includes(item.id))
    },
    {
      title: 'System',
      items: menuConfig.filter(item => ['rbac', 'components', 'layouts'].includes(item.id))
    }
  ];

  const renderMenuItem = (item, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.id] === true;
    const active = level === 0 ? isParentActive(item) : isActive(item.path);

    return (
      <div key={item.id}>
        <div className="relative p-2">
          {hasChildren ? (
            <button
              onClick={(e) => toggleExpanded(item.id, e)}
              className={cn(
                'w-full flex items-center text-sm font-medium transition-all duration-200 justify-start px-2 py-2.5 rounded-md',
                active ? 'nav-link-active' : 'nav-link-inactive',
                level > 0 && 'ms-4'
              )}
            >
              <i className={cn(item.icon, 'flex-shrink-0 transition-all duration-200 w-4 h-4 me-1')} />
              <span className="flex-1 text-start">{t(item.title)}</span>
              <i className={cn(
                'fas fa-chevron-down w-3 h-3 transition-transform duration-300 ms-2',
                isExpanded && 'rotate-180'
              )} />
            </button>
          ) : (
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
          )}
        </div>

        {hasChildren && (
          <Transition
            show={isExpanded}
            enter="transition-all duration-200 ease-out"
            enterFrom="opacity-0 max-h-0"
            enterTo="opacity-100 max-h-96"
            leave="transition-all duration-200 ease-in"
            leaveFrom="opacity-100 max-h-96"
            leaveTo="opacity-0 max-h-0"
          >
            <div className="overflow-hidden">
              <div className="space-y-1 mt-1">
                {item.children.map(child => renderMenuItem(child, level + 1))}
              </div>
            </div>
          </Transition>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      <Transition
        show={!sidebarCollapsed}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden" onClick={toggleSidebar} />
      </Transition>

      {/* Sidebar */}
      <Transition
        show={!sidebarCollapsed}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="ltr:-translate-x-full rtl:translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="ltr:-translate-x-full rtl:translate-x-full"
      >
        <div 
          ref={sidebarRef}
          className="fixed inset-y-0 start-0 z-50 bg-white dark:bg-gray-800 shadow-lg border-e border-gray-200 dark:border-gray-700 lg:static lg:inset-0 lg:translate-x-0 transition-all duration-300 w-64"
        >
          <nav className="py-4 pb-10 overflow-y-auto scrollbar-hide" style={{height: 'calc(100vh - 4rem)'}}>
            {menuSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <div className="sidebar-section">{section.title}</div>
                <div className="space-y-1">
                  {section.items.map(item => renderMenuItem(item))}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              ERP System v1.0
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

// Main Sidebar Component
const Sidebar = () => {
  const { sidebarMode } = useThemeStore();

  switch (sidebarMode) {
    case 'horizontal':
      return <HorizontalSidebar />;
    case 'slim':
      return <SlimSidebar />;
    case 'static':
    default:
      return <StaticSidebar />;
  }
};

export default Sidebar;