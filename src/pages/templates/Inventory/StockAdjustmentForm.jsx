import { useTranslation } from 'react-i18next';
import OrganizationHeader from '../components/OrganizationHeader';
import ReportTitle from '../components/ReportTitle';
import TemplateTable from '../components/TemplateTable';
import SignatureSection from '../components/SignatureSection';

const StockAdjustmentForm = ({ organizationData = {}, adjustmentData = {} }) => {
  const { t } = useTranslation();

  const defaultAdjustmentData = {
    adjustmentNo: 'ADJ-2024-001',
    date: new Date().toISOString().split('T')[0],
    warehouse: 'المستودع الرئيسي',
    reason: 'جرد دوري',
    preparedBy: 'أحمد محمد - أمين المخزن',
    ...adjustmentData
  };

  const adjustmentItems = [
    { itemCode: 'ITM001', itemName: 'جهاز كمبيوتر محمول', systemQty: 25, physicalQty: 23, difference: -2, unitPrice: 15000, adjustmentValue: -30000, reason: 'تلف أثناء النقل' },
    { itemCode: 'ITM002', itemName: 'طابعة ليزر', systemQty: 8, physicalQty: 8, difference: 0, unitPrice: 2500, adjustmentValue: 0, reason: 'لا يوجد فرق' },
    { itemCode: 'ITM003', itemName: 'شاشة LCD', systemQty: 12, physicalQty: 14, difference: 2, unitPrice: 3500, adjustmentValue: 7000, reason: 'خطأ في التسجيل السابق' },
    { itemCode: 'ITM004', itemName: 'كرسي مكتب', systemQty: 15, physicalQty: 13, difference: -2, unitPrice: 800, adjustmentValue: -1600, reason: 'فقدان' },
    { itemCode: 'ITM005', itemName: 'ورق طباعة', systemQty: 100, physicalQty: 105, difference: 5, unitPrice: 25, adjustmentValue: 125, reason: 'عدم تسجيل استلام' }
  ];

  const columns = [
    { key: 'itemCode', header: 'كود الصنف' },
    { key: 'itemName', header: 'اسم الصنف' },
    { key: 'systemQty', header: 'الكمية بالنظام', align: 'center' },
    { key: 'physicalQty', header: 'الكمية الفعلية', align: 'center' },
    { key: 'difference', header: 'الفرق', align: 'center' },
    { key: 'unitPrice', header: 'سعر الوحدة', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'adjustmentValue', header: 'قيمة التعديل', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'reason', header: 'السبب' }
  ];

  const totalAdjustmentValue = adjustmentItems.reduce((sum, item) => sum + item.adjustmentValue, 0);

  return (
    <div className="print-wrapper">
      <div className="template-print-container max-w-6xl mx-auto bg-white">
        <div className="template-header">
          <OrganizationHeader {...organizationData} />
        </div>
        
        <div className="report-title-section">
          <ReportTitle 
            title="Stock Adjustment Form"
            titleAr="نموذج تعديل المخزون"
            rightSection={{
              title: "تفاصيل التعديل:",
              data: {
                ["المستودع"]: defaultAdjustmentData.warehouse,
                ["سبب التعديل"]: defaultAdjustmentData.reason,
                ["تم الإعداد بواسطة"]: defaultAdjustmentData.preparedBy
              }
            }}
            leftSection={{
              title: "معلومات النموذج:",
              data: {
                ["رقم التعديل"]: defaultAdjustmentData.adjustmentNo,
                ["تاريخ التعديل"]: defaultAdjustmentData.date,
                ["حالة التعديل"]: "في انتظار الموافقة"
              }
            }}
          />
        </div>
        
        <div className="template-body">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-red-50 rounded">
              <div className="text-2xl font-bold text-red-600">3</div>
              <div className="text-sm text-gray-600">أصناف بنقص</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded">
              <div className="text-2xl font-bold text-green-600">2</div>
              <div className="text-sm text-gray-600">أصناف بزيادة</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded">
              <div className="text-2xl font-bold text-blue-600">1</div>
              <div className="text-sm text-gray-600">أصناف بدون فرق</div>
            </div>
          </div>

          <TemplateTable columns={columns} data={adjustmentItems} showTotal={true} totalAmount={totalAdjustmentValue} />

          <div className="mt-6 grid grid-cols-2 gap-8">
            <div className="p-4 bg-yellow-50 rounded">
              <h4 className="font-semibold mb-2">ملاحظات مهمة</h4>
              <div className="text-sm space-y-1">
                <p>• تم إجراء الجرد الفعلي بتاريخ {defaultAdjustmentData.date}</p>
                <p>• تم التحقق من جميع الأرقام التسلسلية</p>
                <p>• تم توثيق أسباب جميع الفروقات</p>
                <p>• يتطلب موافقة مدير المخزون قبل التطبيق</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <h4 className="font-semibold mb-2">ملخص التعديل</h4>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">إجمالي الأصناف:</span> 5 أصناف</p>
                <p><span className="font-medium">صافي قيمة التعديل:</span> {totalAdjustmentValue.toLocaleString()} ر.س</p>
                <p><span className="font-medium">تأثير على الربحية:</span> {totalAdjustmentValue > 0 ? 'إيجابي' : 'سلبي'}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 border-2 border-red-300 rounded bg-red-50">
            <h4 className="font-semibold mb-2 text-red-800">تحذير</h4>
            <p className="text-sm text-red-700">
              هذا التعديل سيؤثر على أرصدة المخزون وقيمة المخزون الإجمالية. يرجى التأكد من صحة جميع البيانات قبل الموافقة.
            </p>
          </div>

          <SignatureSection 
            preparedByLabel="أمين المخزن"
            approvedByLabel="مدير المخزون"
            showReceivedBy={true}
            receivedByLabel="مدير العمليات"
          />
        </div>
      </div>
    </div>
  );
};

export default StockAdjustmentForm;