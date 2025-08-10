import { useTranslation } from 'react-i18next';

const ReportTitle = ({ 
  title,
  titleAr,
  leftSection = {},
  centerSection = {},
  rightSection = {}
}) => {
  const { t } = useTranslation();

  return (
    <div className="border border-1 border-gray-200 p-4 mb-2">
      <div className="grid grid-cols-3 items-start gap-6">
        {/* Start Section (Customer/Bill To) */}
        <div className="text-start">
          {rightSection.title && (
            <h4 className="font-bold text-gray-900 mb-2">{rightSection.title}</h4>
          )}
          {Object.entries(rightSection.data || {}).map(([key, value]) => (
            <p key={key} className="text-sm mb-1">
              <span className="font-medium">{key}:</span> {value}
            </p>
          ))}
        </div>

        {/* Center Section (Report Title) */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-1">{title}</h2>
          {titleAr && (
            <h3 className="text-lg font-semibold text-gray-700">{titleAr}</h3>
          )}
          {centerSection.subtitle && (
            <p className="text-sm text-gray-600 mt-2">{centerSection.subtitle}</p>
          )}
        </div>

        {/* End Section (Invoice Info) */}
        <div className="text-start">
          {leftSection.title && (
            <h4 className="font-bold text-gray-900 mb-2">{leftSection.title}</h4>
          )}
          {Object.entries(leftSection.data || {}).map(([key, value]) => (
            <p key={key} className="text-sm mb-1">
              <span className="font-medium">{key}:</span> {value}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportTitle;