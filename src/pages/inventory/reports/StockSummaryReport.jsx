import { useTranslation } from 'react-i18next';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import SignatureSection from '../../../components/templates/SignatureSection';
import TemplateFooter from '../../../components/templates/TemplateFooter';

const StockSummaryReport = ({ organizationData = {}, reportData = {} }) => {
  const { t } = useTranslation();

  const defaultReportData = {
    reportDate: new Date().toISOString().split('T')[0],
    warehouse: 'المستودع الرئيسي',
    totalItems: 156,
    totalValue: 2450000,
    ...reportData
  };

  const stockData = [
    { itemCode: 'ITM001', itemName: 'جهاز كمبيوتر محمول', category: 'إلكترونيات', currentStock: 25, unitPrice: 15000, totalValue: 375000, reorderLevel: 10, status: 'متوفر' },
    { itemCode: 'ITM002', itemName: 'طابعة ليزر', category: 'مكتبية', currentStock: 8, unitPrice: 2500, totalValue: 20000, reorderLevel: 5, status: 'متوفر' },
    { itemCode: 'ITM003', itemName: 'كرسي مكتب', category: 'أثاث', currentStock: 3, unitPrice: 800, totalValue: 2400, reorderLevel: 5, status: 'منخفض' },
    { itemCode: 'ITM004', itemName: 'ورق طباعة A4', category: 'قرطاسية', currentStock: 150, unitPrice: 25, totalValue: 3750, reorderLevel: 50, status: 'متوفر' },
    { itemCode: 'ITM005', itemName: 'شاشة LCD 24 بوصة', category: 'إلكترونيات', currentStock: 0, unitPrice: 3500, totalValue: 0, reorderLevel: 8, status: 'نفد' }
  ];

  const columns = [
    { key: 'itemCode', header: 'كود الصنف' },
    { key: 'itemName', header: 'اسم الصنف' },
    { key: 'category', header: 'الفئة' },
    { key: 'currentStock', header: 'المخزون الحالي', align: 'center' },
    { key: 'unitPrice', header: 'سعر الوحدة', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'totalValue', header: 'القيمة الإجمالية', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'reorderLevel', header: 'حد الطلب', align: 'center' },
    { key: 'status', header: 'الحالة', align: 'center' }
  ];

  return (
    <div className="template">
      <div className="template-container">
        <TemplateHeader {...organizationData} />
        
        <TemplateTitle 
          title="Stock Summary Report"
          titleAr="تقرير ملخص المخزون"
          rightSection={{
            title: "معلومات المستودع:",
            data: {
              ["المستودع"]: defaultReportData.warehouse,
              ["إجمالي الأصناف"]: defaultReportData.totalItems,
              ["القيمة الإجمالية"]: `${defaultReportData.totalValue.toLocaleString()} ر.س`
            }
          }}
          leftSection={{
            title: "تفاصيل التقرير:",
            data: {
              ["تاريخ التقرير"]: defaultReportData.reportDate,
              ["تم الإنشاء بواسطة"]: "مدير المخزون"
            }
          }}
        />
        
        <div className="report-section">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded">
              <div className="text-2xl font-bold text-blue-600">156</div>
              <div className="text-sm text-gray-600">إجمالي الأصناف</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded">
              <div className="text-2xl font-bold text-green-600">142</div>
              <div className="text-sm text-gray-600">أصناف متوفرة</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded">
              <div className="text-2xl font-bold text-yellow-600">8</div>
              <div className="text-sm text-gray-600">أصناف منخفضة</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded">
              <div className="text-2xl font-bold text-red-600">6</div>
              <div className="text-sm text-gray-600">أصناف نفدت</div>
            </div>
          </div>

          <TemplateBody columns={columns} data={stockData} showTotal={true} totalAmount={defaultReportData.totalValue} />

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

export default StockSummaryReport;