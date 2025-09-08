import { useTranslation } from 'react-i18next';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import SignatureSection from '../../../components/templates/SignatureSection';
import TemplateFooter from '../../../components/templates/TemplateFooter';

const StockTransferReport = ({ organizationData = {}, transferData = {} }) => {
  const { t } = useTranslation();

  const defaultTransferData = {
    transferNo: 'ST-2024-001',
    date: new Date().toISOString().split('T')[0],
    fromWarehouse: 'المستودع الرئيسي - الرياض',
    toWarehouse: 'فرع جدة - المستودع الفرعي',
    requestedBy: 'مدير فرع جدة',
    driverName: 'خالد أحمد',
    vehicleNo: 'ر س ع 5678',
    ...transferData
  };

  const transferItems = [
    { itemCode: 'ITM001', itemName: 'جهاز كمبيوتر محمول HP', transferQty: 5, unitPrice: 15000, totalValue: 75000, fromStock: 25, toStock: 8, remarks: 'طلب عاجل من الفرع' },
    { itemCode: 'ITM002', itemName: 'طابعة ليزر Canon', transferQty: 2, unitPrice: 2500, totalValue: 5000, fromStock: 8, toStock: 3, remarks: 'استبدال طابعة تالفة' },
    { itemCode: 'ITM003', itemName: 'شاشة LCD 24 بوصة', transferQty: 3, unitPrice: 3500, totalValue: 10500, fromStock: 12, toStock: 2, remarks: 'توسع المكتب' },
    { itemCode: 'ITM004', itemName: 'كرسي مكتب دوار', transferQty: 10, unitPrice: 800, totalValue: 8000, fromStock: 15, toStock: 5, remarks: 'مكتب جديد' },
    { itemCode: 'ITM005', itemName: 'لوحة مفاتيح لاسلكية', transferQty: 8, unitPrice: 150, totalValue: 1200, fromStock: 20, toStock: 12, remarks: 'طلب الموظفين الجدد' }
  ];

  const columns = [
    { key: 'itemCode', header: 'كود الصنف' },
    { key: 'itemName', header: 'اسم الصنف' },
    { key: 'transferQty', header: 'الكمية المنقولة', align: 'center' },
    { key: 'unitPrice', header: 'سعر الوحدة', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'totalValue', header: 'القيمة الإجمالية', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'fromStock', header: 'رصيد المصدر', align: 'center' },
    { key: 'toStock', header: 'رصيد الوجهة', align: 'center' },
    { key: 'remarks', header: 'ملاحظات' }
  ];

  const totalValue = transferItems.reduce((sum, item) => sum + item.totalValue, 0);

  return (
    <div className="template">
      <div className="template-container">
        <TemplateHeader {...organizationData} />
        
        <TemplateTitle 
          title="Stock Transfer Report"
          titleAr="تقرير نقل المخزون"
          rightSection={{
            title: "تفاصيل النقل:",
            data: {
              ["من مستودع"]: defaultTransferData.fromWarehouse,
              ["إلى مستودع"]: defaultTransferData.toWarehouse,
              ["طلب بواسطة"]: defaultTransferData.requestedBy
            }
          }}
          leftSection={{
            title: "معلومات التحويل:",
            data: {
              ["رقم التحويل"]: defaultTransferData.transferNo,
              ["تاريخ التحويل"]: defaultTransferData.date,
              ["حالة التحويل"]: "مكتمل"
            }
          }}
        />
        
        <div className="report-section">
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div className="p-4 bg-blue-50 rounded">
              <h4 className="font-semibold mb-2">تفاصيل الشحن</h4>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">اسم السائق:</span> {defaultTransferData.driverName}</p>
                <p><span className="font-medium">رقم المركبة:</span> {defaultTransferData.vehicleNo}</p>
                <p><span className="font-medium">وقت المغادرة:</span> 08:00 صباحاً</p>
                <p><span className="font-medium">الوقت المتوقع للوصول:</span> 14:00 مساءً</p>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded">
              <h4 className="font-semibold mb-2">ملخص النقل</h4>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">إجمالي الأصناف:</span> 5 أصناف</p>
                <p><span className="font-medium">إجمالي الكميات:</span> 28 قطعة</p>
                <p><span className="font-medium">إجمالي القيمة:</span> {totalValue.toLocaleString()} ر.س</p>
                <p><span className="font-medium">المسافة:</span> 950 كم</p>
              </div>
            </div>
          </div>

          <TemplateBody columns={columns} data={transferItems} showTotal={true} totalAmount={totalValue} />

          <div className="mt-6 p-4 bg-yellow-50 rounded border border-yellow-300">
            <h4 className="font-semibold mb-2">تعليمات مهمة</h4>
            <div className="text-sm space-y-1">
              <p>• يجب فحص جميع الأصناف عند الاستلام في المستودع الوجهة</p>
              <p>• الإبلاغ عن أي تلف أو نقص فوراً</p>
              <p>• تحديث أرصدة المخزون في كلا المستودعين</p>
              <p>• الاحتفاظ بنسخة من التقرير في كلا الموقعين</p>
              <p>• إرسال تأكيد الاستلام خلال 24 ساعة</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-8">
            <div className="text-center">
              <h4 className="font-semibold mb-4">المستودع المرسل</h4>
              <div className="border-b border-gray-400 h-16 mb-2"></div>
              <p className="text-sm font-medium">توقيع أمين المخزن</p>
              <p className="text-sm">التاريخ: ________________</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-4">المستودع المستقبل</h4>
              <div className="border-b border-gray-400 h-16 mb-2"></div>
              <p className="text-sm font-medium">توقيع أمين المخزن</p>
              <p className="text-sm">التاريخ: ________________</p>
            </div>
          </div>

          <div className="signature-section">
            <div className="signature-line">
              <span>مدير المخزون</span>
            </div>
            <div className="signature-line">
              <span>مدير العمليات</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockTransferReport;