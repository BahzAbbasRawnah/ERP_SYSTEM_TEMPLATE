import { useTranslation } from 'react-i18next';

const SignatureSection = ({ 
  showPreparedBy = true, 
  showApprovedBy = true, 
  showReceivedBy = false,
  preparedByLabel,
  approvedByLabel,
  receivedByLabel
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const signatures = [];
  
  if (showPreparedBy) {
    signatures.push({
      label: preparedByLabel || t('templates.common.preparedBy'),
      key: 'prepared'
    });
  }
  
  if (showApprovedBy) {
    signatures.push({
      label: approvedByLabel || t('templates.common.approvedBy'),
      key: 'approved'
    });
  }
  
  if (showReceivedBy) {
    signatures.push({
      label: receivedByLabel || t('templates.common.receivedBy'),
      key: 'received'
    });
  }

  return (
    <div className="signature-section">
      <div className={`grid grid-cols-${signatures.length} gap-8`}>
        {signatures.map((signature) => (
          <div key={signature.key} className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="signature-line"></div>
            <p className="text-sm font-medium text-gray-700">{signature.label}</p>
            <p className="text-xs text-gray-500 mt-1">{t('templates.common.signature')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignatureSection;