import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';

const WeeklyOverviewChart = () => {
  const { t } = useTranslation();
  const chartRef = useRef(null);

  useEffect(() => {
    // Initialize ApexCharts when component mounts
    const initChart = async () => {
      if (typeof window !== 'undefined' && window.ApexCharts) {
        const options = {
          series: [
            { name: t('dashboard.chart.new'), type: 'column', data: [23, 11, 22, 27, 13, 22, 37] },
            { name: t('dashboard.chart.completed'), type: 'column', data: [44, 55, 41, 67, 22, 43, 21] },
            { name: t('dashboard.chart.cancelled'), type: 'line', data: [5, 8, 6, 9, 4, 7, 8] }
          ],
          chart: {
            height: 256,
            type: 'line',
            toolbar: { show: false },
            background: 'transparent'
          },
          colors: ['#06b6d4', '#f97316', '#8b5cf6'],
          xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            labels: {
              style: {
                colors: '#6b7280'
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                colors: '#6b7280'
              }
            }
          },
          legend: {
            show: false
          },
          grid: {
            borderColor: '#e5e7eb',
            strokeDashArray: 4
          },
          theme: {
            mode: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
          }
        };

        const chart = new window.ApexCharts(chartRef.current, options);
        chart.render();

        return () => chart.destroy();
      }
    };

    // Load ApexCharts if not already loaded
    if (!window.ApexCharts) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/apexcharts@latest';
      script.onload = initChart;
      document.head.appendChild(script);
    } else {
      initChart();
    }
  }, [t]);

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {t('dashboard.chart.weeklyOverview')}
          </h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-cyan-500 rounded-full ltr:mr-2 rtl:ml-2"></div>
              <span className="text-gray-600 dark:text-gray-400">{t('dashboard.chart.new')}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full ltr:mr-2 rtl:ml-2"></div>
              <span className="text-gray-600 dark:text-gray-400">{t('dashboard.chart.completed')}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full ltr:mr-2 rtl:ml-2"></div>
              <span className="text-gray-600 dark:text-gray-400">{t('dashboard.chart.cancelled')}</span>
            </div>
          </div>
        </div>
        <div ref={chartRef} className="h-64"></div>
      </div>
    </Card>
  );
};

export default WeeklyOverviewChart;