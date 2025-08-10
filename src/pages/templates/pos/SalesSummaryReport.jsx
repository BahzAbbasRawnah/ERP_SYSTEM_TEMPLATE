import { useTranslation } from 'react-i18next';
import OrganizationHeader from '../components/OrganizationHeader';
import ReportTitle from '../components/ReportTitle';
import TemplateTable from '../components/TemplateTable';
import SignatureSection from '../components/SignatureSection';

const SalesSummaryReport = ({ organizationData = {}, summaryData = {} }) => {
  const { t } = useTranslation();

  const defaultSummaryData = {
    reportDate: new Date().toISOString().split('T')[0],
    fromDate: '2024-05-01',
    toDate: '2024-05-31',
    totalSales: 125000,
    totalTransactions: 450,
    averageTransaction: 277.78,
    ...summaryData
  };

  const salesByCategory = [
    { category: 'مشروبات ساخنة', transactions: 180, amount: 45000, percentage: 36, avgTicket: 250 },
    { category: 'حلويات ومعجنات', transactions: 120, amount: 38000, percentage: 30.4, avgTicket: 316.67 },
    { category: 'مشروبات باردة', transactions: 85, amount: 22000, percentage: 17.6, avgTicket: 258.82 },
    { category: 'وجبات خفيفة', transactions: 65, amount: 20000, percentage: 16, avgTicket: 307.69 }
  ];

  const salesByPayment = [
    { method: 'نقدي', transactions: 280, amount: 75000, percentage: 60 },
    { method: 'بطاقة ائتمان', transactions: 120, amount: 35000, percentage: 28 },
    { method: 'بطاقة مدى', transactions: 50, amount: 15000, percentage: 12 }
  ];

  const topProducts = [
    { product: 'قهوة عربية فاخرة', quantity: 95, amount: 2375, rank: 1 },
    { product: 'كابتشينو إيطالي', quantity: 78, amount: 2340, rank: 2 },
    { product: 'كنافة نابلسية', quantity: 45, amount: 2250, rank: 3 },
    { product: 'شاي أحمر مميز', quantity: 120, amount: 2160, rank: 4 },
    { product: 'عصير برتقال طازج', quantity: 85, amount: 1700, rank: 5 }
  ];

  const categoryColumns = [
    { key: 'category', header: 'الفئة' },
    { key: 'transactions', header: 'المعاملات', align: 'center' },
    { key: 'amount', header: 'المبلغ', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'percentage', header: 'النسبة %', align: 'center' },
    { key: 'avgTicket', header: 'متوسط الفاتورة', align: 'end', render: (value) => `${value.toFixed(2)} ر.س` }
  ];

  const paymentColumns = [
    { key: 'method', header: 'طريقة الدفع' },
    { key: 'transactions', header: 'المعاملات', align: 'center' },
    { key: 'amount', header: 'المبلغ', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'percentage', header: 'النسبة %', align: 'center' }
  ];

  const productColumns = [
    { key: 'rank', header: 'الترتيب', align: 'center' },
    { key: 'product', header: 'المنتج' },
    { key: 'quantity', header: 'الكمية', align: 'center' },
    { key: 'amount', header: 'المبلغ', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` }
  ];

  return (
    <div className="print-wrapper">
      <div className="template-print-container max-w-5xl mx-auto bg-white">
        <div className="template-header">
          <OrganizationHeader {...organizationData} />
        </div>
        
        <div className="report-title-section">
          <ReportTitle 
            title="Sales Summary Report"
            titleAr="تقرير ملخص المبيعات"
            rightSection={{
              title: "فترة التقرير:",
              data: {
                ["من تاريخ"]: defaultSummaryData.fromDate,
                ["إلى تاريخ"]: defaultSummaryData.toDate,
                ["تاريخ الإنشاء"]: defaultSummaryData.reportDate
              }
            }}
            leftSection={{
              title: "ملخص المبيعات:",
              data: {
                ["إجمالي المبيعات"]: `${defaultSummaryData.totalSales.toLocaleString()} ر.س`,
                ["عدد المعاملات"]: defaultSummaryData.totalTransactions,
                ["متوسط الفاتورة"]: `${defaultSummaryData.averageTransaction.toFixed(2)} ر.س`
              }
            }}
          />
        </div>
        
        <div className="template-body">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded">
              <div className="text-2xl font-bold text-green-600">{defaultSummaryData.totalSales.toLocaleString()}</div>
              <div className="text-sm text-gray-600">إجمالي المبيعات (ر.س)</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded">
              <div className="text-2xl font-bold text-blue-600">{defaultSummaryData.totalTransactions}</div>
              <div className="text-sm text-gray-600">عدد المعاملات</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded">
              <div className="text-2xl font-bold text-purple-600">{defaultSummaryData.averageTransaction.toFixed(2)}</div>
              <div className="text-sm text-gray-600">متوسط الفاتورة (ر.س)</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded">
              <div className="text-2xl font-bold text-orange-600">{(defaultSummaryData.totalSales / 31).toFixed(0)}</div>
              <div className="text-sm text-gray-600">متوسط المبيعات اليومية</div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">المبيعات حسب الفئة</h3>
            <TemplateTable columns={categoryColumns} data={salesByCategory} showTotal={true} totalAmount={defaultSummaryData.totalSales} />
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">المبيعات حسب طريقة الدفع</h3>
            <TemplateTable columns={paymentColumns} data={salesByPayment} showTotal={true} totalAmount={defaultSummaryData.totalSales} />
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">أفضل 5 منتجات</h3>
            <TemplateTable columns={productColumns} data={topProducts} showTotal={false} />
          </div>

          <div className="grid grid-cols-2 gap-8 mb-6">
            <div className="p-4 bg-blue-50 rounded">
              <h4 className="font-semibold mb-2">تحليل الأداء</h4>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">أعلى يوم مبيعات:</span> الجمعة - 5,200 ر.س</p>
                <p><span className="font-medium">أقل يوم مبيعات:</span> الاثنين - 3,100 ر.س</p>
                <p><span className="font-medium">أفضل ساعة:</span> 7:00-8:00 مساءً</p>
                <p><span className="font-medium">نمو المبيعات:</span> +12% مقارنة بالشهر السابق</p>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded">
              <h4 className="font-semibold mb-2">التوصيات</h4>
              <div className="text-sm space-y-1">
                <p>• زيادة مخزون المشروبات الساخنة</p>
                <p>• تطوير عروض للوجبات الخفيفة</p>
                <p>• تشجيع الدفع الإلكتروني</p>
                <p>• تحسين خدمة ساعات الذروة</p>
              </div>
            </div>
          </div>

          <SignatureSection 
            preparedByLabel="مدير المبيعات"
            approvedByLabel="مدير العمليات"
          />
        </div>
      </div>
    </div>
  );
};

export default SalesSummaryReport;