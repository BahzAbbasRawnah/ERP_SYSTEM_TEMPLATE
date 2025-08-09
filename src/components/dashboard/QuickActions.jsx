import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';

const QuickActions = () => {
  const { t } = useTranslation();

  const actions = [
    { icon: 'fas fa-plus-circle', label: t('dashboard.quickActions.newOrder'), color: 'text-primary-500' },
    { icon: 'fas fa-user-plus', label: t('dashboard.quickActions.addCustomer'), color: 'text-green-500' },
    { icon: 'fas fa-box', label: t('dashboard.quickActions.addProduct'), color: 'text-yellow-500' },
    { icon: 'fas fa-file-invoice', label: t('dashboard.quickActions.createInvoice'), color: 'text-purple-500' },
    { icon: 'fas fa-chart-bar', label: t('dashboard.quickActions.viewReports'), color: 'text-red-500' },
    { icon: 'fas fa-cog', label: t('dashboard.quickActions.settings'), color: 'text-gray-500' }
  ];

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {t('dashboard.quickActions.title')}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {actions.map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <i className={`${action.icon} text-2xl ${action.color} mb-2`}></i>
              <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default QuickActions;