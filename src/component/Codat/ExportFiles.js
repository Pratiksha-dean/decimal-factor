import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";



export default function ExportFiles(props) {
    
    const [openexport, setOpenexport] = useState(false);
    const [createDataExport, setCreateDataExport] = useState(true);
    const [createAuditExport, setCreateAuditExport] = useState(true);
    const [dataExportUrl, setDataExportUrl] = useState('');
    const [dataAuditUrl, setDataAuditUrl] = useState('');
    const handleOpenexport = () => {
        setOpenexport(!openexport);
    };
    const exportData = () => {
        axios.get(`${props.endUrl}/CODAT/start_export_data/${props.leadId}`);
        setCreateDataExport(false);
    }

    const exportAudit = () => {
        axios.get(`${props.endUrl}/CODAT/export_audit_data/${props.leadId}`);
        setCreateAuditExport(false);
    }

    const checkDownloadFiles = async() => {
        await axios.get(`${props.endUrl}/CODAT/get_export_data/${props.leadId}`)
        .then(res => {
            if(res.data.success === 'true'){
                setDataExportUrl(props.serverUrl + res.data.file);
            } else {
                setDataExportUrl('');
            }
            
        }).catch(err => {
            console.log(err);
        });

        await axios.get(`${props.endUrl}/CODAT/download_audit_data/${props.leadId}`)
        .then(res => {
            if(res.data.success === 'true'){
                setDataAuditUrl(props.serverUrl + res.data.file);
            } else {
                setDataAuditUrl('');
            }
        }).catch(err => {
            console.log(err);
        });
        
      
    }
    useEffect(()=>{
        
        checkDownloadFiles();
    },props);
    return(
        <div className="col-md-3 export-area">
                    <button className="btn btn-primary exportdata-btn next-btn" onClick={handleOpenexport} ><i class="fa fa-cloud-arrow-down"></i> Export <i class="fa fa-chevron-down" aria-hidden="true"></i></button>
                    {openexport ? (
                    <div className="export-data-div">
                    <div className="export-panel">
                    <h3>Export data</h3>
                    <p>Generate a new file or download last available report</p>
                    {createDataExport?<button onClick={exportData} className="btn btn-primary create-new-data" id="export-codat-data">Create New Data Export</button>:''}
                    {createAuditExport?<button onClick={exportAudit} className="btn btn-primary create-new-data" id="export-assess-codat-data">Create New Audit Export</button>:''}
                   
                    <p>Export accounting and banking data shared by the company</p>
                </div>
                {dataAuditUrl || dataExportUrl?<p><strong>Last export</strong></p>:''}
                
                <div className="row" id="codat-download-cointainer">
                   {dataExportUrl ? (<>
                    <div className="col-md-8">
                        <p><i className="fa fa-calendar"></i> 
                            <span>All Data Export </span></p>
                    </div>
                    <div className="col-md-4">
                        
                        <a href={dataExportUrl} className="export-download">Download!</a>

                    </div></>):''
                    }
                    {dataAuditUrl ? (<>
                    <div className="col-md-8">
                        <p><i className="fa fa-calendar"></i> 
                            <span>Audit Data Export</span></p>
                    </div>
                    <div className="col-md-4">
                        
                        <a href={dataAuditUrl}  className="export-download">Download!</a>

                    </div></>):''}
                    
                    </div>
                 <button onClick={checkDownloadFiles} className="btn btn-primary refresh-btn" id="export-data-refresh">Refresh</button> 
                </div>
                ) : null}
                    </div>
    )
    
}
