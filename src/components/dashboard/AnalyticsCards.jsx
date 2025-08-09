import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';

const AnalyticsCards = ({ data }) => {
  const { t } = useTranslation();

  const cards = [
    {
      title: t('dashboard.analytics.reviews'),
      value: data.reviews,
      icon: 'fas fa-comments',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: t('dashboard.analytics.visitors'),
      value: data.visitors,
      icon: 'fas fa-eye',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      iconColor: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      title: t('dashboard.analytics.payments'),
      value: data.payments,
      icon: 'fas fa-credit-card',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <Card key={index}>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {card.title}
                </p>
              </div>
              <div className={`w-16 h-16 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                <i className={`${card.icon} text-2xl ${card.iconColor}`}></i>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AnalyticsCards;