import { useTranslation } from 'react-i18next';
import DashboardLayout from '../components/layout/DashboardLayout';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import StatsCard from '../components/ui/StatsCard';
import GridLayout from '../components/layout/GridLayout';

const LayoutsShowcase = () => {
  const { t } = useTranslation();
  
  const breadcrumbs = [
    { label: t('Layouts'), href: '/layouts' }
  ];

  return (
    <DashboardLayout title={t('Layout Options')} breadcrumbs={breadcrumbs}>
      {/* Layout Controls */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">{t('Layout Controls')}</h2>
        <Card>
          <GridLayout columns={3}>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('Sidebar Layout')}</h3>
              <div className="space-y-3">
                <Button variant="primary" className="w-full">
                  <i className="fas fa-columns me-1" />
                  {t('Vertical Sidebar')}
                </Button>
                <Button variant="secondary" className="w-full">
                  <i className="fas fa-bars me-1" />
                  {t('Horizontal Layout')}
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('Content Density')}</h3>
              <div className="space-y-3">
                <Button variant="secondary" className="w-full">
                  <i className="fas fa-compress me-1" />
                  {t('Compact')}
                </Button>
                <Button variant="secondary" className="w-full">
                  <i className="fas fa-expand me-1" />
                  {t('Comfortable')}
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('Widget Layout')}</h3>
              <div className="space-y-3">
                <Button variant="secondary" className="w-full">
                  <i className="fas fa-th me-1" />
                  {t('Grid Layout')}
                </Button>
                <Button variant="secondary" className="w-full">
                  <i className="fas fa-list me-1" />
                  {t('List Layout')}
                </Button>
              </div>
            </div>
          </GridLayout>
        </Card>
      </section>

      {/* Grid Layouts */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">{t('Grid Layouts')}</h2>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('12-Column Grid System')}</h3>
          <Card>
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 bg-primary-100 dark:bg-primary-900/20 p-3 rounded text-center text-sm">
                  12 columns
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6 bg-primary-100 dark:bg-primary-900/20 p-3 rounded text-center text-sm">
                  6 columns
                </div>
                <div className="col-span-6 bg-primary-100 dark:bg-primary-900/20 p-3 rounded text-center text-sm">
                  6 columns
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4 bg-primary-100 dark:bg-primary-900/20 p-3 rounded text-center text-sm">
                  4 columns
                </div>
                <div className="col-span-4 bg-primary-100 dark:bg-primary-900/20 p-3 rounded text-center text-sm">
                  4 columns
                </div>
                <div className="col-span-4 bg-primary-100 dark:bg-primary-900/20 p-3 rounded text-center text-sm">
                  4 columns
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('Responsive Grid')}</h3>
          <Card>
            <GridLayout columns={4}>
              <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded text-center">
                <i className="fas fa-mobile-alt text-2xl text-green-600 dark:text-green-400 mb-2" />
                <p className="text-sm">Mobile: 1 col</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded text-center">
                <i className="fas fa-tablet-alt text-2xl text-blue-600 dark:text-blue-400 mb-2" />
                <p className="text-sm">Tablet: 2 cols</p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/20 p-4 rounded text-center">
                <i className="fas fa-laptop text-2xl text-purple-600 dark:text-purple-400 mb-2" />
                <p className="text-sm">Desktop: 3 cols</p>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900/20 p-4 rounded text-center">
                <i className="fas fa-desktop text-2xl text-orange-600 dark:text-orange-400 mb-2" />
                <p className="text-sm">Large: 4 cols</p>
              </div>
            </GridLayout>
          </Card>
        </div>
      </section>

      {/* Dashboard Layouts */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">{t('Dashboard Layouts')}</h2>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('Classic Dashboard Layout')}</h3>
          <Card>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
              <StatsCard
                title={t('Total Sales')}
                value="$45,231"
                icon="fas fa-chart-line"
                gradient="from-blue-500 to-blue-600"
              />
              <StatsCard
                title={t('New Orders')}
                value="1,234"
                icon="fas fa-shopping-cart"
                gradient="from-green-500 to-green-600"
              />
              <StatsCard
                title={t('Customers')}
                value="2,350"
                icon="fas fa-users"
                gradient="from-yellow-500 to-yellow-600"
              />
              <StatsCard
                title={t('Growth')}
                value="+12.5%"
                icon="fas fa-trending-up"
                gradient="from-purple-500 to-purple-600"
              />
            </div>
            
            <GridLayout columns={2}>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('Revenue Chart')}</h4>
                <div className="h-48 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
                  <i className="fas fa-chart-area text-4xl text-gray-400" />
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('Recent Activity')}</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{t('New order received')}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{t('Payment processed')}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{t('Inventory updated')}</span>
                  </div>
                </div>
              </div>
            </GridLayout>
          </Card>
        </div>
      </section>

      {/* Mobile Layouts */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">{t('Mobile-First Layouts')}</h2>
        <GridLayout columns={3}>
          <Card title={t('Mobile Card Layout')}>
            <div className="space-y-3">
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Order #12345</span>
                  <span className="badge badge-success">Completed</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">John Doe - $299.00</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Order #12346</span>
                  <span className="badge badge-warning">Pending</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Jane Smith - $149.00</p>
              </div>
            </div>
          </Card>

          <Card title={t('Mobile List Layout')}>
            <div className="space-y-2">
              <div className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-user text-white text-sm" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Customer</p>
                </div>
                <i className="fas fa-chevron-right text-gray-400" />
              </div>
            </div>
          </Card>

          <Card title={t('Mobile Tab Layout')}>
            <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
              <nav className="flex space-x-8">
                <button className="py-2 px-1 border-b-2 border-primary-500 text-primary-600 dark:text-primary-400 text-sm font-medium">
                  {t('Overview')}
                </button>
                <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 dark:text-gray-400 text-sm font-medium">
                  {t('Details')}
                </button>
              </nav>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>{t('Tab content area with responsive design for mobile devices.')}</p>
            </div>
          </Card>
        </GridLayout>
      </section>
    </DashboardLayout>
  );
};

export default LayoutsShowcase;