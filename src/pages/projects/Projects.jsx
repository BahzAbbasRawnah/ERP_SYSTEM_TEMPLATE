import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Projects = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  
  const breadcrumbs = [
    { label: t('Projects'), href: '/projects' }
  ];

  const projectsData = [
    {
      id: 1,
      name: 'Enterprise ERP System',
      description: 'Complete business management solution',
      manager: 'John Doe',
      managerInitials: 'JD',
      managerColor: 'bg-blue-500',
      progress: 75,
      status: 'Active',
      dueDate: '2024-06-30',
      budget: '$150,000'
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Cross-platform mobile application',
      manager: 'Jane Smith',
      managerInitials: 'JS',
      managerColor: 'bg-purple-500',
      progress: 45,
      status: 'Active',
      dueDate: '2024-08-15',
      budget: '$85,000'
    },
    {
      id: 3,
      name: 'Website Redesign',
      description: 'Corporate website modernization',
      manager: 'Mike Wilson',
      managerInitials: 'MW',
      managerColor: 'bg-green-500',
      progress: 20,
      status: 'On Hold',
      dueDate: '2024-05-20',
      budget: '$45,000'
    }
  ];

  const columns = [
    {
      key: 'name',
      header: t('Project Name'),
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{row.description}</div>
        </div>
      )
    },
    {
      key: 'manager',
      header: t('Manager'),
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          <div className={`w-8 h-8 ${row.managerColor} rounded-full flex items-center justify-center text-white text-sm font-medium`}>
            {row.managerInitials}
          </div>
          <span className="ml-2">{value}</span>
        </div>
      )
    },
    {
      key: 'progress',
      header: t('Progress'),
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 me-1">
            <div 
              className="bg-green-600 h-2 rounded-full" 
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="text-sm text-gray-500">{value}%</span>
        </div>
      )
    },
    {
      key: 'status',
      header: t('Status'),
      sortable: true,
      filterable: true,
      filterOptions: [
        { value: 'Active', label: t('Active') },
        { value: 'On Hold', label: t('On Hold') },
        { value: 'Completed', label: t('Completed') },
        { value: 'Cancelled', label: t('Cancelled') }
      ],
      render: (value) => {
        const statusColors = {
          'Active': 'badge-success',
          'On Hold': 'badge-warning',
          'Completed': 'badge-purple',
          'Cancelled': 'badge-danger'
        };
        return <span className={`badge ${statusColors[value] || 'badge-gray'}`}>{value}</span>;
      }
    },
    {
      key: 'dueDate',
      header: t('Due Date'),
      sortable: true
    },
    {
      key: 'budget',
      header: t('Budget'),
      sortable: true,
      render: (value) => <span className="font-medium">{value}</span>
    }
  ];

  const actions = [
    {
      label: t('Edit'),
      onClick: (row) => setShowModal(true),
      className: 'text-blue-600 hover:text-blue-900'
    },
    {
      label: t('View'),
      onClick: (row) => console.log('View', row),
      className: 'text-green-600 hover:text-green-900'
    },
    {
      label: t('Delete'),
      onClick: (row) => console.log('Delete', row),
      className: 'text-red-600 hover:text-red-900'
    }
  ];

  const teamMembers = [
    { id: 1, name: 'John Doe', role: 'Developer' },
    { id: 2, name: 'Jane Smith', role: 'Designer' },
    { id: 3, name: 'Mike Wilson', role: 'QA' },
    { id: 4, name: 'Sarah Johnson', role: 'Analyst' },
    { id: 5, name: 'Bob Brown', role: 'DevOps' }
  ];

  return (
    <DashboardLayout title={t('Projects')} breadcrumbs={breadcrumbs}>
      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-blue-100 truncate">{t('Total Projects')}</dt>
              <dd className="text-2xl font-bold text-white">24</dd>
            </div>
            <div className="w-12 h-12 bg-blue-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-project-diagram text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-green-100 truncate">{t('Active Projects')}</dt>
              <dd className="text-2xl font-bold text-white">18</dd>
            </div>
            <div className="w-12 h-12 bg-green-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-check-circle text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-orange-100 truncate">{t('On Hold')}</dt>
              <dd className="text-2xl font-bold text-white">4</dd>
            </div>
            <div className="w-12 h-12 bg-orange-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-pause-circle text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 overflow-hidden shadow-sm rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <dt className="text-sm font-medium text-purple-100 truncate">{t('Completed')}</dt>
              <dd className="text-2xl font-bold text-white">12</dd>
            </div>
            <div className="w-12 h-12 bg-purple-400/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-trophy text-white text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <DataTable
        title={t('All Projects')}
        data={projectsData}
        columns={columns}
        actions={actions}
        searchable
        filterable
        exportable
        onAdd={() => setShowModal(true)}
        addButtonText={t('New Project')}
      />

      {/* New/Edit Project Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={t('New Project')}
        size="large"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={t('Project Name')}
              placeholder={t('Enter project name')}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('Project Manager')}
              </label>
              <select className="input-field" required>
                <option value="">{t('Select Manager')}</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
                <option value="Mike Wilson">Mike Wilson</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('Project Description')}
            </label>
            <textarea 
              className="input-field" 
              rows="3" 
              placeholder={t('Describe the project objectives and scope')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="date"
              label={t('Start Date')}
              required
            />
            <Input
              type="date"
              label={t('Due Date')}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('Priority')}
              </label>
              <select className="input-field">
                <option value="Low">{t('Low')}</option>
                <option value="Medium">{t('Medium')}</option>
                <option value="High">{t('High')}</option>
                <option value="Critical">{t('Critical')}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="number"
              step="0.01"
              label={t('Budget')}
              placeholder="0.00"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('Status')}
              </label>
              <select className="input-field">
                <option value="Planning">{t('Planning')}</option>
                <option value="Active">{t('Active')}</option>
                <option value="On Hold">{t('On Hold')}</option>
                <option value="Completed">{t('Completed')}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('Team Members')}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMembers.map((member) => (
                <label key={member.id} className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {member.name} - {member.role}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('Notes')}
            </label>
            <textarea 
              className="input-field" 
              rows="3" 
              placeholder={t('Additional project notes (optional)')}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              {t('Cancel')}
            </Button>
            <Button variant="primary" type="submit">
              {t('Create Project')}
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Projects;