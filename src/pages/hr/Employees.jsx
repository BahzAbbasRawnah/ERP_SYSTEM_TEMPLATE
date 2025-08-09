import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';

const Employees = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  
  const breadcrumbs = [
    { label: t('HR'), href: '/hr' },
    { label: t('Employees') }
  ];

  const employeesData = [
    {
      id: 1,
      employeeId: 'EMP-001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      department: 'Engineering',
      position: 'Frontend Developer',
      hireDate: '2022-03-15',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 2,
      employeeId: 'EMP-002',
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      department: 'Engineering',
      position: 'Backend Developer',
      hireDate: '2021-11-08',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 3,
      employeeId: 'EMP-003',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@company.com',
      department: 'Sales',
      position: 'Sales Manager',
      hireDate: '2020-07-22',
      status: 'On Leave',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=center'
    }
  ];

  const columns = [
    {
      key: 'name',
      header: t('Employee'),
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          <img 
            className="h-10 w-10 rounded-full mr-3" 
            src={row.avatar} 
            alt="Employee" 
          />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'employeeId',
      header: t('Employee ID'),
      sortable: true
    },
    {
      key: 'department',
      header: t('Department'),
      sortable: true,
      filterable: true,
      filterOptions: [
        { value: 'Engineering', label: t('Engineering') },
        { value: 'Sales', label: t('Sales') },
        { value: 'Marketing', label: t('Marketing') },
        { value: 'HR', label: t('HR') },
        { value: 'Finance', label: t('Finance') }
      ]
    },
    {
      key: 'position',
      header: t('Position'),
      sortable: true
    },
    {
      key: 'hireDate',
      header: t('Hire Date'),
      sortable: true
    },
    {
      key: 'status',
      header: t('Status'),
      sortable: true,
      filterable: true,
      filterOptions: [
        { value: 'Active', label: t('Active') },
        { value: 'On Leave', label: t('On Leave') },
        { value: 'Inactive', label: t('Inactive') }
      ],
      render: (value) => {
        const statusColors = {
          'Active': 'badge-success',
          'On Leave': 'badge-warning',
          'Inactive': 'badge-danger'
        };
        return <span className={`badge ${statusColors[value] || 'badge-gray'}`}>{value}</span>;
      }
    }
  ];

  const actions = [
    {
      label: t('View'),
      onClick: (row) => console.log('View employee', row),
      className: 'text-primary-600 hover:text-primary-900'
    },
    {
      label: t('Edit'),
      onClick: (row) => console.log('Edit employee', row),
      className: 'text-blue-600 hover:text-blue-900'
    },
    {
      label: t('More'),
      onClick: (row) => console.log('More actions', row),
      className: 'text-gray-600 hover:text-gray-900'
    }
  ];

  return (
    <DashboardLayout title={t('Employee Management')} breadcrumbs={breadcrumbs}>
      {/* Employee Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-blue-100 truncate">{t('Total Employees')}</dt>
              <dd className="text-2xl font-bold text-white">247</dd>
            </div>
            <div className="w-12 h-12 bg-blue-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-users text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-green-100 truncate">{t('Active')}</dt>
              <dd className="text-2xl font-bold text-white">229</dd>
            </div>
            <div className="w-12 h-12 bg-green-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-user-check text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-yellow-100 truncate">{t('On Leave')}</dt>
              <dd className="text-2xl font-bold text-white">18</dd>
            </div>
            <div className="w-12 h-12 bg-yellow-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-calendar-alt text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-purple-100 truncate">{t('Departments')}</dt>
              <dd className="text-2xl font-bold text-white">8</dd>
            </div>
            <div className="w-12 h-12 bg-purple-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-building text-white text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mb-6">
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <i className="fas fa-download me-1" />
            {t('Export')}
          </button>
          <button 
            onClick={() => setShowModal(true)}
            className="btn-primary"
          >
            <i className="fas fa-plus me-1" />
            {t('Add Employee')}
          </button>
        </div>
      </div>

      {/* Employees Table */}
      <DataTable
        data={employeesData}
        columns={columns}
        actions={actions}
        searchable={true}
        filterable={true}
        paginated={true}
        pageSize={10}
      />

      {/* Add Employee Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-xl transition-all w-full max-w-4xl">
              <div className="bg-primary-600 px-6 py-4 flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">{t('Add New Employee')}</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-gray-200"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
              
              <div className="px-6 py-4">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t('First Name')}
                        </label>
                        <input type="text" className="input-field" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t('Last Name')}
                        </label>
                        <input type="text" className="input-field" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t('Email')}
                        </label>
                        <input type="email" className="input-field" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t('Phone')}
                        </label>
                        <input type="tel" className="input-field" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t('Department')}
                        </label>
                        <select className="input-field" required>
                          <option>{t('Select department')}</option>
                          <option>Engineering</option>
                          <option>Sales</option>
                          <option>Marketing</option>
                          <option>HR</option>
                          <option>Finance</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t('Position')}
                        </label>
                        <input type="text" className="input-field" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t('Hire Date')}
                        </label>
                        <input type="date" className="input-field" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t('Salary')}
                        </label>
                        <input type="number" className="input-field" step="0.01" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t('Manager')}
                        </label>
                        <select className="input-field">
                          <option>{t('Select manager')}</option>
                          <option>John Smith</option>
                          <option>Sarah Johnson</option>
                          <option>Mike Wilson</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t('Status')}
                        </label>
                        <select className="input-field">
                          <option>Active</option>
                          <option>Inactive</option>
                          <option>On Leave</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 flex justify-end space-x-3">
                <button 
                  onClick={() => setShowModal(false)}
                  className="btn-secondary"
                >
                  {t('Cancel')}
                </button>
                <button className="btn-primary">
                  {t('Add Employee')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Employees;