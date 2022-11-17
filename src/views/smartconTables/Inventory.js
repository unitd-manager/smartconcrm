import React from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { columns, data } from '../../data/FinanceAdminPurchaser/InventoryData';
import "react-data-table-component-extensions/dist/index.css";

function Tender() {
  const tableData = {
    columns,
    data,
  };
  return (
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
  )
}

export default Tender