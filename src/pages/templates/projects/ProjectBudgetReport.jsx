import { useTranslation } from 'react-i18next';
import OrganizationHeader from '../components/OrganizationHeader';
import ReportTitle from '../components/ReportTitle';
import TemplateTable from '../components/TemplateTable';
import SignatureSection from '../components/SignatureSection';

const ProjectBudgetReport = ({ organizationData = {}, budgetData = {} }) => {
  const { t } = useTranslation();

  const defaultBudgetData = {
    projectId: 'PRJ-2024-001',
    projectName: 'نظام إدارة الموارد البشرية',
    totalBudget: 750000,
    spentAmount: 485000,
    remainingBudget: 265000,
    budgetUtilization: 64.7,
    ...budgetData
  };

  const budgetBreakdown = [
    { category: 'الرواتب والأجور', budgeted: 400000, actual: 260000, variance: 140000, percentage: 65, status: 'ضمن الميزانية' },
    { category: 'المعدات والأجهزة', budgeted: 150000, actual: 145000, variance: 5000, percentage: 96.7, status: 'ضمن الميزانية' },
    { category: 'البرمجيات والتراخيص', budgeted: 100000, actual: 80000, variance: 20000, percentage: 80, status: 'ضمن الميزانية' },
    { category: 'التدريب والتطوير', budgeted: 50000, actual: 0, variance: 50000, percentage: 0, status: 'لم يبدأ' },
    { category: 'مصاريف إدارية', budgeted: 30000, actual: 0, variance: 30000, percentage: 0, status: 'لم يبدأ' },
    { category: 'طوارئ', budgeted: 20000, actual: 0, variance: 20000, percentage: 0, status: 'احتياطي' }
  ];

  const monthlySpending = [
    { month: 'يناير 2024', planned: 80000, actual: 75000, cumulative: 75000, variance: -5000 },
    { month: 'فبراير 2024', planned: 120000, actual: 125000, cumulative: 200000, variance: 5000 },
    { month: 'مارس 2024', planned: 100000, actual: 110000, cumulative: 310000, variance: 10000 },
    { month: 'أبريل 2024', planned: 90000, actual: 100000, cumulative: 410000, variance: 10000 },
    { month: 'مايو 2024', planned: 85000, actual: 75000, cumulative: 485000, variance: -10000 }
  ];

  const budgetColumns = [
    { key: 'category', header: 'فئة المصروف' },
    { key: 'budgeted', header: 'المخطط', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'actual', header: 'الفعلي', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'variance', header: 'الانحراف', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'percentage', header: 'النسبة %', align: 'center' },
    { key: 'status', header: 'الحالة', align: 'center' }
  ];

  const spendingColumns = [
    { key: 'month', header: 'الشهر' },
    { key: 'planned', header: 'مخطط', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'actual', header: 'فعلي', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'cumulative', header: 'تراكمي', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` },
    { key: 'variance', header: 'الانحراف', align: 'end', render: (value) => `${value.toLocaleString()} ر.س` }
  ];

  return (
    <div className="print-wrapper">
      <div className="template-print-container max-w-5xl mx-auto bg-white">
        <div className="template-header">
          <OrganizationHeader {...organizationData} />
        </div>
        
        <div className="report-title-section">
          <ReportTitle 
            title="Project Budget Report"
            titleAr="تقرير ميزانية المشروع"
            rightSection={{
              title: "تفاصيل المشروع:",
              data: {
                ["اسم المشروع"]: defaultBudgetData.projectName,
                ["رقم المشروع"]: defaultBudgetData.projectId,
                ["الميزانية الإجمالية"]: `${defaultBudgetData.totalBudget.toLocaleString()} ر.س`
              }
            }}
            leftSection={{
              title: "ملخص الميزانية:",
              data: {
                ["المبلغ المنفق"]: `${defaultBudgetData.spentAmount.toLocaleString()} ر.س`,
                ["المبلغ المتبقي"]: `${defaultBudgetData.remainingBudget.toLocaleString()} ر.س`,
                ["نسبة الاستخدام"]: `${defaultBudgetData.budgetUtilization}%`
              }
            }}
          />
        </div>
        
        <div className="template-body">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded">
              <div className="text-2xl font-bold text-blue-600">{defaultBudgetData.totalBudget.toLocaleString()}</div>
              <div className="text-sm text-gray-600">الميزانية الإجمالية (ر.س)</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded">
              <div className="text-2xl font-bold text-red-600">{defaultBudgetData.spentAmount.toLocaleString()}</div>
              <div className="text-sm text-gray-600">المبلغ المنفق (ر.س)</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded">
              <div className="text-2xl font-bold text-green-600">{defaultBudgetData.remainingBudget.toLocaleString()}</div>
              <div className="text-sm text-gray-600">المبلغ المتبقي (ر.س)</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded">
              <div className="text-2xl font-bold text-purple-600">{defaultBudgetData.budgetUtilization}%</div>
              <div className="text-sm text-gray-600">نسبة الاستخدام</div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">تفصيل الميزانية حسب الفئة</h3>
            <TemplateTable columns={budgetColumns} data={budgetBreakdown} showTotal={true} totalAmount={defaultBudgetData.totalBudget} />
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">الإنفاق الشهري</h3>
            <TemplateTable columns={spendingColumns} data={monthlySpending} showTotal={false} />
          </div>

          <div className="grid grid-cols-2 gap-8 mb-6">
            <div className="p-4 bg-green-50 rounded border border-green-300">
              <h4 className="font-semibold mb-2 text-green-800">نقاط القوة المالية</h4>
              <div className="text-sm space-y-1">
                <p>• توفير في تكلفة المعدات والأجهزة</p>
                <p>• إدارة جيدة لتكاليف البرمجيات</p>
                <p>• التزام بالميزانية المخططة</p>
                <p>• احتياطي جيد للطوارئ</p>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded border border-yellow-300">
              <h4 className="font-semibold mb-2 text-yellow-800">التوصيات المالية</h4>
              <div className="text-sm space-y-1">
                <p>• تخصيص ميزانية التدريب في الربع القادم</p>
                <p>• مراقبة تكاليف الرواتب عن كثب</p>
                <p>• تحديد احتياجات المصاريف الإدارية</p>
                <p>• مراجعة التوقعات للأشهر المتبقية</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded">
            <h4 className="font-semibold mb-2">التوقعات المالية</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p><span className="font-medium">المتوقع إنفاقه حتى نهاية المشروع:</span> {(defaultBudgetData.totalBudget * 0.95).toLocaleString()} ر.س</p>
                <p><span className="font-medium">التوفير المتوقع:</span> {(defaultBudgetData.totalBudget * 0.05).toLocaleString()} ر.س</p>
              </div>
              <div>
                <p><span className="font-medium">معدل الإنفاق الشهري:</span> {(defaultBudgetData.spentAmount / 5).toLocaleString()} ر.س</p>
                <p><span className="font-medium">الأشهر المتبقية:</span> 1.5 شهر</p>
              </div>
            </div>
          </div>

          <SignatureSection 
            preparedByLabel="محاسب المشروع"
            approvedByLabel="مدير المشروع"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectBudgetReport;