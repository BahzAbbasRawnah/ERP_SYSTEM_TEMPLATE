import { useTranslation } from 'react-i18next';
import OrganizationHeader from '../components/OrganizationHeader';
import ReportTitle from '../components/ReportTitle';
import TemplateTable from '../components/TemplateTable';
import SignatureSection from '../components/SignatureSection';

const ProjectClosureReport = ({ organizationData = {}, closureData = {} }) => {
  const { t } = useTranslation();

  const defaultClosureData = {
    projectId: 'PRJ-2024-001',
    projectName: 'نظام إدارة علاقات العملاء',
    actualStartDate: '2024-01-15',
    actualEndDate: '2024-07-30',
    plannedEndDate: '2024-08-15',
    finalBudget: 650000,
    actualCost: 625000,
    budgetVariance: 25000,
    ...closureData
  };

  const deliverables = [
    { deliverable: 'نظام إدارة العملاء الأساسي', status: 'مسلم', quality: 'ممتاز', clientApproval: 'موافق', notes: 'تم التسليم في الموعد المحدد' },
    { deliverable: 'لوحة تحكم التقارير', status: 'مسلم', quality: 'جيد جداً', clientApproval: 'موافق', notes: 'تحسينات طفيفة مطلوبة' },
    { deliverable: 'تطبيق الهاتف المحمول', status: 'مسلم', quality: 'ممتاز', clientApproval: 'موافق', notes: 'تجاوز التوقعات' },
    { deliverable: 'التوثيق التقني', status: 'مسلم', quality: 'جيد', clientApproval: 'موافق', notes: 'مكتمل حسب المواصفات' },
    { deliverable: 'دليل المستخدم', status: 'مسلم', quality: 'ممتاز', clientApproval: 'موافق', notes: 'شامل وواضح' },
    { deliverable: 'برنامج التدريب', status: 'مسلم', quality: 'جيد جداً', clientApproval: 'موافق', notes: 'تدريب 25 موظف' }
  ];

  const lessonsLearned = [
    { category: 'إدارة المشروع', lesson: 'أهمية التواصل المستمر مع العميل', impact: 'إيجابي', recommendation: 'تطبيق اجتماعات أسبوعية منتظمة' },
    { category: 'التقنية', lesson: 'استخدام أدوات التطوير الحديثة', impact: 'إيجابي', recommendation: 'الاستثمار في التدريب التقني' },
    { category: 'الفريق', lesson: 'تحدي العمل عن بُعد', impact: 'سلبي', recommendation: 'تحسين أدوات التعاون الرقمي' },
    { category: 'الجودة', lesson: 'أهمية الاختبار المبكر', impact: 'إيجابي', recommendation: 'تطبيق منهجية DevOps' }
  ];

  const finalMetrics = [
    { metric: 'رضا العميل', target: '90%', actual: '95%', variance: '+5%', status: 'متفوق' },
    { metric: 'الجودة التقنية', target: '85%', actual: '88%', variance: '+3%', status: 'متفوق' },
    { metric: 'الالتزام بالوقت', target: '100%', actual: '102%', variance: '+2%', status: 'متفوق' },
    { metric: 'الالتزام بالميزانية', target: '100%', actual: '96%', variance: '-4%', status: 'ممتاز' },
    { metric: 'إنتاجية الفريق', target: '80%', actual: '85%', variance: '+5%', status: 'متفوق' }
  ];

  const deliverablesColumns = [
    { key: 'deliverable', header: 'المخرج' },
    { key: 'status', header: 'الحالة', align: 'center' },
    { key: 'quality', header: 'الجودة', align: 'center' },
    { key: 'clientApproval', header: 'موافقة العميل', align: 'center' },
    { key: 'notes', header: 'ملاحظات' }
  ];

  const lessonsColumns = [
    { key: 'category', header: 'الفئة' },
    { key: 'lesson', header: 'الدرس المستفاد' },
    { key: 'impact', header: 'التأثير', align: 'center' },
    { key: 'recommendation', header: 'التوصية' }
  ];

  const metricsColumns = [
    { key: 'metric', header: 'المؤشر' },
    { key: 'target', header: 'المستهدف', align: 'center' },
    { key: 'actual', header: 'الفعلي', align: 'center' },
    { key: 'variance', header: 'الانحراف', align: 'center' },
    { key: 'status', header: 'التقييم', align: 'center' }
  ];

  return (
    <div className="print-wrapper">
      <div className="template-print-container max-w-6xl mx-auto bg-white">
        <div className="template-header">
          <OrganizationHeader {...organizationData} />
        </div>
        
        <div className="report-title-section">
          <ReportTitle 
            title="Project Closure Report"
            titleAr="تقرير إغلاق المشروع"
            rightSection={{
              title: "تفاصيل المشروع:",
              data: {
                ["اسم المشروع"]: defaultClosureData.projectName,
                ["رقم المشروع"]: defaultClosureData.projectId,
                ["تاريخ البداية الفعلي"]: defaultClosureData.actualStartDate
              }
            }}
            leftSection={{
              title: "معلومات الإغلاق:",
              data: {
                ["تاريخ الانتهاء الفعلي"]: defaultClosureData.actualEndDate,
                ["التكلفة الفعلية"]: `${defaultClosureData.actualCost.toLocaleString()} ر.س`,
                ["توفير في الميزانية"]: `${defaultClosureData.budgetVariance.toLocaleString()} ر.س`
              }
            }}
          />
        </div>
        
        <div className="template-body">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded border border-green-300">
              <div className="text-2xl font-bold text-green-600">100%</div>
              <div className="text-sm text-gray-600">نسبة الإنجاز</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded">
              <div className="text-2xl font-bold text-blue-600">6</div>
              <div className="text-sm text-gray-600">المخرجات المسلمة</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded">
              <div className="text-2xl font-bold text-purple-600">95%</div>
              <div className="text-sm text-gray-600">رضا العميل</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded">
              <div className="text-2xl font-bold text-orange-600">196</div>
              <div className="text-sm text-gray-600">أيام المشروع</div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">المخرجات النهائية</h3>
            <TemplateTable columns={deliverablesColumns} data={deliverables} showTotal={false} />
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">مؤشرات الأداء النهائية</h3>
            <TemplateTable columns={metricsColumns} data={finalMetrics} showTotal={false} />
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">الدروس المستفادة</h3>
            <TemplateTable columns={lessonsColumns} data={lessonsLearned} showTotal={false} />
          </div>

          <div className="grid grid-cols-2 gap-8 mb-6">
            <div className="p-4 bg-green-50 rounded border border-green-300">
              <h4 className="font-semibold mb-2 text-green-800">نجاحات المشروع</h4>
              <div className="text-sm space-y-1">
                <p>• تسليم جميع المخرجات في الوقت المحدد</p>
                <p>• تحقيق توفير في الميزانية بنسبة 4%</p>
                <p>• تجاوز توقعات العميل في الجودة</p>
                <p>• بناء فريق عمل متماسك ومتخصص</p>
                <p>• تطبيق أفضل الممارسات التقنية</p>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded">
              <h4 className="font-semibold mb-2">التحسينات المستقبلية</h4>
              <div className="text-sm space-y-1">
                <p>• تحسين عمليات التواصل الداخلي</p>
                <p>• الاستثمار في أدوات إدارة المشاريع</p>
                <p>• تطوير برامج التدريب التقني</p>
                <p>• تعزيز منهجيات ضمان الجودة</p>
                <p>• تطبيق أتمتة أكثر في العمليات</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded border border-yellow-300 mb-6">
            <h4 className="font-semibold mb-2">ملخص تقييم المشروع</h4>
            <div className="text-sm space-y-2">
              <p>تم إنجاز المشروع بنجاح تام مع تحقيق جميع الأهداف المحددة. حقق المشروع نتائج متفوقة في جميع المؤشرات الرئيسية وحصل على رضا عالي من العميل.</p>
              <p>يُعتبر هذا المشروع نموذجاً يُحتذى به في إدارة المشاريع التقنية ويوصى بتطبيق الممارسات المستخدمة في المشاريع المستقبلية.</p>
            </div>
          </div>

          <div className="p-4 border-2 border-gray-300 rounded">
            <h4 className="font-semibold mb-3">إقرار إغلاق المشروع</h4>
            <div className="text-sm space-y-2">
              <p>نقر بأن جميع مخرجات المشروع قد تم تسليمها وفقاً للمواصفات المتفق عليها، وأن العميل قد وافق على جميع المخرجات.</p>
              <div className="grid grid-cols-3 gap-8 mt-6">
                <div className="text-center">
                  <div className="border-b border-gray-400 h-16 mb-2"></div>
                  <p className="font-medium">مدير المشروع</p>
                  <p className="text-xs">التوقيع والتاريخ</p>
                </div>
                <div className="text-center">
                  <div className="border-b border-gray-400 h-16 mb-2"></div>
                  <p className="font-medium">العميل</p>
                  <p className="text-xs">التوقيع والتاريخ</p>
                </div>
                <div className="text-center">
                  <div className="border-b border-gray-400 h-16 mb-2"></div>
                  <p className="font-medium">مدير البرامج</p>
                  <p className="text-xs">التوقيع والتاريخ</p>
                </div>
              </div>
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

export default ProjectClosureReport;