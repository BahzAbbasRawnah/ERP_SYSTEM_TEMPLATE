import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import StatsCard from '../../components/dashboard/StatsCard';

const InventoryDashboard = () => {
  const { t } = useTranslation();
  const stockChartRef = useRef(null);
  const categoryChartRef = useRef(null);
  const movementChartRef = useRef(null);
  const alertsChartRef = useRef(null);

  useEffect(() => {
    const loadApexCharts = async () => {
      if (typeof ApexCharts === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/apexcharts';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }

      // Stock Overview Chart
      const stockChart = new ApexCharts(stockChartRef.current, {
        chart: { type: 'area', height: 350, toolbar: { show: false } },
        series: [
          { name: 'In Stock', data: [1200, 1180, 1250, 1220, 1190, 1240, 1210] },
          { name: 'Low Stock', data: [45, 52, 38, 48, 55, 42, 47] },
          { name: 'Out of Stock', data: [12, 8, 15, 10, 18, 14, 16] }
        ],
        xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
        colors: ['#10b981', '#f59e0b', '#ef4444'],
        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 } }
      });
      stockChart.render();

      // Category Distribution Chart
      const categoryChart = new ApexCharts(categoryChartRef.current, {
        chart: { type: 'donut', height: 350 },
        series: [450, 320, 280, 180, 120],
        labels: ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'],
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
      });
      categoryChart.render();

      // Stock Movement Chart
      const movementChart = new ApexCharts(movementChartRef.current, {
        chart: { type: 'bar', height: 350, toolbar: { show: false } },
        series: [
          { name: 'Stock In', data: [180, 220, 195, 240, 280, 320, 350] },
          { name: 'Stock Out', data: [150, 180, 165, 200, 240, 280, 310] }
        ],
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] },
        colors: ['#10b981', '#ef4444']
      });
      movementChart.render();

      // Stock Alerts Chart
      const alertsChart = new ApexCharts(alertsChartRef.current, {
        chart: { type: 'radialBar', height: 350 },
        series: [25, 15, 8],
        labels: ['Low Stock', 'Out of Stock', 'Expired'],
        colors: ['#f59e0b', '#ef4444', '#6b7280']
      });
      alertsChart.render();
    };

    loadApexCharts();
  }, []);

  const breadcrumbs = [
    { label: t('navigation.dashboard'), href: '/dashboard' },
    { label: t('navigation.inventory') }
  ];

  return (
    <DashboardLayout title={t('inventoryManagement.title')} breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary">
            <i className="fas fa-download me-1"></i>
            {t('common.export')} Report
          </Button>
          <Button variant="primary">
            <i className="fas fa-plus me-1"></i>
            {t('inventoryManagement.addProduct')}
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title={t('inventoryManagement.totalProducts')}
            value="1,350"
            icon="fas fa-boxes"
            trend="up"
            color="blue"
          />
          <StatsCard
            title={t('inventoryManagement.inStock')}
            value="1,210"
            icon="fas fa-check-circle"
            trend="up"
            color="green"
          />
          <StatsCard
            title={t('inventoryManagement.lowStock')}
            value="47"
            icon="fas fa-exclamation-triangle"
            trend="down"
            color="orange"
          />
          <StatsCard
            title={t('inventoryManagement.outOfStock')}
            value="16"
            icon="fas fa-times-circle"
            trend="down"
            color="red"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Stock Overview</h3>
              <div ref={stockChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Category Distribution</h3>
              <div ref={categoryChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Stock Movement</h3>
              <div ref={movementChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Stock Alerts</h3>
              <div ref={alertsChartRef}></div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InventoryDashboard;