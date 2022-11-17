import React from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import "react-data-table-component-extensions/dist/index.css";
import {Row,Col,Button } from 'reactstrap';
import { columns, data } from '../../data/PayrollHR/LeaveData';

function Leave() {
  const tableData = {
    columns,
    data,
  };
  return (<>
  <Row>
          <Col md="6">
            <Link to="/LeaveDetails">
              <Button  color="primary" className="my-3">
                Add New
              </Button>
            </Link>
          </Col>     
        </Row>
        <DataTableExtensions
      {...tableData}
    >
      <DataTable
        noHeader
        defaultSortField="id"
        defaultSortAsc={false}
        pagination
        highlightOnHover
      />
    </DataTableExtensions>
  
  </>
    
  )
}

export default Leave