import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import StatsCard from '../../components/dashboard/StatsCard';

const SalesDashboard = () => {
  const { t } = useTranslation();
  const revenueChartRef = useRef(null);
  const categoryChartRef = useRef(null);
  const monthlyChartRef = useRef(null);
  const productsChartRef = useRef(null);
  const targetChartRef = useRef(null);
  const performanceChartRef = useRef(null);

  useEffect(() => {
    const loadApexCharts = async () => {
      if (typeof ApexCharts === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/apexcharts';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }

      // Revenue Trend Chart
      const revenueChart = new ApexCharts(revenueChartRef.current, {
        chart: { type: 'area', height: 350, toolbar: { show: false } },
        series: [{ name: 'Revenue', data: [2100000, 2300000, 2150000, 2400000, 2600000, 2800000, 2847392] }],
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] },
        colors: ['#3b82f6'],
        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 } },
        yaxis: { labels: { formatter: val => '$' + (val / 1000000).toFixed(1) + 'M' } }
      });
      revenueChart.render();

      // Category Chart
      const categoryChart = new ApexCharts(categoryChartRef.current, {
        chart: { type: 'donut', height: 350 },
        series: [850000, 650000, 480000, 420000, 347392],
        labels: ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'],
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
      });
      categoryChart.render();

      // Monthly Performance Chart
      const monthlyChart = new ApexCharts(monthlyChartRef.current, {
        chart: { type: 'bar', height: 350, toolbar: { show: false } },
        series: [{ name: 'Sales', data: [180, 220, 195, 240, 280, 320, 350] }],
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] },
        colors: ['#3b82f6']
      });
      monthlyChart.render();

      // Top Products Chart
      const productsChart = new ApexCharts(productsChartRef.current, {
        chart: { type: 'bar', height: 350, toolbar: { show: false } },
        plotOptions: { bar: { horizontal: true } },
        series: [{ data: [450, 380, 320, 280, 240] }],
        xaxis: { categories: ['Laptop Pro', 'Wireless Headphones', 'Smart Watch', 'Gaming Mouse', 'USB-C Hub'] },
        colors: ['#3b82f6']
      });
      productsChart.render();

      // Sales Target Chart
      const targetChart = new ApexCharts(targetChartRef.current, {
        chart: { type: 'radialBar', height: 350 },
        series: [85],
        labels: ['Target Achievement'],
        colors: ['#10b981']
      });
      targetChart.render();

      // Performance Overview Chart
      const performanceChart = new ApexCharts(performanceChartRef.current, {
        chart: { type: 'line', height: 350, toolbar: { show: false } },
        series: [
          { name: 'Revenue', type: 'column', data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160] },
          { name: 'Orders', type: 'line', data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16] }
        ],
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
        colors: ['#3b82f6', '#10b981']
      });
      performanceChart.render();
    };

    loadApexCharts();
  }, []);

  const breadcrumbs = [
    { label: t('navigation.dashboard'), href: '/dashboard' },
    { label: t('navigation.sales') }
  ];

  return (
    <DashboardLayout title={t('sales.title')} breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary">
            <i className="fas fa-download me-1"></i>
            {t('common.export')} Report
          </Button>
          <Button variant="primary">
            <i className="fas fa-plus me-1"></i>
            {t('sales.newOrder')}
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title={t('sales.totalRevenue')}
            value="$2,847,392"
            icon="fas fa-dollar-sign"
            trend="up"
            color="green"
          />
          <StatsCard
            title={t('sales.totalOrders')}
            value="1,847"
            icon="fas fa-shopping-cart"
            trend="up"
            color="blue"
          />
          <StatsCard
            title="Avg Order Value"
            value="$1,542"
            icon="fas fa-chart-line"
            trend="up"
            color="purple"
          />
          <StatsCard
            title={t('dashboard.conversionRate')}
            value="24.8%"
            icon="fas fa-percentage"
            trend="up"
            color="orange"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Trend</h3>
              <div ref={revenueChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sales by Category</h3>
              <div ref={categoryChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Performance</h3>
              <div ref={monthlyChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Products</h3>
              <div ref={productsChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sales Target</h3>
              <div ref={targetChartRef}></div>
            </div>
          </Card>
        </div>

        {/* Performance Overview */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sales Performance Overview</h3>
            <div ref={performanceChartRef}></div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SalesDashboard;