import React from 'react';
import { Link } from 'react-router-dom';

const POSReports = () => {
  const reports = [
    {
      id: 'daily-sales-report',
      title: 'تقرير المبيعات اليومية',
      titleEn: 'Daily Sales Report',
      description: 'تقرير عن المبيعات اليومية',
      descriptionEn: 'Report on daily sales',
      component: 'DailySalesReport',
      icon: 'fas fa-calendar-day'
    },
    {
      id: 'refund-receipt',
      title: 'إيصال استرداد',
      titleEn: 'Refund Receipt',
      description: 'إيصال استرداد مبلغ',
      descriptionEn: 'Receipt for refund amount',
      component: 'RefundReceipt',
      icon: 'fas fa-undo'
    },
    {
      id: 'sales-receipt',
      title: 'إيصال المبيعات',
      titleEn: 'Sales Receipt',
      description: 'إيصال استلام المبيعات',
      descriptionEn: 'Receipt for sales received',
      component: 'SalesReceipt',
      icon: 'fas fa-receipt'
    },
    {
      id: 'sales-summary-report',
      title: 'تقرير ملخص المبيعات',
      titleEn: 'Sales Summary Report',
      description: 'تقرير شامل عن المبيعات',
      descriptionEn: 'Comprehensive report on sales',
      component: 'SalesSummaryReport',
      icon: 'fas fa-chart-bar'
    },
    {
      id: 'shift-closure-report',
      title: 'تقرير إغلاق الوردية',
      titleEn: 'Shift Closure Report',
      description: 'تقرير عن إغلاق الوردية',
      descriptionEn: 'Report on shift closure',
      component: 'ShiftClosureReport',
      icon: 'fas fa-door-closed'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">تقارير نقطة البيع</h1>
        <p className="text-gray-600">اختر التقرير المطلوب من القائمة أدناه</p>
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
                  to={`/pos/reports/${report.id}`}
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

export default POSReports;
