import { useTranslation } from 'react-i18next';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import TemplateFooter from '../../../components/templates/TemplateFooter';
import SignatureSection from '../../../components/templates/SignatureSection';

import '../../../components/templates/templates.css';

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
    <div className="template">
      <div className="template-container">
        <TemplateHeader {...organizationData} />
        
        <TemplateTitle 
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
        
        <div className="report-section">



      <TemplateBody columns={columns} data={defaultItems} showTotal={true} totalAmount={totalAmount} />

      <div className={`mt-6 p-4 bg-gray-50 rounded`}>
        <p className="text-sm font-medium">
          Amount in words: <span className="font-normal">Fifteen Thousand Five Hundred Only</span>
        </p>
      </div>

      <TemplateFooter 
        notes="Payment received in full settlement of outstanding dues."
        terms="This receipt is valid only when the payment is realized."
      />

      <div className="signature-section">
        <div className="signature-line">
          <span>{t('templates.common.preparedBy')}</span>
        </div>
        <div className="signature-line">
          <span>{t('templates.common.authorizedBy')}</span>
        </div>
        <div className="signature-line">
          <span>Received By</span>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptVoucher;
