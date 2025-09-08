import React from 'react';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import TemplateFooter from '../../../components/templates/TemplateFooter';
import SignatureSection from '../../../components/templates/SignatureSection';

const SalesPerformance = () => {
  return (
    <div className="p-6">
      <TemplateHeader />
      <TemplateTitle title="تقرير أداء المبيعات" titleEn="Sales Performance Report" />
      <TemplateBody>
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">تحليل أداء المبيعات</h2>
            <p className="text-gray-600">تقرير شامل عن أداء المبيعات خلال الفترة المحددة</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">إجمالي المبيعات</h3>
              <p className="text-2xl font-bold text-blue-600">250,000 ر.س</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">عدد الطلبات</h3>
              <p className="text-2xl font-bold text-green-600">1,250</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800">متوسط قيمة الطلب</h3>
              <p className="text-2xl font-bold text-purple-600">200 ر.س</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-right border-b">الفترة</th>
                  <th className="px-4 py-2 text-right border-b">المبيعات</th>
                  <th className="px-4 py-2 text-right border-b">عدد الطلبات</th>
                  <th className="px-4 py-2 text-right border-b">النمو %</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b">يناير 2024</td>
                  <td className="px-4 py-2 border-b">85,000 ر.س</td>
                  <td className="px-4 py-2 border-b">425</td>
                  <td className="px-4 py-2 border-b text-green-600">+12%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">فبراير 2024</td>
                  <td className="px-4 py-2 border-b">92,000 ر.س</td>
                  <td className="px-4 py-2 border-b">460</td>
                  <td className="px-4 py-2 border-b text-green-600">+8%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">مارس 2024</td>
                  <td className="px-4 py-2 border-b">73,000 ر.س</td>
                  <td className="px-4 py-2 border-b">365</td>
                  <td className="px-4 py-2 border-b text-red-600">-20%</td>
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

export default SalesPerformance;