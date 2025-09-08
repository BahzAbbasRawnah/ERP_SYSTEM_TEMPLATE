import React from 'react';
import { Link } from 'react-router-dom';

const PurchasesReports = () => {
  const reports = [
    {
      id: 'purchase-analysis',
      title: 'تحليل المشتريات',
      titleEn: 'Purchase Analysis',
      description: 'تحليل شامل لعمليات الشراء وتكاليفها',
      descriptionEn: 'Comprehensive analysis of purchasing operations and costs',
      component: 'PurchaseAnalysis',
      icon: 'fas fa-chart-pie'
    },
    {
      id: 'supplier-performance',
      title: 'أداء الموردين',
      titleEn: 'Supplier Performance',
      description: 'تقييم أداء الموردين بناءً على الجودة والتسليم',
      descriptionEn: 'Evaluate supplier performance based on quality and delivery',
      component: 'SupplierPerformance',
      icon: 'fas fa-truck'
    },
    {
      id: 'purchase-order-tracking',
      title: 'تتبع أوامر الشراء',
      titleEn: 'Purchase Order Tracking',
      description: 'متابعة حالة أوامر الشراء من الطلب إلى الاستلام',
      descriptionEn: 'Track purchase order status from request to receipt',
      component: 'PurchaseOrderTracking',
      icon: 'fas fa-dolly'
    },
    {
      id: 'cost-analysis',
      title: 'تحليل التكاليف',
      titleEn: 'Cost Analysis',
      description: 'تحليل تفصيلي لتكاليف المشتريات وتحديد فرص التوفير',
      descriptionEn: 'Detailed analysis of purchasing costs and identify savings opportunities',
      component: 'CostAnalysis',
      icon: 'fas fa-dollar-sign'
    },
    {
      id: 'inventory-purchase-needs',
      title: 'احتياجات شراء المخزون',
      titleEn: 'Inventory Purchase Needs',
      description: 'تحديد المنتجات التي تحتاج إلى إعادة شراء بناءً على مستويات المخزون',
      descriptionEn: 'Identify products that need repurchasing based on inventory levels',
      component: 'InventoryPurchaseNeeds',
      icon: 'fas fa-boxes'
    },
    {
      id: 'contract-compliance',
      title: 'الامتثال للعقود',
      titleEn: 'Contract Compliance',
      description: 'مراقبة مدى امتثال الموردين لشروط العقود المبرمة',
      descriptionEn: 'Monitor supplier compliance with contract terms',
      component: 'ContractCompliance',
      icon: 'fas fa-handshake'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          تقارير المشتريات
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          مجموعة شاملة من التقارير لتحليل أداء المشتريات وتحسين سلسلة التوريد
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
                  to={`/purchases/reports/${report.id}`}
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

export default PurchasesReports;
