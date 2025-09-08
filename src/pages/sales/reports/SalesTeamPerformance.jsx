import React from 'react';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import TemplateFooter from '../../../components/templates/TemplateFooter';
import SignatureSection from '../../../components/templates/SignatureSection';

const SalesTeamPerformance = () => {
  return (
    <div className="p-6">
      <TemplateHeader />
      <TemplateTitle title="أداء فريق المبيعات" titleEn="Sales Team Performance Report" />
      <TemplateBody>
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">تقرير أداء فريق المبيعات</h2>
            <p className="text-gray-600">تقييم أداء موظفي المبيعات وتحقيق الأهداف</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-right border-b">اسم الموظف</th>
                  <th className="px-4 py-2 text-right border-b">الهدف الشهري</th>
                  <th className="px-4 py-2 text-right border-b">المبيعات المحققة</th>
                  <th className="px-4 py-2 text-right border-b">نسبة التحقيق</th>
                  <th className="px-4 py-2 text-right border-b">عدد العملاء</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b">أحمد محمد</td>
                  <td className="px-4 py-2 border-b">50,000 ر.س</td>
                  <td className="px-4 py-2 border-b">62,000 ر.س</td>
                  <td className="px-4 py-2 border-b text-green-600">124%</td>
                  <td className="px-4 py-2 border-b">35</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">فاطمة علي</td>
                  <td className="px-4 py-2 border-b">45,000 ر.س</td>
                  <td className="px-4 py-2 border-b">48,500 ر.س</td>
                  <td className="px-4 py-2 border-b text-green-600">108%</td>
                  <td className="px-4 py-2 border-b">28</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">خالد السعد</td>
                  <td className="px-4 py-2 border-b">40,000 ر.س</td>
                  <td className="px-4 py-2 border-b">35,000 ر.س</td>
                  <td className="px-4 py-2 border-b text-red-600">88%</td>
                  <td className="px-4 py-2 border-b">22</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </TemplateBody>
      <SignatureSection />
      <TemplateFooter />
    </div>
  );
};

export default SalesTeamPerformance;