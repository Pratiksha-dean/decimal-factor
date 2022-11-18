import React, { useState } from "react";
import Customers from "./Codat/Customers";
import Invoices from "./Codat/Invoices";
import Payments from "./Codat/Payments";
import CreditNotes from "./Codat/CreditNotes";
import DirectIncome from "./Codat/DirectIncome";
import Suppliers from "./Codat/Suppliers";
import PurchaseOrders from "./Codat/PurchaseOrders";
import Bills from "./Codat/Bills";
import BillPayments from "./Codat/BillPayments";
import BillCreditNotes from "./Codat/BillCreditNotes";
import DirectCost from "./Codat/DirectCost";
import Accounts from "./Codat/Accounts";
import JournalEntries from "./Codat/JournalEntries";
import TaxRates from "./Codat/TaxRates";
import TrackingCategories from "./Codat/TrackingCategories";
import AccountTransactions from "./Codat/AccountTransactions";
import Transfers from "./Codat/Transfers";
import Items from "./Codat/Items";
import AssessProfitAndLoss from "./Codat/assess_profitandloss";
import AssessBalanceSheet from "./Codat/assess_balancesheet";
import AssessCommerce from "./Codat/assess_commerce";
import AssessMarketing from "./Codat/assess_marketing";
import { Link } from "react-router-dom";
import CommerceCustomers from "./Codat/CommerceCustomers";
import CommerceDisputes from "./Codat/CommerceDisputes";
import CommerceOrders from "./Codat/CommerceOrders";
import CommercePayments from "./Codat/CommercePayments";
import CommerceProducts from "./Codat/CommerceProducts";
import CommerceTransactions from "./Codat/CommerceTransactions";
import CommerceLocation from "./Codat/CommerceLocation";
import CommerceCompanyinfo from "./Codat/CommerceCompanyinfo";
import BalanceSheet from "./Codat/BalanceSheet";
import ProfitLoss from "./Codat/ProfitLoss";
import OperatingFlow from "./Codat/OperatingFlow";
import Debtors from "./Codat/Debtors";
import AgedCreditors from "./Codat/AgedCreditors";
import ExportFiles from "./Codat/ExportFiles";
import { getUserDetails } from "./login/loginpage";

export default function Codat() {
  const [accountingApiValue, setAccountingApiValue] = useState("");
  const [assessApiValue, setAssessApiValue] = useState("");
  const [commerceApiValue, setCommerceApiValue] = useState("");
  const [currentApi, setCurrentApi] = useState("");
  const userDetails = getUserDetails();
  const leadId = userDetails["lead_id"];
  const serverUrl = "https://sales.decimalfactor.com/staging/";
  const endUrl = "https://sales.decimalfactor.com/staging/api";
  const handleCodat = (codatView) => {
    if (codatView === "accounting") {
      setCurrentApi(accountingApiValue);
      setAssessApiValue("");
      setCommerceApiValue("");
    }
    if (codatView === "assess") {
      setCurrentApi(assessApiValue);
      setAccountingApiValue("");
      setCommerceApiValue("");
    }
    if (codatView === "commerce") {
      setCurrentApi(commerceApiValue);
      setAccountingApiValue("");
      setAssessApiValue("");
    }
  };

  const accountApiData = [
    { label: "--Select--", value: "" },
    { label: "Balance sheet", value: "balancesheet" },
    { label: "Operating cash flow", value: "operating_flow" },
    { label: "Profit & loss", value: "profit_loss" },
    { label: "Customers", value: "Customers" },
    { label: "Invoices", value: "Invoices" },
    { label: "Payments", value: "Payments" },
    { label: "Credit Notes", value: "CreditNotes" },
    { label: "Aged Debtors", value: "AgedDebtors" },
    { label: "Direct Income", value: "DirectIncome" },
    { label: "Suppliers", value: "Suppliers" },
    { label: "PurchaseOrder", value: "PurchaseOrder" },
    { label: "Bills", value: "Bills" },
    { label: "Bill Payment", value: "BillPayment" },
    { label: "Bill Credit Notes", value: "BillCreditNotes" },
    { label: "Aged Creditors", value: "agedcreditors" },
    { label: "Direct costs", value: "DirectCosts" },
    { label: "Accounts", value: "Accounts" },
    { label: "Journal Entries", value: "JournalEntries" },
    { label: "Tax Rates", value: "TaxRates" },
    { label: "Tracking Categories", value: "TrackingCategories" },
    { label: "Account transactions", value: "AccountTransactions" },
    { label: "Transfers", value: "Transfers" },
    { label: "Company", value: "Company" },
    { label: "Items", value: "Items" },
  ];

  const assessApiList = [
    { label: "--Select--", value: "" },
    { label: "Profit and Loss", value: "assess_profitandloss" },
    { label: "Balance Sheet", value: "assess_balancesheet" },
    { label: "Commerce", value: "assess_commerce" },
    { label: "Marketing", value: "assess_marketing" },
  ];

  const commerceApiList = [
    { label: "--Select--", value: "" },
    { label: "Company info", value: "Commerce_Company_info" },
    { label: "Customers", value: "Commerce_Customers" },
    { label: "Disputes", value: "Commerce_Disputes" },
    { label: "Orders", value: "Commerce_Orders" },
    { label: "Payments", value: "Commerce_Payments" },
    { label: "Products", value: "Commerce_Products" },
    { label: "Transactions", value: "Commerce_Transactions" },
    { label: "Location", value: "Commerce_Location" },
  ];

  return (
    <div>
      <div className="accouting-info">
        <div className="">
          <div className="row">
            <div className="col-md-3">
              <label for="basic-url" className="form-label mb-0">
                Accouting
              </label>

              <div className="d-flex">
                <select
                  className="form-select  form-control"
                  aria-label="Accouting API"
                  style={{ marginRight: "10px" }}
                  onChange={(e) => setAccountingApiValue(e.target.value)}
                  value={accountingApiValue}
                >
                  {accountApiData.map((item, i) => {
                    return (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
                <button
                  className="btn btn-primary go-btn"
                  onClick={() => handleCodat("accounting")}
                >
                  Go
                </button>
              </div>
            </div>

        {currentApi==='Customers' && <Customers title="Customers" leadId={leadId} endUrl={endUrl}/>}
        {currentApi==='Invoices' && <Invoices title="Invoices" leadId={leadId} endUrl={endUrl}/>}
        {currentApi==='Payments' && <Payments title="Payments" leadId={leadId} endUrl={endUrl}/>}
        {currentApi==='CreditNotes' && <CreditNotes title="Credit Notes" leadId={leadId} endUrl={endUrl}/>}
        {currentApi==='DirectIncome' && <DirectIncome title="Direct Incomes" leadId={leadId} endUrl={endUrl}/>}
        {currentApi==='Suppliers' && <Suppliers title="Suppliers" leadId={leadId} endUrl={endUrl}/>}
        {currentApi==='PurchaseOrder' && <PurchaseOrders title="Purchase Orders" leadId={leadId} endUrl={endUrl}/>}
        {currentApi==='Bills' && <Bills title="Bills" leadId={leadId} endUrl={endUrl}/>}
        {currentApi==='BillPayment' && <BillPayments title="Bill Payments" leadId={leadId} endUrl={endUrl}/>}
        {currentApi==='BillCreditNotes' && <BillCreditNotes title="Bill Credit Notes" leadId={leadId} endUrl={endUrl}/>}
        {currentApi==='DirectCosts' && <DirectCost title="Direct Costs" leadId={leadId} endUrl={endUrl}/>}
        {currentApi==='Accounts' && <Accounts title="Accounts" leadId={leadId} endUrl={endUrl}/>}
        {currentApi==='JournalEntries' && <JournalEntries title="Journal Entries" leadId={leadId} endUrl={endUrl}/>}
        {currentApi==='TaxRates' && <TaxRates title="Tax Rates" leadId={leadId} endUrl={endUrl}/>}
        {currentApi==='TrackingCategories' && <TrackingCategories title="Tracking Categories" leadId={leadId} endUrl={endUrl}/>}
        {currentApi==='AccountTransactions' && <AccountTransactions title="Account Transactions" leadId={leadId} endUrl={endUrl}/>}
        {currentApi==='Transfers' && <Transfers title="Transfers" leadId={leadId} endUrl={endUrl}/>}
        {currentApi==='Items' && <Items title="Items" leadId={leadId} endUrl={endUrl}/>}
        {currentApi==='balancesheet' && <BalanceSheet leadId={leadId} endUrl={endUrl}/>}
        {currentApi==='operating_flow' && <OperatingFlow leadId={leadId} endUrl={endUrl}/>}
        {currentApi==='profit_loss' && <ProfitLoss leadId={leadId} endUrl={endUrl}/>}
        {currentApi==='Company' && <CommerceCompanyinfo title="Customers" leadId={leadId} endUrl={endUrl}/>}
        {currentApi==='AgedDebtors' && <Debtors title="Customers" leadId={leadId} endUrl={endUrl}/>}
        {currentApi==='agedcreditors' && <AgedCreditors title="Customers" leadId={leadId} endUrl={endUrl}/>}

        {currentApi==='assess_profitandloss' && <AssessProfitAndLoss leadId={leadId} endUrl={endUrl}/>}
        {currentApi==='assess_balancesheet' && <AssessBalanceSheet leadId={leadId} endUrl={endUrl}/>}
        {currentApi==='assess_commerce' && <AssessCommerce leadId={leadId} endUrl={endUrl}/>}
        {currentApi==='assess_marketing' && <AssessMarketing leadId={leadId} endUrl={endUrl}/>}


            {currentApi === "Customers" && (
              <Customers title="Customers" leadId={leadId} endUrl={endUrl} />
            )}
            {currentApi === "Invoices" && (
              <Invoices title="Invoices" leadId={leadId} endUrl={endUrl} />
            )}
            {currentApi === "Payments" && (
              <Payments title="Payments" leadId={leadId} endUrl={endUrl} />
            )}
            {currentApi === "CreditNotes" && (
              <CreditNotes
                title="Credit Notes"
                leadId={leadId}
                endUrl={endUrl}
              />
            )}
            {currentApi === "DirectIncome" && (
              <DirectIncome
                title="Direct Incomes"
                leadId={leadId}
                endUrl={endUrl}
              />
            )}
            {currentApi === "Suppliers" && (
              <Suppliers title="Suppliers" leadId={leadId} endUrl={endUrl} />
            )}
            {currentApi === "PurchaseOrder" && (
              <PurchaseOrders
                title="Purchase Orders"
                leadId={leadId}
                endUrl={endUrl}
              />
            )}
            {currentApi === "Bills" && (
              <Bills title="Bills" leadId={leadId} endUrl={endUrl} />
            )}
            {currentApi === "BillPayment" && (
              <BillPayments
                title="Bill Payments"
                leadId={leadId}
                endUrl={endUrl}
              />
            )}
            {currentApi === "BillCreditNotes" && (
              <BillCreditNotes
                title="Bill Credit Notes"
                leadId={leadId}
                endUrl={endUrl}
              />
            )}
            {currentApi === "DirectCosts" && (
              <DirectCost
                title="Direct Costs"
                leadId={leadId}
                endUrl={endUrl}
              />
            )}
            {currentApi === "Accounts" && (
              <Accounts title="Accounts" leadId={leadId} endUrl={endUrl} />
            )}
            {currentApi === "JournalEntries" && (
              <JournalEntries
                title="Journal Entries"
                leadId={leadId}
                endUrl={endUrl}
              />
            )}
            {currentApi === "TaxRates" && (
              <TaxRates title="Tax Rates" leadId={leadId} endUrl={endUrl} />
            )}
            {currentApi === "TrackingCategories" && (
              <TrackingCategories
                title="Tracking Categories"
                leadId={leadId}
                endUrl={endUrl}
              />
            )}
            {currentApi === "AccountTransactions" && (
              <AccountTransactions
                title="Account Transactions"
                leadId={leadId}
                endUrl={endUrl}
              />
            )}
            {currentApi === "Transfers" && (
              <Transfers title="Transfers" leadId={leadId} endUrl={endUrl} />
            )}
            {currentApi === "Items" && (
              <Items title="Items" leadId={leadId} endUrl={endUrl} />
            )}
            {currentApi === "balancesheet" && (
              <BalanceSheet leadId={leadId} endUrl={endUrl} />
            )}
            {currentApi === "operating_flow" && (
              <OperatingFlow leadId={leadId} endUrl={endUrl} />
            )}
            {currentApi === "profit_loss" && (
              <ProfitLoss leadId={leadId} endUrl={endUrl} />
            )}
            {currentApi === "Company" && (
              <CommerceCompanyinfo
                title="Customers"
                leadId={leadId}
                endUrl={endUrl}
              />
            )}
            {currentApi === "AgedDebtors" && (
              <Debtors title="Customers" leadId={leadId} endUrl={endUrl} />
            )}
            {currentApi === "agedcreditors" && (
              <AgedCreditors
                title="Customers"
                leadId={leadId}
                endUrl={endUrl}
              />
            )}

            {currentApi === "assess_profitandloss" && (
              <AssessProfitAndLoss leadId={leadId} endUrl={endUrl} />
            )}
            {currentApi === "assess_balancesheet" && (
              <AssessBalanceSheet leadId={leadId} endUrl={endUrl} />
            )}
            {currentApi === "assess_commerce" && (
              <AssessCommerce leadId={leadId} endUrl={endUrl} />
            )}
            {currentApi === "assess_marketing" && (
              <AssessMarketing leadId={leadId} endUrl={endUrl} />
            )}

            <div className="d-flex">
              <select
                className="form-select  form-control"
                aria-label="Assess"
                style={{ marginRight: "10px" }}
                onChange={(e) => setAssessApiValue(e.target.value)}
                value={assessApiValue}
              >
                {assessApiList.map((item, i) => {
                  return (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
              <button
                className="btn btn-primary go-btn"
                onClick={() => handleCodat("assess")}
              >
                Go
              </button>
            </div>
          </div>
          <div className="col-md-3">
            <label for="basic-url" className="form-label mb-0">
              Commerce
            </label>

            <div className="d-flex">
              <select
                className="form-select form-control"
                aria-label="Default select example"
                style={{ marginRight: "10px" }}
                onChange={(e) => setCommerceApiValue(e.target.value)}
                value={commerceApiValue}
              >
                {commerceApiList.map((item, i) => {
                  return (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
              <button
                className="btn btn-primary go-btn"
                onClick={() => handleCodat("commerce")}
              >
                Go
              </button>
            </div>
          </div>
          <ExportFiles leadId={leadId} endUrl={endUrl} serverUrl={serverUrl} />
        </div>
      </div>

      {currentApi === "Customers" && (
        <Customers title="Customers" leadId={leadId} endUrl={endUrl} />
      )}
      {currentApi === "Invoices" && (
        <Invoices title="Invoices" leadId={leadId} endUrl={endUrl} />
      )}
      {currentApi === "Payments" && (
        <Payments title="Payments" leadId={leadId} endUrl={endUrl} />
      )}
      {currentApi === "CreditNotes" && (
        <CreditNotes title="Credit Notes" leadId={leadId} endUrl={endUrl} />
      )}
      {currentApi === "DirectIncome" && (
        <DirectIncome title="Direct Incomes" leadId={leadId} endUrl={endUrl} />
      )}
      {currentApi === "Suppliers" && (
        <Suppliers title="Suppliers" leadId={leadId} endUrl={endUrl} />
      )}
      {currentApi === "PurchaseOrder" && (
        <PurchaseOrders
          title="Purchase Orders"
          leadId={leadId}
          endUrl={endUrl}
        />
      )}
      {currentApi === "Bills" && (
        <Bills title="Bills" leadId={leadId} endUrl={endUrl} />
      )}
      {currentApi === "BillPayment" && (
        <BillPayments title="Bill Payments" leadId={leadId} endUrl={endUrl} />
      )}
      {currentApi === "BillCreditNotes" && (
        <BillCreditNotes
          title="Bill Credit Notes"
          leadId={leadId}
          endUrl={endUrl}
        />
      )}
      {currentApi === "DirectCosts" && (
        <DirectCost title="Direct Costs" leadId={leadId} endUrl={endUrl} />
      )}
      {currentApi === "Accounts" && (
        <Accounts title="Accounts" leadId={leadId} endUrl={endUrl} />
      )}
      {currentApi === "JournalEntries" && (
        <JournalEntries
          title="Journal Entries"
          leadId={leadId}
          endUrl={endUrl}
        />
      )}
      {currentApi === "TaxRates" && (
        <TaxRates title="Tax Rates" leadId={leadId} endUrl={endUrl} />
      )}
      {currentApi === "TrackingCategories" && (
        <TrackingCategories
          title="Tracking Categories"
          leadId={leadId}
          endUrl={endUrl}
        />
      )}
      {currentApi === "AccountTransactions" && (
        <AccountTransactions
          title="Account Transactions"
          leadId={leadId}
          endUrl={endUrl}
        />
      )}
      {currentApi === "Transfers" && (
        <Transfers title="Transfers" leadId={leadId} endUrl={endUrl} />
      )}
      {currentApi === "Items" && (
        <Items title="Items" leadId={leadId} endUrl={endUrl} />
      )}
      {currentApi === "balancesheet" && (
        <BalanceSheet leadId={leadId} endUrl={endUrl} />
      )}
      {currentApi === "operating_flow" && (
        <OperatingFlow leadId={leadId} endUrl={endUrl} />
      )}
      {currentApi === "profit_loss" && (
        <ProfitLoss leadId={leadId} endUrl={endUrl} />
      )}
      {currentApi === "Company" && (
        <CommerceCompanyinfo
          title="Customers"
          leadId={leadId}
          endUrl={endUrl}
        />
      )}
      {currentApi === "AgedDebtors" && (
        <Debtors title="Customers" leadId={leadId} endUrl={endUrl} />
      )}
      {currentApi === "agedcreditors" && (
        <AgedCreditors title="Customers" leadId={leadId} endUrl={endUrl} />
      )}

      {currentApi === "assess_profitandloss" && <AssessProfitAndLoss />}
      {currentApi === "assess_balancesheet" && <AssessBalanceSheet />}
      {currentApi === "assess_commerce" && <AssessCommerce />}
      {currentApi === "assess_marketing" && <AssessMarketing />}

      {currentApi === "Commerce_Company_info" && (
        <CommerceCompanyinfo
          title="Company info"
          leadId={leadId}
          endUrl={endUrl}
        />
      )}
      {currentApi === "Commerce_Customers" && (
        <CommerceCustomers title="Customers" leadId={leadId} endUrl={endUrl} />
      )}
      {currentApi === "Commerce_Disputes" && (
        <CommerceDisputes title="Disputes" leadId={leadId} endUrl={endUrl} />
      )}
      {currentApi === "Commerce_Orders" && (
        <CommerceOrders title="Orders" leadId={leadId} endUrl={endUrl} />
      )}
      {currentApi === "Commerce_Payments" && (
        <CommercePayments title="Payments" leadId={leadId} endUrl={endUrl} />
      )}
      {currentApi === "Commerce_Products" && (
        <CommerceProducts title="Products" leadId={leadId} endUrl={endUrl} />
      )}
      {currentApi === "Commerce_Transactions" && (
        <CommerceTransactions
          title="Transactions"
          leadId={leadId}
          endUrl={endUrl}
        />
      )}
      {currentApi === "Commerce_Location" && (
        <CommerceLocation title="Location" leadId={leadId} endUrl={endUrl} />
      )}
    </div>
  );
}
