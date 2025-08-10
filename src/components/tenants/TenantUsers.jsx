import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const TenantUsers = ({ tenant }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Mock users data
  const users = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@acme.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-20 14:30',
      createdAt: '2024-01-15',
      avatar: null
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane@acme.com',
      role: 'manager',
      status: 'active',
      lastLogin: '2024-01-20 12:15',
      createdAt: '2024-01-16',
      avatar: null
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@acme.com',
      role: 'user',
      status: 'active',
      lastLogin: '2024-01-19 16:45',
      createdAt: '2024-01-17',
      avatar: null
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah@acme.com',
      role: 'user',
      status: 'inactive',
      lastLogin: '2024-01-18 10:20',
      createdAt: '2024-01-18',
      avatar: null
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david@acme.com',
      role: 'user',
      status: 'suspended',
      lastLogin: '2024-01-17 14:30',
      createdAt: '2024-01-19',
      avatar: null
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
      suspended: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return colors[status] || colors.inactive;
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      manager: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      user: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    };
    return colors[role] || colors.user;
  };

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    suspended: users.filter(u => u.status === 'suspended').length
  };

  return (
    <div className="space-y-6">
      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('tenants.users.total')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {userStats.total}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                / {tenant.maxUsers} {t('tenants.users.limit')}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500 text-blue-100">
              <i className="fas fa-users text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('tenants.users.active')}
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                {userStats.active}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-500 text-green-100">
              <i className="fas fa-user-check text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('tenants.users.inactive')}
              </p>
              <p className="text-2xl font-bold text-gray-600 dark:text-gray-400 mt-1">
                {userStats.inactive}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-gray-500 text-gray-100">
              <i className="fas fa-user-clock text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('tenants.users.suspended')}
              </p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
                {userStats.suspended}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-red-500 text-red-100">
              <i className="fas fa-user-slash text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Users Management */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {t('tenants.users.management')}
            </h3>
            <button className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700">
              <i className="fas fa-plus me-2" />
              {t('tenants.users.addUser')}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  placeholder={t('tenants.users.searchPlaceholder')}
                />
              </div>
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">{t('tenants.users.allRoles')}</option>
              <option value="admin">{t('tenants.users.roles.admin')}</option>
              <option value="manager">{t('tenants.users.roles.manager')}</option>
              <option value="user">{t('tenants.users.roles.user')}</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('tenants.users.user')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('tenants.users.role')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('tenants.users.status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('tenants.users.lastLogin')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('tenants.users.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-lg bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                          <i className="fas fa-user text-gray-500 dark:text-gray-400" />
                        </div>
                      </div>
                      <div className="ms-2">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-lg ${getRoleColor(user.role)}`}>
                      {t(`tenants.users.roles.${user.role}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-lg ${getStatusColor(user.status)}`}>
                      {t(`tenants.users.statuses.${user.status}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {new Date(user.lastLogin).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        {t('common.edit')}
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        {t('tenants.users.resetPassword')}
                      </button>
                      {user.status === 'active' ? (
                        <button className="text-yellow-600 hover:text-yellow-900">
                          {t('tenants.users.suspend')}
                        </button>
                      ) : (
                        <button className="text-green-600 hover:text-green-900">
                          {t('tenants.users.activate')}
                        </button>
                      )}
                      <button className="text-red-600 hover:text-red-900">
                        {t('common.delete')}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <i className="fas fa-users text-4xl text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t('tenants.users.noUsers')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {t('tenants.users.noUsersDescription')}
            </p>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {t('tenants.users.bulkActions')}
        </h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            <i className="fas fa-envelope me-2" />
            {t('tenants.users.sendInvitations')}
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            <i className="fas fa-user-plus me-2" />
            {t('tenants.users.bulkImport')}
          </button>
          <button className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">
            <i className="fas fa-key me-2" />
            {t('tenants.users.resetAllPasswords')}
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
            <i className="fas fa-download me-2" />
            {t('tenants.users.exportUsers')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenantUsers;