import React from 'react';
import { Link } from 'react-router-dom';

const InventoryReports = () => {
  const reports = [
    {
      id: 'stock-summary-report',
      title: 'تقرير ملخص المخزون',
      titleEn: 'Stock Summary Report',
      description: 'تقرير شامل عن حالة المخزون',
      descriptionEn: 'Comprehensive report on stock status',
      component: 'StockSummaryReport',
      icon: 'fas fa-box'
    },
    {
      id: 'stock-movement-report',
      title: 'تقرير حركة المخزون',
      titleEn: 'Stock Movement Report',
      description: 'تقرير عن حركة المخزون خلال فترة معينة',
      descriptionEn: 'Report on stock movements during a specific period',
      component: 'StockMovementReport',
      icon: 'fas fa-exchange-alt'
    },
    {
      id: 'damaged-goods-report',
      title: 'تقرير البضائع التالفة',
      titleEn: 'Damaged Goods Report',
      description: 'تقرير عن البضائع التالفة في المخزون',
      descriptionEn: 'Report on damaged goods in stock',
      component: 'DamagedGoodsReport',
      icon: 'fas fa-exclamation-triangle'
    },
    {
      id: 'goods-received-note',
      title: 'إشعار استلام البضائع',
      titleEn: 'Goods Received Note',
      description: 'إشعار باستلام البضائع',
      descriptionEn: 'Notice of goods received',
      component: 'GoodsReceivedNote',
      icon: 'fas fa-clipboard-check'
    },
    {
      id: 'expiry-date-report',
      title: 'تقرير تاريخ انتهاء الصلاحية',
      titleEn: 'Expiry Date Report',
      description: 'تقرير عن تواريخ انتهاء صلاحية المنتجات',
      descriptionEn: 'Report on product expiry dates',
      component: 'ExpiryDateReport',
      icon: 'fas fa-calendar-alt'
    },
    {
      id: 'stock-adjustment-form',
      title: 'نموذج تعديل المخزون',
      titleEn: 'Stock Adjustment Form',
      description: 'نموذج لتعديل كميات المخزون',
      descriptionEn: 'Form for adjusting stock quantities',
      component: 'StockAdjustmentForm',
      icon: 'fas fa-tools'
    },
    {
      id: 'reorder-level-report',
      title: 'تقرير مستوى إعادة الطلب',
      titleEn: 'Reorder Level Report',
      description: 'تقرير عن مستويات إعادة الطلب للمنتجات',
      descriptionEn: 'Report on reorder levels for products',
      component: 'ReorderLevelReport',
      icon: 'fas fa-arrow-alt-circle-up'
    },
    {
      id: 'stock-transfer-report',
      title: 'تقرير نقل المخزون',
      titleEn: 'Stock Transfer Report',
      description: 'تقرير عن عمليات نقل المخزون بين المواقع',
      descriptionEn: 'Report on stock transfer operations between locations',
      component: 'StockTransferReport',
      icon: 'fas fa-exchange-alt'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">تقارير المخزون</h1>
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
                  to={`/inventory/reports/${report.id}`}
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

export default InventoryReports;
