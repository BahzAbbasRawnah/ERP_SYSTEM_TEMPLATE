import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import PublicRoute from '../components/PublicRoute';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
/**
 * DeliveryNote component for displaying delivery note information
 * @param {Object} organizationData - Organization details
 * @param {Object} deliveryData - Delivery details
 */
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
import SalesReports from '../pages/sales/reports/index';
import SalesPerformance from '../pages/sales/reports/SalesPerformance';
import CustomerSalesAnalysis from '../pages/sales/reports/CustomerSalesAnalysis';
import ProductSalesAnalysis from '../pages/sales/reports/ProductSalesAnalysis';
import SalesTeamPerformance from '../pages/sales/reports/SalesTeamPerformance';
import RegionalSales from '../pages/sales/reports/RegionalSales';
import SalesForecast from '../pages/sales/reports/SalesForecast';

// Purchases
import PurchasesDashboard from '../pages/purchases/index';
import Purchasing from '../pages/purchases/Purchasing';
import Suppliers from '../pages/purchases/Suppliers';
import Contracts from '../pages/purchases/Contracts';
import PurchasesReports from '../pages/purchases/reports/index';
import PurchaseAnalysis from '../pages/purchases/reports/PurchaseAnalysis';
import SupplierPerformance from '../pages/purchases/reports/SupplierPerformance';
import PurchaseOrderTracking from '../pages/purchases/reports/PurchaseOrderTracking';
import CostAnalysis from '../pages/purchases/reports/CostAnalysis';
import InventoryPurchaseNeeds from '../pages/purchases/reports/InventoryPurchaseNeeds';
import ContractCompliance from '../pages/purchases/reports/ContractCompliance';

// CRM
// CRM
import CRMDashboard from '../pages/crm/index';
import CRMManagement from '../pages/crm/CRMManagement';
import CRMReports from '../pages/crm/reports/index';

// HR
import HRDashboard from '../pages/hr/index';
import HumanResources from '../pages/hr/HumanResources';
import Employees from '../pages/hr/Employees';
import Attendance from '../pages/hr/Attendance';
import Leaves from '../pages/hr/Leaves';
import Payroll from '../pages/hr/Payroll';
import HRReports from '../pages/hr/reports/index';
import AttendanceReport from '../pages/hr/reports/AttendanceReport';
import SalarySlip from '../pages/hr/reports/SalarySlip';
import LeaveApplication from '../pages/hr/reports/LeaveApplication';
import EmployeeProfile from '../pages/hr/reports/EmployeeProfile';
import EndOfServiceReport from '../pages/hr/reports/EndOfServiceReport';
import OvertimeReport from '../pages/hr/reports/OvertimeReport';
import EmployeeContract from '../pages/hr/reports/EmployeeContract';

// Inventory
import InventoryDashboard from '../pages/inventory/index';
import InventoryManagement from '../pages/inventory/InventoryManagement';
import Products from '../pages/inventory/Products';
import Stores from '../pages/inventory/Stores';
import Transfers from '../pages/inventory/Transfers';
import InventoryReports from '../pages/inventory/reports/index';
import StockSummaryReport from '../pages/inventory/reports/StockSummaryReport';
import StockMovementReport from '../pages/inventory/reports/StockMovementReport';
import DamagedGoodsReport from '../pages/inventory/reports/DamagedGoodsReport';
import GoodsReceivedNote from '../pages/inventory/reports/GoodsReceivedNote';
import ExpiryDateReport from '../pages/inventory/reports/ExpiryDateReport';
import StockAdjustmentForm from '../pages/inventory/reports/StockAdjustmentForm';
import ReorderLevelReport from '../pages/inventory/reports/ReorderLevelReport';
import StockTransferReport from '../pages/inventory/reports/StockTransferReport';

// POS
import POSDashboard from '../pages/pos/index';
import POS from '../pages/pos/POS';
import POSSales from '../pages/pos/POSSales';
import POSProducts from '../pages/pos/POSProducts';
import POSCustomers from '../pages/pos/POSCustomers';
import POSReports from '../pages/pos/POSReports';
import DailySalesReport from '../pages/pos/reports/DailySalesReport';
import RefundReceipt from '../pages/pos/reports/RefundReceipt';
import SalesReceipt from '../pages/pos/reports/SalesReceipt';
import SalesSummaryReport from '../pages/pos/reports/SalesSummaryReport';
import ShiftClosureReport from '../pages/pos/reports/ShiftClosureReport';

// Finance
import FinanceDashboard from '../pages/finance/index';
import Accounting from '../pages/finance/Accounting';
import Accounts from '../pages/finance/Accounts';
import Receipts from '../pages/finance/Receipts';
import Transactions from '../pages/finance/Transactions';
import FinanceReports from '../pages/finance/reports/index';
import TotalAccountStatement from '../pages/finance/reports/TotalAccountStatement';
import CreditNoteVoucher from '../pages/finance/reports/CreditNoteVoucher';
import DebitNoteVoucher from '../pages/finance/reports/DebitNoteVoucher';
import DetailedAccountStatement from '../pages/finance/reports/DetailedAccountStatement';
import DisbursementVoucher from '../pages/finance/reports/DisbursementVoucher';
import ReceiptVoucher from '../pages/finance/reports/ReceiptVoucher';

// Tenants
import TenantsManagement from '../pages/tenants/TenantsManagement';
import TenantsList from '../pages/tenants/TenantsList';
import TenantDetails from '../pages/tenants/TenantDetails';
import SubscriptionPlans from '../pages/tenants/SubscriptionPlans';

// RBAC
import RBACDashboard from '../pages/rbac/index';
import Users from '../pages/rbac/Users';
import Roles from '../pages/rbac/Roles';
import Permissions from '../pages/rbac/Permissions';
import Assignments from '../pages/rbac/Assignments';

// Other Modules
import EcommerceDashboard from '../pages/ecommerce/index';
import Ecommerce from '../pages/ecommerce/Ecommerce';
import EcommerceReports from '../pages/ecommerce/reports/index';
import ProjectsDashboard from '../pages/projects/index';
import Projects from '../pages/projects/Projects';
import ProjectsReports from '../pages/projects/reports/index';
import ProjectBudgetReport from '../pages/projects/reports/ProjectBudgetReport';
import ProjectClosureReport from '../pages/projects/reports/ProjectClosureReport';
import ProjectOverviewReport from '../pages/projects/reports/ProjectOverviewReport';
import ProjectStatusReport from '../pages/projects/reports/ProjectStatusReport';
import ProjectTimelineReport from '../pages/projects/reports/ProjectTimelineReport';
import Logistics from '../pages/logistics/Logistics';

// Profile & Settings
import Profile from '../pages/profile/Profile';
import Notifications from '../pages/profile/Notifications';
import Settings from '../pages/settings/Settings';


// Showcase
import ComponentsShowcase from '../pages/ComponentsShowcase';
import LayoutsShowcase from '../pages/LayoutsShowcase';

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
  {
    path: '/sales/reports',
    element: <ProtectedRoute><SalesReports /></ProtectedRoute>
  },
  {
    path: '/sales/reports/sales-performance',
    element: <ProtectedRoute><SalesPerformance /></ProtectedRoute>
  },
  {
    path: '/sales/reports/customer-sales-analysis',
    element: <ProtectedRoute><CustomerSalesAnalysis /></ProtectedRoute>
  },
  {
    path: '/sales/reports/product-sales-analysis',
    element: <ProtectedRoute><ProductSalesAnalysis /></ProtectedRoute>
  },
  {
    path: '/sales/reports/sales-team-performance',
    element: <ProtectedRoute><SalesTeamPerformance /></ProtectedRoute>
  },
  {
    path: '/sales/reports/regional-sales',
    element: <ProtectedRoute><RegionalSales /></ProtectedRoute>
  },
  {
    path: '/sales/reports/sales-forecast',
    element: <ProtectedRoute><SalesForecast /></ProtectedRoute>
  },

  // Purchases Routes
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
  {
    path: '/purchases/reports',
    element: <ProtectedRoute><PurchasesReports /></ProtectedRoute>
  },
  {
    path: '/purchases/reports/purchase-analysis',
    element: <ProtectedRoute><PurchaseAnalysis /></ProtectedRoute>
  },
  {
    path: '/purchases/reports/supplier-performance',
    element: <ProtectedRoute><SupplierPerformance /></ProtectedRoute>
  },
  {
    path: '/purchases/reports/purchase-order-tracking',
    element: <ProtectedRoute><PurchaseOrderTracking /></ProtectedRoute>
  },
  {
    path: '/purchases/reports/cost-analysis',
    element: <ProtectedRoute><CostAnalysis /></ProtectedRoute>
  },
  {
    path: '/purchases/reports/inventory-purchase-needs',
    element: <ProtectedRoute><InventoryPurchaseNeeds /></ProtectedRoute>
  },
  {
    path: '/purchases/reports/contract-compliance',
    element: <ProtectedRoute><ContractCompliance /></ProtectedRoute>
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
  {
    path: '/crm/reports',
    element: <ProtectedRoute><CRMReports /></ProtectedRoute>
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
  {
    path: '/hr/reports',
    element: <ProtectedRoute><HRReports /></ProtectedRoute>
  },
  {
    path: '/hr/reports/attendance-report',
    element: <ProtectedRoute><AttendanceReport /></ProtectedRoute>
  },
  {
    path: '/hr/reports/salary-slip',
    element: <ProtectedRoute><SalarySlip /></ProtectedRoute>
  },
  {
    path: '/hr/reports/leave-application',
    element: <ProtectedRoute><LeaveApplication /></ProtectedRoute>
  },
  {
    path: '/hr/reports/employee-profile',
    element: <ProtectedRoute><EmployeeProfile /></ProtectedRoute>
  },
  {
    path: '/hr/reports/end-of-service-report',
    element: <ProtectedRoute><EndOfServiceReport /></ProtectedRoute>
  },
  {
    path: '/hr/reports/overtime-report',
    element: <ProtectedRoute><OvertimeReport /></ProtectedRoute>
  },
  {
    path: '/hr/reports/employee-contract',
    element: <ProtectedRoute><EmployeeContract /></ProtectedRoute>
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
  {
    path: '/inventory/reports',
    element: <ProtectedRoute><InventoryReports /></ProtectedRoute>
  },
  {
    path: '/inventory/reports/stock-summary-report',
    element: <ProtectedRoute><StockSummaryReport /></ProtectedRoute>
  },
  {
    path: '/inventory/reports/stock-movement-report',
    element: <ProtectedRoute><StockMovementReport /></ProtectedRoute>
  },
  {
    path: '/inventory/reports/damaged-goods-report',
    element: <ProtectedRoute><DamagedGoodsReport /></ProtectedRoute>
  },
  {
    path: '/inventory/reports/goods-received-note',
    element: <ProtectedRoute><GoodsReceivedNote /></ProtectedRoute>
  },
  {
    path: '/inventory/reports/expiry-date-report',
    element: <ProtectedRoute><ExpiryDateReport /></ProtectedRoute>
  },
  {
    path: '/inventory/reports/stock-adjustment-form',
    element: <ProtectedRoute><StockAdjustmentForm /></ProtectedRoute>
  },
  {
    path: '/inventory/reports/reorder-level-report',
    element: <ProtectedRoute><ReorderLevelReport /></ProtectedRoute>
  },
  {
    path: '/inventory/reports/stock-transfer-report',
    element: <ProtectedRoute><StockTransferReport /></ProtectedRoute>
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
  {
    path: '/pos/reports/daily-sales-report',
    element: <ProtectedRoute><DailySalesReport /></ProtectedRoute>
  },
  {
    path: '/pos/reports/refund-receipt',
    element: <ProtectedRoute><RefundReceipt /></ProtectedRoute>
  },
  {
    path: '/pos/reports/sales-receipt',
    element: <ProtectedRoute><SalesReceipt /></ProtectedRoute>
  },
  {
    path: '/pos/reports/sales-summary-report',
    element: <ProtectedRoute><SalesSummaryReport /></ProtectedRoute>
  },
  {
    path: '/pos/reports/shift-closure-report',
    element: <ProtectedRoute><ShiftClosureReport /></ProtectedRoute>
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
  {
    path: '/finance/reports',
    element: <ProtectedRoute><FinanceReports /></ProtectedRoute>
  },
  {
    path: '/finance/reports/total-account-statement',
    element: <ProtectedRoute><TotalAccountStatement /></ProtectedRoute>
  },
  {
    path: '/finance/reports/credit-note-voucher',
    element: <ProtectedRoute><CreditNoteVoucher /></ProtectedRoute>
  },
  {
    path: '/finance/reports/debit-note-voucher',
    element: <ProtectedRoute><DebitNoteVoucher /></ProtectedRoute>
  },
  {
    path: '/finance/reports/detailed-account-statement',
    element: <ProtectedRoute><DetailedAccountStatement /></ProtectedRoute>
  },
  {
    path: '/finance/reports/disbursement-voucher',
    element: <ProtectedRoute><DisbursementVoucher /></ProtectedRoute>
  },
  {
    path: '/finance/reports/receipt-voucher',
    element: <ProtectedRoute><ReceiptVoucher /></ProtectedRoute>
  },

  // Tenants Routes
  {
    path: '/tenants',
    element: <ProtectedRoute><TenantsManagement /></ProtectedRoute>
  },
  {
    path: '/tenants/list',
    element: <ProtectedRoute><TenantsList /></ProtectedRoute>
  },
  {
    path: '/tenants/details/:tenantId',
    element: <ProtectedRoute><TenantDetails /></ProtectedRoute>
  },
  {
    path: '/tenants/plans',
    element: <ProtectedRoute><SubscriptionPlans /></ProtectedRoute>
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
    path: '/ecommerce/reports',
    element: <ProtectedRoute><EcommerceReports /></ProtectedRoute>
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
    path: '/projects/reports',
    element: <ProtectedRoute><ProjectsReports /></ProtectedRoute>
  },
  {
    path: '/projects/reports/project-budget-report',
    element: <ProtectedRoute><ProjectBudgetReport /></ProtectedRoute>
  },
  {
    path: '/projects/reports/project-closure-report',
    element: <ProtectedRoute><ProjectClosureReport /></ProtectedRoute>
  },
  {
    path: '/projects/reports/project-overview-report',
    element: <ProtectedRoute><ProjectOverviewReport /></ProtectedRoute>
  },
  {
    path: '/projects/reports/project-status-report',
    element: <ProtectedRoute><ProjectStatusReport /></ProtectedRoute>
  },
  {
    path: '/projects/reports/project-timeline-report',
    element: <ProtectedRoute><ProjectTimelineReport /></ProtectedRoute>
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
