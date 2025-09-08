import React from 'react';
import { Link } from 'react-router-dom';

const CRMReports = () => {

  const reports = [
    {
      id: 'customer-analysis',
      title: 'تحليل العملاء',
      description: 'تقرير شامل عن تحليل سلوك العملاء وأنماط الشراء',
      icon: 'fas fa-users',
      path: '/crm/reports/customer-analysis',
      color: 'bg-blue-500'
    },
    {
      id: 'sales-pipeline',
      title: 'مسار المبيعات',
      description: 'تتبع الفرص التجارية ومراحل البيع المختلفة',
      icon: 'fas fa-chart-line',
      path: '/crm/reports/sales-pipeline',
      color: 'bg-green-500'
    },
    {
      id: 'lead-conversion',
      title: 'تحويل العملاء المحتملين',
      description: 'معدلات تحويل العملاء المحتملين إلى عملاء فعليين',
      icon: 'fas fa-exchange-alt',
      path: '/crm/reports/lead-conversion',
      color: 'bg-purple-500'
    },
    {
      id: 'customer-satisfaction',
      title: 'رضا العملاء',
      description: 'مؤشرات رضا العملاء وتقييمات الخدمة',
      icon: 'fas fa-smile',
      path: '/crm/reports/customer-satisfaction',
      color: 'bg-yellow-500'
    },
    {
      id: 'communication-log',
      title: 'سجل التواصل',
      description: 'تقرير مفصل عن جميع التفاعلات مع العملاء',
      icon: 'fas fa-comments',
      path: '/crm/reports/communication-log',
      color: 'bg-indigo-500'
    },
    {
      id: 'revenue-by-customer',
      title: 'الإيرادات حسب العميل',
      description: 'تحليل الإيرادات المحققة من كل عميل',
      icon: 'fas fa-dollar-sign',
      path: '/crm/reports/revenue-by-customer',
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          تقارير إدارة علاقات العملاء
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          مجموعة شاملة من التقارير لتحليل أداء إدارة علاقات العملاء
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

      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <i className="fas fa-info-circle text-blue-600 dark:text-blue-400 text-xl ml-3" />
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
            معلومات إضافية
          </h3>
        </div>
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          جميع التقارير يتم تحديثها في الوقت الفعلي وتعكس أحدث البيانات المتاحة في النظام.
          يمكنك تصدير التقارير بصيغ مختلفة مثل PDF و Excel للمشاركة والأرشفة.
        </p>
      </div>
    </div>
  );
};

export default CRMReports;
