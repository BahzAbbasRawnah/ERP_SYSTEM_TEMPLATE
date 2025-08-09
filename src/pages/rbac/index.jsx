import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatsCard from '../../components/ui/StatsCard';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const RBACDashboard = () => {
  const { t } = useTranslation();

  const breadcrumbs = [
    { label: t('navigation.dashboard'), href: '/dashboard' },
    { label: t('navigation.rbac'), href: '/rbac' }
  ];

  const stats = [
    { title: t('rbac.totalUsers'), value: '156', icon: 'fas fa-users', color: 'blue', change: '+12%' },
    { title: t('rbac.activeRoles'), value: '8', icon: 'fas fa-user-tag', color: 'green', change: '+2' },
    { title: t('rbac.permissions'), value: '24', icon: 'fas fa-shield-alt', color: 'purple', change: '0' },
    { title: t('rbac.adminUsers'), value: '5', icon: 'fas fa-user-shield', color: 'orange', change: '+1' }
  ];

  const recentActivities = [
    { user: 'John Doe', action: 'Role Updated', role: 'Manager', time: '2 hours ago' },
    { user: 'Jane Smith', action: 'User Created', role: 'Employee', time: '4 hours ago' },
    { user: 'Mike Johnson', action: 'Permission Granted', role: 'Admin', time: '6 hours ago' },
    { user: 'Sarah Wilson', action: 'Role Assigned', role: 'Supervisor', time: '1 day ago' }
  ];

  return (
    <DashboardLayout 
      title={t('rbac.title')}
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="secondary">
            <i className="fas fa-download me-2"></i>
            {t('common.export')}
          </Button>
          <Button variant="primary">
            <i className="fas fa-plus me-2"></i>
            {t('rbac.addUser')}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">{t('rbac.quickActions')}</h3>
            <div className="space-y-3">
              <Button className="w-full" variant="primary">
                <i className="fas fa-user-plus mr-2"></i>
                {t('rbac.addUser')}
              </Button>
              <Button className="w-full" variant="success">
                <i className="fas fa-user-tag mr-2"></i>
                {t('rbac.createRole')}
              </Button>
              <Button className="w-full" variant="purple">
                <i className="fas fa-shield-alt mr-2"></i>
                {t('rbac.managePermissions')}
              </Button>
            </div>
          </Card>

          <Card className="p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">{t('rbac.recentActivities')}</h3>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <i className="fas fa-user text-blue-600 dark:text-blue-400 text-sm"></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{activity.user}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.action} - {activity.role}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RBACDashboard;