import { useTranslation } from 'react-i18next';
import OrganizationHeader from '../components/OrganizationHeader';
import ReportTitle from '../components/ReportTitle';
import TemplateTable from '../components/TemplateTable';
import SignatureSection from '../components/SignatureSection';

const InventoryValuationReport = ({ organizationData = {}, reportData = {} }) => {
  const { t } = useTranslation();

  const defaultReportData = {
    reportDate: new Date().toISOString().split('T')[0],
    valuationMethod: 'المتوسط المرجح',
    totalValue: 3250000,
    totalItems: 156,
    ...reportData
  };

  const categoryData = [
    { category: 'إلكترونيات', itemCount: 45, totalQty: 320, avgCost: 8500, totalValue: 2720000, percentage: 83.7, remarks: 'أعلى قيمة في المخزون' },
    { category: 'أثاث مكتبي', itemCount: 25, totalQty: 180, avgCost: 1200, totalValue: 216000, percentage: 6.6, remarks: 'استهلاك منتظم' },
    { category: 'قرطاسية', itemCount: 65, totalQty: 2500, avgCost: 45, totalValue: 112500, percentage: 3.5, remarks: 'دوران سريع' },
    { category: 'مستلزمات تقنية', itemCount: 21, totalQty: 450, avgCost: 450, totalValue: 202500, percentage: 6.2, remarks: 'طلب متزايد' }
  ];

  const topValueItems = [
    { itemCode: 'ITM001', itemName: 'خادم Dell PowerEdge', quantity: 5, unitCost: 85000, totalValue: 425000, lastPurchase: '2024-01-15', supplier: 'شركة Dell الشرق الأوسط' },
    { itemCode: 'ITM002', itemName: 'جهاز كمبيوتر محمول HP', quantity: 25, unitCost: 15000, totalValue: 375000, lastPurchase: '2024-01-10', supplier: 'شركة التقنية المتطورة' },
    { itemCode: 'ITM003', itemName: 'طابعة ليزر ملونة', quantity: 8, unitCost: 12000, totalValue: 96000, lastPurchase: '2023-12-20', supplier: 'مؤسسة المكتب الحديث' },
    { itemCode: 'ITM004', itemName: 'شاشة LED 32 بوصة', quantity: 15, unitCost: 5500, totalValue: 82500, lastPurchase: '2024-01-05', supplier: 'شركة الشاشات المتقدمة' },
    { itemCode: 'ITM005', itemName: 'كاميرا مراقبة IP', quantity: 20, unitCost: 3500, totalValue: 70000, lastPurchase: '2023-12-15', supplier: 'شركة الأمان التقني' }
  ];

  const categoryColumns = [
    { key: 'category', header: 'الفئة' },
    { key: 'itemCount', header: 'عدد الأصناف', align: 'center' },
    { key: 'totalQty', header: 'إجمالي الكمية', align: 'center' },
    { key: 'avgCost', header: 'متوسط التكلفة', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'totalValue', header: 'القيمة الإجمالية', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'percentage', header: 'النسبة %', align: 'center' },
    { key: 'remarks', header: 'ملاحظات' }
  ];

  const itemsColumns = [
    { key: 'itemCode', header: 'كود الصنف' },
    { key: 'itemName', header: 'اسم الصنف' },
    { key: 'quantity', header: 'الكمية', align: 'center' },
    { key: 'unitCost', header: 'تكلفة الوحدة', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'totalValue', header: 'القيمة الإجمالية', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'lastPurchase', header: 'آخر شراء' },
    { key: 'supplier', header: 'المورد' }
  ];

  return (
    <div className="print-wrapper">
      <div className="template-print-container max-w-6xl mx-auto bg-white">
        <div className="template-header">
          <OrganizationHeader {...organizationData} />
        </div>
        
        <div className="report-title-section">
          <ReportTitle 
            title="Inventory Valuation Report"
            titleAr="تقرير تقييم المخزون"
            rightSection={{
              title: "تفاصيل التقييم:",
              data: {
                ["طريقة التقييم"]: defaultReportData.valuationMethod,
                ["إجمالي الأصناف"]: defaultReportData.totalItems,
                ["القيمة الإجمالية"]: `${defaultReportData.totalValue.toLocaleString()} ر.س`
              }
            }}
            leftSection={{
              title: "معلومات التقرير:",
              data: {
                ["تاريخ التقرير"]: defaultReportData.reportDate,
                ["تم الإنشاء بواسطة"]: "نظام المحاسبة",
                ["حالة التقرير"]: "نهائي"
              }
            }}
          />
        </div>
        
        <div className="template-body">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded">
              <div className="text-2xl font-bold text-blue-600">{defaultReportData.totalValue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">إجمالي قيمة المخزون (ر.س)</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded">
              <div className="text-2xl font-bold text-green-600">156</div>
              <div className="text-sm text-gray-600">إجمالي الأصناف</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded">
              <div className="text-2xl font-bold text-purple-600">3,470</div>
              <div className="text-sm text-gray-600">إجمالي الكميات</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded">
              <div className="text-2xl font-bold text-orange-600">937</div>
              <div className="text-sm text-gray-600">متوسط قيمة الصنف (ر.س)</div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">تقييم المخزون حسب الفئة</h3>
            <TemplateTable columns={categoryColumns} data={categoryData} showTotal={true} totalAmount={defaultReportData.totalValue} />
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">أعلى 5 أصناف قيمة</h3>
            <TemplateTable columns={itemsColumns} data={topValueItems} showTotal={false} />
          </div>

          <div className="grid grid-cols-2 gap-8 mb-6">
            <div className="p-4 bg-blue-50 rounded">
              <h4 className="font-semibold mb-2">طريقة التقييم</h4>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">الطريقة المستخدمة:</span> {defaultReportData.valuationMethod}</p>
                <p><span className="font-medium">أساس التقييم:</span> التكلفة التاريخية</p>
                <p><span className="font-medium">تاريخ آخر تحديث:</span> {defaultReportData.reportDate}</p>
                <p><span className="font-medium">العملة:</span> ريال سعودي</p>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded">
              <h4 className="font-semibold mb-2">ملاحظات التقييم</h4>
              <div className="text-sm space-y-1">
                <p>• تم تقييم المخزون وفقاً للمعايير المحاسبية</p>
                <p>• لا يشمل التقييم المخزون التالف</p>
                <p>• تم استبعاد الأصناف منتهية الصلاحية</p>
                <p>• القيم تشمل ضريبة القيمة المضافة</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded border border-yellow-300">
            <h4 className="font-semibold mb-2">تحليل المخزون</h4>
            <div className="text-sm space-y-1">
              <p>• فئة الإلكترونيات تمثل 83.7% من إجمالي قيمة المخزون</p>
              <p>• يوصى بمراجعة مستويات المخزون للأصناف عالية القيمة</p>
              <p>• متوسط دوران المخزون: 4.2 مرة سنوياً</p>
              <p>• نسبة المخزون الراكد: 2.3% من إجمالي القيمة</p>
            </div>
          </div>

          <SignatureSection 
            preparedByLabel="محاسب المخزون"
            approvedByLabel="المدير المالي"
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryValuationReport;