import { useTranslation } from 'react-i18next';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import SignatureSection from '../../../components/templates/SignatureSection';

import '../../../components/templates/templates.css';

const EmployeeContract = ({ organizationData = {}, contractData = {} }) => {
  const defaultContractData = {
    employeeName: 'John Smith',
    employeeId: 'EMP001',
    position: 'Software Engineer',
    department: 'IT Department',
    startDate: '2024-01-01',
    salary: 'SAR 15,000',
    workingHours: '40 hours per week',
    probationPeriod: '3 months',
    ...contractData
  };

  return (
    <div className="template">
      <div className="template-container max-w-5xl mx-auto bg-white">
        <TemplateHeader {...organizationData} />
        
        <TemplateTitle 
          title="Employee Contract"
          titleAr="عقد عمل موظف"
        />
        
        <div className="report-section">
          <div className="mb-6">
            <p>This contract is made on <strong>{new Date().toLocaleDateString()}</strong> between:</p>
            <p><strong>{organizationData.companyName || 'Your Company Name'}</strong> (hereinafter referred to as the "Employer")</p>
            <p>and</p>
            <p><strong>{defaultContractData.employeeName}</strong> (ID: {defaultContractData.employeeId}) (hereinafter referred to as the "Employee").</p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold">1. Position and Duties</h3>
              <p>The Employee is appointed to the position of <strong>{defaultContractData.position}</strong> in the <strong>{defaultContractData.department}</strong> department. The Employee's duties will be as described in the job description attached to this contract.</p>
            </div>
            <div>
              <h3 className="font-bold">2. Start Date and Probation</h3>
              <p>The employment will commence on <strong>{defaultContractData.startDate}</strong>. The first <strong>{defaultContractData.probationPeriod}</strong> of employment will be a probationary period.</p>
            </div>
            <div>
              <h3 className="font-bold">3. Salary and Compensation</h3>
              <p>The Employer will pay the Employee a monthly salary of <strong>{defaultContractData.salary}</strong>, payable at the end of each month.</p>
            </div>
            <div>
              <h3 className="font-bold">4. Working Hours</h3>
              <p>The standard working hours are <strong>{defaultContractData.workingHours}</strong>, from Sunday to Thursday.</p>
            </div>
            <div>
              <h3 className="font-bold">5. Confidentiality</h3>
              <p>The Employee agrees to maintain the confidentiality of all proprietary information of the Employer.</p>
            </div>
            <div>
              <h3 className="font-bold">6. Termination</h3>
              <p>This contract may be terminated by either party with one month's written notice.</p>
            </div>
          </div>

          <SignatureSection />
        </div>
      </div>
    </div>
  );
};

export default EmployeeContract;
