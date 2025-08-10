import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import TenantsLayout from '../../components/tenants/TenantsLayout';
import TenantCard from '../../components/tenants/TenantCard';
import SearchAndFilters from '../../components/tenants/SearchAndFilters';
import TenantModal from '../../components/tenants/TenantModal';
import Button from '../../components/ui/Button';

const TenantsList = () => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);

  const handleEditTenant = (tenant) => {
    setSelectedTenant(tenant);
    setIsModalOpen(true);
  };

  const handleCreateTenant = () => {
    setSelectedTenant(null);
    setIsModalOpen(true);
  };

  // Mock data
  const tenants = [
    {
      id: 1,
      name: 'Acme Corporation',
      domain: 'acme.yourdomain.com',
      customDomain: 'erp.acme.com',
      status: 'active',
      plan: 'enterprise',
      users: 45,
      storage: '2.3 GB',
      createdAt: '2024-01-15',
      subscriptionEnd: '2024-12-15',
      owner: 'john@acme.com',
      lastLogin: '2024-01-20 14:30'
    },
    {
      id: 2,
      name: 'Tech Solutions Ltd',
      domain: 'techsolutions.yourdomain.com',
      customDomain: null,
      status: 'trial',
      plan: 'professional',
      users: 12,
      storage: '850 MB',
      createdAt: '2024-01-18',
      subscriptionEnd: '2024-02-18',
      owner: 'admin@techsolutions.com',
      lastLogin: '2024-01-20 09:15'
    },
    {
      id: 3,
      name: 'Global Industries',
      domain: 'global.yourdomain.com',
      customDomain: 'system.globalind.com',
      status: 'suspended',
      plan: 'basic',
      users: 8,
      storage: '450 MB',
      createdAt: '2024-01-10',
      subscriptionEnd: '2024-01-19',
      owner: 'contact@globalind.com',
      lastLogin: '2024-01-19 16:45'
    }
  ];

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter;
    const matchesPlan = planFilter === 'all' || tenant.plan === planFilter;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const breadcrumbs = [
    { label: 'navigation.dashboard', href: '/dashboard' },
    { label: 'tenants.management.title', href: '/tenants' },
    { label: 'navigation.tenantsList' }
  ];

  return (
    <TenantsLayout 
      title="tenants.list.title"
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('tenants.list.title')}
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
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          {/* Search and Filters */}
          <SearchAndFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            planFilter={planFilter}
            onPlanChange={setPlanFilter}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          {/* Results Count */}
          <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('tenants.list.showing')} {filteredTenants.length} {t('tenants.list.of')} {tenants.length} {t('tenants.list.tenants')}
            </p>
          </div>

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="p-6 overflow-x-auto">
              <div className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTenants.map(tenant => (
                  <TenantCard
                    key={tenant.id}
                    tenant={tenant}
                    onEdit={() => handleEditTenant(tenant)}
                    onView={() => window.location.href = `/tenants/details/${tenant.id}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Table View */}
          {viewMode === 'table' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('tenants.table.tenant')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('tenants.table.domain')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('tenants.table.status')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('tenants.table.plan')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('tenants.table.users')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('tenants.table.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredTenants.map(tenant => (
                    <tr key={tenant.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {tenant.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {tenant.owner}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {tenant.customDomain || tenant.domain}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          tenant.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          tenant.status === 'trial' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          tenant.status === 'suspended' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                        }`}>
                          {t(`tenants.status.${tenant.status}`)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {t(`tenants.plans.${tenant.plan}`)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {tenant.users}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          to={`/tenants/details/${tenant.id}`}
                          className="text-primary-600 hover:text-primary-900 mr-3"
                        >
                          {t('common.view')}
                        </Link>
                        <button
                          onClick={() => handleEditTenant(tenant)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          {t('common.edit')}
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          {t('common.delete')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Empty State */}
          {filteredTenants.length === 0 && (
            <div className="text-center py-12">
              <i className="fas fa-building text-4xl text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t('tenants.empty.title')}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {t('tenants.empty.description')}
              </p>
            </div>
          )}
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

export default TenantsList;