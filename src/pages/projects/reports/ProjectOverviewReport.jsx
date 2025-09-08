import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import SignatureSection from '../../../components/templates/SignatureSection';
import TemplateFooter from '../../../components/templates/TemplateFooter';

const ProjectOverviewReport = ({ organizationData = {}, projectData = {} }) => {

  const defaultProjectData = {
    projectId: 'PRJ-2024-001',
    projectName: 'نظام إدارة المشاريع المتقدم',
    projectManager: 'أحمد محمد علي',
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    budget: 500000,
    status: 'قيد التنفيذ',
    completion: 65,
    ...projectData
  };

  const teamMembers = [
    { name: 'سارة أحمد', role: 'مطور أول', department: 'تقنية المعلومات', allocation: '100%', status: 'نشط' },
    { name: 'محمد حسن', role: 'مصمم واجهات', department: 'التصميم', allocation: '80%', status: 'نشط' },
    { name: 'فاطمة علي', role: 'محلل أعمال', department: 'الأعمال', allocation: '60%', status: 'نشط' },
    { name: 'عبدالله خالد', role: 'مختبر جودة', department: 'ضمان الجودة', allocation: '50%', status: 'نشط' }
  ];

  const milestones = [
    { milestone: 'تحليل المتطلبات', plannedDate: '2024-02-15', actualDate: '2024-02-10', status: 'مكتمل', progress: 100 },
    { milestone: 'التصميم الأولي', plannedDate: '2024-03-15', actualDate: '2024-03-20', status: 'مكتمل', progress: 100 },
    { milestone: 'التطوير الأساسي', plannedDate: '2024-05-01', actualDate: '-', status: 'قيد التنفيذ', progress: 75 },
    { milestone: 'الاختبار والتجريب', plannedDate: '2024-06-01', actualDate: '-', status: 'معلق', progress: 0 },
    { milestone: 'النشر والتسليم', plannedDate: '2024-06-30', actualDate: '-', status: 'معلق', progress: 0 }
  ];

  const teamColumns = [
    { key: 'name', header: 'اسم العضو' },
    { key: 'role', header: 'الدور' },
    { key: 'department', header: 'القسم' },
    { key: 'allocation', header: 'نسبة التخصيص', align: 'center' },
    { key: 'status', header: 'الحالة', align: 'center' }
  ];

  const milestoneColumns = [
    { key: 'milestone', header: 'المعلم الرئيسي' },
    { key: 'plannedDate', header: 'التاريخ المخطط' },
    { key: 'actualDate', header: 'التاريخ الفعلي' },
    { key: 'status', header: 'الحالة', align: 'center' },
    { key: 'progress', header: 'التقدم %', align: 'center' }
  ];

  return (
    <div className="template">
      <div className="template-container">
        <TemplateHeader {...organizationData} />
        
        <TemplateTitle 
          title="Project Overview Report"
          titleAr="تقرير نظرة عامة على المشروع"
          rightSection={{
            title: "تفاصيل المشروع:",
            data: {
              ["اسم المشروع"]: defaultProjectData.projectName,
              ["مدير المشروع"]: defaultProjectData.projectManager,
              ["رقم المشروع"]: defaultProjectData.projectId
            }
          }}
          leftSection={{
            title: "معلومات التقرير:",
            data: {
              ["تاريخ البداية"]: defaultProjectData.startDate,
              ["تاريخ النهاية"]: defaultProjectData.endDate,
              ["تاريخ التقرير"]: new Date().toISOString().split('T')[0]
            }
          }}
        />
        
        <div className="report-section">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded">
              <div className="text-2xl font-bold text-blue-600">{defaultProjectData.budget.toLocaleString()}</div>
              <div className="text-sm text-gray-600">الميزانية الإجمالية (ر.س)</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded">
              <div className="text-2xl font-bold text-green-600">{defaultProjectData.completion}%</div>
              <div className="text-sm text-gray-600">نسبة الإنجاز</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded">
              <div className="text-2xl font-bold text-purple-600">{teamMembers.length}</div>
              <div className="text-sm text-gray-600">أعضاء الفريق</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded">
              <div className="text-2xl font-bold text-orange-600">{milestones.length}</div>
              <div className="text-sm text-gray-600">المعالم الرئيسية</div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">فريق المشروع</h3>
            <TemplateBody columns={teamColumns} data={teamMembers} showTotal={false} />
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">المعالم الرئيسية</h3>
            <TemplateBody columns={milestoneColumns} data={milestones} showTotal={false} />
          </div>

          <div className="grid grid-cols-2 gap-8 mb-6">
            <div className="p-4 bg-blue-50 rounded">
              <h4 className="font-semibold mb-2">ملخص المشروع</h4>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">الحالة:</span> {defaultProjectData.status}</p>
                <p><span className="font-medium">المدة:</span> 5.5 شهر</p>
                <p><span className="font-medium">الميزانية المستخدمة:</span> {(defaultProjectData.budget * 0.6).toLocaleString()} ر.س</p>
                <p><span className="font-medium">الميزانية المتبقية:</span> {(defaultProjectData.budget * 0.4).toLocaleString()} ر.س</p>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded">
              <h4 className="font-semibold mb-2">المخاطر والتحديات</h4>
              <div className="text-sm space-y-1">
                <p>• تأخير في تسليم بعض المتطلبات</p>
                <p>• الحاجة لموارد إضافية في مرحلة الاختبار</p>
                <p>• تغييرات في متطلبات العميل</p>
                <p>• ضرورة التدريب على التقنيات الجديدة</p>
              </div>
            </div>
          </div>

          <div className="signature-section">
            <div className="signature-line">
              <span>مدير المشروع</span>
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

export default ProjectOverviewReport;
