import { useTranslation } from 'react-i18next';

const TenantsStats = () => {
  const { t } = useTranslation();

  // Mock data - replace with actual API call
  const stats = [
    {
      title: t('tenants.stats.total'),
      value: '1,247',
      change: '+12%',
      changeType: 'increase',
      icon: 'fas fa-building',
      color: 'blue'
    },
    {
      title: t('tenants.stats.active'),
      value: '1,089',
      change: '+8%',
      changeType: 'increase',
      icon: 'fas fa-check-circle',
      color: 'green'
    },
    {
      title: t('tenants.stats.trial'),
      value: '124',
      change: '+24%',
      changeType: 'increase',
      icon: 'fas fa-clock',
      color: 'yellow'
    },
    {
      title: t('tenants.stats.suspended'),
      value: '34',
      change: '-15%',
      changeType: 'decrease',
      icon: 'fas fa-pause-circle',
      color: 'red'
    },
    {
      title: t('tenants.stats.revenue'),
      value: '$89,247',
      change: '+18%',
      changeType: 'increase',
      icon: 'fas fa-dollar-sign',
      color: 'purple'
    },
    {
      title: t('tenants.stats.avgUsers'),
      value: '23.4',
      change: '+5%',
      changeType: 'increase',
      icon: 'fas fa-users',
      color: 'indigo'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-100',
      green: 'bg-green-500 text-green-100',
      yellow: 'bg-yellow-500 text-yellow-100',
      red: 'bg-red-500 text-red-100',
      purple: 'bg-purple-500 text-purple-100',
      indigo: 'bg-indigo-500 text-indigo-100'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {stat.value}
              </p>
              <div className="flex items-center mt-2">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'increase' 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.changeType === 'increase' ? (
                    <i className="fas fa-arrow-up me-1" />
                  ) : (
                    <i className="fas fa-arrow-down me-1" />
                  )}
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  {t('tenants.stats.fromLastMonth')}
                </span>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
              <i className={`${stat.icon} text-xl`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TenantsStats;