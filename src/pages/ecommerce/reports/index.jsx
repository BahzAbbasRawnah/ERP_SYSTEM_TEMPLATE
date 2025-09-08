import React from 'react';
import { Link } from 'react-router-dom';

const EcommerceReports = () => {
  const reports = [
    {
      id: 'sales-overview',
      title: 'نظرة عامة على المبيعات',
      description: 'تحليل شامل لأداء المبيعات والإيرادات',
      icon: 'fas fa-chart-bar',
      path: '/ecommerce/reports/sales-overview',
      color: 'bg-green-500'
    },
    {
      id: 'product-performance',
      title: 'أداء المنتجات',
      description: 'تقييم أداء المنتجات الأكثر مبيعًا والأقل مبيعًا',
      icon: 'fas fa-box',
      path: '/ecommerce/reports/product-performance',
      color: 'bg-blue-500'
    },
    {
      id: 'customer-analytics',
      title: 'تحليلات العملاء',
      description: 'فهم سلوك العملاء وتفضيلاتهم الشرائية',
      icon: 'fas fa-users',
      path: '/ecommerce/reports/customer-analytics',
      color: 'bg-purple-500'
    },
    {
      id: 'inventory-status',
      title: 'حالة المخزون',
      description: 'مراقبة مستويات المخزون وتنبيهات إعادة الطلب',
      icon: 'fas fa-boxes',
      path: '/ecommerce/reports/inventory-status',
      color: 'bg-yellow-500'
    },
    {
      id: 'traffic-sources',
      title: 'مصادر الزيارات',
      description: 'تحليل مصادر الزيارات وتأثيرها على المبيعات',
      icon: 'fas fa-globe',
      path: '/ecommerce/reports/traffic-sources',
      color: 'bg-indigo-500'
    },
    {
      id: 'conversion-rate',
      title: 'معدل التحويل',
      description: 'قياس فعالية الموقع في تحويل الزوار إلى مشترين',
      icon: 'fas fa-percentage',
      path: '/ecommerce/reports/conversion-rate',
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          تقارير التجارة الإلكترونية
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          مجموعة شاملة من التقارير لتحليل أداء متجرك الإلكتروني
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <Link
            key={report.id}
            to={report.path}
            className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 dark:border-gray-700"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className={`${report.color} p-3 rounded-lg text-white`}>
                  <i className={`${report.icon} text-xl`} />
                </div>
                <div className="mr-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {report.title}
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {report.description}
              </p>
              <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                عرض التقرير
                <i className="fas fa-arrow-left mr-2" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <i className="fas fa-info-circle text-green-600 dark:text-green-400 text-xl ml-3" />
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
            نصائح لتحسين الأداء
          </h3>
        </div>
        <p className="text-green-800 dark:text-green-200 text-sm">
          استخدم هذه التقارير لتحديد نقاط القوة والضعف في متجرك.
          ركز على تحسين المنتجات ذات الأداء المنخفض واستثمر في القنوات التي تجلب أعلى عائد.
        </p>
      </div>
    </div>
  );
};

export default EcommerceReports;
