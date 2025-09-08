import React from 'react';
import { Link } from 'react-router-dom';

const FinanceReports = () => {
  const reports = [
    {
      id: 'total-account-statement',
      title: 'كشف الحساب الإجمالي',
      titleEn: 'Total Account Statement',
      description: 'عرض شامل لحركة الحساب خلال فترة محددة',
      descriptionEn: 'Comprehensive view of account movements during a specific period',
      component: 'TotalAccountStatement',
      icon: 'fas fa-file-invoice'
    },
    {
      id: 'credit-note-voucher',
      title: 'سند إشعار دائن',
      titleEn: 'Credit Note Voucher',
      description: 'إشعار بقيد مبلغ في الجانب الدائن',
      descriptionEn: 'Notice of credit entry',
      component: 'CreditNoteVoucher',
      icon: 'fas fa-plus-circle'
    },
    {
      id: 'debit-note-voucher',
      title: 'سند إشعار مدين',
      titleEn: 'Debit Note Voucher',
      description: 'إشعار بقيد مبلغ في الجانب المدين',
      descriptionEn: 'Notice of debit entry',
      component: 'DebitNoteVoucher',
      icon: 'fas fa-minus-circle'
    },
    {
      id: 'receipt-voucher',
      title: 'سند قبض',
      titleEn: 'Receipt Voucher',
      description: 'إيصال استلام مبلغ نقدي أو شيك',
      descriptionEn: 'Receipt for cash or check received',
      component: 'ReceiptVoucher',
      icon: 'fas fa-receipt'
    },
    {
      id: 'disbursement-voucher',
      title: 'سند صرف',
      titleEn: 'Disbursement Voucher',
      description: 'إيصال صرف مبلغ نقدي أو شيك',
      descriptionEn: 'Receipt for cash or check disbursed',
      component: 'DisbursementVoucher',
      icon: 'fas fa-money-bill-wave'
    },
    {
      id: 'detailed-account-statement',
      title: 'كشف الحساب التفصيلي',
      titleEn: 'Detailed Account Statement',
      description: 'عرض تفصيلي لجميع حركات الحساب',
      descriptionEn: 'Detailed view of all account transactions',
      component: 'DetailedAccountStatement',
      icon: 'fas fa-list-alt'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">التقارير المالية</h1>
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
                  to={`/finance/reports/${report.id}`}
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

export default FinanceReports;
