import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import StatsCard from '../../components/dashboard/StatsCard';

const PurchasesDashboard = () => {
  const { t } = useTranslation();
  const purchaseTrendChartRef = useRef(null);
  const supplierChartRef = useRef(null);
  const categoryChartRef = useRef(null);
  const statusChartRef = useRef(null);

  useEffect(() => {
    const loadApexCharts = async () => {
      if (typeof ApexCharts === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/apexcharts';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }

      // Purchase Trend Chart
      const purchaseTrendChart = new ApexCharts(purchaseTrendChartRef.current, {
        chart: { type: 'area', height: 350, toolbar: { show: false } },
        series: [{ name: 'Purchase Amount', data: [180000, 220000, 195000, 240000, 280000, 320000, 350000] }],
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] },
        colors: ['#3b82f6'],
        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 } },
        yaxis: { labels: { formatter: val => '$' + (val / 1000).toFixed(0) + 'K' } }
      });
      purchaseTrendChart.render();

      // Top Suppliers Chart
      const supplierChart = new ApexCharts(supplierChartRef.current, {
        chart: { type: 'bar', height: 350, toolbar: { show: false } },
        plotOptions: { bar: { horizontal: true } },
        series: [{ data: [85000, 72000, 68000, 55000, 42000] }],
        xaxis: { categories: ['TechCorp Ltd', 'Global Supplies', 'Prime Materials', 'Quality Parts', 'Swift Logistics'] },
        colors: ['#3b82f6']
      });
      supplierChart.render();

      // Purchase by Category Chart
      const categoryChart = new ApexCharts(categoryChartRef.current, {
        chart: { type: 'donut', height: 350 },
        series: [120000, 95000, 75000, 60000, 45000],
        labels: ['Raw Materials', 'Equipment', 'Office Supplies', 'Software', 'Services'],
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
      });
      categoryChart.render();

      // Order Status Chart
      const statusChart = new ApexCharts(statusChartRef.current, {
        chart: { type: 'radialBar', height: 350 },
        series: [75, 60, 45],
        labels: ['Completed', 'Pending', 'Cancelled'],
        colors: ['#10b981', '#f59e0b', '#ef4444']
      });
      statusChart.render();
    };

    loadApexCharts();
  }, []);

  const breadcrumbs = [
    { label: t('navigation.dashboard'), href: '/dashboard' },
    { label: t('navigation.purchases') }
  ];

  return (
    <DashboardLayout title={t('purchasing.title')} breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary">
            <i className="fas fa-download me-1"></i>
            {t('common.export')} Report
          </Button>
          <Button variant="primary">
            <i className="fas fa-plus me-1"></i>
            New Purchase Order
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title={t('purchasing.totalPurchases')}
            value="$350,000"
            icon="fas fa-shopping-bag"
            trend="up"
            color="blue"
          />
          <StatsCard
            title={t('purchasing.pendingOrders')}
            value="24"
            icon="fas fa-clock"
            trend="down"
            color="orange"
          />
          <StatsCard
            title={t('purchasing.completedOrders')}
            value="186"
            icon="fas fa-check-circle"
            trend="up"
            color="green"
          />
          <StatsCard
            title={t('purchasing.totalSuppliers')}
            value="45"
            icon="fas fa-truck"
            trend="up"
            color="purple"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Purchase Trend</h3>
              <div ref={purchaseTrendChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Suppliers</h3>
              <div ref={supplierChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Purchase by Category</h3>
              <div ref={categoryChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Status</h3>
              <div ref={statusChartRef}></div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PurchasesDashboard;