import React, {useState} from "react";
import Customers from './Codat/Customers';
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


export default function Codat() {
    const [accountingApiValue, setAccountingApiValue] = useState("");
    const [assessApiValue, setAssessApiValue] = useState("");
    const [commerceApiValue, setCommerceApiValue] = useState("");
    const [currentApi, setCurrentApi] = useState("");
    const leadId= 6135;
    const endUrl = 'https://sales.decimalfactor.com/staging/api';
    const handleCodat = (codatView) => {
        if(codatView==="accounting"){ setCurrentApi(accountingApiValue); setAssessApiValue("");setCommerceApiValue("");}
        if(codatView==="assess"){ setCurrentApi(assessApiValue); setAccountingApiValue("");setCommerceApiValue(""); }
        if(codatView==="commerce"){ setCurrentApi(commerceApiValue); setAccountingApiValue("");setAssessApiValue("");} 
    }


    const accountApiData = [
        { label: "--Select--", value:""},
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
        { label: "--Select--", value:""},
        { label: "Profit and Loss", value: "assess_profitandloss" },
        { label: "Balance Sheet", value: "assess_balancesheet" },
        { label: "Commerce", value: "assess_commerce" },
        { label: "Marketing", value: "assess_marketing" },
    ]
      
    const commerceApiList = [
        { label: "--Select--", value:""},
        { label: "Company info", value: "commerce_Company_info" },
        { label: "Customers", value: "Commerce_Customers" },
        { label: "Disputes", value: "Commerce_Disputes" },
        { label: "Orders", value: "Commerce_Orders" },
        { label: "Payments", value: "Commerce_Payments" },
        { label: "Products", value: "Commerce_Products" },
        { label: "Transactions", value: "Commerce_Transactions" },
        { label: "Location", value: "Commerce_Location" },
      ];

    


    return(
        <div>
        <div className="accouting-info">
            <div className="">
                <div className="row">
                    <div className="col-md-3">
                        <label for="basic-url" className="form-label mb-0">
                            Accouting API
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
                                    return <option key={item.value} value={item.value}>{item.label}</option>;
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
                    <div className="col-md-3">
                        <label for="basic-url" className="form-label mb-0">
                            Assess
                        </label>

                        <div className="d-flex">
                            <select
                                className="form-select  form-control"
                                aria-label="Assess"
                                style={{ marginRight: "10px" }}
                                onChange={(e) => setAssessApiValue(e.target.value)}
                                value={assessApiValue}
                            >

                                {assessApiList.map((item, i) => {
                                    return <option key={item.value} value={item.value}>{item.label}</option>;
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
                            Commerce API
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
                                    return <option key={item.value} value={item.value}>{item.label}</option>;
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
                    <div className="col-md-3">
                    <button className="btn btn-primary exportdata-btn next-btn"><i class="fa fa-cloud-arrow-down"></i> Export <i class="fa fa-chevron-down" aria-hidden="true"></i></button>
                      
                    </div>
                </div>
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
                                        
        
        </div>
        
                )
}