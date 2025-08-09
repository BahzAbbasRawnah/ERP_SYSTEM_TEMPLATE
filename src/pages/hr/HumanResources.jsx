import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const HumanResources = () => {
  const { t } = useTranslation();
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);

  const breadcrumbs = [
    { label: t('navigation.hr') }
  ];

  const stats = [
    {
      title: 'Total Employees',
      value: '247',
      icon: 'fas fa-users',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'New Hires',
      value: '12',
      icon: 'fas fa-user-plus',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'On Leave',
      value: '18',
      icon: 'fas fa-calendar-alt',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Open Positions',
      value: '8',
      icon: 'fas fa-briefcase',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const departments = [
    { name: 'Engineering', icon: 'fas fa-users', count: 45 },
    { name: 'Sales', icon: 'fas fa-chart-line', count: 25 },
    { name: 'Marketing', icon: 'fas fa-bullhorn', count: 18 },
    { name: 'HR', icon: 'fas fa-users-cog', count: 8 },
    { name: 'Finance', icon: 'fas fa-calculator', count: 12 }
  ];

  const recentEmployees = [
    {
      name: 'Sarah Johnson',
      position: 'Frontend Developer',
      department: 'Engineering',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=center'
    },
    {
      name: 'Michael Chen',
      position: 'Backend Developer',
      department: 'Engineering',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=center'
    },
    {
      name: 'Emily Rodriguez',
      position: 'Sales Manager',
      department: 'Sales',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=center'
    },
    {
      name: 'David Wilson',
      position: 'Marketing Specialist',
      department: 'Marketing',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center'
    }
  ];

  return (
    <DashboardLayout title="Human Resources Dashboard" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary">
            <i className="fas fa-download me-2" />
            Export
          </Button>
          <Button onClick={() => setShowAddEmployeeModal(true)}>
            <i className="fas fa-plus me-2" />
            Add Employee
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className={`bg-gradient-to-r ${stat.color} overflow-hidden shadow-sm rounded-lg p-6 text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <dt className="text-sm font-medium text-white/80 truncate">{stat.title}</dt>
                  <dd className="text-2xl font-bold text-white">{stat.value}</dd>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <i className={`${stat.icon} text-white text-xl`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Onboarding Process */}
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Employee Onboarding Process</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full me-1 bg-green-500 text-white flex items-center justify-center">
                <i className="fas fa-check text-sm" />
              </div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-white">Application</span>
            </div>
            <div className="flex-1 h-0.5 mx-2 bg-green-500" />
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full me-1 bg-green-500 text-white flex items-center justify-center">
                <i className="fas fa-check text-sm" />
              </div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-white">Interview</span>
            </div>
            <div className="flex-1 h-0.5 mx-2 bg-green-500" />
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full me-1 bg-primary-600 text-white flex items-center justify-center">3</div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-white">Documentation</span>
            </div>
            <div className="flex-1 h-0.5 mx-2 bg-gray-200 dark:bg-gray-700" />
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full me-1 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center">4</div>
              <span className="ms-3 text-sm font-medium text-gray-500 dark:text-gray-400">Training</span>
            </div>
            <div className="flex-1 h-0.5 mx-2 bg-gray-200 dark:bg-gray-700" />
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full me-1 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center">5</div>
              <span className="ms-3 text-sm font-medium text-gray-500 dark:text-gray-400">Integration</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Organization Structure */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Organization Structure</h3>
              <div className="space-y-1">
                <div className="flex items-center py-2 px-3 text-sm text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-md">
                  <i className="fas fa-building me-2" />
                  <span>Company</span>
                </div>
                <div className="ms-6 border-s border-gray-200 dark:border-gray-700 ps-4 space-y-1">
                  {departments.map((dept, index) => (
                    <div key={index} className="flex items-center justify-between py-2 px-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md cursor-pointer">
                      <div className="flex items-center">
                        <i className={`${dept.icon} me-2`} />
                        <span>{dept.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{dept.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Employees */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Employees</h3>
                  <a href="/hr/employees" className="text-primary-600 hover:text-primary-900 text-sm">View All</a>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentEmployees.map((employee, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-center">
                        <img className="h-12 w-12 rounded-full" src={employee.avatar} alt="" />
                        <div className="ms-4 flex-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">{employee.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{employee.position}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">{employee.department}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <i className="fas fa-eye" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <i className="fas fa-edit" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Employee Modal */}
      <Modal
        isOpen={showAddEmployeeModal}
        onClose={() => setShowAddEmployeeModal(false)}
        title="Add New Employee"
        size="4xl"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input label="First Name" required />
              <Input label="Last Name" required />
              <Input label="Email" type="email" required />
              <Input label="Phone" type="tel" required />
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department</label>
                <select className="input-field" required>
                  <option>Select department</option>
                  <option>Engineering</option>
                  <option>Sales</option>
                  <option>Marketing</option>
                  <option>HR</option>
                  <option>Finance</option>
                </select>
              </div>
              <Input label="Position" required />
              <Input label="Hire Date" type="date" required />
              <Input label="Salary" type="number" step="0.01" required />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setShowAddEmployeeModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Employee</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default HumanResources;