import React from 'react';
import { Link } from 'react-router-dom';

const SalesReports = () => {
  const reports = [
    {
      id: 'sales-performance',
      title: 'أداء المبيعات',
      titleEn: 'Sales Performance',
      description: 'تحليل أداء المبيعات حسب الفترة الزمنية والمنتج',
      descriptionEn: 'Analysis of sales performance by time period and product',
      component: 'SalesPerformance',
      icon: 'fas fa-chart-line'
    },
    {
      id: 'customer-sales-analysis',
      title: 'تحليل مبيعات العملاء',
      titleEn: 'Customer Sales Analysis',
      description: 'عرض المبيعات حسب العملاء الأكثر شراءً',
      descriptionEn: 'View sales by top purchasing customers',
      component: 'CustomerSalesAnalysis',
      icon: 'fas fa-users'
    },
    {
      id: 'product-sales-analysis',
      title: 'تحليل مبيعات المنتجات',
      titleEn: 'Product Sales Analysis',
      description: 'تقييم أداء المنتجات وتحديد الأكثر ربحية',
      descriptionEn: 'Evaluate product performance and identify most profitable',
      component: 'ProductSalesAnalysis',
      icon: 'fas fa-box'
    },
    {
      id: 'sales-team-performance',
      title: 'أداء فريق المبيعات',
      titleEn: 'Sales Team Performance',
      description: 'متابعة أداء فريق المبيعات وتحقيق الأهداف',
      descriptionEn: 'Track sales team performance and goal achievement',
      component: 'SalesTeamPerformance',
      icon: 'fas fa-user-tie'
    },
    {
      id: 'regional-sales',
      title: 'المبيعات حسب المنطقة',
      titleEn: 'Regional Sales',
      description: 'تحليل المبيعات حسب المناطق الجغرافية',
      descriptionEn: 'Analyze sales by geographical regions',
      component: 'RegionalSales',
      icon: 'fas fa-globe-americas'
    },
    {
      id: 'sales-forecast',
      title: 'توقعات المبيعات',
      titleEn: 'Sales Forecast',
      description: 'تقدير المبيعات المستقبلية بناءً على البيانات التاريخية',
      descriptionEn: 'Estimate future sales based on historical data',
      component: 'SalesForecast',
      icon: 'fas fa-bullseye'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          تقارير المبيعات
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          مجموعة شاملة من التقارير لتحليل أداء المبيعات واتخاذ القرارات
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className={`${report.icon} text-blue-600 text-xl`}></i>
                  </div>
                </div>
                <div className="mr-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {report.title}
                  </h3>
                  <p className="text-sm text-gray-500">{report.titleEn}</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {report.description}
              </p>
              
              <div className="flex justify-between items-center">
                <Link
                  to={`/sales/reports/${report.id}`}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  <i className="fas fa-eye ml-2"></i>
                  عرض التقرير
                </Link>
                
                <button
                  className="inline-flex items-center px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors duration-200"
                  title="طباعة"
                >
                  <i className="fas fa-print"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <i className="fas fa-info-circle text-blue-600 text-lg mt-1"></i>
          </div>
          <div className="mr-3">
            <h3 className="text-sm font-medium text-blue-800 mb-1">
              ملاحظة هامة
            </h3>
            <p className="text-sm text-blue-700">
              جميع التقارير تحتوي على بيانات تجريبية باللغة العربية لأغراض العرض والاختبار. 
              يمكن تخصيص البيانات حسب احتياجات المؤسسة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReports;
