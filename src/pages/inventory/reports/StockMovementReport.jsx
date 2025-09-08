import { useTranslation } from 'react-i18next';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import SignatureSection from '../../../components/templates/SignatureSection';
import TemplateFooter from '../../../components/templates/TemplateFooter';

const StockMovementReport = ({ organizationData = {}, reportData = {} }) => {
  const { t } = useTranslation();

  const defaultReportData = {
    fromDate: '2024-01-01',
    toDate: '2024-01-31',
    itemCode: 'ITM001',
    itemName: 'جهاز كمبيوتر محمول',
    openingStock: 30,
    closingStock: 25,
    ...reportData
  };

  const movementData = [
    { date: '2024-01-02', type: 'وارد', reference: 'PO-001', quantity: 10, unitPrice: 15000, totalValue: 150000, balance: 40, remarks: 'شراء جديد من المورد الرئيسي' },
    { date: '2024-01-05', type: 'صادر', reference: 'SO-001', quantity: -5, unitPrice: 15000, totalValue: -75000, balance: 35, remarks: 'بيع للعميل أحمد محمد' },
    { date: '2024-01-10', type: 'صادر', reference: 'SO-002', quantity: -3, unitPrice: 15000, totalValue: -45000, balance: 32, remarks: 'بيع لشركة التقنية المتقدمة' },
    { date: '2024-01-15', type: 'تعديل', reference: 'ADJ-001', quantity: -2, unitPrice: 15000, totalValue: -30000, balance: 30, remarks: 'تلف أثناء النقل' },
    { date: '2024-01-20', type: 'صادر', reference: 'SO-003', quantity: -5, unitPrice: 15000, totalValue: -75000, balance: 25, remarks: 'بيع للعميل فاطمة علي' }
  ];

  const columns = [
    { key: 'date', header: 'التاريخ' },
    { key: 'type', header: 'نوع الحركة' },
    { key: 'reference', header: 'المرجع' },
    { key: 'quantity', header: 'الكمية', align: 'center' },
    { key: 'unitPrice', header: 'سعر الوحدة', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'totalValue', header: 'القيمة', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'balance', header: 'الرصيد', align: 'center' },
    { key: 'remarks', header: 'ملاحظات' }
  ];

  return (
    <div className="template">
      <div className="template-container">
        <TemplateHeader {...organizationData} />
        
        <TemplateTitle 
          title="Stock Movement Report"
          titleAr="تقرير حركة المخزون"
          rightSection={{
            title: "تفاصيل الصنف:",
            data: {
              ["كود الصنف"]: defaultReportData.itemCode,
              ["اسم الصنف"]: defaultReportData.itemName,
              ["المخزون الافتتاحي"]: defaultReportData.openingStock,
              ["المخزون الختامي"]: defaultReportData.closingStock
            }
          }}
          leftSection={{
            title: "فترة التقرير:",
            data: {
              ["من تاريخ"]: defaultReportData.fromDate,
              ["إلى تاريخ"]: defaultReportData.toDate,
              ["تاريخ الإنشاء"]: new Date().toISOString().split('T')[0]
            }
          }}
        />
        
        <div className="report-section">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded">
              <div className="text-2xl font-bold text-green-600">+10</div>
              <div className="text-sm text-gray-600">إجمالي الوارد</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded">
              <div className="text-2xl font-bold text-red-600">-15</div>
              <div className="text-sm text-gray-600">إجمالي الصادر</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded">
              <div className="text-2xl font-bold text-blue-600">25</div>
              <div className="text-sm text-gray-600">الرصيد الحالي</div>
            </div>
          </div>

          <TemplateBody columns={columns} data={movementData} showTotal={false} />

          <div className="mt-6 p-4 bg-gray-50 rounded">
            <h4 className="font-semibold mb-2">ملخص الحركة</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p><span className="font-medium">المخزون الافتتاحي:</span> {defaultReportData.openingStock} وحدة</p>
                <p><span className="font-medium">إجمالي الوارد:</span> 10 وحدة</p>
              </div>
              <div>
                <p><span className="font-medium">إجمالي الصادر:</span> 15 وحدة</p>
                <p><span className="font-medium">المخزون الختامي:</span> {defaultReportData.closingStock} وحدة</p>
              </div>
            </div>
          </div>

          <div className="signature-section">
            <div className="signature-line">
              <span>أمين المخزن</span>
            </div>
            <div className="signature-line">
              <span>مدير المخزون</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockMovementReport;