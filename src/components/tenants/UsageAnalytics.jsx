import { useTranslation } from 'react-i18next';

const UsageAnalytics = ({ tenant }) => {
  const { t } = useTranslation();

  // Mock analytics data
  const analytics = {
    logins: {
      today: 45,
      thisWeek: 312,
      thisMonth: 1247,
      trend: '+12%'
    },
    apiCalls: {
      today: 2847,
      thisWeek: 18934,
      thisMonth: 78234,
      limit: 100000,
      trend: '+8%'
    },
    storage: {
      used: 2.3,
      limit: 10,
      unit: 'GB',
      trend: '+15%'
    },
    activeUsers: {
      current: 23,
      peak: 45,
      average: 28,
      trend: '+5%'
    }
  };

  const recentActivity = [
    { time: '2024-01-20 14:30', user: 'john@acme.com', action: 'Login', ip: '192.168.1.100' },
    { time: '2024-01-20 14:25', user: 'jane@acme.com', action: 'API Call', ip: '192.168.1.101' },
    { time: '2024-01-20 14:20', user: 'admin@acme.com', action: 'Data Export', ip: '192.168.1.102' },
    { time: '2024-01-20 14:15', user: 'user@acme.com', action: 'File Upload', ip: '192.168.1.103' },
    { time: '2024-01-20 14:10', user: 'manager@acme.com', action: 'Report Generated', ip: '192.168.1.104' }
  ];

  const moduleUsage = [
    { module: 'HR', usage: 85, users: 12 },
    { module: 'Finance', usage: 92, users: 8 },
    { module: 'Inventory', usage: 67, users: 15 },
    { module: 'CRM', usage: 78, users: 10 },
    { module: 'Projects', usage: 45, users: 6 }
  ];

  return (
    <div className="space-y-6">
      {/* Usage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('tenants.analytics.logins')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {analytics.logins.thisMonth.toLocaleString()}
              </p>
              <div className="flex items-center mt-2">
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  <i className="fas fa-arrow-up me-1" />
                  {analytics.logins.trend}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  {t('tenants.analytics.thisMonth')}
                </span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-blue-500 text-blue-100">
              <i className="fas fa-sign-in-alt text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('tenants.analytics.apiCalls')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {analytics.apiCalls.thisMonth.toLocaleString()}
              </p>
              <div className="flex items-center mt-2">
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  <i className="fas fa-arrow-up me-1" />
                  {analytics.apiCalls.trend}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  {t('tenants.analytics.thisMonth')}
                </span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-green-500 text-green-100">
              <i className="fas fa-code text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('tenants.analytics.storage')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {analytics.storage.used} {analytics.storage.unit}
              </p>
              <div className="flex items-center mt-2">
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                  <i className="fas fa-arrow-up me-1" />
                  {analytics.storage.trend}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  / {analytics.storage.limit} {analytics.storage.unit}
                </span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-purple-500 text-purple-100">
              <i className="fas fa-hdd text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('tenants.analytics.activeUsers')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {analytics.activeUsers.current}
              </p>
              <div className="flex items-center mt-2">
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  <i className="fas fa-arrow-up me-1" />
                  {analytics.activeUsers.trend}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  {t('tenants.analytics.average')}: {analytics.activeUsers.average}
                </span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-indigo-500 text-indigo-100">
              <i className="fas fa-users text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Usage Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {t('tenants.analytics.apiUsage')}
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {t('tenants.analytics.currentMonth')}
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {analytics.apiCalls.thisMonth.toLocaleString()} / {analytics.apiCalls.limit.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-lg h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-lg" 
                  style={{ width: `${(analytics.apiCalls.thisMonth / analytics.apiCalls.limit) * 100}%` }}
                />
              </div>
            </div>
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <i className="fas fa-chart-line text-4xl mb-2" />
              <p>{t('tenants.analytics.chartPlaceholder')}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {t('tenants.analytics.storageUsage')}
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {t('tenants.analytics.used')}
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {analytics.storage.used} / {analytics.storage.limit} {analytics.storage.unit}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-lg h-3">
                <div 
                  className="bg-purple-600 h-3 rounded-lg" 
                  style={{ width: `${(analytics.storage.used / analytics.storage.limit) * 100}%` }}
                />
              </div>
            </div>
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <i className="fas fa-chart-pie text-4xl mb-2" />
              <p>{t('tenants.analytics.chartPlaceholder')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Module Usage */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {t('tenants.analytics.moduleUsage')}
        </h3>
        <div className="space-y-4">
          {moduleUsage.map((module, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                  <i className="fas fa-cube text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{module.module}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {module.users} {t('tenants.analytics.activeUsers')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{module.usage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-lg h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-lg" 
                      style={{ width: `${module.usage}%` }}
                    />
                  </div>
                </div>
                <button className="text-primary-600 hover:text-primary-800 text-sm">
                  {t('tenants.analytics.viewDetails')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {t('tenants.analytics.recentActivity')}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('tenants.analytics.time')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('tenants.analytics.user')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('tenants.analytics.action')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('tenants.analytics.ip')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {recentActivity.map((activity, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {new Date(activity.time).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {activity.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {activity.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {activity.ip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsageAnalytics;