import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import {
  TotalAccountStatement,
  DetailedAccountStatement,
  ReceiptVoucher,
  DisbursementVoucher,
  CreditNoteVoucher,
  DebitNoteVoucher,
  SalesInvoice,
  PurchaseInvoice,
  PriceQuote,
  EmployeeProfile,
  SalarySlip,
  LeaveApplication,
  AttendanceReport,
  OvertimeReport,
  EmployeeContract,
  EndOfServiceReport,
  StockSummaryReport,
  StockMovementReport,
  GoodsReceivedNote,
  DeliveryNote,
  StockAdjustmentForm,
  StockTransferReport,
  ReorderLevelReport,
  InventoryValuationReport,
  ExpiryDateReport,
  DamagedGoodsReport,
  ProjectOverviewReport,
  ProjectStatusReport,
  ProjectBudgetReport,
  ProjectTimelineReport,
  ProjectClosureReport,
  SalesReceipt,
  SalesSummaryReport,
  DailySalesReport,
  ShiftClosureReport,
  RefundReceipt
} from './index';

const TemplatesDemo = () => {
  const { t } = useTranslation();
  const [selectedTemplate, setSelectedTemplate] = useState('salesInvoice');
  const [expandedNodes, setExpandedNodes] = useState({ accounts: true, erp: true, hr: true, inventory: true });

  const breadcrumbs = [
    { label: 'navigation.templates', href: '/templates' }
  ];

  const templateTree = [
    {
      id: 'accounts',
      name: t('navigation.accounts'),
      icon: 'fas fa-calculator text-blue-500 dark:text-blue-400',
      children: [
        { id: 'totalAccountStatement', name: t('templates.accounts.totalAccountStatement.title'), icon: 'fas fa-file-alt text-gray-500 dark:text-gray-400' },
        { id: 'detailedAccountStatement', name: t('templates.accounts.detailedAccountStatement.title'), icon: 'fas fa-list-alt text-gray-500 dark:text-gray-400' },
        { id: 'receiptVoucher', name: t('templates.accounts.receiptVoucher.title'), icon: 'fas fa-receipt text-gray-500 dark:text-gray-400' },
        { id: 'disbursementVoucher', name: t('templates.accounts.disbursementVoucher.title'), icon: 'fas fa-money-check text-gray-500 dark:text-gray-400' },
        { id: 'creditNoteVoucher', name: t('templates.accounts.creditNoteVoucher.title'), icon: 'fas fa-plus-circle text-gray-500 dark:text-gray-400' },
        { id: 'debitNoteVoucher', name: t('templates.accounts.debitNoteVoucher.title'), icon: 'fas fa-minus-circle text-gray-500 dark:text-gray-400' }
      ]
    },
    {
      id: 'erp',
      name: 'ERP',
      icon: 'fas fa-cogs text-green-500 dark:text-green-400',
      children: [
        { id: 'salesInvoice', name: t('templates.erp.salesInvoice.title'), icon: 'fas fa-file-invoice-dollar text-gray-500 dark:text-gray-400' },
        { id: 'purchaseInvoice', name: t('templates.erp.purchaseInvoice.title'), icon: 'fas fa-shopping-cart text-gray-500 dark:text-gray-400' },
        { id: 'priceQuote', name: t('templates.erp.priceQuote.title'), icon: 'fas fa-quote-right text-gray-500 dark:text-gray-400' }
      ]
    },
    {
      id: 'hr',
      name: t('templates.hr.title'),
      icon: 'fas fa-users text-purple-500 dark:text-purple-400',
      children: [
        { id: 'employeeProfile', name: t('templates.hr.employeeProfile.title'), icon: 'fas fa-user text-gray-500 dark:text-gray-400' },
        { id: 'salarySlip', name: t('templates.hr.salarySlip.title'), icon: 'fas fa-money-bill text-gray-500 dark:text-gray-400' },
        { id: 'leaveApplication', name: t('templates.hr.leaveApplication.title'), icon: 'fas fa-calendar-times text-gray-500 dark:text-gray-400' },
        { id: 'attendanceReport', name: t('templates.hr.attendanceReport.title'), icon: 'fas fa-clock text-gray-500 dark:text-gray-400' },
        { id: 'overtimeReport', name: t('templates.hr.overtimeReport.title'), icon: 'fas fa-business-time text-gray-500 dark:text-gray-400' },
        { id: 'employeeContract', name: t('templates.hr.employeeContract.title'), icon: 'fas fa-file-contract text-gray-500 dark:text-gray-400' },
        { id: 'endOfServiceReport', name: t('templates.hr.endOfServiceReport.title'), icon: 'fas fa-handshake text-gray-500 dark:text-gray-400' }
      ]
    },
    {
      id: 'inventory',
      name: t('templates.inventory.title'),
      icon: 'fas fa-warehouse text-orange-500 dark:text-orange-400',
      children: [
        { id: 'stockSummaryReport', name: t('templates.inventory.stockSummaryReport.title'), icon: 'fas fa-boxes text-gray-500 dark:text-gray-400' },
        { id: 'stockMovementReport', name: t('templates.inventory.stockMovementReport.title'), icon: 'fas fa-exchange-alt text-gray-500 dark:text-gray-400' },
        { id: 'goodsReceivedNote', name: t('templates.inventory.goodsReceivedNote.title'), icon: 'fas fa-truck-loading text-gray-500 dark:text-gray-400' },
        { id: 'deliveryNote', name: t('templates.inventory.deliveryNote.title'), icon: 'fas fa-shipping-fast text-gray-500 dark:text-gray-400' },
        { id: 'stockAdjustmentForm', name: t('templates.inventory.stockAdjustmentForm.title'), icon: 'fas fa-edit text-gray-500 dark:text-gray-400' },
        { id: 'stockTransferReport', name: t('templates.inventory.stockTransferReport.title'), icon: 'fas fa-dolly text-gray-500 dark:text-gray-400' },
        { id: 'reorderLevelReport', name: t('templates.inventory.reorderLevelReport.title'), icon: 'fas fa-exclamation-triangle text-gray-500 dark:text-gray-400' },
        { id: 'inventoryValuationReport', name: t('templates.inventory.inventoryValuationReport.title'), icon: 'fas fa-calculator text-gray-500 dark:text-gray-400' },
        { id: 'expiryDateReport', name: t('templates.inventory.expiryDateReport.title'), icon: 'fas fa-calendar-alt text-gray-500 dark:text-gray-400' },
        { id: 'damagedGoodsReport', name: t('templates.inventory.damagedGoodsReport.title'), icon: 'fas fa-exclamation-circle text-gray-500 dark:text-gray-400' }
      ]
    },
    {
      id: 'projects',
      name: t('templates.projects.title'),
      icon: 'fas fa-project-diagram text-indigo-500 dark:text-indigo-400',
      children: [
        { id: 'projectOverviewReport', name: t('templates.projects.projectOverviewReport.title'), icon: 'fas fa-eye text-gray-500 dark:text-gray-400' },
        { id: 'projectStatusReport', name: t('templates.projects.projectStatusReport.title'), icon: 'fas fa-tasks text-gray-500 dark:text-gray-400' },
        { id: 'projectBudgetReport', name: t('templates.projects.projectBudgetReport.title'), icon: 'fas fa-dollar-sign text-gray-500 dark:text-gray-400' },
        { id: 'projectTimelineReport', name: t('templates.projects.projectTimelineReport.title'), icon: 'fas fa-calendar-alt text-gray-500 dark:text-gray-400' },
        { id: 'projectClosureReport', name: t('templates.projects.projectClosureReport.title'), icon: 'fas fa-flag-checkered text-gray-500 dark:text-gray-400' }
      ]
    },
    {
      id: 'pos',
      name: t('templates.pos.title'),
      icon: 'fas fa-cash-register text-teal-500 dark:text-teal-400',
      children: [
        { id: 'salesReceipt', name: t('templates.pos.salesReceipt.title'), icon: 'fas fa-receipt text-gray-500 dark:text-gray-400' },
        { id: 'salesSummaryReport', name: t('templates.pos.salesSummaryReport.title'), icon: 'fas fa-chart-bar text-gray-500 dark:text-gray-400' },
        { id: 'dailySalesReport', name: t('templates.pos.dailySalesReport.title'), icon: 'fas fa-calendar-day text-gray-500 dark:text-gray-400' },
        { id: 'shiftClosureReport', name: t('templates.pos.shiftClosureReport.title'), icon: 'fas fa-user-clock text-gray-500 dark:text-gray-400' },
        { id: 'refundReceipt', name: t('templates.pos.refundReceipt.title'), icon: 'fas fa-undo text-gray-500 dark:text-gray-400' }
      ]
    }
  ];

  const renderTemplate = () => {
    const commonOrgData = {
      organizationName: "TechCorp Solutions Ltd.",
      address: "123 Business District, Tech City, TC 12345",
      phone: "+1 (555) 123-4567",
      email: "info@techcorp.com",
      website: "www.techcorp.com",
      taxId: "TAX123456789"
    };

    switch (selectedTemplate) {
      case 'totalAccountStatement':
        return <TotalAccountStatement organizationData={commonOrgData} />;
      case 'detailedAccountStatement':
        return <DetailedAccountStatement organizationData={commonOrgData} />;
      case 'receiptVoucher':
        return <ReceiptVoucher organizationData={commonOrgData} />;
      case 'disbursementVoucher':
        return <DisbursementVoucher organizationData={commonOrgData} />;
      case 'creditNoteVoucher':
        return <CreditNoteVoucher organizationData={commonOrgData} />;
      case 'debitNoteVoucher':
        return <DebitNoteVoucher organizationData={commonOrgData} />;
      case 'salesInvoice':
        return <SalesInvoice organizationData={commonOrgData} />;
      case 'purchaseInvoice':
        return <PurchaseInvoice organizationData={commonOrgData} />;
      case 'priceQuote':
        return <PriceQuote organizationData={commonOrgData} />;
      case 'employeeProfile':
        return <EmployeeProfile organizationData={commonOrgData} />;
      case 'salarySlip':
        return <SalarySlip organizationData={commonOrgData} />;
      case 'leaveApplication':
        return <LeaveApplication organizationData={commonOrgData} />;
      case 'attendanceReport':
        return <AttendanceReport organizationData={commonOrgData} />;
      case 'overtimeReport':
        return <OvertimeReport organizationData={commonOrgData} />;
      case 'employeeContract':
        return <EmployeeContract organizationData={commonOrgData} />;
      case 'endOfServiceReport':
        return <EndOfServiceReport organizationData={commonOrgData} />;
      case 'stockSummaryReport':
        return <StockSummaryReport organizationData={commonOrgData} />;
      case 'stockMovementReport':
        return <StockMovementReport organizationData={commonOrgData} />;
      case 'goodsReceivedNote':
        return <GoodsReceivedNote organizationData={commonOrgData} />;
      case 'deliveryNote':
        return <DeliveryNote organizationData={commonOrgData} />;
      case 'stockAdjustmentForm':
        return <StockAdjustmentForm organizationData={commonOrgData} />;
      case 'stockTransferReport':
        return <StockTransferReport organizationData={commonOrgData} />;
      case 'reorderLevelReport':
        return <ReorderLevelReport organizationData={commonOrgData} />;
      case 'inventoryValuationReport':
        return <InventoryValuationReport organizationData={commonOrgData} />;
      case 'expiryDateReport':
        return <ExpiryDateReport organizationData={commonOrgData} />;
      case 'damagedGoodsReport':
        return <DamagedGoodsReport organizationData={commonOrgData} />;
      case 'projectOverviewReport':
        return <ProjectOverviewReport organizationData={commonOrgData} />;
      case 'projectStatusReport':
        return <ProjectStatusReport organizationData={commonOrgData} />;
      case 'projectBudgetReport':
        return <ProjectBudgetReport organizationData={commonOrgData} />;
      case 'projectTimelineReport':
        return <ProjectTimelineReport organizationData={commonOrgData} />;
      case 'projectClosureReport':
        return <ProjectClosureReport organizationData={commonOrgData} />;
      case 'salesReceipt':
        return <SalesReceipt organizationData={commonOrgData} />;
      case 'salesSummaryReport':
        return <SalesSummaryReport organizationData={commonOrgData} />;
      case 'dailySalesReport':
        return <DailySalesReport organizationData={commonOrgData} />;
      case 'shiftClosureReport':
        return <ShiftClosureReport organizationData={commonOrgData} />;
      case 'refundReceipt':
        return <RefundReceipt organizationData={commonOrgData} />;
      default:
        return <SalesInvoice organizationData={commonOrgData} />;
    }
  };

  const toggleNode = (nodeId) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const selectTemplate = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const findTemplateInTree = (templateId) => {
    for (const category of templateTree) {
      const template = category.children.find(t => t.id === templateId);
      if (template) {
        return { ...template, category: category.id };
      }
    }
    return null;
  };

  const renderTreeNode = (node, level = 0) => (
    <div key={node.id} className={`ms-${level * 2}`}>
      <div
        className={`tree-node flex items-center py-1 px-2 rounded cursor-pointer transition-colors hover:bg-primary-50 dark:hover:bg-primary-900/20 ${
          selectedTemplate === node.id 
            ? 'bg-primary-100 dark:bg-primary-900/30 border-s-2 border-s-primary-500' 
            : ''
        }`}
        onClick={() => node.children ? null : selectTemplate(node.id)}
      >
        {node.children && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleNode(node.id);
            }}
            className="me-1 p-0.5 rounded hover:bg-primary-200 dark:hover:bg-primary-800"
          >
            <i className={`fas fa-chevron-${expandedNodes[node.id] ? 'down' : 'right'} text-gray-500 dark:text-gray-400 text-xs`} />
          </button>
        )}
        {!node.children && <span className="w-3 me-1" />}
        <i className={`${node.icon} me-2 text-sm`} />
        <span className={`${node.children ? 'font-medium text-gray-900 dark:text-white text-sm' : 'text-gray-700 dark:text-gray-300 text-xs'} flex-1`}>
          {node.name}
        </span>
        {selectedTemplate === node.id && (
          <i className="fas fa-check-circle text-primary-500 text-xs" />
        )}
      </div>
      {node.children && expandedNodes[node.id] && (
        <div className="ms-2 space-y-0.5">
          {node.children.map(child => renderTreeNode(child, level + 1))}
        </div>
      )}
    </div>
  );

  const selectedTemplateData = findTemplateInTree(selectedTemplate);

  return (
    <DashboardLayout title="navigation.templates" breadcrumbs={breadcrumbs}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Template Selection Sidebar */}
        <div className="lg:col-span-1">
          <div className="card h-full">
            <div className="p-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-t-lg">
              <div className="flex items-center">
                <i className="fas fa-sitemap me-3 text-xl" />
                <h3 className="text-lg font-semibold">{t('navigation.templates')}</h3>
              </div>
            </div>
            <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
              <div className="space-y-1">
                {templateTree.map(node => renderTreeNode(node))}
              </div>
            </div>
          </div>
        </div>

        {/* Template Preview */}
        <div className="lg:col-span-3">
          <Card>
            <div className="flex justify-between items-center mb-6 print:hidden">
              <div className="flex items-center">
                <i className={`${selectedTemplateData?.icon} text-primary-500 me-3`} />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedTemplateData?.name}
                  </h2>
                  <Badge variant={selectedTemplateData?.category === 'accounts' ? 'info' : selectedTemplateData?.category === 'erp' ? 'success' : selectedTemplateData?.category === 'hr' ? 'warning' : 'secondary'}>
                    {selectedTemplateData?.category === 'accounts' ? t('navigation.accounts') : 
                     selectedTemplateData?.category === 'erp' ? 'ERP' :
                     selectedTemplateData?.category === 'hr' ? 'HR' : 'Inventory'}
                  </Badge>
                </div>
              </div>
              <Button 
                variant="primary" 
                onClick={() => {
                  const printContent = document.querySelector('.report');
                  const originalContent = document.body.innerHTML;
                  document.body.innerHTML = printContent.innerHTML;
                  window.print();
                  document.body.innerHTML = originalContent;
                  window.location.reload();
                }}
              >
                <i className="fas fa-print me-2" />
                {t('common.print')}
              </Button>
            </div>
            
            <div className="report bg-white overflow-hidden border border-black p-5">
              <div className="border border-black rounded-md p-2 ">
              {renderTemplate()}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TemplatesDemo;