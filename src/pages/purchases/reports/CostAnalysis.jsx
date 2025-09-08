import React from 'react';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import TemplateFooter from '../../../components/templates/TemplateFooter';
import SignatureSection from '../../../components/templates/SignatureSection';

const CostAnalysis = () => {
  return (
    <div className="p-6">
      <TemplateHeader />
      <TemplateTitle title="تحليل التكاليف" titleEn="Cost Analysis Report" />
      <TemplateBody>
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">تقرير تحليل التكاليف</h2>
            <p className="text-gray-600">تحليل تفصيلي لتكاليف المشتريات وفرص التوفير</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800">إجمالي التكاليف</h3>
              <p className="text-2xl font-bold text-red-600">180,000 ر.س</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">التوفير المحقق</h3>
              <p className="text-2xl font-bold text-green-600">25,000 ر.س</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-right border-b">فئة التكلفة</th>
                  <th className="px-4 py-2 text-right border-b">التكلفة الحالية</th>
                  <th className="px-4 py-2 text-right border-b">التكلفة السابقة</th>
                  <th className="px-4 py-2 text-right border-b">التغيير</th>
                  <th className="px-4 py-2 text-right border-b">النسبة %</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b">مواد خام</td>
                  <td className="px-4 py-2 border-b">75,000 ر.س</td>
                  <td className="px-4 py-2 border-b">85,000 ر.س</td>
                  <td className="px-4 py-2 border-b text-green-600">-10,000 ر.س</td>
                  <td className="px-4 py-2 border-b text-green-600">-12%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">معدات</td>
                  <td className="px-4 py-2 border-b">45,000 ر.س</td>
                  <td className="px-4 py-2 border-b">40,000 ر.س</td>
                  <td className="px-4 py-2 border-b text-red-600">+5,000 ر.س</td>
                  <td className="px-4 py-2 border-b text-red-600">+13%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">خدمات</td>
                  <td className="px-4 py-2 border-b">60,000 ر.س</td>
                  <td className="px-4 py-2 border-b">80,000 ر.س</td>
                  <td className="px-4 py-2 border-b text-green-600">-20,000 ر.س</td>
                  <td className="px-4 py-2 border-b text-green-600">-25%</td>
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

export default CostAnalysis;