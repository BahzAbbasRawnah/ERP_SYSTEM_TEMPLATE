import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import StatsCard from '../components/dashboard/StatsCard';
import QuickActions from '../components/dashboard/QuickActions';
import WeeklyOverviewChart from '../components/dashboard/WeeklyOverviewChart';
import QuarterGoals from '../components/dashboard/QuarterGoals';
import ProductSales from '../components/dashboard/ProductSales';
import RecentSalesTable from '../components/dashboard/RecentSalesTable';
import AnalyticsCards from '../components/dashboard/AnalyticsCards';

const Dashboard = () => {
  const { t } = useTranslation();
  const [dashboardData, setDashboardData] = useState({
    stats: {
      sales: { value: 150, trend: 'up', icon: 'fas fa-chart-line', color: 'blue' },
      revenue: { value: 532, trend: 'up', icon: 'fas fa-dollar-sign', color: 'orange' },
      customers: { value: 450, trend: 'down', icon: 'fas fa-users', color: 'purple' },
      stock: { value: 143, trend: 'down', icon: 'fas fa-boxes', color: 'gray' }
    },
    analytics: {
      reviews: 450,
      visitors: '71K',
      payments: 757
    }
  });

  const breadcrumbs = [
    { label: t('navigation.dashboard'), href: '/dashboard' }
  ];

  return (
    <DashboardLayout 
      title={t('dashboard.title')}
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
            {t('common.addNew')}
          </Button>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title={t('dashboard.stats.sales')}
            value={dashboardData.stats.sales.value}
            icon={dashboardData.stats.sales.icon}
            trend={dashboardData.stats.sales.trend}
            color={dashboardData.stats.sales.color}
          />
          <StatsCard
            title={t('dashboard.stats.revenue')}
            value={dashboardData.stats.revenue.value}
            icon={dashboardData.stats.revenue.icon}
            trend={dashboardData.stats.revenue.trend}
            color={dashboardData.stats.revenue.color}
          />
          <StatsCard
            title={t('dashboard.stats.customers')}
            value={dashboardData.stats.customers.value}
            icon={dashboardData.stats.customers.icon}
            trend={dashboardData.stats.customers.trend}
            color={dashboardData.stats.customers.color}
          />
          <StatsCard
            title={t('dashboard.stats.stock')}
            value={dashboardData.stats.stock.value}
            icon={dashboardData.stats.stock.icon}
            trend={dashboardData.stats.stock.trend}
            color={dashboardData.stats.stock.color}
          />
        </div>

        {/* Charts and Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weekly Overview Chart */}
          <div className="lg:col-span-2">
            <WeeklyOverviewChart />
          </div>

          {/* Quarter Goals */}
          <QuarterGoals />
        </div>

        {/* Analytics Cards */}
        <AnalyticsCards data={dashboardData.analytics} />

        {/* Product Sales and Recent Sales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductSales />
          <RecentSalesTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;