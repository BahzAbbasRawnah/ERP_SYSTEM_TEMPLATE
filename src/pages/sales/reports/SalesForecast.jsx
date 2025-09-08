import React from 'react';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import TemplateFooter from '../../../components/templates/TemplateFooter';
import SignatureSection from '../../../components/templates/SignatureSection';

const SalesForecast = () => {
  return (
    <div className="p-6">
      <TemplateHeader />
      <TemplateTitle title="توقعات المبيعات" titleEn="Sales Forecast Report" />
      <TemplateBody>
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">تقرير توقعات المبيعات</h2>
            <p className="text-gray-600">توقعات المبيعات للأشهر القادمة بناءً على البيانات التاريخية</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">التوقع للشهر القادم</h3>
              <p className="text-2xl font-bold text-blue-600">285,000 ر.س</p>
              <p className="text-sm text-blue-600">نمو متوقع: +14%</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">التوقع للربع القادم</h3>
              <p className="text-2xl font-bold text-green-600">820,000 ر.س</p>
              <p className="text-sm text-green-600">نمو متوقع: +12%</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-right border-b">الشهر</th>
                  <th className="px-4 py-2 text-right border-b">المبيعات الفعلية</th>
                  <th className="px-4 py-2 text-right border-b">المبيعات المتوقعة</th>
                  <th className="px-4 py-2 text-right border-b">الانحراف</th>
                  <th className="px-4 py-2 text-right border-b">الثقة %</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b">أبريل 2024</td>
                  <td className="px-4 py-2 border-b">-</td>
                  <td className="px-4 py-2 border-b">285,000 ر.س</td>
                  <td className="px-4 py-2 border-b">±15,000</td>
                  <td className="px-4 py-2 border-b">85%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">مايو 2024</td>
                  <td className="px-4 py-2 border-b">-</td>
                  <td className="px-4 py-2 border-b">295,000 ر.س</td>
                  <td className="px-4 py-2 border-b">±18,000</td>
                  <td className="px-4 py-2 border-b">80%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">يونيو 2024</td>
                  <td className="px-4 py-2 border-b">-</td>
                  <td className="px-4 py-2 border-b">240,000 ر.س</td>
                  <td className="px-4 py-2 border-b">±20,000</td>
                  <td className="px-4 py-2 border-b">75%</td>
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

export default SalesForecast;