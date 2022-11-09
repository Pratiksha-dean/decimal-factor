import React, {useState, useEffect, useMemo} from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

export default function Datatables(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows]=useState(0);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterText, setFilterText] = useState("");
    const [sortByColumn, setSortByColumn] = useState(0);
    const [sortByDir, setSortByDir] = useState('asc');
    const [isInitialize,setIsInitialize] = useState(false);
    
    
    const postdata = {
      start : 0,
      length : 15,
      order : {
        0 : {
          column :0,
          dir:'asc'
        }
      },
      search : {
        value : ''
      } 
    };
      
   const fetchApiData = async(page, size=perPage, sortBy=sortByColumn, sortOrder=sortByDir, searchKw=filterText) => {
        setLoading(true);

        postdata['start'] = (page-1)*size;
        postdata['length'] = size;
        postdata['order'][0]['column'] = sortBy;
        postdata['order'][0]['dir'] = sortOrder;
        postdata['search']['value'] = searchKw;
        
       
        const response = await axios.post(
          props.apiUrl,postdata
        );
        
        setData(response.data.data);
        setTotalRows(response.data.recordsTotal);
        
        setLoading(false);
        setIsInitialize(true);
    } 

    useEffect(()=>{
      fetchApiData(1);
    }, []);


    const subHeaderComponentMemo = useMemo(() => {
        
    
        return (
          <div className="d-flex align-items-center justify-content-between">
            
            <div className="d-flex align-items-center">
              <label for="basic-url" className="form-label mb-0">
                Search:
              </label>
              <input
                style={{ marginLeft: "10px" }}
                className="form-control"
                onChange={(e) => {
                  setFilterText(e.target.value);
                  setCurrentPage(1);
                  fetchApiData(1,perPage, sortByColumn, sortByDir, e.target.value)
                }}
                value={filterText}
              />
            </div>
          </div>
        );
      }, [filterText]);

    const columns= useMemo(
        () => props.apiColumn
    );
    
    
    
    const handlePageChange = (page) => {
      if(isInitialize!==false){
        fetchApiData(page);
        setCurrentPage(page); 
      }      
       
    }
    const handlePerRowsChange = (newPerPage, page) => {
      if(isInitialize!==false){
        fetchApiData(page, newPerPage);
        setPerPage(newPerPage);
      }
    };

    
    
    const handleSort = (column, sortDirection) => {
      if('id' in column && isInitialize!==false){
        let sortIndex = column.id -1;
        setSortByDir(sortDirection);
        setSortByColumn(sortIndex);
        fetchApiData(currentPage,perPage,sortIndex,sortByDir);
      }
    };

        
    return (
        <DataTable
        title={props.title}
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationDefaultPage={currentPage}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange} 
        onSort={handleSort}
      />
    );
}