import { useTranslation } from 'react-i18next';
import OrganizationHeader from '../components/OrganizationHeader';
import ReportTitle from '../components/ReportTitle';
import TemplateTable from '../components/TemplateTable';
import SignatureSection from '../components/SignatureSection';
import TemplateFooter from '../components/TemplateFooter';

const ReceiptVoucher = ({ 
  organizationData = {},
  voucherData = {},
  items = []
}) => {
  const { t } = useTranslation();

  const defaultVoucherData = {
    voucherNo: 'RV001',
    date: new Date().toISOString().split('T')[0],
    receivedFrom: 'ABC Company Ltd.',
    paymentMode: 'Cash',
    chequeNo: '',
    bankName: '',
    ...voucherData
  };

  const defaultItems = items.length > 0 ? items : [
    { accountHead: 'Sales Revenue', description: 'Payment for Invoice #INV001', amount: 15000 },
    { accountHead: 'Discount Allowed', description: 'Early payment discount', amount: 500 }
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
      <div className="template-print-container max-w-4xl mx-auto bg-white">
        <div className="template-header">
          <OrganizationHeader {...organizationData} />
        </div>
        
        <div className="report-title-section">
          <ReportTitle 
            title={t('templates.accounts.receiptVoucher.title')}
            titleAr="سند قبض"
            rightSection={{
              title: "Received From:",
              data: {
                [defaultVoucherData.receivedFrom]: "",
                ["Payment Mode"]: defaultVoucherData.paymentMode,
                ["Bank"]: defaultVoucherData.bankName
              }
            }}
            leftSection={{
              title: "Voucher Details:",
              data: {
                [t('templates.accounts.receiptVoucher.voucherNo')]: defaultVoucherData.voucherNo,
                [t('templates.common.date')]: defaultVoucherData.date
              }
            }}
          />
        </div>
        
        <div className="template-body">



      <TemplateTable columns={columns} data={defaultItems} showTotal={true} totalAmount={totalAmount} />

      <div className={`mt-6 p-4 bg-gray-50 rounded ${isRTL ? 'text-right' : 'text-left'}`}>
        <p className="text-sm font-medium">
          Amount in words: <span className="font-normal">Fifteen Thousand Five Hundred Only</span>
        </p>
      </div>

      <TemplateFooter 
        notes="Payment received in full settlement of outstanding dues."
        terms="This receipt is valid only when the payment is realized."
      />

      <SignatureSection 
        showReceivedBy={true}
        preparedByLabel={t('templates.common.preparedBy')}
        approvedByLabel={t('templates.common.authorizedBy')}
        receivedByLabel="Received By"
      />
        </div>
      </div>
    </div>
  );
};

export default ReceiptVoucher;