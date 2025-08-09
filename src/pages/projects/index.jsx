import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import StatsCard from '../../components/dashboard/StatsCard';

const ProjectsDashboard = () => {
  const { t } = useTranslation();
  const progressChartRef = useRef(null);
  const budgetChartRef = useRef(null);
  const timelineChartRef = useRef(null);
  const teamChartRef = useRef(null);

  useEffect(() => {
    const loadApexCharts = async () => {
      if (typeof ApexCharts === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/apexcharts';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }

      // Project Progress Chart
      const progressChart = new ApexCharts(progressChartRef.current, {
        chart: { type: 'bar', height: 350, toolbar: { show: false } },
        plotOptions: { bar: { horizontal: true } },
        series: [{ data: [85, 72, 68, 45, 30] }],
        xaxis: { categories: ['Website Redesign', 'Mobile App', 'ERP System', 'Marketing Campaign', 'Data Migration'] },
        colors: ['#3b82f6']
      });
      progressChart.render();

      // Budget vs Spent Chart
      const budgetChart = new ApexCharts(budgetChartRef.current, {
        chart: { type: 'bar', height: 350, toolbar: { show: false } },
        series: [
          { name: 'Budget', data: [50000, 80000, 120000, 30000, 45000] },
          { name: 'Spent', data: [42000, 65000, 85000, 18000, 25000] }
        ],
        xaxis: { categories: ['Website', 'Mobile App', 'ERP System', 'Marketing', 'Migration'] },
        colors: ['#3b82f6', '#10b981']
      });
      budgetChart.render();

      // Project Timeline Chart
      const timelineChart = new ApexCharts(timelineChartRef.current, {
        chart: { type: 'area', height: 350, toolbar: { show: false } },
        series: [
          { name: 'Planned', data: [5, 8, 12, 15, 18, 20, 22] },
          { name: 'Completed', data: [4, 7, 10, 12, 14, 16, 18] }
        ],
        xaxis: { categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'] },
        colors: ['#3b82f6', '#10b981'],
        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 } }
      });
      timelineChart.render();

      // Team Allocation Chart
      const teamChart = new ApexCharts(teamChartRef.current, {
        chart: { type: 'donut', height: 350 },
        series: [8, 6, 4, 3, 2],
        labels: ['Developers', 'Designers', 'QA', 'Project Managers', 'DevOps'],
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
      });
      teamChart.render();
    };

    loadApexCharts();
  }, []);

  const breadcrumbs = [
    { label: t('navigation.dashboard'), href: '/dashboard' },
    { label: t('navigation.projects') }
  ];

  return (
    <DashboardLayout title={t('projects.title')} breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary">
            <i className="fas fa-download me-1"></i>
            {t('common.export')} Report
          </Button>
          <Button variant="primary">
            <i className="fas fa-plus me-1"></i>
            New Project
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title={t('projects.activeProjects')}
            value="12"
            icon="fas fa-project-diagram"
            trend="up"
            color="blue"
          />
          <StatsCard
            title={t('projects.completedProjects')}
            value="8"
            icon="fas fa-check-circle"
            trend="up"
            color="green"
          />
          <StatsCard
            title={t('projects.totalBudget')}
            value="$325K"
            icon="fas fa-dollar-sign"
            trend="up"
            color="purple"
          />
          <StatsCard
            title="Team Members"
            value="23"
            icon="fas fa-users"
            trend="up"
            color="orange"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('projects.projectProgress')}</h3>
              <div ref={progressChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Budget vs Spent</h3>
              <div ref={budgetChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Timeline</h3>
              <div ref={timelineChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Team Allocation</h3>
              <div ref={teamChartRef}></div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectsDashboard;