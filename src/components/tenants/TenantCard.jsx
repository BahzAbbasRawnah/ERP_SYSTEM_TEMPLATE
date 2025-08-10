import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const TenantCard = ({ tenant, onEdit }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleViewAnalytics = () => {
    navigate(`/tenants/details/${tenant.id}`);
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      trial: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      suspended: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      expired: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    };
    return colors[status] || colors.active;
  };

  const getPlanColor = (plan) => {
    const colors = {
      basic: 'text-gray-600',
      professional: 'text-blue-600',
      enterprise: 'text-purple-600',
      custom: 'text-orange-600'
    };
    return colors[plan] || colors.basic;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {tenant.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {tenant.customDomain || tenant.domain}
            </p>
            <div className="flex items-center gap-2">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-lg ${getStatusColor(tenant.status)}`}>
                {t(`tenants.status.${tenant.status}`)}
              </span>
              <span className={`text-sm font-medium ${getPlanColor(tenant.plan)}`}>
                {t(`tenants.plans.${tenant.plan}`)}
              </span>
            </div>
          </div>
          <div className="flex gap-1">
            <button
              onClick={onEdit}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              title={t('common.edit')}
            >
              <i className="fas fa-edit" />
            </button>
            <button
              className="p-2 text-gray-400 hover:text-red-600"
              title={t('common.delete')}
            >
              <i className="fas fa-trash" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t('tenants.card.users')}
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {tenant.users}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t('tenants.card.storage')}
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {tenant.storage}
            </p>
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center justify-between">
            <span>{t('tenants.card.owner')}:</span>
            <span className="font-medium">{tenant.owner}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>{t('tenants.card.created')}:</span>
            <span>{new Date(tenant.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>{t('tenants.card.expires')}:</span>
            <span className={
              new Date(tenant.subscriptionEnd) < new Date() 
                ? 'text-red-600 dark:text-red-400' 
                : 'text-green-600 dark:text-green-400'
            }>
              {new Date(tenant.subscriptionEnd).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>{t('tenants.card.lastLogin')}:</span>
            <span>{new Date(tenant.lastLogin).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
        <div className="flex justify-between items-center">
          <button 
            onClick={handleViewAnalytics}
            className="text-sm text-primary-600 hover:text-primary-800 font-medium"
          >
            <i className="fas fa-chart-line me-1" />
            {t('tenants.actions.viewAnalytics')}
          </button>
          <button className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
            <i className="fas fa-cog me-1" />
            {t('tenants.actions.settings')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenantCard;