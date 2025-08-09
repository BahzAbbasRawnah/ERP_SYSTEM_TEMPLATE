import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import EmailVerification from '../pages/auth/EmailVerification';
import PhoneVerification from '../pages/auth/PhoneVerification';
import TwoFactor from '../pages/auth/TwoFactor';

// Dashboard
import Dashboard from '../pages/Dashboard';

// Sales
import SalesDashboard from '../pages/sales/index';
import SalesManagement from '../pages/sales/SalesManagement';
import Orders from '../pages/sales/Orders';

// CRM
import CRMDashboard from '../pages/crm/index';
import CRMManagement from '../pages/crm/CRMManagement';

// HR
import HRDashboard from '../pages/hr/index';
import HumanResources from '../pages/hr/HumanResources';
import Employees from '../pages/hr/Employees';
import Attendance from '../pages/hr/Attendance';
import Leaves from '../pages/hr/Leaves';
import Payroll from '../pages/hr/Payroll';

// Inventory
import InventoryDashboard from '../pages/inventory/index';
import InventoryManagement from '../pages/inventory/InventoryManagement';
import Products from '../pages/inventory/Products';
import Stores from '../pages/inventory/Stores';
import Transfers from '../pages/inventory/Transfers';

// Purchases
import PurchasesDashboard from '../pages/purchases/index';
import Purchasing from '../pages/purchases/Purchasing';
import Suppliers from '../pages/purchases/Suppliers';
import Contracts from '../pages/purchases/Contracts';

// POS
import POSDashboard from '../pages/pos/index';
import POS from '../pages/pos/POS';
import POSSales from '../pages/pos/POSSales';
import POSProducts from '../pages/pos/POSProducts';
import POSCustomers from '../pages/pos/POSCustomers';
import POSReports from '../pages/pos/POSReports';

// Finance
import FinanceDashboard from '../pages/finance/index';
import Accounting from '../pages/finance/Accounting';
import Accounts from '../pages/finance/Accounts';
import Receipts from '../pages/finance/Receipts';
import Transactions from '../pages/finance/Transactions';

// RBAC
import RBACDashboard from '../pages/rbac/index';
import Users from '../pages/rbac/Users';
import Roles from '../pages/rbac/Roles';
import Permissions from '../pages/rbac/Permissions';
import Assignments from '../pages/rbac/Assignments';

// Other Modules
import EcommerceDashboard from '../pages/ecommerce/index';
import Ecommerce from '../pages/ecommerce/Ecommerce';
import ProjectsDashboard from '../pages/projects/index';
import Projects from '../pages/projects/Projects';
import Logistics from '../pages/logistics/Logistics';

// Profile & Settings
import Profile from '../pages/profile/Profile';
import Notifications from '../pages/profile/Notifications';
import Settings from '../pages/settings/Settings';

// Showcase
import ComponentsShowcase from '../pages/ComponentsShowcase';
import LayoutsShowcase from '../pages/LayoutsShowcase';

// Public route wrapper for auth pages
const PublicRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

// Route configuration
export const createRoutes = (isAuthenticated) => [
  // Public Routes (Auth)
  {
    path: '/login',
    element: <PublicRoute isAuthenticated={isAuthenticated}><Login /></PublicRoute>
  },
  {
    path: '/auth/login',
    element: <PublicRoute isAuthenticated={isAuthenticated}><Login /></PublicRoute>
  },
  {
    path: '/register',
    element: <PublicRoute isAuthenticated={isAuthenticated}><Register /></PublicRoute>
  },
  {
    path: '/auth/register',
    element: <PublicRoute isAuthenticated={isAuthenticated}><Register /></PublicRoute>
  },
  {
    path: '/forgot-password',
    element: <PublicRoute isAuthenticated={isAuthenticated}><ForgotPassword /></PublicRoute>
  },
  {
    path: '/auth/forgot-password',
    element: <PublicRoute isAuthenticated={isAuthenticated}><ForgotPassword /></PublicRoute>
  },
  {
    path: '/reset-password',
    element: <PublicRoute isAuthenticated={isAuthenticated}><ResetPassword /></PublicRoute>
  },
  {
    path: '/auth/reset-password',
    element: <PublicRoute isAuthenticated={isAuthenticated}><ResetPassword /></PublicRoute>
  },
  {
    path: '/email-verification',
    element: <PublicRoute isAuthenticated={isAuthenticated}><EmailVerification /></PublicRoute>
  },
  {
    path: '/auth/email-verification',
    element: <PublicRoute isAuthenticated={isAuthenticated}><EmailVerification /></PublicRoute>
  },
  {
    path: '/phone-verification',
    element: <PublicRoute isAuthenticated={isAuthenticated}><PhoneVerification /></PublicRoute>
  },
  {
    path: '/auth/phone-verification',
    element: <PublicRoute isAuthenticated={isAuthenticated}><PhoneVerification /></PublicRoute>
  },
  {
    path: '/two-factor',
    element: <PublicRoute isAuthenticated={isAuthenticated}><TwoFactor /></PublicRoute>
  },
  {
    path: '/auth/two-factor',
    element: <PublicRoute isAuthenticated={isAuthenticated}><TwoFactor /></PublicRoute>
  },

  // Protected Routes
  {
    path: '/dashboard',
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>
  },
  
  // Sales Routes
  {
    path: '/sales',
    element: <ProtectedRoute><SalesDashboard /></ProtectedRoute>
  },
  {
    path: '/sales/management',
    element: <ProtectedRoute><SalesManagement /></ProtectedRoute>
  },
  {
    path: '/sales/orders',
    element: <ProtectedRoute><Orders /></ProtectedRoute>
  },

  // CRM Routes
  {
    path: '/crm',
    element: <ProtectedRoute><CRMDashboard /></ProtectedRoute>
  },
  {
    path: '/crm/management',
    element: <ProtectedRoute><CRMManagement /></ProtectedRoute>
  },

  // HR Routes
  {
    path: '/hr',
    element: <ProtectedRoute><HRDashboard /></ProtectedRoute>
  },
  {
    path: '/hr/management',
    element: <ProtectedRoute><HumanResources /></ProtectedRoute>
  },
  {
    path: '/hr/employees',
    element: <ProtectedRoute><Employees /></ProtectedRoute>
  },
  {
    path: '/hr/attendance',
    element: <ProtectedRoute><Attendance /></ProtectedRoute>
  },
  {
    path: '/hr/leaves',
    element: <ProtectedRoute><Leaves /></ProtectedRoute>
  },
  {
    path: '/hr/payroll',
    element: <ProtectedRoute><Payroll /></ProtectedRoute>
  },

  // Inventory Routes
  {
    path: '/inventory',
    element: <ProtectedRoute><InventoryDashboard /></ProtectedRoute>
  },
  {
    path: '/inventory/management',
    element: <ProtectedRoute><InventoryManagement /></ProtectedRoute>
  },
  {
    path: '/inventory/products',
    element: <ProtectedRoute><Products /></ProtectedRoute>
  },
  {
    path: '/inventory/stores',
    element: <ProtectedRoute><Stores /></ProtectedRoute>
  },
  {
    path: '/inventory/transfers',
    element: <ProtectedRoute><Transfers /></ProtectedRoute>
  },

  // Purchase Routes
  {
    path: '/purchases',
    element: <ProtectedRoute><PurchasesDashboard /></ProtectedRoute>
  },
  {
    path: '/purchases/management',
    element: <ProtectedRoute><Purchasing /></ProtectedRoute>
  },
  {
    path: '/purchases/suppliers',
    element: <ProtectedRoute><Suppliers /></ProtectedRoute>
  },
  {
    path: '/purchases/contracts',
    element: <ProtectedRoute><Contracts /></ProtectedRoute>
  },

  // POS Routes
  {
    path: '/pos',
    element: <ProtectedRoute><POSDashboard /></ProtectedRoute>
  },
  {
    path: '/pos/management',
    element: <ProtectedRoute><POS /></ProtectedRoute>
  },
  {
    path: '/pos/sales',
    element: <ProtectedRoute><POSSales /></ProtectedRoute>
  },
  {
    path: '/pos/products',
    element: <ProtectedRoute><POSProducts /></ProtectedRoute>
  },
  {
    path: '/pos/customers',
    element: <ProtectedRoute><POSCustomers /></ProtectedRoute>
  },
  {
    path: '/pos/reports',
    element: <ProtectedRoute><POSReports /></ProtectedRoute>
  },

  // Finance Routes
  {
    path: '/finance',
    element: <ProtectedRoute><FinanceDashboard /></ProtectedRoute>
  },
  {
    path: '/finance/accounting',
    element: <ProtectedRoute><Accounting /></ProtectedRoute>
  },
  {
    path: '/finance/accounts',
    element: <ProtectedRoute><Accounts /></ProtectedRoute>
  },
  {
    path: '/finance/receipts',
    element: <ProtectedRoute><Receipts /></ProtectedRoute>
  },
  {
    path: '/finance/transactions',
    element: <ProtectedRoute><Transactions /></ProtectedRoute>
  },

  // RBAC Routes
  {
    path: '/rbac',
    element: <ProtectedRoute><RBACDashboard /></ProtectedRoute>
  },
  {
    path: '/rbac/users',
    element: <ProtectedRoute><Users /></ProtectedRoute>
  },
  {
    path: '/rbac/roles',
    element: <ProtectedRoute><Roles /></ProtectedRoute>
  },
  {
    path: '/rbac/permissions',
    element: <ProtectedRoute><Permissions /></ProtectedRoute>
  },
  {
    path: '/rbac/assignments',
    element: <ProtectedRoute><Assignments /></ProtectedRoute>
  },

  // Other Module Routes
  {
    path: '/ecommerce',
    element: <ProtectedRoute><EcommerceDashboard /></ProtectedRoute>
  },
  {
    path: '/ecommerce/management',
    element: <ProtectedRoute><Ecommerce /></ProtectedRoute>
  },
  {
    path: '/projects',
    element: <ProtectedRoute><ProjectsDashboard /></ProtectedRoute>
  },
  {
    path: '/projects/management',
    element: <ProtectedRoute><Projects /></ProtectedRoute>
  },
  {
    path: '/logistics',
    element: <ProtectedRoute><Logistics /></ProtectedRoute>
  },

  // Profile & Settings Routes
  {
    path: '/profile',
    element: <ProtectedRoute><Profile /></ProtectedRoute>
  },
  {
    path: '/notifications',
    element: <ProtectedRoute><Notifications /></ProtectedRoute>
  },
  {
    path: '/settings',
    element: <ProtectedRoute><Settings /></ProtectedRoute>
  },

  // Showcase Routes
  {
    path: '/components',
    element: <ProtectedRoute><ComponentsShowcase /></ProtectedRoute>
  },
  {
    path: '/layouts',
    element: <ProtectedRoute><LayoutsShowcase /></ProtectedRoute>
  },

  // Redirect Routes
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />
  }
];