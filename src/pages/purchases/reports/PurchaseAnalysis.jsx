import React from 'react';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import TemplateFooter from '../../../components/templates/TemplateFooter';
import SignatureSection from '../../../components/templates/SignatureSection';

const PurchaseAnalysis = () => {
  return (
    <div className="p-6">
      <TemplateHeader />
      <TemplateTitle title="تحليل المشتريات" titleEn="Purchase Analysis Report" />
      <TemplateBody>
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">تقرير تحليل المشتريات</h2>
            <p className="text-gray-600">تحليل شامل لعمليات الشراء والتكاليف</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-800">إجمالي المشتريات</h3>
              <p className="text-2xl font-bold text-orange-600">180,000 ر.س</p>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg">
              <h3 className="font-semibold text-teal-800">عدد أوامر الشراء</h3>
              <p className="text-2xl font-bold text-teal-600">85</p>
            </div>
            <div className="bg-cyan-50 p-4 rounded-lg">
              <h3 className="font-semibold text-cyan-800">متوسط قيمة الأمر</h3>
              <p className="text-2xl font-bold text-cyan-600">2,118 ر.س</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-right border-b">الفئة</th>
                  <th className="px-4 py-2 text-right border-b">إجمالي المشتريات</th>
                  <th className="px-4 py-2 text-right border-b">عدد الأوامر</th>
                  <th className="px-4 py-2 text-right border-b">النسبة %</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b">مواد خام</td>
                  <td className="px-4 py-2 border-b">75,000 ر.س</td>
                  <td className="px-4 py-2 border-b">35</td>
                  <td className="px-4 py-2 border-b">42%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">معدات مكتبية</td>
                  <td className="px-4 py-2 border-b">45,000 ر.س</td>
                  <td className="px-4 py-2 border-b">25</td>
                  <td className="px-4 py-2 border-b">25%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">خدمات</td>
                  <td className="px-4 py-2 border-b">60,000 ر.س</td>
                  <td className="px-4 py-2 border-b">25</td>
                  <td className="px-4 py-2 border-b">33%</td>
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

export default PurchaseAnalysis;