import React,{useEffect,useState} from 'react';
// import * as Icon from 'react-feather';
import {Row,Col,Button,FormGroup,Label,Input ,Form} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import "datatables.net-buttons/js/buttons.colVis"
import "datatables.net-buttons/js/buttons.flash"
import "datatables.net-buttons/js/buttons.html5"
import "datatables.net-buttons/js/buttons.print"
import { Link ,useNavigate, useParams} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
// import api from '../../constants/api';
import message from '../../components/Message';
import ComponentCard from '../../components/ComponentCard'
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import { getTabProjectsLinked } from '../../store/inventory/tabProjectLinkedSlice';
import {getTabPurchaseOrdersLinked} from '../../store/inventory/tabPurchaseOrderLinkedSlice'
import {getInventory, updateInventory} from '../../store/inventory/inventorySlice';

const Test = () => {

  const {id}=useParams();
  const navigate=useNavigate();
    const [inventoryDetails,setInventoryDetails] = useState(null);
    const dispatch=useDispatch();
    const inventory=useSelector(state=>state.inventory.inventory);
    const tabPurchaseOrdersLinked =useSelector(state=>state.tabPurchaseOrderLinked.tabPurchaseOrdersLinked);
    const projectsLinked =useSelector(state=>state.tabProjectLinked.tabProjectsLinked);
    
    const getAllpurchaseOrdersLinked = () =>{
      

      dispatch(getTabPurchaseOrdersLinked());
      dispatch(getTabProjectsLinked());
      console.log(id)
      console.log(inventory)
      // setpurchaseOrdersLinkeddata(purchaseOrdersLinked);
      console.log(tabPurchaseOrdersLinked);
    }

    const handleInputs = (e) => {
      setInventoryDetails({...inventory, [e.target.name]:e.target.value,inventory_id:id});
    
    }
    const getInventoryData=()=>{
      dispatch(getInventory(id))
      .then(()=>setInventoryDetails(inventory))
      .catch(()=>{message('Unable to get inventory data.','error')})
    }
    const editinventoryData = () =>
    {
      // api.post('/tender/edit-Tenders',tenderDetails)
      dispatch(updateInventory(inventoryDetails)).then(()=> {
        
        message('Record editted successfully','success')
        setTimeout(() => {
          window.location.reload()
        }, 300);

      })
        .catch(() => {
          message('Unable to edit record.','error')
        })
    }

useEffect(()=>{
  getInventoryData();
  getAllpurchaseOrdersLinked()
},[id])

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
    searching: false
                }
            );
            } ,
            1000
            );
    }, [])
    
    useEffect(() => {
      setTimeout(() => {
          $('#examplepl').DataTable(
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
  searching: false
              }
          );
          } ,
          1000
          );
  }, [])

   const pocolumns = [
        {
          name: "PO Code",
          selector: "Po_code",
          grow:0,
          wrap: true,
          width:'4%'
        },
       
        {
          name: "Date",
          selector: "purchase_order_date",
          sortable: true,
          grow:0,
          wrap: true
        },
        {
          name: "Project Title",
          selector: "title",
          sortable: true,
          grow:2,
          wrap: true
        },
        {
          name: "Client Name",
          selector: "company_name",
          sortable: true,
          grow:0,
        },
        {
            name: "Amount",
            selector: "cost_price",
            sortable: true,
            width:'auto',
            grow:3,
            // cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "Qty",
            selector: "qty",
            sortable: true,
            grow:2,
            width:'auto',
            // cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "Supplier",
            selector: "supplier_name",
            sortable: true,
            grow:2,
            wrap: true,
            // cell: d => <span>{d.closing.join(", ")}</span>
          }
      ]

      const plcolumns = [
        
       
        {
          name: "Date",
          selector: "date",
          sortable: true,
          grow:0,
          wrap: true
        },
        
        {
          name: "Project Title",
          selector: "title",
          sortable: true,
          grow:2,
          wrap: true
        },
        {
          name: "Client Name",
          selector: "company_name",
          sortable: true,
          grow:0,
        },
        {
            name: "Numbers",
            selector: "quantity",
            sortable: true,
            width:'auto',
            grow:3,
            // cell: d => <span>{d.closing.join(", ")}</span>
          }
      ]
      
     

        
      

  return (
    <div className="MainDiv">
    {/* <div className="jumbotron text-center bg-sky">
        <h3>Therichpost.com</h3>
    </div> */}
    
    <div className="container">

   
       <Row>
       <BreadCrumbs heading={inventoryDetails && inventoryDetails.title} />

<Form >
 <FormGroup>
  <ComponentCard title="Product Details" >
      <Row>
      
      <Col md="3">
          <FormGroup>
          <Label>Inventory Code</Label>
          <Input type="text"  value={inventory && inventory.inventory_code} name="inventory_code"/>
          </FormGroup>
      </Col>
            <Col md="3">
                <FormGroup>
                <Label>Product Name</Label>
                <Input type="text" value={inventory && inventory.product_name} onChange={handleInputs} name="product_name" />
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                <Label>Product Type</Label>
                    <Input type="text" value={inventory && inventory.product_type} name="product_type"/>
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                <Label>Item Code</Label>
                <Input type="text"  value={inventory && inventory.item_code} name="item_code"/>
                </FormGroup>
            </Col>
           
            </Row>
            <Row>
            
            
            <Col md="3">
                <FormGroup>
                <Label>UOM</Label>
                <Input type="text" value={inventory && inventory.unit}  name="unit"/>
                </FormGroup>
            </Col>
          
            <Col md="3">
                <FormGroup>
                <Label>MOL</Label>
                <Input type="text" defaultValue={inventory && inventory.minimum_order_level} onChange={handleInputs} name="minimum_order_level"/>
                </FormGroup>
            </Col>
            
            <Col md="3">
                <FormGroup>
                <Label>Notes</Label>
                <textarea onChange={handleInputs} type="text" defaultValue={inventory && inventory.notes} name="notes">
                    
                </textarea>
                </FormGroup>
            </Col>
            </Row>
            <Row>
            <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                <Button onClick={()=>{
                   editinventoryData()
                }} type="button" className="btn btn-success mr-2">
                Save & Continue
                </Button>
                <Button onClick={()=>{
                  navigate(-1)
                }} type="button" className="btn btn-dark">
                Go to List
                </Button>
             </div>
            </Row>
        </ComponentCard>
        </FormGroup> 
</Form>
        </Row>   
        <Row>
          <ComponentCard>
            <Col md="12">
          <Col md="4"><Row><h5>Total Purchased quantity</h5></Row><span>436</span><Row></Row></Col>
          
          
          <Col md="4"><Row><h5>Sold</h5></Row><span>436</span><Row></Row></Col>
          
          
          <Col md="4"><Row><h5>Remaining quantity</h5></Row><span>436</span><Row></Row></Col>
          </Col>
          </ComponentCard>
        </Row>

          <ComponentCard title="Purchase orders">
        <table id="example" className="display">
          <thead>
              <tr >
                  {pocolumns.map(cell=>{
                    return (<td key={cell.name}>{cell.name}</td>)
                  })}
              </tr>
          </thead>
          <tbody>
            {tabPurchaseOrdersLinked && tabPurchaseOrdersLinked.map(element=>{
                return (<tr key={element.title}>
                <td><Link to={`/purchaseOrderDetails/${element.purchase_order_id}`} >{element.po_code}</Link></td>
                
                <td>{element.purchase_order_date}</td>
                <td>{element.title}</td>
                <td>{element.company_name}</td>
                <td>{element.cost_price}</td>
                <td>{element.qty}</td>
                <td>{element.supplier_name}</td>
                </tr>)
            })}
          </tbody>
          
      </table>
      </ComponentCard>

      
      <ComponentCard title="Projects Linked">
      <table id="examplepl" className="display">
          <thead>
              <tr >
                  {plcolumns.map(cell=>{
                    return (<td key={cell.name}>{cell.name}</td>)
                  })}
              </tr>
          </thead>
          <tbody>
            {projectsLinked && projectsLinked.map(element=>{
                return (<tr key={element.project_id}>
                <td>{element.material_used_date}</td>
                <td><Link to={`/projectLinkedDetails/${element.project_id}`} >{element.title}</Link></td>
                <td>{element.company_name}</td>
                <td>{element.quantity}</td>
                </tr>)
            })}
          </tbody>
          
      </table>
      </ComponentCard>
      </div>
      
    </div>)
}

export default Test;