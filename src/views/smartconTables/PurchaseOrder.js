import React,{useEffect,useState} from 'react';
import * as Icon from 'react-feather';
import {Row,Col,Button } from 'reactstrap';
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import "datatables.net-buttons/js/buttons.colVis"
import "datatables.net-buttons/js/buttons.flash"
import "datatables.net-buttons/js/buttons.html5"
import "datatables.net-buttons/js/buttons.print"
import "react-data-table-component-extensions/dist/index.css";
import { Link } from 'react-router-dom';
import api from '../../constants/api';

function PurchaseOrder() {
  const [purchaseOrder,setPurchaseOrder] = useState(null);
  const getPurchaseOrder = () =>{
    api.get('/purchaseorder/TabPurchaseOrder')
      .then((res)=> {
        setPurchaseOrder(res.data.data);
        console.log(res.data.data);
      })
  }

  useEffect(() => {
    setTimeout(() => {
        $('#example').DataTable(
            {
                pagingType: 'full_numbers',
                  pageLength: 20,
                  processing: true,
                  dom: 'Bfrtip',
                      buttons: ['csv', 'print'
                      ]
            }
        );
        } ,
        1000
        );
        getPurchaseOrder()

}, [])

const columns = [
  {
    name: "Id",
    selector: "po_code",
    grow:0,
    wrap: true,
    width:'4%'
  },
  {
      name: 'Edit',
      selector: "edit",
      cell: () => <Icon.Edit2 />,
      grow:0,
      width:'auto',
      button:true,
      sortable:false,
  },
  {
      name:'Del',
      selector: "delete",
      cell: () => <Icon.Trash />,
      grow:0,
      width:'auto',
      wrap: true
  },
  {
    name: "PO Code",
    selector: "po_code",
    sortable: true,
    grow:0,
    wrap: true
  },
  {
    name: "Title",
    selector: "title",
    sortable: true,
    grow:2,
    wrap: true
  },
  {
    name: "PO Value",
    selector: "payment",
    sortable: true,
    grow:0,
  },
  {
      name: "Status",
      selector: "status",
      sortable: true,
      width:'auto',
      grow:3,
      // cell: d => <span>{d.closing.join(", ")}</span>
    },
    {
      name: "PO Date",
      selector: "po_date",
      sortable: true,
      grow:2,
      width:'auto',
      // cell: d => <span>{d.closing.join(", ")}</span>
    },
    {
      name: "Supplier Invoice Code",
      selector: "supplier_inv_code",
      sortable: true,
      grow:2,
      wrap: true,
      // cell: d => <span>{d.closing.join(", ")}</span>
    },
    {
      name: "Creation Date",
      selector: "creation_date",
      sortable: true,
      width:'auto',
      // cell: d => <span>{d.closing.join(", ")}</span>
    },
]

const deleteRecord = (id) => {
 Swal.fire({
   title: `Are you sure? ${id}`,
   text: "You won't be able to revert this!",
   icon: 'warning',
   showCancelButton: true,
   confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Yes, delete it!'
 }).then((result) => {
   if (result.isConfirmed) {
     api.delete('/purchaseorder/deletePurchaseOrder',{po_code:id}).then(res=>{
       console.log(res)
       Swal.fire(
         'Deleted!',
         'Your Purchase Order has been deleted.',
         'success'
       )
       getPurchaseOrder()

     })
   }
 })
}

  return (
    <div className="MainDiv">
      <div className="container">
        <Row>
          <Col md="6">
            <Link to="/PurchaseOrderDetails">
              <Button  color="primary" className="my-3">
                Add New
              </Button>
            </Link>
          </Col> 
        </Row>

        <table id="example" className="display">
            <thead>
                <tr>
                    {columns.map(cell=>{
                      return (<td key={cell.name}>{cell.name}</td>)
                    })}
                </tr>
            </thead>
            <tbody>
              {purchaseOrder && purchaseOrder.map(element=>{
                  return (
                  <tr key={element.purchase_order_id}>
                      <td>{element.purchase_order_id}</td>
                      <td><Link to={`/PurchaseOrderEdit/${element.purchase_order_id}`} ><Icon.Edit2 /></Link></td>
                      <td><Link to=""><span onClick={()=>deleteRecord(element.purchase_order_id)}><Icon.Trash2 /></span></Link></td>
                      <td>{element.po_code}</td>
                      <td>{element.title}</td>
                      <td>{element.payment_terms}</td>
                      <td>{element.status}</td>
                      <td>{element.purchase_order_date}</td>
                      <td>{element.supplier_inv_code}</td>
                      <td>{element.creation_date}</td>
                  </tr>)
              })}
            </tbody>
            <tfoot>
                  <tr>
                      {columns.map(cell=>{
                        return (<td key={cell.name}>{cell.name}</td>)
                      })}
                  </tr>
            </tfoot>          
        </table>
      </div>
    </div>
  )
}

export default PurchaseOrder