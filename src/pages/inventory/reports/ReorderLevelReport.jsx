import { useTranslation } from 'react-i18next';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import SignatureSection from '../../../components/templates/SignatureSection';
import TemplateFooter from '../../../components/templates/TemplateFooter';

const ReorderLevelReport = ({ organizationData = {}, reportData = {} }) => {
  const { t } = useTranslation();

  const defaultReportData = {
    reportDate: new Date().toISOString().split('T')[0],
    warehouse: 'جميع المستودعات',
    totalItems: 45,
    criticalItems: 12,
    ...reportData
  };

  const reorderItems = [
    { itemCode: 'ITM001', itemName: 'جهاز كمبيوتر محمول', currentStock: 3, reorderLevel: 10, maxLevel: 50, suggestedOrder: 47, unitPrice: 15000, totalValue: 705000, supplier: 'شركة التقنية المتطورة', leadTime: '7 أيام', status: 'حرج' },
    { itemCode: 'ITM002', itemName: 'طابعة ليزر', currentStock: 5, reorderLevel: 8, maxLevel: 25, suggestedOrder: 20, unitPrice: 2500, totalValue: 50000, supplier: 'مؤسسة المكتب الحديث', leadTime: '5 أيام', status: 'منخفض' },
    { itemCode: 'ITM003', itemName: 'شاشة LCD', currentStock: 0, reorderLevel: 5, maxLevel: 30, suggestedOrder: 30, unitPrice: 3500, totalValue: 105000, supplier: 'شركة الشاشات المتقدمة', leadTime: '10 أيام', status: 'نفد' },
    { itemCode: 'ITM004', itemName: 'كرسي مكتب', currentStock: 2, reorderLevel: 5, maxLevel: 20, suggestedOrder: 18, unitPrice: 800, totalValue: 14400, supplier: 'معرض الأثاث الراقي', leadTime: '14 أيام', status: 'منخفض' },
    { itemCode: 'ITM005', itemName: 'ورق طباعة A4', currentStock: 25, reorderLevel: 50, maxLevel: 200, suggestedOrder: 175, unitPrice: 25, totalValue: 4375, supplier: 'مكتبة الرياض', leadTime: '3 أيام', status: 'منخفض' }
  ];

  const columns = [
    { key: 'itemCode', header: 'كود الصنف' },
    { key: 'itemName', header: 'اسم الصنف' },
    { key: 'currentStock', header: 'المخزون الحالي', align: 'center' },
    { key: 'reorderLevel', header: 'حد الطلب', align: 'center' },
    { key: 'suggestedOrder', header: 'الكمية المقترحة', align: 'center' },
    { key: 'unitPrice', header: 'سعر الوحدة', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'totalValue', header: 'قيمة الطلب', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'supplier', header: 'المورد' },
    { key: 'leadTime', header: 'مدة التوريد' },
    { key: 'status', header: 'الحالة', align: 'center' }
  ];

  const totalOrderValue = reorderItems.reduce((sum, item) => sum + item.totalValue, 0);

  return (
    <div className="template">
      <div className="template-container">
        <TemplateHeader {...organizationData} />
        
        <TemplateTitle 
          title="Reorder Level Report"
          titleAr="تقرير حدود إعادة الطلب"
          rightSection={{
            title: "تفاصيل التقرير:",
            data: {
              ["المستودع"]: defaultReportData.warehouse,
              ["إجمالي الأصناف"]: defaultReportData.totalItems,
              ["الأصناف الحرجة"]: defaultReportData.criticalItems
            }
          }}
          leftSection={{
            title: "معلومات التقرير:",
            data: {
              ["تاريخ التقرير"]: defaultReportData.reportDate,
              ["تم الإنشاء بواسطة"]: "نظام إدارة المخزون",
              ["نوع التقرير"]: "تلقائي"
            }
          }}
        />
        
        <div className="report-section">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-red-50 rounded">
              <div className="text-2xl font-bold text-red-600">1</div>
              <div className="text-sm text-gray-600">أصناف نفدت</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded">
              <div className="text-2xl font-bold text-orange-600">1</div>
              <div className="text-sm text-gray-600">أصناف حرجة</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded">
              <div className="text-2xl font-bold text-yellow-600">3</div>
              <div className="text-sm text-gray-600">أصناف منخفضة</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded">
              <div className="text-2xl font-bold text-blue-600">{totalOrderValue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">قيمة الطلبات المقترحة (ر.س)</div>
            </div>
          </div>

          <TemplateBody columns={columns} data={reorderItems} showTotal={true} totalAmount={totalOrderValue} />

          <div className="mt-6 grid grid-cols-2 gap-8">
            <div className="p-4 bg-red-50 rounded border border-red-300">
              <h4 className="font-semibold mb-2 text-red-800">أصناف تحتاج طلب عاجل</h4>
              <div className="text-sm space-y-1">
                <p>• جهاز كمبيوتر محمول - المخزون حرج جداً</p>
                <p>• شاشة LCD - نفد المخزون تماماً</p>
                <p>• كرسي مكتب - أقل من الحد الأدنى</p>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded">
              <h4 className="font-semibold mb-2">توصيات الشراء</h4>
              <div className="text-sm space-y-1">
                <p>• إعطاء أولوية للأصناف النافدة والحرجة</p>
                <p>• التواصل مع الموردين لتأكيد مدة التوريد</p>
                <p>• مراجعة حدود الطلب بناءً على الاستهلاك</p>
                <p>• تحديث معلومات الموردين والأسعار</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded border border-yellow-300">
            <h4 className="font-semibold mb-2">ملاحظات مهمة</h4>
            <div className="text-sm space-y-1">
              <p>• هذا التقرير يتم إنشاؤه تلقائياً يومياً في الساعة 8:00 صباحاً</p>
              <p>• يتم إرسال تنبيهات للموردين المعتمدين تلقائياً</p>
              <p>• يجب مراجعة وتحديث حدود الطلب شهرياً</p>
              <p>• الأسعار المعروضة هي آخر أسعار شراء مسجلة</p>
            </div>
          </div>

          <div className="signature-section">
            <div className="signature-line">
              <span>مدير المخزون</span>
            </div>
            <div className="signature-line">
              <span>مدير المشتريات</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReorderLevelReport;