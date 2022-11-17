import React from 'react';
import { Link } from 'react-router-dom';
import {Row,Col,Button } from 'reactstrap';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { columns, data } from '../../data/Admin/UserGroupData';
import "react-data-table-component-extensions/dist/index.css";

function UserGroup() {
  const tableData = {
    columns,
    data,
  };
  return (
    <>
      <Row>
          <Col md="6">
            <Link to="/UserGroupDetails">
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

export default UserGroup