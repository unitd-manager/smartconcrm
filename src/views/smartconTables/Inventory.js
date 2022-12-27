// import {  data } from '../../data/FinanceAdminPurchaser/InventoryData';
// import "react-data-table-component-extensions/dist/index.css";
import React,{useEffect, useState} from 'react';
import * as Icon from 'react-feather';
// import {Row,Col,Button } from 'reactstrap';
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import "datatables.net-buttons/js/buttons.colVis"
import "datatables.net-buttons/js/buttons.flash"
import "datatables.net-buttons/js/buttons.html5"
import "datatables.net-buttons/js/buttons.print"
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {getInventories,deleteInventory} from '../../store/inventory/inventorySlice'

import ViewAdjustStockHistoryModal from '../../components/inventory/ViewAdjustStockHistoryModal';
import StockInputChange from '../../components/inventory/StockInputChange';


function Inventory() {
const[stockinputOpen, setStockinputOpen]=useState(false);
  const dispatch=useDispatch();
  const inventories =useSelector(state=>state.inventory.inventories);
  const[modalId,setModalId]=useState(null);

 
  const[adjustStockHistoryModal,setAdjustStockHistoryModal]=useState(false);
  const getAllinventories = () =>{
    // api.get('/inventory/getinventories')
    //   .then((res)=> {
    //       setinventories(res.data.data)
    //       console.log(res.data.data)
    //   })

    dispatch(getInventories());
    // setinventoriesdata(inventories);
  

  }

//   const viewadjuststocklogs=()=>{
// dispatch(getAdjustStock());

//   }

 

  

  useEffect(() => {
      setTimeout(() => {
          $('#example').DataTable(
              {
                  pagingType: 'full_numbers',
                    pageLength: 20,
                    processing: true,
                    dom: 'Bfrtip',
                        buttons: ['csv', 'print'
                        ],
                      //   columnDefs: [
                      //   { visible: false, targets: 1 }
                      // ],
  searching: true
              }
          );
          } ,
          1000
          );
  
      getAllinventories()

  }, [])
 
  const columns = [
    {
      name: "#",
      selector: "id",
      sortable: true,
      grow:0,
      width:'auto',
    },
    {
        name: "",
        selector: "edit",
        sortable: true,
        grow:0,
        width:'auto',
        wrap: true
    },
    {
        name: "",
        selector: "flag",
        sortable: true,
        grow:0.2,
        width:'auto',
        wrap: true
    },
    {
        name: "Inventory Code",
        selector: "code",
        sortable: true
    },
    {
      name: "Name",
      selector: "code",
      sortable: true
    },
    {
      name: "Product Type",
      selector: "project",
      sortable: true,
      cell: d => <span>{d.closing.join(", ")}</span>
    },
    {
      name: "Item Code",
      selector: "ref",
      sortable: true
    },
    {
        name: "UOM",
        selector: "ref",
        sortable: true
    },
    {
        name: "Stock",
        selector: "ref",
        sortable: true
    },
    {
        name: "Adjust Stock",
        selector: "ref",
        sortable: true
    },
    {
      name: "",
      selector: "ref",
      sortable: true
  },
    {
        name: "MOL",
        selector: "",
        sortable: true
    },
  ];

  const deleteRecord = (id) => {
      
    // console.log(id)
   
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
       dispatch(deleteInventory(id))
      .then(res=>{
         console.log(res)
         Swal.fire(
           'Deleted!',
           'Your inventory has been deleted.',
           'success'
         )
         getAllinventories()

       })
     }
   })


   // api.get(`/inventory/deleteInventory/${opportunity_id}`)
   //  .then((res)=> {
   //      setinventories(res.data.data)
   //  })

 }
 

  

  return (
    <div className="MainDiv">
    {/* <div className="jumbotron text-center bg-sky">
        <h3>Therichpost.com</h3>
    </div> */}
    
    <div className="container">

    {/* <Row>
          <Col md="6">
            <Link to="/inventoryDetails">
              <Button  color="primary" className="my-3">
                Add New
              </Button>
            </Link>
          </Col>
                  
          </Row> */}

        
        <table id="example" className="display">
          <thead>
              <tr >
                  {columns.map(cell=>{
                    return (<td key={cell.name}>{cell.name}</td>)
                  })}
              </tr>
          </thead>
          <tbody>
            {inventories&& inventories.map(element=>{
                return (<tr key={element.inventory_id}>
                <td>{element.inventory_id}</td>
                <td><Link to={`/inventoryEdit/${element.inventory_id}`} ><Icon.Edit2 /></Link></td>
                <td><Link to=""><span onClick={()=>deleteRecord(element.inventory_id)}><Icon.Trash2 /></span></Link></td>
                <td>{element.inventory_code}</td>
                <td>{element.product_name}</td>
                <td>{element.product_type}</td>
                <td>{element.item_code}</td>
                <td>{element.unit}</td>
                <td>{element.stock}</td>
                {/* <td>{stockinputOpen ?{{<Input type="number" name="stock" value={stock} onchange={handleStockchange}/> <Button onClick={adjustStock}>Save</Button>}:{<span onClick={setStockinputOpen(true)}>Adjust stock</span>}</td> */}
               {stockinputOpen? <td><StockInputChange element={element} setStockinputOpen={setStockinputOpen} stockinputOpen={stockinputOpen}/></td>
               : <td><span onClick={()=>setStockinputOpen(true)}>Adjust Stock</span></td>
            }
            <td><span onClick={()=>{setAdjustStockHistoryModal(true); setModalId(element.inventory_id)}}>view</span></td>
            <ViewAdjustStockHistoryModal adjustStockHistoryModal={adjustStockHistoryModal} setAdjustStockHistoryModal={setAdjustStockHistoryModal} inventoryId={modalId} />
              <td>{element.minimum_order_level}</td>
                </tr>)
            })}
          </tbody>
       
         
      </table>
      </div>
    </div>
  )
}

export default Inventory