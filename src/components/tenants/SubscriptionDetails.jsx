import { useTranslation } from 'react-i18next';

const SubscriptionDetails = ({ tenant }) => {
  const { t } = useTranslation();

  // Mock subscription data
  const subscription = {
    plan: tenant.plan,
    status: 'active',
    startDate: tenant.subscriptionStart,
    endDate: tenant.subscriptionEnd,
    price: tenant.plan === 'basic' ? 29 : tenant.plan === 'professional' ? 79 : tenant.plan === 'enterprise' ? 199 : 0,
    currency: 'USD',
    billing: 'monthly',
    autoRenewal: true,
    gracePeriod: 7,
    nextBilling: '2024-02-15',
    paymentMethod: '**** **** **** 1234',
    features: {
      users: tenant.maxUsers,
      storage: tenant.maxStorage + ' MB',
      modules: tenant.plan === 'basic' ? ['HR', 'Finance'] : 
               tenant.plan === 'professional' ? ['HR', 'Finance', 'Inventory', 'CRM'] :
               tenant.plan === 'enterprise' ? ['All Modules'] : ['All Modules + Custom'],
      support: tenant.plan === 'basic' ? 'Email' : 
               tenant.plan === 'professional' ? 'Email & Chat' :
               tenant.plan === 'enterprise' ? '24/7 Phone & Chat' : 'Dedicated Account Manager',
      customDomain: tenant.plan !== 'basic',
      apiAccess: tenant.plan !== 'basic'
    }
  };

  const daysUntilExpiry = Math.ceil((new Date(subscription.endDate) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-6">
      {/* Subscription Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {t('tenants.subscription.overview')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t('tenants.subscription.currentPlan')}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              {t('tenants.subscription.changePlan')}
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
              {t('tenants.subscription.viewBilling')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {t(`tenants.plans.${subscription.plan}`)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {t('tenants.subscription.currentPlan')}
            </div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${subscription.price}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {t('tenants.subscription.monthlyPrice')}
            </div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className={`text-2xl font-bold ${
              daysUntilExpiry > 30 ? 'text-green-600 dark:text-green-400' :
              daysUntilExpiry > 7 ? 'text-yellow-600 dark:text-yellow-400' :
              'text-red-600 dark:text-red-400'
            }`}>
              {daysUntilExpiry}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {t('tenants.subscription.daysLeft')}
            </div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className={`text-2xl font-bold ${
              subscription.autoRenewal ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              <i className={`fas ${subscription.autoRenewal ? 'fa-check' : 'fa-times'}`} />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {t('tenants.subscription.autoRenewal')}
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            {t('tenants.subscription.details')}
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{t('tenants.subscription.status')}:</span>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-lg bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {t(`tenants.subscription.statuses.${subscription.status}`)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{t('tenants.subscription.startDate')}:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {new Date(subscription.startDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{t('tenants.subscription.endDate')}:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {new Date(subscription.endDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{t('tenants.subscription.nextBilling')}:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {new Date(subscription.nextBilling).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{t('tenants.subscription.paymentMethod')}:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {subscription.paymentMethod}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            {t('tenants.subscription.features')}
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{t('tenants.subscription.maxUsers')}:</span>
              <span className="font-medium text-gray-900 dark:text-white">{subscription.features.users}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{t('tenants.subscription.storage')}:</span>
              <span className="font-medium text-gray-900 dark:text-white">{subscription.features.storage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{t('tenants.subscription.support')}:</span>
              <span className="font-medium text-gray-900 dark:text-white">{subscription.features.support}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{t('tenants.subscription.customDomain')}:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {subscription.features.customDomain ? (
                  <i className="fas fa-check text-green-500" />
                ) : (
                  <i className="fas fa-times text-red-500" />
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{t('tenants.subscription.apiAccess')}:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {subscription.features.apiAccess ? (
                  <i className="fas fa-check text-green-500" />
                ) : (
                  <i className="fas fa-times text-red-500" />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Available Modules */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          {t('tenants.subscription.availableModules')}
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {subscription.features.modules.map((module, index) => (
            <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <i className="fas fa-check text-green-500 me-2" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">{module}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          {t('tenants.subscription.actions')}
        </h4>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            {t('tenants.subscription.upgrade')}
          </button>
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
            {t('tenants.subscription.extend')}
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            {t('tenants.subscription.suspend')}
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            {t('tenants.subscription.cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetails;