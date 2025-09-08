import { useTranslation } from 'react-i18next';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import TemplateFooter from '../../../components/templates/TemplateFooter';
import SignatureSection from '../../../components/templates/SignatureSection';

import '../../../components/templates/templates.css';

const DetailedAccountStatement = ({ 
  organizationData = {},
  accountData = {},
  transactions = [],
  period = { from: '2024-01-01', to: '2024-12-31' }
}) => {
  const { t } = useTranslation();

  const defaultAccountData = {
    accountName: 'Accounts Receivable',
    accountCode: 'ACC002',
    openingBalance: 25000,
    ...accountData
  };

  const defaultTransactions = transactions.length > 0 ? transactions : [
    { 
      date: '2024-01-15', 
      particulars: 'Invoice #INV001 - ABC Company', 
      voucherNo: 'V001',
      debit: 15000, 
      credit: 0,
      balance: 40000
    },
    { 
      date: '2024-01-20', 
      particulars: 'Payment received from ABC Company', 
      voucherNo: 'V002',
      debit: 0, 
      credit: 10000,
      balance: 30000
    },
    { 
      date: '2024-02-10', 
      particulars: 'Invoice #INV002 - XYZ Ltd', 
      voucherNo: 'V003',
      debit: 20000, 
      credit: 0,
      balance: 50000
    },
    { 
      date: '2024-02-15', 
      particulars: 'Payment received from XYZ Ltd', 
      voucherNo: 'V004',
      debit: 0, 
      credit: 15000,
      balance: 35000
    }
  ];

  const columns = [
    { key: 'date', header: t('templates.accounts.detailedAccountStatement.transactionDate') },
    { key: 'particulars', header: t('templates.accounts.detailedAccountStatement.particulars') },
    { key: 'voucherNo', header: t('templates.accounts.detailedAccountStatement.voucherNo'), align: 'center' },
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
    },
    { 
      key: 'balance', 
      header: t('templates.accounts.detailedAccountStatement.balance'),
      align: 'right',
      render: (value) => value.toLocaleString()
    }
  ];

  return (
    <div className="template">
      <div className="template-container">
        <TemplateHeader {...organizationData} />
        
        <TemplateTitle 
          title={t('templates.accounts.detailedAccountStatement.title')}
          titleAr="كشف الحساب التفصيلي"
          rightSection={{
            title: "Account Info:",
            data: {
              [defaultAccountData.accountName]: "",
              ["Account Code"]: defaultAccountData.accountCode
            }
          }}
          leftSection={{
            title: "Period:",
            data: {
              ["From"]: period.from,
              ["To"]: period.to,
              ["Opening Balance"]: defaultAccountData.openingBalance.toLocaleString()
            }
          }}
        />
        
        <div className="report-section">



      <TemplateBody columns={columns} data={defaultTransactions} />

      <div className="signature-section">
        <div className="signature-line">
          <span>Prepared By</span>
        </div>
        <div className="signature-line">
          <span>Approved By</span>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedAccountStatement;
