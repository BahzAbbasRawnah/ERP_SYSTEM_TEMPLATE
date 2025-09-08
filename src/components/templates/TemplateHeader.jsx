const TemplateHeader = ({ 
  organizationName = "Your Company Name",
  organizationNameAr = "اسم شركتك",
  logo = null,
  address = "123 Business Street, City, Country",
  addressAr = "123 شارع الأعمال، المدينة، البلد",
  phone = "+1 234 567 8900",
  email = "info@company.com",
  website = "www.company.com",
  taxId = "TAX123456789",
  ...additionalDetails 
}) => {

  return (
<div className="report-section rounded-t-lg">
      <div className="grid grid-cols-3 items-start gap-6">
        {/* Arabic Info - Start */}
        <div className="text-start">
          <h1 className="text-xl font-bold text-gray-900 mb-2">{organizationNameAr}</h1>
          <div className="text-sm text-gray-600 space-y-1">
            <p>{addressAr}</p>
            <p>{phone} :الهاتف</p>
            <p>{email} :البريد الإلكتروني</p>
            <p>{website} :الموقع الإلكتروني</p>
            <p>{taxId} :الرقم الضريبي</p>
          </div>
        </div>

        {/* Logo - Center */}
        <div className="flex justify-center">
          {logo ? (
            <img src={logo} alt="Logo" className="h-20 w-auto" />
          ) : (
            <div className="h-20 w-20 bg-primary-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-building text-primary-500 text-2xl" />
            </div>
          )}
        </div>

        {/* English Info - End */}
        <div className="text-end">
          <h1 className="text-xl font-bold text-gray-900 mb-2">{organizationName}</h1>
          <div className="text-sm text-gray-600 space-y-1">
            <p>{address}</p>
            <p>Phone: {phone}</p>
            <p>Email: {email}</p>
            <p>Website: {website}</p>
            <p>Tax ID: {taxId}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateHeader;
