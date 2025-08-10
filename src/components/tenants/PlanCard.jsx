import { useTranslation } from 'react-i18next';

const PlanCard = ({ plan, onEdit }) => {
  const { t } = useTranslation();

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow border-2 ${
      plan.isPopular 
        ? 'border-primary-500 relative' 
        : 'border-gray-200 dark:border-gray-700'
    }`}>
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
            {t('tenants.plans.popular')}
          </span>
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {plan.name}
          </h3>
          <div className="mb-4">
            {plan.price ? (
              <div>
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  ${plan.price}
                </span>
                <span className="text-gray-600 dark:text-gray-400 ml-2">
                  /{t(`tenants.plans.billing.${plan.billing}`)}
                </span>
              </div>
            ) : (
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('tenants.plans.contactUs')}
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {plan.tenantsCount} {t('tenants.plans.activeTenants')}
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t('tenants.plans.features.users')}
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {plan.features.users}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t('tenants.plans.features.storage')}
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {plan.features.storage}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t('tenants.plans.features.support')}
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {plan.features.support}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t('tenants.plans.features.customDomain')}
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {plan.features.customDomain ? (
                <i className="fas fa-check text-green-500" />
              ) : (
                <i className="fas fa-times text-red-500" />
              )}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t('tenants.plans.features.apiAccess')}
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {plan.features.apiAccess ? (
                <i className="fas fa-check text-green-500" />
              ) : (
                <i className="fas fa-times text-red-500" />
              )}
            </span>
          </div>
        </div>

        {/* Modules */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            {t('tenants.plans.features.modules')}
          </h4>
          <div className="flex flex-wrap gap-1">
            {plan.features.modules.map((module, index) => (
              <span
                key={index}
                className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
              >
                {module}
              </span>
            ))}
          </div>
        </div>

        {/* Limits */}
        <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            {t('tenants.plans.limits.title')}
          </h4>
          <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex justify-between">
              <span>{t('tenants.plans.limits.maxUsers')}:</span>
              <span>{plan.limits.maxUsers === -1 ? t('tenants.plans.unlimited') : plan.limits.maxUsers}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('tenants.plans.limits.maxStorage')}:</span>
              <span>{plan.limits.maxStorage === -1 ? t('tenants.plans.unlimited') : `${plan.limits.maxStorage} MB`}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('tenants.plans.limits.maxApiCalls')}:</span>
              <span>{plan.limits.maxApiCalls === -1 ? t('tenants.plans.unlimited') : plan.limits.maxApiCalls.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex-1 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
          >
            {t('common.edit')}
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
            <i className="fas fa-copy" />
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            <i className="fas fa-trash" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;