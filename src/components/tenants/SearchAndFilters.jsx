import { useTranslation } from 'react-i18next';

const SearchAndFilters = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  planFilter,
  onPlanChange,
  viewMode,
  onViewModeChange
}) => {
  const { t } = useTranslation();

  const statusOptions = [
    { value: 'all', label: t('tenants.filters.allStatuses') },
    { value: 'active', label: t('tenants.status.active') },
    { value: 'trial', label: t('tenants.status.trial') },
    { value: 'suspended', label: t('tenants.status.suspended') },
    { value: 'expired', label: t('tenants.status.expired') }
  ];

  const planOptions = [
    { value: 'all', label: t('tenants.filters.allPlans') },
    { value: 'basic', label: t('tenants.plans.basic') },
    { value: 'professional', label: t('tenants.plans.professional') },
    { value: 'enterprise', label: t('tenants.plans.enterprise') },
    { value: 'custom', label: t('tenants.plans.custom') }
  ];

  return (
    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder={t('tenants.search.placeholder')}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Plan Filter */}
          <select
            value={planFilter}
            onChange={(e) => onPlanChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          >
            {planOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`px-3 py-2 text-sm font-medium ${
                viewMode === 'grid'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              <i className="fas fa-th" />
            </button>
            <button
              onClick={() => onViewModeChange('table')}
              className={`px-3 py-2 text-sm font-medium border-l border-gray-300 dark:border-gray-600 ${
                viewMode === 'table'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              <i className="fas fa-list" />
            </button>
          </div>

          {/* Export Button */}
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2">
            <i className="fas fa-download" />
            {t('common.export')}
          </button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => {
            onStatusChange('active');
            onPlanChange('all');
          }}
          className="px-3 py-1 text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-lg hover:bg-green-200 dark:hover:bg-green-800"
        >
          {t('tenants.quickFilters.activeOnly')}
        </button>
        <button
          onClick={() => {
            onStatusChange('trial');
            onPlanChange('all');
          }}
          className="px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800"
        >
          {t('tenants.quickFilters.trialOnly')}
        </button>
        <button
          onClick={() => {
            onStatusChange('all');
            onPlanChange('enterprise');
          }}
          className="px-3 py-1 text-sm bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800"
        >
          {t('tenants.quickFilters.enterpriseOnly')}
        </button>
        <button
          onClick={() => {
            onSearchChange('');
            onStatusChange('all');
            onPlanChange('all');
          }}
          className="px-3 py-1 text-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          {t('tenants.quickFilters.clearAll')}
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilters;