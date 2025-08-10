import { useTranslation } from 'react-i18next';
import OrganizationHeader from '../components/OrganizationHeader';
import ReportTitle from '../components/ReportTitle';
import TemplateTable from '../components/TemplateTable';
import SignatureSection from '../components/SignatureSection';
import TemplateFooter from '../components/TemplateFooter';

const DisbursementVoucher = ({ 
  organizationData = {},
  voucherData = {},
  items = []
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const defaultVoucherData = {
    voucherNo: 'DV001',
    date: new Date().toISOString().split('T')[0],
    paidTo: 'XYZ Suppliers Ltd.',
    paymentMode: 'Bank Transfer',
    chequeNo: 'CHQ001234',
    bankName: 'ABC Bank',
    ...voucherData
  };

  const defaultItems = items.length > 0 ? items : [
    { accountHead: 'Office Rent', description: 'Monthly office rent payment', amount: 25000 },
    { accountHead: 'Utilities', description: 'Electricity and water bills', amount: 3500 }
  ];

  const columns = [
    { key: 'accountHead', header: t('templates.accounts.receiptVoucher.accountHead') },
    { key: 'description', header: t('templates.common.description') },
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
            title={t('templates.accounts.disbursementVoucher.title')}
            titleAr="سند صرف"
            rightSection={{
              title: "Paid To:",
              data: {
                [defaultVoucherData.paidTo]: "",
                ["Payment Mode"]: defaultVoucherData.paymentMode,
                ["Bank"]: defaultVoucherData.bankName
              }
            }}
            leftSection={{
              title: "Voucher Details:",
              data: {
                [t('templates.accounts.disbursementVoucher.voucherNo')]: defaultVoucherData.voucherNo,
                [t('templates.common.date')]: defaultVoucherData.date
              }
            }}
          />
        </div>
        
        <div className="template-body">



      <TemplateTable columns={columns} data={defaultItems} showTotal={true} totalAmount={totalAmount} />

      <div className={`mt-6 p-4 bg-gray-50 rounded ${isRTL ? 'text-right' : 'text-left'}`}>
        <p className="text-sm font-medium">
          Amount in words: <span className="font-normal">Twenty Eight Thousand Five Hundred Only</span>
        </p>
      </div>

      <TemplateFooter 
        notes="Payment made as per approved budget allocation."
        terms="All payments are subject to verification and approval."
      />

      <SignatureSection 
        preparedByLabel={t('templates.common.preparedBy')}
        approvedByLabel={t('templates.common.authorizedBy')}
      />
        </div>
      </div>
    </div>
  );
};

export default DisbursementVoucher;