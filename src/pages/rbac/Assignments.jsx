import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import StatsCard from '../../components/ui/StatsCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Select from '../../components/ui/Select';

const Assignments = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const assignments = [
    { id: 1, user: 'John Doe', email: 'john@example.com', currentRole: 'Admin', department: 'IT', assignedDate: '2024-01-01' },
    { id: 2, user: 'Jane Smith', email: 'jane@example.com', currentRole: 'Manager', department: 'Sales', assignedDate: '2024-01-05' },
    { id: 3, user: 'Mike Johnson', email: 'mike@example.com', currentRole: 'Employee', department: 'Marketing', assignedDate: '2024-01-10' },
    { id: 4, user: 'Sarah Wilson', email: 'sarah@example.com', currentRole: 'Supervisor', department: 'Operations', assignedDate: '2024-01-12' },
    { id: 5, user: 'Tom Brown', email: 'tom@example.com', currentRole: 'Employee', department: 'Finance', assignedDate: '2024-01-15' }
  ];

  const roles = ['Admin', 'Manager', 'Supervisor', 'Employee', 'HR Manager', 'Finance Manager'];
  const departments = ['IT', 'Sales', 'Marketing', 'Operations', 'Finance', 'HR'];

  const breadcrumbs = [
    { label: t('navigation.dashboard'), href: '/dashboard' },
    { label: t('navigation.rbac'), href: '/rbac' },
    { label: t('rbac.assignments'), href: '/rbac/assignments' }
  ];

  const stats = [
    { title: t('rbac.totalUsers'), value: '156', icon: 'fas fa-users', color: 'blue' },
    { title: t('rbac.activeRoles'), value: '8', icon: 'fas fa-user-tag', color: 'green' },
    { title: 'Departments', value: '6', icon: 'fas fa-building', color: 'purple' },
    { title: t('rbac.pendingAssignments'), value: '12', icon: 'fas fa-clock', color: 'orange' }
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return 'danger';
      case 'Manager': return 'warning';
      case 'Supervisor': return 'info';
      case 'HR Manager': return 'purple';
      case 'Finance Manager': return 'indigo';
      default: return 'success';
    }
  };

  const columns = [
    {
      key: 'user',
      header: 'User',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
              {value.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-medium">{value}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{row.email}</p>
          </div>
        </div>
      )
    },
    {
      key: 'currentRole',
      header: t('rbac.currentRole'),
      sortable: true,
      filterable: true,
      filterOptions: roles.map(role => ({ value: role, label: role })),
      render: (value) => (
        <Badge variant={getRoleColor(value)}>
          {value}
        </Badge>
      )
    },
    {
      key: 'department',
      header: 'Department',
      sortable: true,
      filterable: true,
      filterOptions: departments.map(dept => ({ value: dept, label: dept }))
    },
    {
      key: 'assignedDate',
      header: t('rbac.assignedDate'),
      sortable: true
    }
  ];

  const actions = [
    {
      icon: 'fas fa-edit',
      title: 'Edit Assignment',
      onClick: (assignment) => {
        setSelectedAssignment(assignment);
        setShowModal(true);
      },
      className: 'text-blue-600 hover:text-blue-800 dark:text-blue-400'
    },
    {
      icon: 'fas fa-exchange-alt',
      title: 'Change Role',
      onClick: (assignment) => console.log('Change role:', assignment),
      className: 'text-green-600 hover:text-green-800 dark:text-green-400'
    },
    {
      icon: 'fas fa-user-minus',
      title: 'Remove Assignment',
      onClick: (assignment) => console.log('Remove assignment:', assignment),
      className: 'text-red-600 hover:text-red-800 dark:text-red-400'
    }
  ];

  return (
    <DashboardLayout 
      title={t('rbac.roleAssignments')}
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button onClick={() => setShowModal(true)}>
            <i className="fas fa-user-plus me-1"></i>{t('rbac.assignRole')}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <DataTable
          data={assignments}
          columns={columns}
          actions={actions}
          searchable
          filterable
          paginated
        />

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full mx-4">
            <div className="bg-purple-500 px-6 py-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Role Assignment</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <Select
                label="User"
                placeholder="Select User"
                options={assignments.map(assignment => ({
                  value: assignment.id,
                  label: `${assignment.user} (${assignment.email})`
                }))}
                onChange={(value) => console.log('User selected:', value)}
              />
              
              <Select
                label="Role"
                placeholder="Select Role"
                options={roles.map(role => ({ value: role.toLowerCase(), label: role }))}
                onChange={(value) => console.log('Role selected:', value)}
              />
              
              <Select
                label="Department"
                placeholder="Select Department"
                options={departments.map(dept => ({ value: dept.toLowerCase(), label: dept }))}
                onChange={(value) => console.log('Department selected:', value)}
              />
              
              <div>
                <label className="block text-sm font-medium mb-2">{t('rbac.effectiveDate')}</label>
                <Input type="date" defaultValue="2024-01-15" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Notes</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  rows="3"
                  placeholder="Assignment notes..."
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="secondary" onClick={() => setShowModal(false)}>{t('common.cancel')}</Button>
                <Button>{t('rbac.assignRole')}</Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Assignments;