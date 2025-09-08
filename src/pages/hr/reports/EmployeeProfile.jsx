import { useTranslation } from 'react-i18next';
import TemplateHeader from '../../../components/templates/TemplateHeader';
import TemplateTitle from '../../../components/templates/TemplateTitle';
import TemplateBody from '../../../components/templates/TemplateBody';
import SignatureSection from '../../../components/templates/SignatureSection';

const EmployeeProfile = ({ organizationData = {}, employeeData = {} }) => {
  const { t } = useTranslation();

  const defaultEmployeeData = {
    employeeId: 'EMP001',
    employeeName: 'John Smith',
    jobTitle: 'Software Engineer',
    department: 'IT Department',
    hireDate: '2023-01-15',
    email: 'john.smith@company.com',
    phone: '+1 234 567 8900',
    address: '123 Main Street, City, State 12345',
    emergencyContact: 'Jane Smith - +1 234 567 8901',
    salary: '75,000',
    status: 'Active',
    ...employeeData
  };

  return (
    <div className="template">
      <div className="template-container max-w-4xl mx-auto bg-white">
        <TemplateHeader {...organizationData} />
        
        <TemplateTitle 
          title="Employee Profile"
          titleAr="ملف الموظف"
          rightSection={{
            title: "Personal Info:",
            data: {
              [defaultEmployeeData.employeeName]: "",
              ["Phone"]: defaultEmployeeData.phone,
              ["Email"]: defaultEmployeeData.email,
              ["Address"]: defaultEmployeeData.address
            }
          }}
          leftSection={{
            title: "Employment Details:",
            data: {
              ["Employee ID"]: defaultEmployeeData.employeeId,
              ["Hire Date"]: defaultEmployeeData.hireDate,
              ["Status"]: defaultEmployeeData.status
            }
          }}
        />
        
        <div className="report-section">
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Job Information</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Job Title:</span> {defaultEmployeeData.jobTitle}</p>
                <p><span className="font-medium">Department:</span> {defaultEmployeeData.department}</p>
                <p><span className="font-medium">Salary:</span> {defaultEmployeeData.salary}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
              <div className="space-y-2 text-sm">
                <p>{defaultEmployeeData.emergencyContact}</p>
              </div>
            </div>
          </div>

          <SignatureSection />
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
