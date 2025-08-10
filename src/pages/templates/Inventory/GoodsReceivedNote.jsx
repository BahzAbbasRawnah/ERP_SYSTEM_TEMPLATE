import { useTranslation } from 'react-i18next';
import OrganizationHeader from '../components/OrganizationHeader';
import ReportTitle from '../components/ReportTitle';
import TemplateTable from '../components/TemplateTable';
import SignatureSection from '../components/SignatureSection';

const GoodsReceivedNote = ({ organizationData = {}, grnData = {} }) => {
  const { t } = useTranslation();

  const defaultGrnData = {
    grnNo: 'GRN-2024-001',
    date: new Date().toISOString().split('T')[0],
    poNumber: 'PO-2024-001',
    supplierName: 'شركة التقنية المتطورة',
    supplierAddress: 'الرياض، المملكة العربية السعودية',
    receivedBy: 'محمد أحمد',
    ...grnData
  };

  const itemsData = [
    { itemCode: 'ITM001', itemName: 'جهاز كمبيوتر محمول HP', orderedQty: 10, receivedQty: 10, unitPrice: 15000, totalValue: 150000, condition: 'جيد', remarks: 'تم الاستلام بحالة ممتازة' },
    { itemCode: 'ITM002', itemName: 'طابعة ليزر Canon', orderedQty: 5, receivedQty: 5, unitPrice: 2500, totalValue: 12500, condition: 'جيد', remarks: 'مع جميع الملحقات' },
    { itemCode: 'ITM003', itemName: 'شاشة LCD 24 بوصة', orderedQty: 8, receivedQty: 7, unitPrice: 3500, totalValue: 24500, condition: 'جيد', remarks: 'قطعة واحدة تالفة' },
    { itemCode: 'ITM004', itemName: 'كرسي مكتب دوار', orderedQty: 12, receivedQty: 12, unitPrice: 800, totalValue: 9600, condition: 'جيد', remarks: 'تم التجميع والفحص' }
  ];

  const columns = [
    { key: 'itemCode', header: 'كود الصنف' },
    { key: 'itemName', header: 'اسم الصنف' },
    { key: 'orderedQty', header: 'الكمية المطلوبة', align: 'center' },
    { key: 'receivedQty', header: 'الكمية المستلمة', align: 'center' },
    { key: 'unitPrice', header: 'سعر الوحدة', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'totalValue', header: 'القيمة الإجمالية', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'condition', header: 'الحالة' },
    { key: 'remarks', header: 'ملاحظات' }
  ];

  const totalValue = itemsData.reduce((sum, item) => sum + item.totalValue, 0);

  return (
    <div className="print-wrapper">
      <div className="template-print-container max-w-6xl mx-auto bg-white">
        <div className="template-header">
          <OrganizationHeader {...organizationData} />
        </div>
        
        <div className="report-title-section">
          <ReportTitle 
            title="Goods Received Note"
            titleAr="إشعار استلام البضائع"
            rightSection={{
              title: "تفاصيل المورد:",
              data: {
                [defaultGrnData.supplierName]: "",
                [defaultGrnData.supplierAddress]: "",
                ["رقم أمر الشراء"]: defaultGrnData.poNumber
              }
            }}
            leftSection={{
              title: "تفاصيل الاستلام:",
              data: {
                ["رقم إشعار الاستلام"]: defaultGrnData.grnNo,
                ["تاريخ الاستلام"]: defaultGrnData.date,
                ["تم الاستلام بواسطة"]: defaultGrnData.receivedBy
              }
            }}
          />
        </div>
        
        <div className="template-body">
          <TemplateTable columns={columns} data={itemsData} showTotal={true} totalAmount={totalValue} />

          <div className="mt-6 grid grid-cols-2 gap-8">
            <div className="p-4 bg-blue-50 rounded">
              <h4 className="font-semibold mb-2">ملاحظات الاستلام</h4>
              <div className="text-sm space-y-1">
                <p>• تم فحص جميع الأصناف عند الاستلام</p>
                <p>• تم التأكد من مطابقة الكميات لأمر الشراء</p>
                <p>• تم توثيق أي تلف أو نقص في الملاحظات</p>
                <p>• تم تحديث أرصدة المخزون فوراً</p>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded">
              <h4 className="font-semibold mb-2">حالة الاستلام</h4>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">إجمالي الأصناف:</span> 4 أصناف</p>
                <p><span className="font-medium">الكمية المطلوبة:</span> 35 قطعة</p>
                <p><span className="font-medium">الكمية المستلمة:</span> 34 قطعة</p>
                <p><span className="font-medium">نسبة الاستلام:</span> 97%</p>
              </div>
            </div>
          </div>

          <SignatureSection 
            preparedByLabel="أمين المخزن"
            approvedByLabel="مدير المشتريات"
            showReceivedBy={true}
            receivedByLabel="مندوب المورد"
          />
        </div>
      </div>
    </div>
  );
};

export default GoodsReceivedNote;