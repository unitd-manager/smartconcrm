import React from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import {Row,Col,Button } from 'reactstrap';
import { columns, data } from '../../data/FinanceAdminPurchaser/PurchaseOrderData';
import "react-data-table-component-extensions/dist/index.css";
// import ComponentCard from '../../components/ComponentCard'


function PurchaseOrder() {
  const tableData = {
    columns,
    data,
  };

  return (
<>
    <Row>
      <Col md="6">
        <Link to="/PurchaseOrderDetails">
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

export default PurchaseOrder