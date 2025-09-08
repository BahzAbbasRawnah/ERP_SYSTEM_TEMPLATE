import React from 'react';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import TemplateFooter from '../../../components/templates/TemplateFooter';
import SignatureSection from '../../../components/templates/SignatureSection';

const SupplierPerformance = () => {
  return (
    <div className="p-6">
      <TemplateHeader />
      <TemplateTitle title="أداء الموردين" titleEn="Supplier Performance Report" />
      <TemplateBody>
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">تقرير أداء الموردين</h2>
            <p className="text-gray-600">تقييم أداء الموردين من حيث الجودة والتسليم</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-right border-b">اسم المورد</th>
                  <th className="px-4 py-2 text-right border-b">إجمالي الطلبات</th>
                  <th className="px-4 py-2 text-right border-b">التسليم في الوقت</th>
                  <th className="px-4 py-2 text-right border-b">تقييم الجودة</th>
                  <th className="px-4 py-2 text-right border-b">التقييم العام</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b">شركة الإمداد المتقدم</td>
                  <td className="px-4 py-2 border-b">25</td>
                  <td className="px-4 py-2 border-b text-green-600">96%</td>
                  <td className="px-4 py-2 border-b text-green-600">ممتاز</td>
                  <td className="px-4 py-2 border-b text-green-600">A+</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">مؤسسة التوريد الشامل</td>
                  <td className="px-4 py-2 border-b">18</td>
                  <td className="px-4 py-2 border-b text-yellow-600">85%</td>
                  <td className="px-4 py-2 border-b text-green-600">جيد جداً</td>
                  <td className="px-4 py-2 border-b text-green-600">B+</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">شركة المواد الأساسية</td>
                  <td className="px-4 py-2 border-b">12</td>
                  <td className="px-4 py-2 border-b text-red-600">72%</td>
                  <td className="px-4 py-2 border-b text-yellow-600">جيد</td>
                  <td className="px-4 py-2 border-b text-yellow-600">C+</td>
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

export default SupplierPerformance;