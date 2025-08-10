import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TenantsLayout from '../../components/tenants/TenantsLayout';
import PlanCard from '../../components/tenants/PlanCard';
import PlanModal from '../../components/tenants/PlanModal';
import Button from '../../components/ui/Button';

const SubscriptionPlans = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Mock data
  const plans = [
    {
      id: 1,
      name: 'Basic',
      price: 29,
      currency: 'USD',
      billing: 'monthly',
      features: {
        users: 5,
        storage: '1 GB',
        modules: ['HR', 'Finance'],
        support: 'Email',
        customDomain: false,
        apiAccess: false
      },
      limits: {
        maxUsers: 5,
        maxStorage: 1024,
        maxApiCalls: 1000
      },
      isPopular: false,
      tenantsCount: 45
    },
    {
      id: 2,
      name: 'Professional',
      price: 79,
      currency: 'USD',
      billing: 'monthly',
      features: {
        users: 25,
        storage: '5 GB',
        modules: ['HR', 'Finance', 'Inventory', 'CRM'],
        support: 'Email & Chat',
        customDomain: true,
        apiAccess: true
      },
      limits: {
        maxUsers: 25,
        maxStorage: 5120,
        maxApiCalls: 10000
      },
      isPopular: true,
      tenantsCount: 128
    },
    {
      id: 3,
      name: 'Enterprise',
      price: 199,
      currency: 'USD',
      billing: 'monthly',
      features: {
        users: 100,
        storage: '20 GB',
        modules: ['All Modules'],
        support: '24/7 Phone & Chat',
        customDomain: true,
        apiAccess: true
      },
      limits: {
        maxUsers: 100,
        maxStorage: 20480,
        maxApiCalls: 100000
      },
      isPopular: false,
      tenantsCount: 32
    }

  ];

  const handleCreatePlan = () => {
    setSelectedPlan(null);
    setIsModalOpen(true);
  };

  const handleEditPlan = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const breadcrumbs = [
    { label: 'navigation.dashboard', href: '/dashboard' },
    { label: 'tenants.management.title', href: '/tenants' },
    { label: 'navigation.subscriptionPlans' }
  ];

  return (
    <TenantsLayout 
      title="tenants.plans.title"
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('tenants.plans.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t('tenants.plans.subtitle')}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary">
              <i className="fas fa-download me-2"></i>
              {t('common.export')}
            </Button>
            <Button variant="primary" onClick={handleCreatePlan}>
              <i className="fas fa-plus me-2"></i>
              {t('tenants.plans.create')}
            </Button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map(plan => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onEdit={() => handleEditPlan(plan)}
            />
          ))}
        </div>

        {/* Plan Comparison Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {t('tenants.plans.comparison')}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('tenants.plans.feature')}
                  </th>
                  {plans.map(plan => (
                    <th key={plan.id} className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {t('tenants.plans.features.users')}
                  </td>
                  {plans.map(plan => (
                    <td key={plan.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white text-center">
                      {plan.features.users}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {t('tenants.plans.features.storage')}
                  </td>
                  {plans.map(plan => (
                    <td key={plan.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white text-center">
                      {plan.features.storage}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {t('tenants.plans.features.support')}
                  </td>
                  {plans.map(plan => (
                    <td key={plan.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white text-center">
                      {plan.features.support}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {t('tenants.plans.features.customDomain')}
                  </td>
                  {plans.map(plan => (
                    <td key={plan.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white text-center">
                      {plan.features.customDomain ? (
                        <i className="fas fa-check text-green-500" />
                      ) : (
                        <i className="fas fa-times text-red-500" />
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        <PlanModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          plan={selectedPlan}
        />
      </div>
    </TenantsLayout>
  );
};

export default SubscriptionPlans;