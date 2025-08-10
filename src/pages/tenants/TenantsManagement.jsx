import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TenantsLayout from '../../components/tenants/TenantsLayout';
import Button from '../../components/ui/Button';
import TenantsStats from '../../components/tenants/TenantsStats';
import TenantModal from '../../components/tenants/TenantModal';

const TenantsManagement = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);

  const handleCreateTenant = () => {
    setSelectedTenant(null);
    setIsModalOpen(true);
  };

  const handleEditTenant = (tenant) => {
    setSelectedTenant(tenant);
    setIsModalOpen(true);
  };

  const breadcrumbs = [
    { label: 'navigation.dashboard', href: '/dashboard' },
    { label: 'tenants.management.title' }
  ];

  return (
    <TenantsLayout 
      title="tenants.management.title"
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('tenants.management.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t('tenants.management.subtitle')}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary">
              <i className="fas fa-download me-2"></i>
              {t('common.export')}
            </Button>
            <Button variant="primary" onClick={handleCreateTenant}>
              <i className="fas fa-plus me-2"></i>
              {t('tenants.actions.create')}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <TenantsStats />

        {/* Quick Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('tenants.overview.active')}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <i className="fas fa-check-circle text-green-600 dark:text-green-400 text-xl"></i>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('tenants.overview.pending')}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                <i className="fas fa-clock text-yellow-600 dark:text-yellow-400 text-xl"></i>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('tenants.overview.revenue')}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$12.5K</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <i className="fas fa-dollar-sign text-blue-600 dark:text-blue-400 text-xl"></i>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('tenants.overview.totalUsers')}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <i className="fas fa-users text-purple-600 dark:text-purple-400 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <TenantModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          tenant={selectedTenant}
        />
      </div>
    </TenantsLayout>
  );
};

export default TenantsManagement;