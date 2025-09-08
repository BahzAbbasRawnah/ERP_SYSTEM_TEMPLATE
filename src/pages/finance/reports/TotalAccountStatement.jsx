import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import TemplateFooter from '../../../components/templates/TemplateFooter';
import SignatureSection from '../../../components/templates/SignatureSection';

import '../../../components/templates/templates.css';

const TotalAccountStatement = ({ 
  organizationData = {},
  accountData = {},
  transactions = [],
  period = { from: '2024-01-01', to: '2024-12-31' }
}) => {

  // Arabic sample data
  const defaultOrganizationData = {
    companyName: 'شركة الأمل للتجارة المحدودة',
    companyNameEn: 'Al-Amal Trading Company Ltd',
    address: 'شارع الملك فهد، الرياض 12345، المملكة العربية السعودية',
    phone: '+966 11 123 4567',
    email: 'info@alamal-trading.com',
    taxNumber: 'ض.ب: 1234567890',
    ...organizationData
  };

  const defaultAccountData = {
    accountName: 'حساب النقدية',
    accountNameEn: 'Cash Account',
    accountCode: 'ACC001',
    openingBalance: 50000,
    closingBalance: 75000,
    ...accountData
  };

  const defaultTransactions = transactions.length > 0 ? transactions : [
    { date: '2024-01-15', description: 'إيصال مبيعات - فاتورة رقم 1001', descriptionEn: 'Sales Receipt - Invoice #1001', debit: 15000, credit: 0 },
    { date: '2024-01-20', description: 'إيجار المكتب - شهر يناير', descriptionEn: 'Office Rent - January', debit: 0, credit: 5000 },
    { date: '2024-02-10', description: 'مبيعات منتجات - عميل أحمد محمد', descriptionEn: 'Product Sales - Ahmed Mohammed', debit: 20000, credit: 0 },
    { date: '2024-02-15', description: 'فواتير الخدمات - كهرباء وماء', descriptionEn: 'Utility Bills - Electricity & Water', debit: 0, credit: 3000 },
    { date: '2024-03-05', description: 'مبيعات نقدية - متجر الفرع الرئيسي', descriptionEn: 'Cash Sales - Main Branch Store', debit: 12000, credit: 0 },
    { date: '2024-03-12', description: 'مصاريف صيانة - أجهزة الكمبيوتر', descriptionEn: 'Maintenance Expenses - Computer Equipment', debit: 0, credit: 2500 }
  ];

  const columns = [
    { key: 'date', header: 'التاريخ' },
    { key: 'description', header: 'البيان' },
    { 
      key: 'debit', 
      header: 'مدين',
      align: 'right',
      render: (value) => value > 0 ? `${value.toLocaleString()} ر.س` : '-'
    },
    { 
      key: 'credit', 
      header: 'دائن',
      align: 'right',
      render: (value) => value > 0 ? `${value.toLocaleString()} ر.س` : '-'
    }
  ];

  const totalDebit = defaultTransactions.reduce((sum, t) => sum + t.debit, 0);
  const totalCredit = defaultTransactions.reduce((sum, t) => sum + t.credit, 0);

  return (
    <div className="template">
      <div className="template-container">
        <TemplateHeader {...defaultOrganizationData} />
        
        <TemplateTitle 
          title="كشف الحساب الإجمالي"
          titleAr="كشف الحساب الإجمالي"
          rightSection={{
            title: "معلومات الحساب:",
            data: {
              ["اسم الحساب"]: defaultAccountData.accountName,
              ["رمز الحساب"]: defaultAccountData.accountCode,
              ["الرصيد الافتتاحي"]: `${defaultAccountData.openingBalance.toLocaleString()} ر.س`
            }
          }}
          leftSection={{
            title: "الفترة:",
            data: {
              ["من تاريخ"]: period.from,
              ["إلى تاريخ"]: period.to,
              ["الرصيد الختامي"]: `${defaultAccountData.closingBalance.toLocaleString()} ر.س`
            }
          }}
        />
        
        <div className="report-section">
          <TemplateBody columns={columns} data={defaultTransactions} />

          <div className="mt-6 pt-4 border-t border-gray-300">
            <div className="grid grid-cols-2 gap-8 text-sm font-semibold">
              <div className="text-right">
                <p>إجمالي المدين: {totalDebit.toLocaleString()} ر.س</p>
              </div>
              <div className="text-right">
                <p>إجمالي الدائن: {totalCredit.toLocaleString()} ر.س</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-lg font-bold">صافي الرصيد: {(totalDebit - totalCredit).toLocaleString()} ر.س</p>
              </div>
            </div>
          </div>

          <div className="signature-section mt-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="signature-line text-center">
                <div className="border-t border-gray-400 mt-16 pt-2">
                  <span>أعده</span>
                </div>
              </div>
              <div className="signature-line text-center">
                <div className="border-t border-gray-400 mt-16 pt-2">
                  <span>اعتمده</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalAccountStatement;
