import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import SignatureSection from '../../../components/templates/SignatureSection';
import TemplateFooter from '../../../components/templates/TemplateFooter';

const ProjectStatusReport = ({ organizationData = {}, statusData = {} }) => {

  const defaultStatusData = {
    projectId: 'PRJ-2024-001',
    projectName: 'تطوير منصة التجارة الإلكترونية',
    reportPeriod: 'الأسبوع الثالث - مارس 2024',
    overallStatus: 'أخضر',
    completion: 68,
    ...statusData
  };

  const taskStatus = [
    { task: 'تصميم قاعدة البيانات', assignee: 'محمد أحمد', plannedProgress: 100, actualProgress: 100, status: 'مكتمل', issues: 'لا يوجد' },
    { task: 'تطوير واجهة المستخدم', assignee: 'سارة علي', plannedProgress: 80, actualProgress: 75, status: 'قيد التنفيذ', issues: 'تأخير بسيط' },
    { task: 'تطوير API الخلفي', assignee: 'أحمد خالد', plannedProgress: 70, actualProgress: 85, status: 'متقدم', issues: 'لا يوجد' },
    { task: 'اختبار الوحدة', assignee: 'فاطمة حسن', plannedProgress: 50, actualProgress: 30, status: 'متأخر', issues: 'نقص في الموارد' },
    { task: 'التوثيق التقني', assignee: 'عبدالله محمد', plannedProgress: 40, actualProgress: 45, status: 'متقدم', issues: 'لا يوجد' }
  ];

  const weeklyProgress = [
    { week: 'الأسبوع 1', planned: 15, actual: 12, variance: -3, notes: 'بداية بطيئة' },
    { week: 'الأسبوع 2', planned: 25, actual: 28, variance: 3, notes: 'تسارع في العمل' },
    { week: 'الأسبوع 3', planned: 35, actual: 32, variance: -3, notes: 'تحديات تقنية' },
    { week: 'الأسبوع 4', planned: 45, actual: 48, variance: 3, notes: 'تجاوز التوقعات' }
  ];

  const taskColumns = [
    { key: 'task', header: 'المهمة' },
    { key: 'assignee', header: 'المسؤول' },
    { key: 'plannedProgress', header: 'التقدم المخطط %', align: 'center' },
    { key: 'actualProgress', header: 'التقدم الفعلي %', align: 'center' },
    { key: 'status', header: 'الحالة', align: 'center' },
    { key: 'issues', header: 'المشاكل' }
  ];

  const progressColumns = [
    { key: 'week', header: 'الأسبوع' },
    { key: 'planned', header: 'مخطط %', align: 'center' },
    { key: 'actual', header: 'فعلي %', align: 'center' },
    { key: 'variance', header: 'الانحراف %', align: 'center' },
    { key: 'notes', header: 'ملاحظات' }
  ];

  return (
    <div className="template">
      <div className="template-container">
        <TemplateHeader {...organizationData} />
        
        <TemplateTitle 
          title="Project Status Report"
          titleAr="تقرير حالة المشروع"
          rightSection={{
            title: "تفاصيل المشروع:",
            data: {
              ["اسم المشروع"]: defaultStatusData.projectName,
              ["رقم المشروع"]: defaultStatusData.projectId,
              ["فترة التقرير"]: defaultStatusData.reportPeriod
            }
          }}
          leftSection={{
            title: "حالة المشروع:",
            data: {
              ["الحالة العامة"]: defaultStatusData.overallStatus,
              ["نسبة الإنجاز"]: `${defaultStatusData.completion}%`,
              ["تاريخ التقرير"]: new Date().toISOString().split('T')[0]
            }
          }}
        />
        
        <div className="report-section">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded border border-green-300">
              <div className="text-2xl font-bold text-green-600">3</div>
              <div className="text-sm text-gray-600">مهام مكتملة</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded border border-yellow-300">
              <div className="text-2xl font-bold text-yellow-600">1</div>
              <div className="text-sm text-gray-600">مهام قيد التنفيذ</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded border border-red-300">
              <div className="text-2xl font-bold text-red-600">1</div>
              <div className="text-sm text-gray-600">مهام متأخرة</div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">حالة المهام</h3>
            <TemplateBody columns={taskColumns} data={taskStatus} showTotal={false} />
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">التقدم الأسبوعي</h3>
            <TemplateBody columns={progressColumns} data={weeklyProgress} showTotal={false} />
          </div>

          <div className="grid grid-cols-2 gap-8 mb-6">
            <div className="p-4 bg-blue-50 rounded">
              <h4 className="font-semibold mb-2">الإنجازات الرئيسية</h4>
              <div className="text-sm space-y-1">
                <p>• اكتمال تصميم قاعدة البيانات بنجاح</p>
                <p>• تطوير 75% من واجهة المستخدم</p>
                <p>• تجاوز التوقعات في تطوير API</p>
                <p>• بدء مرحلة الاختبارات الأولية</p>
              </div>
            </div>
            <div className="p-4 bg-red-50 rounded border border-red-300">
              <h4 className="font-semibold mb-2 text-red-800">المشاكل والمخاطر</h4>
              <div className="text-sm space-y-1">
                <p>• تأخير في اختبار الوحدة بسبب نقص الموارد</p>
                <p>• الحاجة لمراجعة بعض متطلبات العميل</p>
                <p>• ضرورة تحديث بعض التقنيات المستخدمة</p>
                <p>• تحدي في التكامل مع الأنظمة الخارجية</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded border border-yellow-300">
            <h4 className="font-semibold mb-2">الخطة للأسبوع القادم</h4>
            <div className="text-sm space-y-1">
              <p>• إكمال تطوير واجهة المستخدم</p>
              <p>• تسريع عملية اختبار الوحدة</p>
              <p>• بدء التكامل بين المكونات المختلفة</p>
              <p>• مراجعة التوثيق التقني وتحديثه</p>
              <p>• اجتماع مع العميل لمراجعة التقدم</p>
            </div>
          </div>

          <div className="signature-section">
            <div className="signature-line">
              <span>مدير المشروع</span>
            </div>
            <div className="signature-line">
              <span>مدير البرامج</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatusReport;