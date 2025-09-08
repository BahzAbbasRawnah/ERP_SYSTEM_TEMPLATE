import React from 'react';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import TemplateFooter from '../../../components/templates/TemplateFooter';
import SignatureSection from '../../../components/templates/SignatureSection';

const RegionalSales = () => {
  return (
    <div className="p-6">
      <TemplateHeader />
      <TemplateTitle title="المبيعات حسب المنطقة" titleEn="Regional Sales Report" />
      <TemplateBody>
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">تقرير المبيعات حسب المنطقة</h2>
            <p className="text-gray-600">توزيع المبيعات على المناطق الجغرافية المختلفة</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-right border-b">المنطقة</th>
                  <th className="px-4 py-2 text-right border-b">إجمالي المبيعات</th>
                  <th className="px-4 py-2 text-right border-b">عدد الطلبات</th>
                  <th className="px-4 py-2 text-right border-b">متوسط الطلب</th>
                  <th className="px-4 py-2 text-right border-b">النسبة من الإجمالي</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b">الرياض</td>
                  <td className="px-4 py-2 border-b">95,000 ر.س</td>
                  <td className="px-4 py-2 border-b">380</td>
                  <td className="px-4 py-2 border-b">250 ر.س</td>
                  <td className="px-4 py-2 border-b">38%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">جدة</td>
                  <td className="px-4 py-2 border-b">75,000 ر.س</td>
                  <td className="px-4 py-2 border-b">300</td>
                  <td className="px-4 py-2 border-b">250 ر.س</td>
                  <td className="px-4 py-2 border-b">30%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">الدمام</td>
                  <td className="px-4 py-2 border-b">45,000 ر.س</td>
                  <td className="px-4 py-2 border-b">180</td>
                  <td className="px-4 py-2 border-b">250 ر.س</td>
                  <td className="px-4 py-2 border-b">18%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">المدينة المنورة</td>
                  <td className="px-4 py-2 border-b">35,000 ر.س</td>
                  <td className="px-4 py-2 border-b">140</td>
                  <td className="px-4 py-2 border-b">250 ر.س</td>
                  <td className="px-4 py-2 border-b">14%</td>
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

export default RegionalSales;