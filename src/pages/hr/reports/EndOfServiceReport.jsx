import { useTranslation } from 'react-i18next';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import SignatureSection from '../../../components/templates/SignatureSection';

const EndOfServiceReport = ({ organizationData = {}, employeeData = {} }) => {
  const { t } = useTranslation();

  const defaultEmployeeData = {
    employeeId: 'EMP001',
    employeeName: 'John Smith',
    position: 'Software Engineer',
    department: 'IT Department',
    hireDate: '2020-01-15',
    lastWorkingDay: '2024-01-31',
    resignationDate: '2024-01-01',
    reason: 'Career Growth',
    yearsOfService: 4,
    ...employeeData
  };

  const benefitsData = [
    { description: 'End of Service Gratuity', amount: 25000, remarks: 'Based on 4 years service' },
    { description: 'Unused Annual Leave', amount: 3500, remarks: '14 days @ $250/day' },
    { description: 'Notice Period Pay', amount: 6250, remarks: '1 month notice' },
    { description: 'Final Salary', amount: 6250, remarks: 'January 2024' }
  ];

  const deductionsData = [
    { description: 'Company Laptop', amount: 1200, remarks: 'Not returned' },
    { description: 'Advance Salary', amount: 2000, remarks: 'December advance' }
  ];

  const benefitsColumns = [
    { key: 'description', header: 'Benefits' },
    { key: 'amount', header: 'Amount', align: 'end', render: (value) => `$${value.toLocaleString()}` },
    { key: 'remarks', header: 'Remarks' }
  ];

  const deductionsColumns = [
    { key: 'description', header: 'Deductions' },
    { key: 'amount', header: 'Amount', align: 'end', render: (value) => `$${value.toLocaleString()}` },
    { key: 'remarks', header: 'Remarks' }
  ];

  const totalBenefits = benefitsData.reduce((sum, item) => sum + item.amount, 0);
  const totalDeductions = deductionsData.reduce((sum, item) => sum + item.amount, 0);
  const netAmount = totalBenefits - totalDeductions;

  return (
    <div className="template">
      <div className="template-container max-w-5xl mx-auto bg-white">
        <TemplateHeader {...organizationData} />
        
        <TemplateTitle 
          title="End of Service Report"
          titleAr="تقرير نهاية الخدمة"
          rightSection={{
            title: "Employee:",
            data: {
              [defaultEmployeeData.employeeName]: "",
              ["ID"]: defaultEmployeeData.employeeId,
              ["Position"]: defaultEmployeeData.position,
              ["Department"]: defaultEmployeeData.department
            }
          }}
          leftSection={{
            title: "Service Details:",
            data: {
              ["Hire Date"]: defaultEmployeeData.hireDate,
              ["Last Working Day"]: defaultEmployeeData.lastWorkingDay,
              ["Years of Service"]: `${defaultEmployeeData.yearsOfService} years`
            }
          }}
        />
        
        <div className="report-section">
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-blue-50 rounded">
                <h4 className="font-semibold mb-2">Resignation Details</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Resignation Date:</span> {defaultEmployeeData.resignationDate}</p>
                  <p><span className="font-medium">Reason:</span> {defaultEmployeeData.reason}</p>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded">
                <h4 className="font-semibold mb-2">Service Summary</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Total Service:</span> {defaultEmployeeData.yearsOfService} years</p>
                  <p><span className="font-medium">Performance:</span> Satisfactory</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Benefits & Entitlements</h3>
              <TemplateBody columns={benefitsColumns} data={benefitsData} showTotal={true} totalAmount={totalBenefits} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Deductions</h3>
              <TemplateBody columns={deductionsColumns} data={deductionsData} showTotal={true} totalAmount={totalDeductions} />
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Net Settlement Amount:</span>
              <span className="text-xl font-bold text-green-600">${netAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-6 p-4 border border-gray-300 rounded">
            <h4 className="font-semibold mb-2">Clearance Checklist</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p>☑ Company ID Card Returned</p>
                <p>☑ Access Cards Returned</p>
                <p>☐ Company Laptop Returned</p>
              </div>
              <div>
                <p>☑ Final Handover Completed</p>
                <p>☑ Exit Interview Conducted</p>
                <p>☑ HR Clearance Obtained</p>
              </div>
            </div>
          </div>

          <SignatureSection 
            preparedByLabel="HR Manager"
            approvedByLabel="Department Head"
            showReceivedBy={true}
            receivedByLabel="Employee"
          />
        </div>
      </div>
    </div>
  );
};

export default EndOfServiceReport;
