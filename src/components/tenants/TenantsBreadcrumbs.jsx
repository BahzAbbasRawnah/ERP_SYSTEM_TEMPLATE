import { Link, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const TenantsBreadcrumbs = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { tenantId } = useParams();

  const getBreadcrumbs = () => {
    const path = location.pathname;
    const breadcrumbs = [
      { label: 'navigation.dashboard', href: '/dashboard' }
    ];

    if (path === '/tenants') {
      breadcrumbs.push({ label: 'tenants.management.title' });
    } else if (path === '/tenants/list') {
      breadcrumbs.push(
        { label: 'tenants.management.title', href: '/tenants' },
        { label: 'navigation.tenantsList' }
      );
    } else if (path === '/tenants/plans') {
      breadcrumbs.push(
        { label: 'tenants.management.title', href: '/tenants' },
        { label: 'navigation.subscriptionPlans' }
      );
    } else if (path.includes('/tenants/details/')) {
      breadcrumbs.push(
        { label: 'tenants.management.title', href: '/tenants' },
        { label: 'navigation.tenantsList', href: '/tenants/list' },
        { label: `Tenant #${tenantId}` }
      );
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4">
        <nav className="flex items-center" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 text-sm">
            <li className="flex items-center">
              <i className="fas fa-home text-primary-500 me-2" />
            </li>
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                <i className="fas fa-chevron-right text-gray-400 text-xs mx-2 rtl:rotate-180" />
                {crumb.href ? (
                  <Link 
                    to={crumb.href} 
                    className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                  >
                    {t(crumb.label)}
                  </Link>
                ) : (
                  <span className="text-gray-900 dark:text-white font-medium">
                    {crumb.label.includes('Tenant #') ? crumb.label : t(crumb.label)}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default TenantsBreadcrumbs;