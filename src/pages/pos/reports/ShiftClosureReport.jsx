import { useTranslation } from 'react-i18next';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import SignatureSection from '../../../components/templates/SignatureSection';
import TemplateFooter from '../../../components/templates/TemplateFooter';

const ShiftClosureReport = ({ organizationData = {}, shiftData = {} }) => {
  const { t } = useTranslation();

  const defaultShiftData = {
    shiftNo: 'SHIFT-001',
    date: new Date().toISOString().split('T')[0],
    startTime: '08:00',
    endTime: '16:00',
    cashier: 'سارة أحمد محمد',
    terminal: 'كاشير 01',
    openingCash: 500.00,
    ...shiftData
  };

  const salesSummary = [
    { description: 'مبيعات نقدية', amount: 2850.00, count: 18 },
    { description: 'مبيعات بطاقة ائتمان', amount: 1650.00, count: 8 },
    { description: 'مبيعات بطاقة مدى', amount: 750.00, count: 4 },
    { description: 'إجمالي المبيعات', amount: 5250.00, count: 30 }
  ];

  const cashBreakdown = [
    { denomination: 'فئة 500 ريال', quantity: 2, amount: 1000.00 },
    { denomination: 'فئة 100 ريال', quantity: 8, amount: 800.00 },
    { denomination: 'فئة 50 ريال', quantity: 12, amount: 600.00 },
    { denomination: 'فئة 20 ريال', quantity: 15, amount: 300.00 },
    { denomination: 'فئة 10 ريال', quantity: 20, amount: 200.00 },
    { denomination: 'فئة 5 ريال', quantity: 18, amount: 90.00 },
    { denomination: 'فئة 1 ريال', quantity: 25, amount: 25.00 },
    { denomination: 'هللات', quantity: 1, amount: 2.50 }
  ];

  const transactions = [
    { type: 'مبيعات', count: 30, amount: 5250.00 },
    { type: 'مرتجعات', count: 2, amount: -125.00 },
    { type: 'خصومات', count: 5, amount: -87.50 },
    { type: 'صافي المبيعات', count: 33, amount: 5037.50 }
  ];

  const summaryColumns = [
    { key: 'description', header: 'البيان' },
    { key: 'count', header: 'العدد', align: 'center' },
    { key: 'amount', header: 'المبلغ', align: 'end', render: (value) => `${value.toFixed(2)} ر.س` }
  ];

  const cashColumns = [
    { key: 'denomination', header: 'الفئة' },
    { key: 'quantity', header: 'العدد', align: 'center' },
    { key: 'amount', header: 'المبلغ', align: 'end', render: (value) => `${value.toFixed(2)} ر.س` }
  ];

  const transactionColumns = [
    { key: 'type', header: 'نوع المعاملة' },
    { key: 'count', header: 'العدد', align: 'center' },
    { key: 'amount', header: 'المبلغ', align: 'end', render: (value) => `${value.toFixed(2)} ر.س` }
  ];

  const totalCashCount = cashBreakdown.reduce((sum, item) => sum + item.amount, 0);
  const expectedCash = defaultShiftData.openingCash + 2850.00; // Opening + cash sales
  const variance = totalCashCount - expectedCash;

  return (
    <div className="template">
      <div className="template-container">
        <TemplateHeader {...organizationData} />
        
        <TemplateTitle 
          title="Shift Closure Report"
          titleAr="تقرير إغلاق الوردية"
          rightSection={{
            title: "تفاصيل الوردية:",
            data: {
              ["رقم الوردية"]: defaultShiftData.shiftNo,
              ["الكاشير"]: defaultShiftData.cashier,
              ["المحطة"]: defaultShiftData.terminal
            }
          }}
          leftSection={{
            title: "أوقات الوردية:",
            data: {
              ["التاريخ"]: defaultShiftData.date,
              ["وقت البداية"]: defaultShiftData.startTime,
              ["وقت النهاية"]: defaultShiftData.endTime
            }
          }}
        />
        
        <div className="report-section">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded">
              <div className="text-2xl font-bold text-green-600">5,037.50</div>
              <div className="text-sm text-gray-600">صافي المبيعات (ر.س)</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded">
              <div className="text-2xl font-bold text-blue-600">33</div>
              <div className="text-sm text-gray-600">إجمالي المعاملات</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded">
              <div className="text-2xl font-bold text-purple-600">152.65</div>
              <div className="text-sm text-gray-600">متوسط الفاتورة (ر.س)</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded">
              <div className="text-2xl font-bold text-orange-600">8</div>
              <div className="text-sm text-gray-600">ساعات العمل</div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">ملخص المبيعات</h3>
            <TemplateBody columns={summaryColumns} data={salesSummary} showTotal={false} />
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">تفاصيل المعاملات</h3>
            <TemplateBody columns={transactionColumns} data={transactions} showTotal={false} />
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">جرد النقدية</h3>
            <TemplateBody columns={cashColumns} data={cashBreakdown} showTotal={true} totalAmount={totalCashCount} />
          </div>

          <div className="grid grid-cols-2 gap-8 mb-6">
            <div className="p-4 bg-blue-50 rounded">
              <h4 className="font-semibold mb-2">مطابقة النقدية</h4>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">النقدية الافتتاحية:</span> {defaultShiftData.openingCash.toFixed(2)} ر.س</p>
                <p><span className="font-medium">المبيعات النقدية:</span> 2,850.00 ر.س</p>
                <p><span className="font-medium">النقدية المتوقعة:</span> {expectedCash.toFixed(2)} ر.س</p>
                <p><span className="font-medium">النقدية الفعلية:</span> {totalCashCount.toFixed(2)} ر.س</p>
                <p className={`font-medium ${variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <span>الفرق:</span> {variance >= 0 ? '+' : ''}{variance.toFixed(2)} ر.س
                </p>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded">
              <h4 className="font-semibold mb-2">إحصائيات الوردية</h4>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">أعلى فاتورة:</span> 285.50 ر.س</p>
                <p><span className="font-medium">أقل فاتورة:</span> 15.75 ر.س</p>
                <p><span className="font-medium">أكثر المنتجات مبيعاً:</span> قهوة عربية</p>
                <p><span className="font-medium">ساعة الذروة:</span> 12:00-13:00</p>
                <p><span className="font-medium">معدل المعاملات/ساعة:</span> 4.1</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded border border-yellow-300 mb-6">
            <h4 className="font-semibold mb-2">ملاحظات الوردية</h4>
            <div className="text-sm space-y-1">
              <p>• تم تسجيل مرتجعين بقيمة 125 ريال لعيوب في المنتج</p>
              <p>• تم منح خصومات لـ 5 عملاء كجزء من العرض الترويجي</p>
              <p>• لا توجد مشاكل تقنية في نظام نقطة البيع</p>
              <p>• تم تنظيف وصيانة المعدات في نهاية الوردية</p>
            </div>
          </div>

          <div className="p-4 border-2 border-gray-300 rounded">
            <h4 className="font-semibold mb-3">إقرار إغلاق الوردية</h4>
            <div className="text-sm space-y-2">
              <p>أقر بأنني قمت بجرد النقدية وتسجيل جميع المعاملات بدقة، وأن الأرقام المذكورة أعلاه صحيحة.</p>
              <div className="grid grid-cols-2 gap-8 mt-6">
                <div className="text-center">
                  <div className="border-b border-gray-400 h-16 mb-2"></div>
                  <p className="font-medium">توقيع الكاشير</p>
                  <p className="text-xs">{defaultShiftData.cashier}</p>
                  <p className="text-xs">التاريخ: {defaultShiftData.date}</p>
                </div>
                <div className="text-center">
                  <div className="border-b border-gray-400 h-16 mb-2"></div>
                  <p className="font-medium">توقيع المشرف</p>
                  <p className="text-xs">التاريخ: {defaultShiftData.date}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="signature-section">
            <div className="signature-line">
              <span>الكاشير</span>
            </div>
            <div className="signature-line">
              <span>مشرف الوردية</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftClosureReport;