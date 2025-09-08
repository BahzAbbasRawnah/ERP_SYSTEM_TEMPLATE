import React from 'react';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import TemplateFooter from '../../../components/templates/TemplateFooter';
import SignatureSection from '../../../components/templates/SignatureSection';

const ContractCompliance = () => {
  return (
    <div className="p-6">
      <TemplateHeader />
      <TemplateTitle title="الامتثال للعقود" titleEn="Contract Compliance Report" />
      <TemplateBody>
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">تقرير الامتثال للعقود</h2>
            <p className="text-gray-600">مراقبة مدى امتثال الموردين لشروط العقود</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-right border-b">المورد</th>
                  <th className="px-4 py-2 text-right border-b">رقم العقد</th>
                  <th className="px-4 py-2 text-right border-b">تاريخ البداية</th>
                  <th className="px-4 py-2 text-right border-b">تاريخ الانتهاء</th>
                  <th className="px-4 py-2 text-right border-b">نسبة الامتثال</th>
                  <th className="px-4 py-2 text-right border-b">الحالة</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b">شركة الإمداد المتقدم</td>
                  <td className="px-4 py-2 border-b">CT-2024-001</td>
                  <td className="px-4 py-2 border-b">2024/01/01</td>
                  <td className="px-4 py-2 border-b">2024/12/31</td>
                  <td className="px-4 py-2 border-b text-green-600">96%</td>
                  <td className="px-4 py-2 border-b"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">ممتاز</span></td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">مؤسسة التوريد الشامل</td>
                  <td className="px-4 py-2 border-b">CT-2024-002</td>
                  <td className="px-4 py-2 border-b">2024/02/01</td>
                  <td className="px-4 py-2 border-b">2025/01/31</td>
                  <td className="px-4 py-2 border-b text-yellow-600">85%</td>
                  <td className="px-4 py-2 border-b"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">جيد</span></td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">شركة المواد الأساسية</td>
                  <td className="px-4 py-2 border-b">CT-2024-003</td>
                  <td className="px-4 py-2 border-b">2024/03/01</td>
                  <td className="px-4 py-2 border-b">2024/08/31</td>
                  <td className="px-4 py-2 border-b text-red-600">72%</td>
                  <td className="px-4 py-2 border-b"><span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">يحتاج تحسين</span></td>
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

export default ContractCompliance;