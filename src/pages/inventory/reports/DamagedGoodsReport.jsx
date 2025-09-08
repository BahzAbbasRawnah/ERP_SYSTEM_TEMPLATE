import { useTranslation } from 'react-i18next';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import SignatureSection from '../../../components/templates/SignatureSection';
import TemplateFooter from '../../../components/templates/TemplateFooter';

const DamagedGoodsReport = ({ organizationData = {}, reportData = {} }) => {
  const { t } = useTranslation();

  const defaultReportData = {
    reportDate: new Date().toISOString().split('T')[0],
    reportNo: 'DMG-2024-001',
    warehouse: 'المستودع الرئيسي',
    reportedBy: 'محمد أحمد - أمين المخزن',
    totalDamagedItems: 12,
    ...reportData
  };

  const damagedItems = [
    { itemCode: 'ITM001', itemName: 'جهاز كمبيوتر محمول HP', batchNo: 'BT-2024-001', damagedQty: 2, unitPrice: 15000, totalValue: 30000, damageDate: '2024-01-28', damageType: 'تلف أثناء النقل', damageLevel: 'كلي', cause: 'سقوط من الرافعة الشوكية', action: 'مطالبة التأمين', responsible: 'شركة النقل' },
    { itemCode: 'ITM002', itemName: 'شاشة LCD 24 بوصة', batchNo: 'BT-2024-002', damagedQty: 1, unitPrice: 3500, totalValue: 3500, damageDate: '2024-01-25', damageType: 'تلف في الشاشة', damageLevel: 'كلي', cause: 'كسر في الشاشة', action: 'إرجاع للمورد', responsible: 'عيب تصنيع' },
    { itemCode: 'ITM003', itemName: 'طابعة ليزر Canon', batchNo: 'BT-2024-003', damagedQty: 1, unitPrice: 2500, totalValue: 2500, damageDate: '2024-01-30', damageType: 'عطل فني', damageLevel: 'جزئي', cause: 'عطل في وحدة الطباعة', action: 'إصلاح', responsible: 'انتهاء الضمان' },
    { itemCode: 'ITM004', itemName: 'كرسي مكتب دوار', batchNo: 'BT-2024-004', damagedQty: 3, unitPrice: 800, totalValue: 2400, damageDate: '2024-01-26', damageType: 'تلف في الهيكل', damageLevel: 'جزئي', cause: 'كسر في القاعدة', action: 'إصلاح', responsible: 'سوء الاستخدام' },
    { itemCode: 'ITM005', itemName: 'هاتف ذكي Samsung', batchNo: 'BT-2024-005', damagedQty: 2, unitPrice: 2200, totalValue: 4400, damageDate: '2024-01-29', damageType: 'تلف بالماء', damageLevel: 'كلي', cause: 'تسرب مياه في المستودع', action: 'مطالبة التأمين', responsible: 'خلل في السباكة' },
    { itemCode: 'ITM006', itemName: 'لوحة مفاتيح لاسلكية', batchNo: 'BT-2024-006', damagedQty: 5, unitPrice: 150, totalValue: 750, damageDate: '2024-01-27', damageType: 'تلف في البطارية', damageLevel: 'جزئي', cause: 'انتفاخ البطارية', action: 'استبدال البطارية', responsible: 'عيب تصنيع' }
  ];

  const columns = [
    { key: 'itemCode', header: 'كود الصنف' },
    { key: 'itemName', header: 'اسم الصنف' },
    { key: 'batchNo', header: 'رقم الدفعة' },
    { key: 'damagedQty', header: 'الكمية التالفة', align: 'center' },
    { key: 'unitPrice', header: 'سعر الوحدة', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'totalValue', header: 'قيمة التلف', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'damageDate', header: 'تاريخ التلف' },
    { key: 'damageType', header: 'نوع التلف' },
    { key: 'damageLevel', header: 'مستوى التلف' },
    { key: 'cause', header: 'السبب' },
    { key: 'action', header: 'الإجراء المطلوب' },
    { key: 'responsible', header: 'المسؤولية' }
  ];

  const totalDamageValue = damagedItems.reduce((sum, item) => sum + item.totalValue, 0);
  const totalDamageItems = damagedItems.reduce((sum, item) => sum + item.damagedQty, 0);

  return (
    <div className="template">
      <div className="template-container">
        <TemplateHeader {...organizationData} />
        
        <TemplateTitle 
          title="Damaged Goods Report"
          titleAr="تقرير البضائع التالفة"
          rightSection={{
            title: "تفاصيل التقرير:",
            data: {
              ["رقم التقرير"]: defaultReportData.reportNo,
              ["المستودع"]: defaultReportData.warehouse,
              ["تم الإبلاغ بواسطة"]: defaultReportData.reportedBy
            }
          }}
          leftSection={{
            title: "ملخص الأضرار:",
            data: {
              ["تاريخ التقرير"]: defaultReportData.reportDate,
              ["إجمالي الأصناف التالفة"]: totalDamageItems,
              ["قيمة الأضرار"]: `${totalDamageValue.toLocaleString()} ر.س`
            }
          }}
        />
        
        <div className="report-section">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-red-50 rounded border border-red-300">
              <div className="text-2xl font-bold text-red-600">8</div>
              <div className="text-sm text-gray-600">تلف كلي</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded border border-orange-300">
              <div className="text-2xl font-bold text-orange-600">6</div>
              <div className="text-sm text-gray-600">تلف جزئي</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded">
              <div className="text-2xl font-bold text-blue-600">{totalDamageValue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">إجمالي قيمة الأضرار (ر.س)</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded">
              <div className="text-2xl font-bold text-purple-600">6</div>
              <div className="text-sm text-gray-600">أنواع الأصناف المتضررة</div>
            </div>
          </div>

          <TemplateBody columns={columns} data={damagedItems} showTotal={true} totalAmount={totalDamageValue} />

          <div className="mt-6 grid grid-cols-3 gap-6">
            <div className="p-4 bg-red-50 rounded border border-red-300">
              <h4 className="font-semibold mb-2 text-red-800">أسباب التلف الرئيسية</h4>
              <div className="text-sm space-y-1">
                <p>• تلف أثناء النقل: 35%</p>
                <p>• عيوب التصنيع: 25%</p>
                <p>• سوء التخزين: 20%</p>
                <p>• سوء الاستخدام: 15%</p>
                <p>• أسباب أخرى: 5%</p>
              </div>
            </div>
            <div className="p-4 bg-orange-50 rounded border border-orange-300">
              <h4 className="font-semibold mb-2 text-orange-800">الإجراءات المطلوبة</h4>
              <div className="text-sm space-y-1">
                <p>• مطالبة التأمين: 3 حالات</p>
                <p>• إرجاع للمورد: 1 حالة</p>
                <p>• إصلاح: 2 حالة</p>
                <p>• إتلاف: 0 حالة</p>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded">
              <h4 className="font-semibold mb-2">توزيع المسؤولية</h4>
              <div className="text-sm space-y-1">
                <p>• شركة النقل: 30,000 ر.س</p>
                <p>• عيوب التصنيع: 8,900 ر.س</p>
                <p>• سوء الاستخدام: 2,400 ر.س</p>
                <p>• خلل في المرافق: 4,400 ر.س</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded border border-yellow-300">
            <h4 className="font-semibold mb-2">إجراءات المتابعة المطلوبة</h4>
            <div className="text-sm space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">إجراءات فورية:</p>
                  <p>• رفع مطالبة التأمين لأضرار النقل</p>
                  <p>• التواصل مع المورد لاستبدال الشاشة المعيبة</p>
                  <p>• إصلاح الطابعة والكراسي</p>
                </div>
                <div>
                  <p className="font-medium">إجراءات وقائية:</p>
                  <p>• تحسين إجراءات التعامل والنقل</p>
                  <p>• مراجعة شروط الضمان مع الموردين</p>
                  <p>• تدريب الموظفين على التعامل الآمن</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 border-2 border-gray-300 rounded">
            <h4 className="font-semibold mb-3">تأكيد الفحص والتقييم</h4>
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="border-b border-gray-400 h-16 mb-2"></div>
                <p className="text-sm font-medium">أمين المخزن</p>
                <p className="text-xs">فحص وتوثيق الأضرار</p>
              </div>
              <div>
                <div className="border-b border-gray-400 h-16 mb-2"></div>
                <p className="text-sm font-medium">مسؤول الجودة</p>
                <p className="text-xs">تقييم مستوى التلف</p>
              </div>
              <div>
                <div className="border-b border-gray-400 h-16 mb-2"></div>
                <p className="text-sm font-medium">مدير المستودع</p>
                <p className="text-xs">اعتماد التقرير</p>
              </div>
            </div>
          </div>

          <div className="signature-section">
            <div className="signature-line">
              <span>أمين المخزن</span>
            </div>
            <div className="signature-line">
              <span>مدير المستودع</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DamagedGoodsReport;