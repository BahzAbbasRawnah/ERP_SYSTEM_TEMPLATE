import { useTranslation } from 'react-i18next';
import OrganizationHeader from '../components/OrganizationHeader';
import ReportTitle from '../components/ReportTitle';
import TemplateTable from '../components/TemplateTable';
import SignatureSection from '../components/SignatureSection';
import TemplateFooter from '../components/TemplateFooter';

const DebitNoteVoucher = ({ 
  organizationData = {},
  voucherData = {},
  items = []
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const defaultVoucherData = {
    debitNoteNo: 'DN001',
    date: new Date().toISOString().split('T')[0],
    supplierName: 'XYZ Suppliers Ltd.',
    reason: 'Additional charges for express delivery',
    originalInvoice: 'PINV001',
    ...voucherData
  };

  const defaultItems = items.length > 0 ? items : [
    { 
      description: 'Express delivery charges', 
      quantity: 1, 
      unitPrice: 2000, 
      amount: 2000 
    },
    { 
      description: 'Additional handling charges', 
      quantity: 1, 
      unitPrice: 500, 
      amount: 500 
    }
  ];

  const columns = [
    { key: 'description', header: t('templates.common.description') },
    { 
      key: 'quantity', 
      header: t('templates.common.quantity'),
      align: 'center'
    },
    { 
      key: 'unitPrice', 
      header: t('templates.common.unitPrice'),
      align: 'right',
      render: (value) => value.toLocaleString()
    },
    { 
      key: 'amount', 
      header: t('templates.common.amount'),
      align: 'right',
      render: (value) => value.toLocaleString()
    }
  ];

  const totalAmount = defaultItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="print-wrapper">
      <div className={`template-print-container max-w-4xl mx-auto bg-white ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="template-header">
          <OrganizationHeader {...organizationData} />
        </div>
        
        <div className="report-title-section">
          <ReportTitle 
            title={t('templates.accounts.debitNoteVoucher.title')}
            titleAr="سند مدين"
            rightSection={{
              title: "Supplier:",
              data: {
                [defaultVoucherData.supplierName]: "",
                ["Original Invoice"]: defaultVoucherData.originalInvoice,
                ["Reason"]: defaultVoucherData.reason
              }
            }}
            leftSection={{
              title: "Debit Note Details:",
              data: {
                [t('templates.accounts.debitNoteVoucher.debitNoteNo')]: defaultVoucherData.debitNoteNo,
                [t('templates.common.date')]: defaultVoucherData.date
              }
            }}
          />
        </div>
        
        <div className="template-body">



      <TemplateTable columns={columns} data={defaultItems} showTotal={true} totalAmount={totalAmount} />

      <div className={`mt-6 p-4 bg-blue-50 border border-blue-200 rounded ${isRTL ? 'text-right' : 'text-left'}`}>
        <p className="text-sm font-medium text-blue-800">
          Debit Amount: <span className="text-lg font-bold">{totalAmount.toLocaleString()}</span>
        </p>
        <p className="text-xs text-blue-600 mt-1">
          This amount will be debited from your account or added to future invoices.
        </p>
      </div>

      <TemplateFooter 
        notes="This debit note is issued for additional charges as per agreed terms."
        terms="Debit note amount is payable within 30 days from the date of issue."
      />

      <SignatureSection />
        </div>
      </div>
    </div>
  );
};

export default DebitNoteVoucher;