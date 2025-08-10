import { useTranslation } from 'react-i18next';
import OrganizationHeader from '../components/OrganizationHeader';
import ReportTitle from '../components/ReportTitle';
import TemplateTable from '../components/TemplateTable';
import SignatureSection from '../components/SignatureSection';

const TotalAccountStatement = ({ 
  organizationData = {},
  accountData = {},
  transactions = [],
  period = { from: '2024-01-01', to: '2024-12-31' }
}) => {
  const { t } = useTranslation();

  // Sample data
  const defaultAccountData = {
    accountName: 'Cash Account',
    accountCode: 'ACC001',
    openingBalance: 50000,
    closingBalance: 75000,
    ...accountData
  };

  const defaultTransactions = transactions.length > 0 ? transactions : [
    { date: '2024-01-15', description: 'Sales Receipt', debit: 15000, credit: 0 },
    { date: '2024-01-20', description: 'Office Rent', debit: 0, credit: 5000 },
    { date: '2024-02-10', description: 'Product Sales', debit: 20000, credit: 0 },
    { date: '2024-02-15', description: 'Utility Bills', debit: 0, credit: 3000 }
  ];

  const columns = [
    { key: 'date', header: t('templates.common.date') },
    { key: 'description', header: t('templates.common.description') },
    { 
      key: 'debit', 
      header: t('templates.accounts.totalAccountStatement.debit'),
      align: 'right',
      render: (value) => value > 0 ? value.toLocaleString() : '-'
    },
    { 
      key: 'credit', 
      header: t('templates.accounts.totalAccountStatement.credit'),
      align: 'right',
      render: (value) => value > 0 ? value.toLocaleString() : '-'
    }
  ];

  const totalDebit = defaultTransactions.reduce((sum, t) => sum + t.debit, 0);
  const totalCredit = defaultTransactions.reduce((sum, t) => sum + t.credit, 0);

  return (
    <div className="print-wrapper">
      <div className="template-print-container max-w-4xl mx-auto bg-white">
        <div className="template-header">
          <OrganizationHeader {...organizationData} />
        </div>
        
        <div className="report-title-section">
          <ReportTitle 
            title={t('templates.accounts.totalAccountStatement.title')}
            titleAr="كشف الحساب الإجمالي"
            rightSection={{
              title: "Account Info:",
              data: {
                [defaultAccountData.accountName]: "",
                ["Account Code"]: defaultAccountData.accountCode,
                ["Opening Balance"]: defaultAccountData.openingBalance.toLocaleString()
              }
            }}
            leftSection={{
              title: "Period:",
              data: {
                ["From"]: period.from,
                ["To"]: period.to,
                ["Closing Balance"]: defaultAccountData.closingBalance.toLocaleString()
              }
            }}
          />
        </div>
        
        <div className="template-body">



      <TemplateTable columns={columns} data={defaultTransactions} />

      <div className="mt-6 pt-4 border-t border-gray-300">
        <div className={`grid grid-cols-2 gap-8 text-sm font-semibold ${isRTL ? 'text-right' : 'text-left'}`}>
          <div>
            <p>Total {t('templates.accounts.totalAccountStatement.debit')}: {totalDebit.toLocaleString()}</p>
          </div>
          <div>
            <p>Total {t('templates.accounts.totalAccountStatement.credit')}: {totalCredit.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <SignatureSection />
        </div>
      </div>
    </div>
  );
};

export default TotalAccountStatement;