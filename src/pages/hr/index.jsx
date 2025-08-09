import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import StatsCard from '../../components/dashboard/StatsCard';

const HRDashboard = () => {
  const { t } = useTranslation();
  const departmentChartRef = useRef(null);
  const attendanceChartRef = useRef(null);
  const performanceChartRef = useRef(null);
  const salaryChartRef = useRef(null);

  useEffect(() => {
    const loadApexCharts = async () => {
      if (typeof ApexCharts === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/apexcharts';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }

      // Department Distribution Chart
      const departmentChart = new ApexCharts(departmentChartRef.current, {
        chart: { type: 'pie', height: 350 },
        series: [45, 32, 28, 18, 12],
        labels: ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance'],
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
      });
      departmentChart.render();

      // Attendance Tracking Chart
      const attendanceChart = new ApexCharts(attendanceChartRef.current, {
        chart: { type: 'area', height: 350, toolbar: { show: false } },
        series: [
          { name: 'Present', data: [120, 118, 125, 122, 119, 124, 121] },
          { name: 'Absent', data: [15, 17, 10, 13, 16, 11, 14] }
        ],
        xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
        colors: ['#10b981', '#ef4444'],
        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 } }
      });
      attendanceChart.render();

      // Performance Analytics Chart
      const performanceChart = new ApexCharts(performanceChartRef.current, {
        chart: { type: 'bar', height: 350, toolbar: { show: false } },
        series: [
          { name: 'Excellent', data: [25, 18, 22, 15, 8] },
          { name: 'Good', data: [15, 10, 4, 2, 3] },
          { name: 'Average', data: [5, 4, 2, 1, 1] }
        ],
        xaxis: { categories: ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance'] },
        colors: ['#10b981', '#3b82f6', '#f59e0b']
      });
      performanceChart.render();

      // Salary Distribution Chart
      const salaryChart = new ApexCharts(salaryChartRef.current, {
        chart: { type: 'radialBar', height: 350 },
        series: [75, 60, 45],
        labels: ['Senior Level', 'Mid Level', 'Junior Level'],
        colors: ['#3b82f6', '#10b981', '#f59e0b']
      });
      salaryChart.render();
    };

    loadApexCharts();
  }, []);

  const breadcrumbs = [
    { label: t('navigation.dashboard'), href: '/dashboard' },
    { label: t('navigation.hr') }
  ];

  return (
    <DashboardLayout title={t('humanResources.title')} breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary">
            <i className="fas fa-download me-1"></i>
            {t('common.export')} Report
          </Button>
          <Button variant="primary">
            <i className="fas fa-plus me-1"></i>
            {t('employees.addEmployee')}
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title={t('humanResources.totalEmployees')}
            value="135"
            icon="fas fa-users"
            trend="up"
            color="blue"
          />
          <StatsCard
            title={t('humanResources.activeEmployees')}
            value="128"
            icon="fas fa-user-check"
            trend="up"
            color="green"
          />
          <StatsCard
            title={t('humanResources.onLeave')}
            value="7"
            icon="fas fa-calendar-times"
            trend="down"
            color="orange"
          />
          <StatsCard
            title={t('humanResources.newHires')}
            value="12"
            icon="fas fa-user-plus"
            trend="up"
            color="purple"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Department Distribution</h3>
              <div ref={departmentChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Attendance</h3>
              <div ref={attendanceChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Analytics</h3>
              <div ref={performanceChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Salary Distribution</h3>
              <div ref={salaryChartRef}></div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HRDashboard;