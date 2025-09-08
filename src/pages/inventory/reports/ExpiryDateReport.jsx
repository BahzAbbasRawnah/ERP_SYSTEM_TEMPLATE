import { useTranslation } from 'react-i18next';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import SignatureSection from '../../../components/templates/SignatureSection';
import TemplateFooter from '../../../components/templates/TemplateFooter';

const ExpiryDateReport = ({ organizationData = {}, reportData = {} }) => {
  const { t } = useTranslation();

  const defaultReportData = {
    reportDate: new Date().toISOString().split('T')[0],
    warehouse: 'مستودع المواد الغذائية',
    expiredItems: 8,
    nearExpiryItems: 15,
    ...reportData
  };

  const expiryItems = [
    { itemCode: 'FD001', itemName: 'حليب طازج - علبة 1 لتر', batchNo: 'BT-2024-001', quantity: 24, expiryDate: '2024-02-01', daysToExpiry: -5, unitPrice: 8, totalValue: 192, supplier: 'مزارع الألبان الطازجة', status: 'منتهي الصلاحية', action: 'إتلاف فوري' },
    { itemCode: 'FD002', itemName: 'خبز أبيض - رغيف', batchNo: 'BT-2024-002', quantity: 50, expiryDate: '2024-02-03', daysToExpiry: -3, unitPrice: 3, totalValue: 150, supplier: 'مخبز الحي', status: 'منتهي الصلاحية', action: 'إتلاف فوري' },
    { itemCode: 'FD003', itemName: 'عصير برتقال طبيعي', batchNo: 'BT-2024-003', quantity: 12, expiryDate: '2024-02-08', daysToExpiry: 2, unitPrice: 15, totalValue: 180, supplier: 'شركة العصائر الطبيعية', status: 'قريب الانتهاء', action: 'تخفيض السعر' },
    { itemCode: 'FD004', itemName: 'لحم بقري مفروم - كيلو', batchNo: 'BT-2024-004', quantity: 8, expiryDate: '2024-02-10', daysToExpiry: 4, unitPrice: 45, totalValue: 360, supplier: 'مجزرة الجودة', status: 'قريب الانتهاء', action: 'بيع عاجل' },
    { itemCode: 'FD005', itemName: 'جبن أبيض - علبة 500 جرام', batchNo: 'BT-2024-005', quantity: 15, expiryDate: '2024-02-12', daysToExpiry: 6, unitPrice: 25, totalValue: 375, supplier: 'مصنع الألبان المحلي', status: 'قريب الانتهاء', action: 'عرض خاص' },
    { itemCode: 'FD006', itemName: 'دجاج مجمد - كيلو', batchNo: 'BT-2024-006', quantity: 20, expiryDate: '2024-02-15', daysToExpiry: 9, unitPrice: 28, totalValue: 560, supplier: 'مزارع الدواجن الحديثة', status: 'مراقبة', action: 'متابعة يومية' }
  ];

  const columns = [
    { key: 'itemCode', header: 'كود الصنف' },
    { key: 'itemName', header: 'اسم الصنف' },
    { key: 'batchNo', header: 'رقم الدفعة' },
    { key: 'quantity', header: 'الكمية', align: 'center' },
    { key: 'expiryDate', header: 'تاريخ الانتهاء' },
    { key: 'daysToExpiry', header: 'الأيام المتبقية', align: 'center' },
    { key: 'unitPrice', header: 'سعر الوحدة', align: 'end', render: (value) => `${value} ر.س` },
    { key: 'totalValue', header: 'القيمة الإجمالية', align: 'end', render: (value) => `${value} ر.س` },
    { key: 'supplier', header: 'المورد' },
    { key: 'status', header: 'الحالة', align: 'center' },
    { key: 'action', header: 'الإجراء المطلوب' }
  ];

  const totalValue = expiryItems.reduce((sum, item) => sum + item.totalValue, 0);
  const expiredValue = expiryItems.filter(item => item.daysToExpiry < 0).reduce((sum, item) => sum + item.totalValue, 0);

  return (
    <div className="template">
      <div className="template-container">
        <TemplateHeader {...organizationData} />
        
        <TemplateTitle 
          title="Expiry Date Report"
          titleAr="تقرير تواريخ الانتهاء"
          rightSection={{
            title: "تفاصيل المستودع:",
            data: {
              ["المستودع"]: defaultReportData.warehouse,
              ["الأصناف المنتهية"]: defaultReportData.expiredItems,
              ["الأصناف قريبة الانتهاء"]: defaultReportData.nearExpiryItems
            }
          }}
          leftSection={{
            title: "معلومات التقرير:",
            data: {
              ["تاريخ التقرير"]: defaultReportData.reportDate,
              ["نوع التقرير"]: "يومي",
              ["حالة التقرير"]: "عاجل"
            }
          }}
        />
        
        <div className="report-section">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-red-50 rounded border border-red-300">
              <div className="text-2xl font-bold text-red-600">2</div>
              <div className="text-sm text-gray-600">أصناف منتهية الصلاحية</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded border border-orange-300">
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className="text-sm text-gray-600">تنتهي خلال 7 أيام</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded border border-yellow-300">
              <div className="text-2xl font-bold text-yellow-600">1</div>
              <div className="text-sm text-gray-600">تنتهي خلال 14 يوم</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded">
              <div className="text-2xl font-bold text-blue-600">{totalValue}</div>
              <div className="text-sm text-gray-600">إجمالي القيمة (ر.س)</div>
            </div>
          </div>

          <TemplateBody columns={columns} data={expiryItems} showTotal={true} totalAmount={totalValue} />

          <div className="mt-6 grid grid-cols-3 gap-6">
            <div className="p-4 bg-red-50 rounded border border-red-300">
              <h4 className="font-semibold mb-2 text-red-800">إجراءات عاجلة مطلوبة</h4>
              <div className="text-sm space-y-1">
                <p>• إتلاف الحليب الطازج فوراً</p>
                <p>• إتلاف الخبز الأبيض فوراً</p>
                <p>• توثيق عمليات الإتلاف</p>
                <p>• إبلاغ إدارة الجودة</p>
              </div>
            </div>
            <div className="p-4 bg-orange-50 rounded border border-orange-300">
              <h4 className="font-semibold mb-2 text-orange-800">إجراءات خلال 24 ساعة</h4>
              <div className="text-sm space-y-1">
                <p>• تخفيض سعر العصير الطبيعي 50%</p>
                <p>• بيع اللحم المفروم بسعر مخفض</p>
                <p>• عرض خاص على الجبن الأبيض</p>
                <p>• إشعار قسم المبيعات</p>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded">
              <h4 className="font-semibold mb-2">إجراءات وقائية</h4>
              <div className="text-sm space-y-1">
                <p>• مراجعة سياسة الشراء</p>
                <p>• تحسين دوران المخزون</p>
                <p>• تدريب الموظفين على FIFO</p>
                <p>• تحديث نظام التنبيهات</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded border border-yellow-300">
            <h4 className="font-semibold mb-2">ملاحظات مهمة</h4>
            <div className="text-sm space-y-1">
              <p>• يتم إنشاء هذا التقرير يومياً في الساعة 6:00 صباحاً</p>
              <p>• يجب اتخاذ الإجراءات المطلوبة خلال المدة المحددة</p>
              <p>• قيمة الخسائر المتوقعة من الأصناف المنتهية: {expiredValue} ر.س</p>
              <p>• يجب توثيق جميع عمليات الإتلاف والتخفيضات</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-8">
            <div className="text-center">
              <h4 className="font-semibold mb-4">مسؤول مراقبة الجودة</h4>
              <div className="border-b border-gray-400 h-16 mb-2"></div>
              <p className="text-sm font-medium">التوقيع والتاريخ</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-4">مدير المستودع</h4>
              <div className="border-b border-gray-400 h-16 mb-2"></div>
              <p className="text-sm font-medium">التوقيع والتاريخ</p>
            </div>
          </div>

          <div className="signature-section">
            <div className="signature-line">
              <span>نظام إدارة المخزون</span>
            </div>
            <div className="signature-line">
              <span>مدير الجودة</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpiryDateReport;