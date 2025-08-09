import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/ui/Button';

const Notifications = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('All');
  
  const breadcrumbs = [
    { label: t('Notifications'), href: '/notifications' }
  ];

  const notifications = [
    {
      id: 1,
      type: 'project',
      title: 'New Project Assignment',
      message: 'You have been assigned to the "Enterprise ERP System" project as a lead developer.',
      time: '2 minutes ago',
      user: 'Sarah Johnson',
      icon: 'fas fa-project-diagram',
      color: 'blue',
      unread: true
    },
    {
      id: 2,
      type: 'system',
      title: 'System Maintenance Scheduled',
      message: 'Scheduled maintenance will occur on Sunday, Dec 15th from 2:00 AM to 4:00 AM EST.',
      time: '1 hour ago',
      user: 'System Admin',
      icon: 'fas fa-exclamation-triangle',
      color: 'yellow',
      unread: false
    },
    {
      id: 3,
      type: 'message',
      title: 'New Message Received',
      message: 'Mike Chen sent you a message about the quarterly budget review.',
      time: '3 hours ago',
      user: 'Mike Chen',
      icon: 'fas fa-message',
      color: 'green',
      unread: false,
      read: true
    },
    {
      id: 4,
      type: 'task',
      title: 'Task Deadline Approaching',
      message: 'The task "Database Migration" is due tomorrow at 5:00 PM.',
      time: '5 hours ago',
      user: 'Due Tomorrow',
      icon: 'fas fa-tasks',
      color: 'purple',
      unread: true
    },
    {
      id: 5,
      type: 'security',
      title: 'Security Alert',
      message: 'New login detected from Chrome on Windows. Location: New York, NY.',
      time: '1 day ago',
      user: 'New York, NY',
      icon: 'fas fa-shield-alt',
      color: 'red',
      unread: false,
      verified: true
    },
    {
      id: 6,
      type: 'update',
      title: 'System Update Available',
      message: 'ERP System v2.1.4 is now available with bug fixes and performance improvements.',
      time: '2 days ago',
      user: 'v2.1.4',
      icon: 'fas fa-download',
      color: 'indigo',
      unread: false,
      installed: true
    }
  ];

  const filters = ['All', 'Unread', 'System', 'Projects', 'Messages'];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500 border-blue-500',
      yellow: 'bg-yellow-500 border-yellow-500',
      green: 'bg-green-500 border-green-500',
      purple: 'bg-purple-500 border-purple-500',
      red: 'bg-red-500 border-red-500',
      indigo: 'bg-indigo-500 border-indigo-500'
    };
    return colors[color] || 'bg-gray-500 border-gray-500';
  };

  return (
    <DashboardLayout title={t('Notifications')} breadcrumbs={breadcrumbs}>
      {/* Notification Filters */}
      <div className="mb-6 flex space-x-4">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg ${
              activeFilter === filter
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {t(filter)}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 ${getColorClasses(notification.color)} ${
              !notification.unread ? 'opacity-75' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className={`me-2 w-10 h-10 ${getColorClasses(notification.color).split(' ')[0]} rounded-full flex items-center justify-center`}>
                  <i className={`${notification.icon} text-white`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{notification.title}</h3>
                    {notification.unread && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                  <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                    <span>
                      <i className="fas fa-clock mx-1" />
                      {notification.time}
                    </span>
                    <span>
                      <i className={`fas ${notification.type === 'system' ? 'fa-cog' : notification.type === 'task' ? 'fa-calendar' : notification.type === 'security' ? 'fa-map-marker-alt' : notification.type === 'update' ? 'fa-code-branch' : 'fa-user'} mx-1`} />
                      {notification.user}
                    </span>
                    {notification.read && (
                      <span className="text-green-600 dark:text-green-400">
                        <i className="fas fa-check mx-1" />
                        {t('Read')}
                      </span>
                    )}
                    {notification.verified && (
                      <span className="text-green-600 dark:text-green-400">
                        <i className="fas fa-check mx-1" />
                        {t('Verified')}
                      </span>
                    )}
                    {notification.installed && (
                      <span className="text-green-600 dark:text-green-400">
                        <i className="fas fa-check mx-1" />
                        {t('Installed')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {notification.unread && (
                <div className="flex space-x-2">
                  <button className="mx-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <i className="fas fa-check" />
                  </button>
                  <button className="mx-1 text-gray-400 hover:text-red-500">
                    <i className="fas fa-times" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-8 text-center">
        <Button variant="secondary">
          {t('Load More Notifications')}
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;