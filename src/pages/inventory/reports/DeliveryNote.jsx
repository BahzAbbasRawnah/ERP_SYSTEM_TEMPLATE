import { useTranslation } from 'react-i18next';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import SignatureSection from '../../../components/templates/SignatureSection';
import TemplateFooter from '../../../components/templates/TemplateFooter';

const DeliveryNote = ({ organizationData = {}, deliveryData = {} }) => {
  const { t } = useTranslation();

  const defaultDeliveryData = {
    deliveryNo: 'DN-2024-001',
    date: new Date().toISOString().split('T')[0],
    salesOrderNo: 'SO-2024-001',
    customerName: 'شركة الأعمال المتقدمة',
    customerAddress: 'جدة، المملكة العربية السعودية',
    deliveryAddress: 'مكتب جدة - حي الروضة، شارع الأمير سلطان',
    driverName: 'عبدالله محمد',
    vehicleNo: 'أ ب ج 1234',
    ...deliveryData
  };

  const itemsData = [
    { itemCode: 'ITM001', itemName: 'جهاز كمبيوتر محمول Dell', quantity: 3, unitPrice: 16000, totalValue: 48000, serialNumbers: 'DL001, DL002, DL003', condition: 'جديد' },
    { itemCode: 'ITM002', itemName: 'طابعة ليزر ملونة', quantity: 1, unitPrice: 4500, totalValue: 4500, serialNumbers: 'PR001', condition: 'جديد' },
    { itemCode: 'ITM003', itemName: 'شاشة LED 27 بوصة', quantity: 2, unitPrice: 4000, totalValue: 8000, serialNumbers: 'MON001, MON002', condition: 'جديد' },
    { itemCode: 'ITM004', itemName: 'لوحة مفاتيح لاسلكية', quantity: 5, unitPrice: 150, totalValue: 750, serialNumbers: 'KB001-KB005', condition: 'جديد' }
  ];

  const columns = [
    { key: 'itemCode', header: 'كود الصنف' },
    { key: 'itemName', header: 'اسم الصنف' },
    { key: 'quantity', header: 'الكمية', align: 'center' },
    { key: 'unitPrice', header: 'سعر الوحدة', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'totalValue', header: 'القيمة الإجمالية', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'serialNumbers', header: 'الأرقام التسلسلية' },
    { key: 'condition', header: 'الحالة' }
  ];

  const totalValue = itemsData.reduce((sum, item) => sum + item.totalValue, 0);

  return (
    <div className="template">
      <div className="template-container">
        <TemplateHeader {...organizationData} />
        
        <TemplateTitle 
          title="Delivery Note"
          titleAr="إشعار التسليم"
          rightSection={{
            title: "تفاصيل العميل:",
            data: {
              [defaultDeliveryData.customerName]: "",
              [defaultDeliveryData.customerAddress]: "",
              ["عنوان التسليم"]: defaultDeliveryData.deliveryAddress
            }
          }}
          leftSection={{
            title: "تفاصيل التسليم:",
            data: {
              ["رقم إشعار التسليم"]: defaultDeliveryData.deliveryNo,
              ["تاريخ التسليم"]: defaultDeliveryData.date,
              ["رقم أمر البيع"]: defaultDeliveryData.salesOrderNo
            }
          }}
        />
        
        <div className="report-section">
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div className="p-4 bg-blue-50 rounded">
              <h4 className="font-semibold mb-2">تفاصيل النقل</h4>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">اسم السائق:</span> {defaultDeliveryData.driverName}</p>
                <p><span className="font-medium">رقم المركبة:</span> {defaultDeliveryData.vehicleNo}</p>
                <p><span className="font-medium">وقت المغادرة:</span> 09:00 صباحاً</p>
                <p><span className="font-medium">الوقت المتوقع للوصول:</span> 11:00 صباحاً</p>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded">
              <h4 className="font-semibold mb-2">ملاحظات التسليم</h4>
              <div className="text-sm space-y-1">
                <p>• يرجى فحص البضائع عند الاستلام</p>
                <p>• التوقيع مطلوب عند التسليم</p>
                <p>• الإبلاغ عن أي تلف فوراً</p>
                <p>• الاحتفاظ بنسخة من الإشعار</p>
              </div>
            </div>
          </div>

          <TemplateBody columns={columns} data={itemsData} showTotal={true} totalAmount={totalValue} />

          <div className="mt-6 p-4 border-2 border-gray-300 rounded">
            <h4 className="font-semibold mb-3">إقرار الاستلام</h4>
            <div className="text-sm space-y-2">
              <p>أقر بأنني استلمت البضائع المذكورة أعلاه بحالة جيدة وبالكميات المحددة.</p>
              <div className="grid grid-cols-2 gap-8 mt-4">
                <div>
                  <div className="border-b border-gray-400 h-16 mb-2"></div>
                  <p className="text-center font-medium">توقيع المستلم</p>
                  <p className="text-center text-xs">الاسم: ________________</p>
                  <p className="text-center text-xs">التاريخ: ________________</p>
                </div>
                <div>
                  <div className="border-b border-gray-400 h-16 mb-2"></div>
                  <p className="text-center font-medium">ختم الشركة</p>
                </div>
              </div>
            </div>
          </div>

          <div className="signature-section">
            <div className="signature-line">
              <span>أمين المخزن</span>
            </div>
            <div className="signature-line">
              <span>مدير المبيعات</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryNote;