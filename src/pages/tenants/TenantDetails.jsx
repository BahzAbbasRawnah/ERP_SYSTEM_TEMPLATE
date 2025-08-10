import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import TenantsLayout from '../../components/tenants/TenantsLayout';
import TenantInfo from '../../components/tenants/TenantInfo';
import SubscriptionDetails from '../../components/tenants/SubscriptionDetails';
import DomainManagement from '../../components/tenants/DomainManagement';
import UsageAnalytics from '../../components/tenants/UsageAnalytics';
import BillingHistory from '../../components/tenants/BillingHistory';
import TenantUsers from '../../components/tenants/TenantUsers';
import Button from '../../components/ui/Button';


const TenantDetails = () => {
  const { t } = useTranslation();
  const { tenantId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const tenant = {
    id: tenantId,
    name: 'Acme Corporation',
    domain: 'acme.yourdomain.com',
    customDomain: 'erp.acme.com',
    status: 'active',
    plan: 'enterprise',
    users: 45,
    maxUsers: 100,
    storage: '2.3 GB',
    maxStorage: '10 GB',
    createdAt: '2024-01-15',
    subscriptionStart: '2024-01-15',
    subscriptionEnd: '2024-12-15',
    owner: {
      name: 'John Smith',
      email: 'john@acme.com',
      phone: '+1-555-0123'
    },
    lastLogin: '2024-01-20 14:30',
    database: 'tenant_acme_db',
    schema: 'acme_schema'
  };

  const tabs = [
    { id: 'overview', label: 'tenants.tabs.overview', icon: 'fas fa-chart-line' },
    { id: 'subscription', label: 'tenants.tabs.subscription', icon: 'fas fa-credit-card' },
    { id: 'domains', label: 'tenants.tabs.domains', icon: 'fas fa-globe' },
    { id: 'users', label: 'tenants.tabs.users', icon: 'fas fa-users' },
    { id: 'analytics', label: 'tenants.tabs.analytics', icon: 'fas fa-chart-bar' },
    { id: 'billing', label: 'tenants.tabs.billing', icon: 'fas fa-receipt' }
  ];

  const breadcrumbs = [
    { label: 'navigation.dashboard', href: '/dashboard' },
    { label: 'tenants.management.title', href: '/tenants' },
    { label: 'navigation.tenantsList', href: '/tenants/list' },
    { label: `${tenant.name}` }
  ];

  return (
    <TenantsLayout 
      title="tenants.details.title"
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {tenant.name}
                </h2>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  tenant.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  tenant.status === 'trial' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                  tenant.status === 'suspended' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                }`}>
                  {t(`tenants.status.${tenant.status}`)}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {tenant.customDomain || tenant.domain}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary">
                <i className="fas fa-cog me-2" />
                {t('tenants.actions.settings')}
              </Button>
              <Button variant="primary">
                <i className="fas fa-edit me-2" />
                {t('common.edit')}
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <i className={`${tab.icon} me-2`} />
                  {t(tab.label)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && <TenantInfo tenant={tenant} />}
            {activeTab === 'subscription' && <SubscriptionDetails tenant={tenant} />}
            {activeTab === 'domains' && <DomainManagement tenant={tenant} />}
            {activeTab === 'users' && <TenantUsers tenant={tenant} />}
            {activeTab === 'analytics' && <UsageAnalytics tenant={tenant} />}
            {activeTab === 'billing' && <BillingHistory tenant={tenant} />}
          </div>
        </div>
      </div>
    </TenantsLayout>
  );
};

export default TenantDetails;