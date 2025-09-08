import { useTranslation } from 'react-i18next';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import SignatureSection from '../../../components/templates/SignatureSection';
import TemplateFooter from '../../../components/templates/TemplateFooter';

const DailySalesReport = ({ organizationData = {}, dailyData = {} }) => {
  const { t } = useTranslation();

  const defaultDailyData = {
    reportDate: new Date().toISOString().split('T')[0],
    totalSales: 4250,
    totalTransactions: 28,
    averageTransaction: 151.79,
    cashSales: 2550,
    cardSales: 1700,
    ...dailyData
  };

  const hourlyBreakdown = [
    { hour: '08:00-09:00', transactions: 3, amount: 285, percentage: 6.7 },
    { hour: '09:00-10:00', transactions: 5, amount: 475, percentage: 11.2 },
    { hour: '10:00-11:00', transactions: 4, amount: 380, percentage: 8.9 },
    { hour: '11:00-12:00', transactions: 2, amount: 190, percentage: 4.5 },
    { hour: '12:00-13:00', transactions: 6, amount: 720, percentage: 16.9 },
    { hour: '13:00-14:00', transactions: 4, amount: 520, percentage: 12.2 },
    { hour: '14:00-15:00', transactions: 2, amount: 180, percentage: 4.2 },
    { hour: '15:00-16:00', transactions: 1, amount: 95, percentage: 2.2 },
    { hour: '16:00-17:00', transactions: 1, amount: 125, percentage: 2.9 }
  ];

  const transactionDetails = [
    { receiptNo: 'POS-001', time: '08:15', cashier: 'سارة أحمد', items: 3, amount: 95.50, payment: 'نقدي', customer: 'عميل نقدي' },
    { receiptNo: 'POS-002', time: '08:32', cashier: 'سارة أحمد', items: 2, amount: 67.25, payment: 'بطاقة', customer: 'عميل نقدي' },
    { receiptNo: 'POS-003', time: '09:10', cashier: 'أحمد محمد', items: 4, amount: 125.75, payment: 'نقدي', customer: 'عميل نقدي' },
    { receiptNo: 'POS-004', time: '09:45', cashier: 'أحمد محمد', items: 1, amount: 45.00, payment: 'بطاقة', customer: 'عميل نقدي' },
    { receiptNo: 'POS-005', time: '10:20', cashier: 'فاطمة علي', items: 5, amount: 185.50, payment: 'نقدي', customer: 'عميل نقدي' }
  ];

  const productSales = [
    { product: 'قهوة عربية', quantity: 12, unitPrice: 25.50, total: 306.00 },
    { product: 'كابتشينو', quantity: 8, unitPrice: 30.00, total: 240.00 },
    { product: 'شاي أحمر', quantity: 15, unitPrice: 18.00, total: 270.00 },
    { product: 'كنافة', quantity: 6, unitPrice: 45.00, total: 270.00 },
    { product: 'عصير برتقال', quantity: 10, unitPrice: 20.00, total: 200.00 }
  ];

  const hourlyColumns = [
    { key: 'hour', header: 'الساعة' },
    { key: 'transactions', header: 'المعاملات', align: 'center' },
    { key: 'amount', header: 'المبلغ', align: 'end', render: (value) => `${value.toFixed(2)} ر.س` },
    { key: 'percentage', header: 'النسبة %', align: 'center' }
  ];

  const transactionColumns = [
    { key: 'receiptNo', header: 'رقم الفاتورة' },
    { key: 'time', header: 'الوقت' },
    { key: 'cashier', header: 'الكاشير' },
    { key: 'items', header: 'الأصناف', align: 'center' },
    { key: 'amount', header: 'المبلغ', align: 'end', render: (value) => `${value.toFixed(2)} ر.س` },
    { key: 'payment', header: 'طريقة الدفع', align: 'center' }
  ];

  const productColumns = [
    { key: 'product', header: 'المنتج' },
    { key: 'quantity', header: 'الكمية', align: 'center' },
    { key: 'unitPrice', header: 'سعر الوحدة', align: 'end', render: (value) => `${value.toFixed(2)} ر.س` },
    { key: 'total', header: 'المجموع', align: 'end', render: (value) => `${value.toFixed(2)} ر.س` }
  ];

  return (
    <div className="template">
      <div className="template-container">
        <TemplateHeader {...organizationData} />
        
        <TemplateTitle 
          title="Daily Sales Report"
          titleAr="تقرير المبيعات اليومية"
          rightSection={{
            title: "تفاصيل اليوم:",
            data: {
              ["تاريخ التقرير"]: defaultDailyData.reportDate,
              ["إجمالي المبيعات"]: `${defaultDailyData.totalSales.toLocaleString()} ر.س`,
              ["عدد المعاملات"]: defaultDailyData.totalTransactions
            }
          }}
          leftSection={{
            title: "ملخص الدفع:",
            data: {
              ["مبيعات نقدية"]: `${defaultDailyData.cashSales.toLocaleString()} ر.س`,
              ["مبيعات بالبطاقة"]: `${defaultDailyData.cardSales.toLocaleString()} ر.س`,
              ["متوسط الفاتورة"]: `${defaultDailyData.averageTransaction.toFixed(2)} ر.س`
            }
          }}
        />
        
        <div className="report-section">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded">
              <div className="text-2xl font-bold text-green-600">{defaultDailyData.totalSales.toLocaleString()}</div>
              <div className="text-sm text-gray-600">إجمالي المبيعات (ر.س)</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded">
              <div className="text-2xl font-bold text-blue-600">{defaultDailyData.totalTransactions}</div>
              <div className="text-sm text-gray-600">عدد المعاملات</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded">
              <div className="text-2xl font-bold text-purple-600">{defaultDailyData.averageTransaction.toFixed(2)}</div>
              <div className="text-sm text-gray-600">متوسط الفاتورة (ر.س)</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded">
              <div className="text-2xl font-bold text-orange-600">{Math.round((defaultDailyData.cashSales / defaultDailyData.totalSales) * 100)}%</div>
              <div className="text-sm text-gray-600">نسبة المبيعات النقدية</div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">المبيعات حسب الساعة</h3>
            <TemplateBody columns={hourlyColumns} data={hourlyBreakdown} showTotal={true} totalAmount={defaultDailyData.totalSales} />
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">تفاصيل المعاملات (أول 5 معاملات)</h3>
            <TemplateBody columns={transactionColumns} data={transactionDetails} showTotal={false} />
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">أفضل المنتجات مبيعاً</h3>
            <TemplateBody columns={productColumns} data={productSales} showTotal={false} />
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="p-4 bg-blue-50 rounded">
              <h4 className="font-semibold mb-2">ساعات الذروة</h4>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">الأعلى:</span> 12:00-13:00</p>
                <p><span className="font-medium">المبلغ:</span> 720 ر.س</p>
                <p><span className="font-medium">المعاملات:</span> 6</p>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded">
              <h4 className="font-semibold mb-2">طرق الدفع</h4>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">نقدي:</span> {Math.round((defaultDailyData.cashSales / defaultDailyData.totalSales) * 100)}%</p>
                <p><span className="font-medium">بطاقة:</span> {Math.round((defaultDailyData.cardSales / defaultDailyData.totalSales) * 100)}%</p>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded">
              <h4 className="font-semibold mb-2">مقارنة بالأمس</h4>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">النمو:</span> +8.5%</p>
                <p><span className="font-medium">المعاملات:</span> +3</p>
                <p><span className="font-medium">متوسط الفاتورة:</span> +5.2%</p>
              </div>
            </div>
          </div>

          <div className="signature-section">
            <div className="signature-line">
              <span>مشرف الوردية</span>
            </div>
            <div className="signature-line">
              <span>مدير المتجر</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailySalesReport;