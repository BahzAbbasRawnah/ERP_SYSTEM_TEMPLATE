import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import StatsCard from '../../components/dashboard/StatsCard';

const EcommerceDashboard = () => {
  const { t } = useTranslation();
  const ordersChartRef = useRef(null);
  const visitorsChartRef = useRef(null);
  const conversionChartRef = useRef(null);
  const channelsChartRef = useRef(null);

  useEffect(() => {
    const loadApexCharts = async () => {
      if (typeof ApexCharts === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/apexcharts';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }

      // Online Orders Chart
      const ordersChart = new ApexCharts(ordersChartRef.current, {
        chart: { type: 'area', height: 350, toolbar: { show: false } },
        series: [{ name: 'Orders', data: [45, 52, 38, 65, 72, 85, 92] }],
        xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
        colors: ['#3b82f6'],
        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 } }
      });
      ordersChart.render();

      // Website Visitors Chart
      const visitorsChart = new ApexCharts(visitorsChartRef.current, {
        chart: { type: 'line', height: 350, toolbar: { show: false } },
        series: [
          { name: 'Visitors', data: [1200, 1800, 1500, 2200, 2800, 3200, 2900] },
          { name: 'Page Views', data: [2400, 3600, 3000, 4400, 5600, 6400, 5800] }
        ],
        xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
        colors: ['#3b82f6', '#10b981'],
        stroke: { curve: 'smooth', width: 3 }
      });
      visitorsChart.render();

      // Conversion Funnel Chart
      const conversionChart = new ApexCharts(conversionChartRef.current, {
        chart: { type: 'bar', height: 350, toolbar: { show: false } },
        series: [{ data: [100, 75, 45, 25, 18] }],
        xaxis: { categories: ['Visitors', 'Product Views', 'Add to Cart', 'Checkout', 'Purchase'] },
        colors: ['#3b82f6'],
        plotOptions: { bar: { distributed: true } }
      });
      conversionChart.render();

      // Traffic Channels Chart
      const channelsChart = new ApexCharts(channelsChartRef.current, {
        chart: { type: 'donut', height: 350 },
        series: [35, 25, 20, 15, 5],
        labels: ['Organic Search', 'Direct', 'Social Media', 'Email', 'Paid Ads'],
        colors: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6']
      });
      channelsChart.render();
    };

    loadApexCharts();
  }, []);

  const breadcrumbs = [
    { label: t('navigation.dashboard'), href: '/dashboard' },
    { label: t('navigation.ecommerce') }
  ];

  return (
    <DashboardLayout title={t('ecommerce.title')} breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary">
            <i className="fas fa-download me-1"></i>
            {t('common.export')} Report
          </Button>
          <Button variant="primary">
            <i className="fas fa-plus me-1"></i>
            Add Product
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title={t('ecommerce.onlineOrders')}
            value="92"
            icon="fas fa-shopping-cart"
            trend="up"
            color="blue"
          />
          <StatsCard
            title={t('ecommerce.websiteVisitors')}
            value="2,900"
            icon="fas fa-users"
            trend="up"
            color="green"
          />
          <StatsCard
            title={t('ecommerce.conversionRate')}
            value="3.17%"
            icon="fas fa-chart-line"
            trend="up"
            color="purple"
          />
          <StatsCard
            title={t('ecommerce.abandonedCarts')}
            value="27"
            icon="fas fa-shopping-basket"
            trend="down"
            color="orange"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Online Orders Trend</h3>
              <div ref={ordersChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Website Traffic</h3>
              <div ref={visitorsChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Conversion Funnel</h3>
              <div ref={conversionChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Traffic Channels</h3>
              <div ref={channelsChartRef}></div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EcommerceDashboard;