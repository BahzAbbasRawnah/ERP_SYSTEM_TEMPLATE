import { useTranslation } from 'react-i18next';
import OrganizationHeader from '../components/OrganizationHeader';
import ReportTitle from '../components/ReportTitle';
import SignatureSection from '../components/SignatureSection';

const EmployeeContract = ({ organizationData = {}, contractData = {} }) => {
  const { t } = useTranslation();

  const defaultContractData = {
    employeeId: 'EMP001',
    employeeName: 'John Smith',
    position: 'Software Engineer',
    department: 'IT Department',
    contractType: 'Full-time Permanent',
    startDate: '2023-01-15',
    salary: '$75,000',
    workingHours: '40 hours/week',
    probationPeriod: '3 months',
    noticePeriod: '30 days',
    ...contractData
  };

  return (
    <div className="print-wrapper">
      <div className="template-print-container max-w-4xl mx-auto bg-white">
        <div className="template-header">
          <OrganizationHeader {...organizationData} />
        </div>
        
        <div className="report-title-section">
          <ReportTitle 
            title="Employment Contract Summary"
            titleAr="ملخص عقد العمل"
            rightSection={{
              title: "Employee:",
              data: {
                [defaultContractData.employeeName]: "",
                ["ID"]: defaultContractData.employeeId,
                ["Position"]: defaultContractData.position,
                ["Department"]: defaultContractData.department
              }
            }}
            leftSection={{
              title: "Contract Details:",
              data: {
                ["Contract Type"]: defaultContractData.contractType,
                ["Start Date"]: defaultContractData.startDate,
                ["Generated"]: new Date().toISOString().split('T')[0]
              }
            }}
          />
        </div>
        
        <div className="template-body">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Employment Terms</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Salary:</span> {defaultContractData.salary} per annum</p>
                  <p><span className="font-medium">Working Hours:</span> {defaultContractData.workingHours}</p>
                  <p><span className="font-medium">Probation Period:</span> {defaultContractData.probationPeriod}</p>
                  <p><span className="font-medium">Notice Period:</span> {defaultContractData.noticePeriod}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Benefits</h3>
                <div className="space-y-1 text-sm">
                  <p>• Health Insurance</p>
                  <p>• Annual Leave (21 days)</p>
                  <p>• Sick Leave (10 days)</p>
                  <p>• Professional Development Fund</p>
                  <p>• Retirement Plan</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Key Responsibilities</h3>
              <div className="text-sm space-y-1">
                <p>• Develop and maintain software applications</p>
                <p>• Collaborate with cross-functional teams</p>
                <p>• Participate in code reviews and testing</p>
                <p>• Maintain technical documentation</p>
                <p>• Follow company policies and procedures</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded">
              <h4 className="font-semibold mb-2">Important Notes</h4>
              <p className="text-sm">This is a summary of the employment contract. The complete contract document contains detailed terms and conditions. Both parties are bound by the full contract terms.</p>
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

export default EmployeeContract;