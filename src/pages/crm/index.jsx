import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import StatsCard from '../../components/dashboard/StatsCard';

const CRMDashboard = () => {
  const { t } = useTranslation();
  const leadsChartRef = useRef(null);
  const pipelineChartRef = useRef(null);
  const customerChartRef = useRef(null);
  const activityChartRef = useRef(null);

  useEffect(() => {
    const loadApexCharts = async () => {
      if (typeof ApexCharts === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/apexcharts';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }

      // Leads Generation Chart
      const leadsChart = new ApexCharts(leadsChartRef.current, {
        chart: { type: 'area', height: 350, toolbar: { show: false } },
        series: [
          { name: 'New Leads', data: [25, 32, 28, 45, 38, 52, 48] },
          { name: 'Qualified Leads', data: [18, 24, 20, 32, 28, 38, 35] }
        ],
        xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
        colors: ['#3b82f6', '#10b981'],
        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 } }
      });
      leadsChart.render();

      // Sales Pipeline Chart
      const pipelineChart = new ApexCharts(pipelineChartRef.current, {
        chart: { type: 'bar', height: 350, toolbar: { show: false } },
        plotOptions: { bar: { horizontal: true } },
        series: [{ data: [120, 85, 65, 45, 28] }],
        xaxis: { categories: ['Prospects', 'Qualified', 'Proposal', 'Negotiation', 'Closed'] },
        colors: ['#3b82f6']
      });
      pipelineChart.render();

      // Customer Segmentation Chart
      const customerChart = new ApexCharts(customerChartRef.current, {
        chart: { type: 'donut', height: 350 },
        series: [45, 30, 15, 10],
        labels: ['Enterprise', 'SMB', 'Startup', 'Individual'],
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
      });
      customerChart.render();

      // Activity Timeline Chart
      const activityChart = new ApexCharts(activityChartRef.current, {
        chart: { type: 'bar', height: 350, toolbar: { show: false } },
        series: [
          { name: 'Calls', data: [12, 18, 15, 22, 28, 32, 25] },
          { name: 'Emails', data: [25, 32, 28, 35, 42, 48, 38] },
          { name: 'Meetings', data: [8, 12, 10, 15, 18, 22, 16] }
        ],
        xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
        colors: ['#3b82f6', '#10b981', '#f59e0b']
      });
      activityChart.render();
    };

    loadApexCharts();
  }, []);

  const breadcrumbs = [
    { label: t('navigation.dashboard'), href: '/dashboard' },
    { label: t('navigation.crm') }
  ];

  return (
    <DashboardLayout title={t('crm.title')} breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary">
            <i className="fas fa-download me-1"></i>
            {t('common.export')} Report
          </Button>
          <Button variant="primary">
            <i className="fas fa-plus me-1"></i>
            {t('crm.addCustomer')}
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title={t('crm.totalCustomers')}
            value="1,234"
            icon="fas fa-users"
            trend="up"
            color="blue"
          />
          <StatsCard
            title={t('crm.activeCustomers')}
            value="987"
            icon="fas fa-user-check"
            trend="up"
            color="green"
          />
          <StatsCard
            title="Active Leads"
            value="48"
            icon="fas fa-user-plus"
            trend="up"
            color="purple"
          />
          <StatsCard
            title={t('crm.totalRevenue')}
            value="$45,678"
            icon="fas fa-dollar-sign"
            trend="up"
            color="orange"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Leads Generation</h3>
              <div ref={leadsChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sales Pipeline</h3>
              <div ref={pipelineChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Customer Segmentation</h3>
              <div ref={customerChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Activities</h3>
              <div ref={activityChartRef}></div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CRMDashboard;