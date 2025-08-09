import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import StatsCard from '../../components/dashboard/StatsCard';

const POSDashboard = () => {
  const { t } = useTranslation();
  const salesChartRef = useRef(null);
  const paymentChartRef = useRef(null);
  const hourlyChartRef = useRef(null);
  const topProductsChartRef = useRef(null);

  useEffect(() => {
    const loadApexCharts = async () => {
      if (typeof ApexCharts === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/apexcharts';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }

      // Daily Sales Chart
      const salesChart = new ApexCharts(salesChartRef.current, {
        chart: { type: 'area', height: 350, toolbar: { show: false } },
        series: [{ name: 'Sales', data: [1200, 1800, 1500, 2200, 2800, 3200, 2900] }],
        xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
        colors: ['#3b82f6'],
        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 } },
        yaxis: { labels: { formatter: val => '$' + val } }
      });
      salesChart.render();

      // Payment Methods Chart
      const paymentChart = new ApexCharts(paymentChartRef.current, {
        chart: { type: 'donut', height: 350 },
        series: [45, 30, 15, 10],
        labels: ['Cash', 'Credit Card', 'Debit Card', 'Mobile Payment'],
        colors: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6']
      });
      paymentChart.render();

      // Hourly Sales Chart
      const hourlyChart = new ApexCharts(hourlyChartRef.current, {
        chart: { type: 'bar', height: 350, toolbar: { show: false } },
        series: [{ name: 'Transactions', data: [12, 18, 25, 35, 42, 55, 68, 75, 82, 78, 65, 45] }],
        xaxis: { categories: ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM'] },
        colors: ['#3b82f6']
      });
      hourlyChart.render();

      // Top Products Chart
      const topProductsChart = new ApexCharts(topProductsChartRef.current, {
        chart: { type: 'bar', height: 350, toolbar: { show: false } },
        plotOptions: { bar: { horizontal: true } },
        series: [{ data: [85, 72, 68, 55, 42] }],
        xaxis: { categories: ['Coffee', 'Sandwich', 'Pastry', 'Juice', 'Salad'] },
        colors: ['#10b981']
      });
      topProductsChart.render();
    };

    loadApexCharts();
  }, []);

  const breadcrumbs = [
    { label: t('navigation.dashboard'), href: '/dashboard' },
    { label: t('navigation.pos') }
  ];

  return (
    <DashboardLayout title={t('pos.title')} breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary">
            <i className="fas fa-download me-1"></i>
            {t('common.export')} Report
          </Button>
          <Button variant="primary">
            <i className="fas fa-plus me-1"></i>
            New Sale
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title={t('pos.dailySales')}
            value="$2,900"
            icon="fas fa-dollar-sign"
            trend="up"
            color="green"
          />
          <StatsCard
            title={t('pos.totalTransactions')}
            value="156"
            icon="fas fa-receipt"
            trend="up"
            color="blue"
          />
          <StatsCard
            title={t('pos.averageTransaction')}
            value="$18.59"
            icon="fas fa-chart-line"
            trend="up"
            color="purple"
          />
          <StatsCard
            title={t('pos.cashSales')}
            value="$1,305"
            icon="fas fa-money-bill"
            trend="up"
            color="orange"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Sales Trend</h3>
              <div ref={salesChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Methods</h3>
              <div ref={paymentChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Hourly Sales</h3>
              <div ref={hourlyChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Products</h3>
              <div ref={topProductsChartRef}></div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default POSDashboard;