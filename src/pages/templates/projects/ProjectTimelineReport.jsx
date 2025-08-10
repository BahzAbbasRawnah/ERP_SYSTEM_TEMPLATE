import { useTranslation } from 'react-i18next';
import OrganizationHeader from '../components/OrganizationHeader';
import ReportTitle from '../components/ReportTitle';
import TemplateTable from '../components/TemplateTable';
import SignatureSection from '../components/SignatureSection';

const ProjectTimelineReport = ({ organizationData = {}, timelineData = {} }) => {
  const { t } = useTranslation();

  const defaultTimelineData = {
    projectId: 'PRJ-2024-001',
    projectName: 'تطوير نظام إدارة المحتوى',
    startDate: '2024-01-01',
    endDate: '2024-08-31',
    currentDate: '2024-05-15',
    totalDuration: 243,
    elapsedDays: 134,
    remainingDays: 109,
    ...timelineData
  };

  const phases = [
    { phase: 'التخطيط والتحليل', startDate: '2024-01-01', endDate: '2024-02-15', duration: 45, progress: 100, status: 'مكتمل', dependencies: '-' },
    { phase: 'التصميم والنمذجة', startDate: '2024-02-16', endDate: '2024-03-31', duration: 44, progress: 100, status: 'مكتمل', dependencies: 'التخطيط' },
    { phase: 'التطوير الأساسي', startDate: '2024-04-01', endDate: '2024-06-15', duration: 75, progress: 65, status: 'قيد التنفيذ', dependencies: 'التصميم' },
    { phase: 'الاختبار والمراجعة', startDate: '2024-06-16', endDate: '2024-07-31', duration: 45, progress: 0, status: 'معلق', dependencies: 'التطوير' },
    { phase: 'النشر والتسليم', startDate: '2024-08-01', endDate: '2024-08-31', duration: 31, progress: 0, status: 'معلق', dependencies: 'الاختبار' }
  ];

  const criticalPath = [
    { task: 'تحليل المتطلبات', startDate: '2024-01-01', endDate: '2024-01-20', duration: 20, responsible: 'محلل الأعمال', critical: true },
    { task: 'تصميم قاعدة البيانات', startDate: '2024-02-16', endDate: '2024-03-05', duration: 18, responsible: 'مهندس البيانات', critical: true },
    { task: 'تطوير الواجهة الخلفية', startDate: '2024-04-01', endDate: '2024-05-20', duration: 49, responsible: 'مطور خلفي', critical: true },
    { task: 'تطوير واجهة المستخدم', startDate: '2024-05-21', endDate: '2024-06-15', duration: 25, responsible: 'مطور واجهات', critical: true },
    { task: 'اختبار التكامل', startDate: '2024-06-16', endDate: '2024-07-15', duration: 29, responsible: 'مختبر جودة', critical: true },
    { task: 'النشر الإنتاجي', startDate: '2024-08-01', endDate: '2024-08-15', duration: 14, responsible: 'مهندس النشر', critical: true }
  ];

  const phaseColumns = [
    { key: 'phase', header: 'المرحلة' },
    { key: 'startDate', header: 'تاريخ البداية' },
    { key: 'endDate', header: 'تاريخ النهاية' },
    { key: 'duration', header: 'المدة (يوم)', align: 'center' },
    { key: 'progress', header: 'التقدم %', align: 'center' },
    { key: 'status', header: 'الحالة', align: 'center' },
    { key: 'dependencies', header: 'التبعيات' }
  ];

  const criticalColumns = [
    { key: 'task', header: 'المهمة الحرجة' },
    { key: 'startDate', header: 'تاريخ البداية' },
    { key: 'endDate', header: 'تاريخ النهاية' },
    { key: 'duration', header: 'المدة (يوم)', align: 'center' },
    { key: 'responsible', header: 'المسؤول' },
    { key: 'critical', header: 'حرجة', align: 'center', render: (value) => value ? '✓' : '-' }
  ];

  return (
    <div className="print-wrapper">
      <div className="template-print-container max-w-6xl mx-auto bg-white">
        <div className="template-header">
          <OrganizationHeader {...organizationData} />
        </div>
        
        <div className="report-title-section">
          <ReportTitle 
            title="Project Timeline Report"
            titleAr="تقرير الجدول الزمني للمشروع"
            rightSection={{
              title: "تفاصيل المشروع:",
              data: {
                ["اسم المشروع"]: defaultTimelineData.projectName,
                ["رقم المشروع"]: defaultTimelineData.projectId,
                ["تاريخ البداية"]: defaultTimelineData.startDate
              }
            }}
            leftSection={{
              title: "معلومات التوقيت:",
              data: {
                ["تاريخ النهاية"]: defaultTimelineData.endDate,
                ["المدة الإجمالية"]: `${defaultTimelineData.totalDuration} يوم`,
                ["الأيام المتبقية"]: `${defaultTimelineData.remainingDays} يوم`
              }
            }}
          />
        </div>
        
        <div className="template-body">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded">
              <div className="text-2xl font-bold text-blue-600">{defaultTimelineData.totalDuration}</div>
              <div className="text-sm text-gray-600">إجمالي الأيام</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded">
              <div className="text-2xl font-bold text-green-600">{defaultTimelineData.elapsedDays}</div>
              <div className="text-sm text-gray-600">الأيام المنقضية</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded">
              <div className="text-2xl font-bold text-orange-600">{defaultTimelineData.remainingDays}</div>
              <div className="text-sm text-gray-600">الأيام المتبقية</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded">
              <div className="text-2xl font-bold text-purple-600">{Math.round((defaultTimelineData.elapsedDays / defaultTimelineData.totalDuration) * 100)}%</div>
              <div className="text-sm text-gray-600">نسبة الوقت المنقضي</div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">مراحل المشروع</h3>
            <TemplateTable columns={phaseColumns} data={phases} showTotal={false} />
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">المسار الحرج (Critical Path)</h3>
            <TemplateTable columns={criticalColumns} data={criticalPath} showTotal={false} />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">مخطط جانت المبسط</h3>
            <div className="space-y-3">
              {phases.map((phase, index) => (
                <div key={index} className="border rounded p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-sm">{phase.phase}</span>
                    <span className="text-xs text-gray-600">{phase.startDate} - {phase.endDate}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className={`h-4 rounded-full ${
                        phase.status === 'مكتمل' ? 'bg-green-500' : 
                        phase.status === 'قيد التنفيذ' ? 'bg-blue-500' : 'bg-gray-400'
                      }`}
                      style={{ width: `${phase.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>{phase.status}</span>
                    <span>{phase.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-6">
            <div className="p-4 bg-red-50 rounded border border-red-300">
              <h4 className="font-semibold mb-2 text-red-800">المخاطر الزمنية</h4>
              <div className="text-sm space-y-1">
                <p>• تأخير محتمل في مرحلة التطوير</p>
                <p>• ضرورة تسريع مرحلة الاختبار</p>
                <p>• الحاجة لموارد إضافية</p>
                <p>• تحديات في التكامل</p>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded border border-green-300">
              <h4 className="font-semibold mb-2 text-green-800">الفرص المتاحة</h4>
              <div className="text-sm space-y-1">
                <p>• إمكانية التسليم المبكر لبعض المكونات</p>
                <p>• توفر فريق إضافي للاختبار</p>
                <p>• تحسينات في العمليات</p>
                <p>• أتمتة بعض المهام</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded border border-yellow-300">
            <h4 className="font-semibold mb-2">توصيات الجدولة</h4>
            <div className="text-sm space-y-1">
              <p>• مراجعة أسبوعية للجدول الزمني</p>
              <p>• تحديد المهام الحرجة والتركيز عليها</p>
              <p>• تخصيص موارد إضافية للمهام المتأخرة</p>
              <p>• تطبيق منهجية إدارة المخاطر الزمنية</p>
              <p>• التواصل المستمر مع أصحاب المصلحة</p>
            </div>
          </div>

          <SignatureSection 
            preparedByLabel="مدير المشروع"
            approvedByLabel="مدير البرامج"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectTimelineReport;