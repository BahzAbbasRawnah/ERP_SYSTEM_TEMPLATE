import { useTranslation } from 'react-i18next';

const TemplateFooter = ({ notes, terms, showNotes = true, showTerms = true }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  if (!showNotes && !showTerms) return null;

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      {showNotes && notes && (
        <div className={`mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            {t('templates.common.notes')}
          </h4>
          <p className="text-sm text-gray-600">{notes}</p>
        </div>
      )}
      
      {showTerms && terms && (
        <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            {t('templates.common.terms')}
          </h4>
          <p className="text-sm text-gray-600">{terms}</p>
        </div>
      )}
    </div>
  );
};

export default TemplateFooter;