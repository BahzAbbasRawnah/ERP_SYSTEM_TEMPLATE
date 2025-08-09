import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import StatsCard from '../../components/dashboard/StatsCard';

const FinanceDashboard = () => {
  const { t } = useTranslation();
  const cashFlowChartRef = useRef(null);
  const expenseChartRef = useRef(null);
  const budgetChartRef = useRef(null);
  const ratiosChartRef = useRef(null);

  useEffect(() => {
    const loadApexCharts = async () => {
      if (typeof ApexCharts === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/apexcharts';
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
      }

      // Cash Flow Chart
      const cashFlowChart = new ApexCharts(cashFlowChartRef.current, {
        chart: { type: 'line', height: 350, toolbar: { show: false } },
        series: [
          { name: 'Cash In', data: [450000, 520000, 480000, 610000, 580000, 650000, 720000] },
          { name: 'Cash Out', data: [380000, 420000, 390000, 480000, 460000, 520000, 580000] }
        ],
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] },
        colors: ['#10b981', '#ef4444'],
        stroke: { curve: 'smooth', width: 3 }
      });
      cashFlowChart.render();

      // Expense Breakdown Chart
      const expenseChart = new ApexCharts(expenseChartRef.current, {
        chart: { type: 'donut', height: 350 },
        series: [180000, 120000, 95000, 75000, 50000],
        labels: ['Salaries', 'Operations', 'Marketing', 'Utilities', 'Others'],
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
      });
      expenseChart.render();

      // Budget vs Actual Chart
      const budgetChart = new ApexCharts(budgetChartRef.current, {
        chart: { type: 'bar', height: 350, toolbar: { show: false } },
        series: [
          { name: 'Budget', data: [500000, 450000, 400000, 350000, 300000, 250000] },
          { name: 'Actual', data: [480000, 420000, 390000, 340000, 280000, 240000] }
        ],
        xaxis: { categories: ['Revenue', 'Salaries', 'Operations', 'Marketing', 'Utilities', 'Others'] },
        colors: ['#3b82f6', '#10b981']
      });
      budgetChart.render();

      // Financial Ratios Chart
      const ratiosChart = new ApexCharts(ratiosChartRef.current, {
        chart: { type: 'radialBar', height: 350 },
        series: [85, 72, 68],
        labels: ['Profit Margin', 'ROI', 'Liquidity Ratio'],
        colors: ['#10b981', '#3b82f6', '#f59e0b']
      });
      ratiosChart.render();
    };

    loadApexCharts();
  }, []);

  const breadcrumbs = [
    { label: t('navigation.dashboard'), href: '/dashboard' },
    { label: t('navigation.finance') }
  ];

  return (
    <DashboardLayout title={t('accounting.title')} breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary">
            <i className="fas fa-download me-1"></i>
            {t('common.export')} Report
          </Button>
          <Button variant="primary">
            <i className="fas fa-plus me-1"></i>
            New Transaction
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title={t('accounting.totalRevenue')}
            value="$720,000"
            icon="fas fa-dollar-sign"
            trend="up"
            color="green"
          />
          <StatsCard
            title={t('accounting.totalExpenses')}
            value="$580,000"
            icon="fas fa-credit-card"
            trend="up"
            color="red"
          />
          <StatsCard
            title={t('accounting.netProfit')}
            value="$140,000"
            icon="fas fa-chart-line"
            trend="up"
            color="blue"
          />
          <StatsCard
            title={t('accounting.cashFlow')}
            value="$95,000"
            icon="fas fa-exchange-alt"
            trend="up"
            color="purple"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Cash Flow Trend</h3>
              <div ref={cashFlowChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Expense Breakdown</h3>
              <div ref={expenseChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Budget vs Actual</h3>
              <div ref={budgetChartRef}></div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Financial Ratios</h3>
              <div ref={ratiosChartRef}></div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FinanceDashboard;