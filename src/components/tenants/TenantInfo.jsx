import { useTranslation } from 'react-i18next';

const TenantInfo = ({ tenant }) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Basic Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {t('tenants.info.basicInfo')}
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">{t('tenants.info.name')}:</span>
            <span className="font-medium text-gray-900 dark:text-white">{tenant.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">{t('tenants.info.domain')}:</span>
            <span className="font-medium text-gray-900 dark:text-white">{tenant.domain}</span>
          </div>
          {tenant.customDomain && (
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{t('tenants.info.customDomain')}:</span>
              <span className="font-medium text-gray-900 dark:text-white">{tenant.customDomain}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">{t('tenants.info.status')}:</span>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-lg ${
              tenant.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
              tenant.status === 'trial' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
              tenant.status === 'suspended' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
              'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
            }`}>
              {t(`tenants.status.${tenant.status}`)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">{t('tenants.info.created')}:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {new Date(tenant.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">{t('tenants.info.lastLogin')}:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {new Date(tenant.lastLogin).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Owner Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {t('tenants.info.ownerInfo')}
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">{t('tenants.info.ownerName')}:</span>
            <span className="font-medium text-gray-900 dark:text-white">{tenant.owner.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">{t('tenants.info.ownerEmail')}:</span>
            <span className="font-medium text-gray-900 dark:text-white">{tenant.owner.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">{t('tenants.info.ownerPhone')}:</span>
            <span className="font-medium text-gray-900 dark:text-white">{tenant.owner.phone}</span>
          </div>
        </div>
      </div>

      {/* Usage Statistics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {t('tenants.info.usage')}
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600 dark:text-gray-400">{t('tenants.info.users')}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {tenant.users} / {tenant.maxUsers}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-lg h-2">
              <div 
                className="bg-blue-600 h-2 rounded-lg" 
                style={{ width: `${(tenant.users / tenant.maxUsers) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600 dark:text-gray-400">{t('tenants.info.storage')}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {tenant.storage} / {tenant.maxStorage}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-lg h-2">
              <div 
                className="bg-green-600 h-2 rounded-lg" 
                style={{ width: '23%' }} // Mock percentage
              />
            </div>
          </div>
        </div>
      </div>

      {/* Database Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {t('tenants.info.database')}
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">{t('tenants.info.databaseType')}:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {tenant.database ? t('tenants.info.separateDatabase') : t('tenants.info.sharedDatabase')}
            </span>
          </div>
          {tenant.database && (
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{t('tenants.info.databaseName')}:</span>
              <span className="font-medium text-gray-900 dark:text-white font-mono text-sm">
                {tenant.database}
              </span>
            </div>
          )}
          {tenant.schema && (
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{t('tenants.info.schemaName')}:</span>
              <span className="font-medium text-gray-900 dark:text-white font-mono text-sm">
                {tenant.schema}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenantInfo;