import React, { useState,useEffect } from 'react';
import {CardTitle,Table, Row,Col,Form,FormGroup,Label,Input,TabContent,TabPane,Nav, NavItem,NavLink,Button,Modal,ModalHeader,ModalBody,ModalFooter, } from 'reactstrap';
import {ToastContainer} from 'react-toastify'
import { Link, useParams } from 'react-router-dom';
import * as Icon from 'react-feather';
import Swal from 'sweetalert2'
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import DuctingCostModal from '../../components/ProjectModal/DuctingCostModal';
import TransportCharges from '../../components/ProjectModal/TransportCharges';
import TotalLabourChargesModal from '../../components/ProjectModal/TotalLabourChargesModal';
import SalesmanCommissionModal from '../../components/ProjectModal/SalesmanCommissionModal';
import FinanceChargesModal from '../../components/ProjectModal/FinanceChargesModal';
import OfficeOverheadsModal from '../../components/ProjectModal/OfficeOverheadsModal';
import OtherChargesModal from '../../components/ProjectModal/OtherChargesModal';
import ViewQuoteLogModal from '../../components/ProjectModal/ViewQuoteLogModal';
import ViewLineItemModal from '../../components/ProjectModal/ViewLineItemModal';
import EditQuotation from '../../components/ProjectModal/EditQuotation';
import AddPurchaseOrderModal from '../../components/ProjectModal/AddPurchaseOrderModal';
import MaterialsusedTab from '../../components/ProjectModal/MaterialsusedTab';
import EditWorkOrder from '../../components/ProjectModal/EditWorkOrder';
import EditDeliveryOrder from '../../components/ProjectModal/EditDeliveryOrder';
import EditPoModal from '../../components/ProjectModal/EditPoModal';
import EditPOLineItemsModal from '../../components/ProjectModal/EditPOLineItemsModal';
import WorkOrderViewLineItem from '../../components/ProjectModal/WorkOrderViewLineItem';
import message from '../../components/Message';
import api from '../../constants/api';


const ProjectEdit = () => {

    const {id} = useParams()

    const [projectDetail, setProjectDetail] = useState();
    const [getCostingSummary, setGetCostingSummary] = useState();

    const [activeTab, setActiveTab] = useState('1');
    // const [editCostingSummaryModel, setEditCostingSummaryModel] = useState(false);
    const [addDuctingCostModal, setAddDuctingCostModal] = useState(false);
    const [addTransportChargesModal, setAddTransportChargesModal] = useState(false);
    const [addTotalLabourChargesModal, setTotalLabourChargesModal] = useState(false);
    const [addSalesmanCommissionModal, setAddSalesmanCommissionModal] = useState(false);
    const [addFinanceChargesModal, setAddFinanceChargesModal] = useState(false);
    const [addOfficeOverheadsModal, setAddOfficeOverheadsModal] = useState(false);
    const [addOtherChargesModal, setAddOtherChargesModal] = useState(false);
    const [viewQuotationsModal, setViewQuotationsModal] = useState(false);
    const [viewLineModal, setViewLineModal] = useState(false);
    const [editQuoteModal, setEditQuoteModal] = useState(false);
    const [addPurchaseOrderModal, setAddPurchaseOrderModal] = useState(false);
    const [attachmentModal, setAttachmentModal] = useState(false);
    const [claimAttachmentModal, setClaimAttachmentModal] = useState(false);
    const [editWorkOrderModal, setEditWorkOrderModal] = useState(false);
    const [ workOrderViewLineItem, setWorkOrderViewLineItem] = useState(false);
    const [tabdeliveryorder, setTabdeliveryorder] = useState();
    const [tabPurchaseOrderLineItemTable, setTabPurchaseOrderLineItemTable] = useState();
    const [checkId, setCheckId] = useState([]);
    const [ editDeliveryOrder, setEditDeliveryOrder] = useState(false);
    const [ editPo, setEditPo ]= useState(false);
    const [ editPOLineItemsModal, setEditPOLineItemsModal ]= useState(false);


    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
      };
    // const editCostingSummaryToggle = () => {
    //   setEditCostingSummaryModel(!editCostingSummaryModel);
    //   };

      const attachmentToggle = () => {
        setAttachmentModal(!attachmentModal);
        };

    // Get Project By Id

        const getProjectById = () => {
          api.post('/project/getProjectsByID',{project_id:id})
         .then((res) => {
          setProjectDetail(res.data.data)
          console.log(res.data.data)
        })
        .catch(()=>{
          message("Costing Summary not found","info")
        })
        }

      // Fetch Costing Summary
      const getCostingbySummary = () => {
        
        api.post('/projecttabcostingsummary/getTabCostingSummary',{project_id:id})
        .then((res) => {
          setGetCostingSummary(res.data.data)
        })
      }
      
    // Edit Project

    const handleInputs = (e) => {
      setProjectDetail({...projectDetail, [e.target.name]: e.target.value}) 
    }

    const UpdateData = () => {
      api.post('/project/edit-Project',projectDetail)
      .then(() => {
       message('Record editted successfully','success')
        setTimeout(()=>{
          window.location.reload()
        },300);
      })
    }

    // Tab PurchaseOrder LineItem Table
    const TabPurchaseOrderLineItemTable = () =>
    {
      api.post('/purchaseorder/TabPurchaseOrderLineItemTable',{project_id:id})
      .then((res)=>{
        let arrayOfObj = Object.entries(res.data.data).map((e) => ({id: e[0],data: e[1]} ));
        arrayOfObj = arrayOfObj.reverse()
        // const entries = Object.entries(res.data.data);
        setTabPurchaseOrderLineItemTable(arrayOfObj)
        console.log("Tab PurchaseOrder LineItem Table",arrayOfObj)
      })
    }

    // Tab Delivery Order

    const TabDeliveryOrder = () => {
      api.post('/projecttabdeliveryorder/TabDeliveryOrder',{project_id:id})
     .then((res) => {
      setTabdeliveryorder(res.data.data)
    })
    .catch(()=>{
      message("Tab Delivery Order not found","info")
    })
    }

    // Delete Purchase Order
    const deletePurchaseOrder = (deletePurchaseOrderId) => {

      Swal.fire({
        title: `Are you sure? `,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          api.post('/purchaseorder/deletePurchaseOrder',{purchase_order_id:deletePurchaseOrderId}).then((res)=>{
            console.log(res)
            Swal.fire(
              'Deleted!',
              'Purchase Order has been deleted.',
              'success'
            )
            setViewLineModal(false)
          }).catch(()=>{
            message("Unable to Delete Purchase Order","info")
          })
        }
      })
    }


    // handleCheck

    const handleCheck = (e) => {

      let updatedList = [...checkId];

      if(e.target.checked) {
        updatedList = [...checkId, e.target.value];
      } else {
        updatedList.splice(checkId.indexOf(e.target.value), 1);
      }
      setCheckId(updatedList);
      
      console.log(updatedList);
    }

    const insertDeliveryHistoryOrder = (proId,deliveryOrderId) => {
      api.post('/projecttabdeliveryorder/insertDeliveryHistoryOrder',{
        product_id:proId,
        purchase_order_id:null,
        delivery_order_id:deliveryOrderId,
        status:"1",
        quantity:"1",
        creation_date:"2022-10-21",
        modification_date:"2022-10-21",
        remarks:"test"
      })
      .then((res)=>{
        console.log(res.data.data)
       message('Delivery Order Item Inserted','success')
      
      }).catch(()=>{
        message('Unable to add Delivery Order Item','error')
      })
    }

    const insertDelivery = () => {

      const isEmpty = Object.keys(checkId).length === 0;

      if(isEmpty)
      {
        Swal.fire('Please select atleast one product!')
      }
      else{
        api.post('/projecttabdeliveryorder/insertdelivery_order',{
          project_id:id,
          company_id:projectDetail.company_id,
          purchase_order_id:"",
          date:"2022-10-21",
          created_by:"1",
          creation_date:"2022-10-21",
          modified_by:"1",
          modification_date:"2022-10-21",
        })
        .then((res)=>{

        console.log(res.data)
        const selectedProducts = checkId
        setCheckId([])
        selectedProducts.forEach(element => {
          insertDeliveryHistoryOrder(res.data.insertId,element)
        });
        }).catch(()=>{
          message('Unable to add delivery order.','error')
        })
      }

      }
     


      useEffect(() => {
        getCostingbySummary();
        getProjectById();
        TabDeliveryOrder();
        TabPurchaseOrderLineItemTable();
      }, [id])

      useEffect(() => {
        setTimeout(() => {
          TabPurchaseOrderLineItemTable()
        }, 2000);
        
      }, [addPurchaseOrderModal])
      
      const getTotalOfPurchase = pItems => {
        let total = 0;
        pItems.forEach(a => {
               total+= parseInt(a.qty,10) * parseFloat(a.cost_price,10);
          });
     return total;
  }
  return (
    <>
    <BreadCrumbs />
      
        <Form >
            <FormGroup>
            <ComponentCard title={`Project Details | Code: ${projectDetail && projectDetail.opportunity_code} | 
            Category : ${projectDetail && projectDetail.category} | 
            Company :  ${projectDetail && projectDetail.company_name}  | 
            Status : ${projectDetail && projectDetail.status} `}>
              
                <Row>
                <Col md="3">
                    <FormGroup>
                    <Label>Title</Label>
                    <Input  type="text" name="title"  defaultValue={projectDetail && projectDetail.title} onChange={handleInputs} />
                    </FormGroup>
                </Col>
                
                <Col md="3">
                    <FormGroup>
                    <Label>Category <span className='required'> *</span> </Label>
                    <Input type="select" name="category" 
                        defaultValue={projectDetail && projectDetail.category} 
                        onChange={handleInputs} >
                        <option value="">Please Select</option>
                        <option value="Project">Project</option>
                        <option selected="selected" value="Maintenance">Maintenance</option>
                        <option value="Tenancy Project">Tenancy Project</option>
                        <option value="Tenancy Work">Tenancy Work</option>
                  </Input>
                    </FormGroup>
                </Col>

                <Col md="3">
                    <FormGroup>
                    <Label>Status </Label>
                    <Input type="select" name="status" defaultValue={projectDetail && projectDetail.status}
                         onChange={handleInputs}>
                        <option value="">Please Select</option>
                        <option selected="selected" value="WIP">WIP</option>
                        <option value="Billable">Billable</option>
                        <option value="Billed">Billed</option>
                        <option value="Complete">Complete</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Latest">Latest</option>
                </Input>
                    </FormGroup>
                </Col>
                <Col md="3">
                    <FormGroup>
                    <Label>Company</Label>
                    <Input type="text" disabled name="company_name" 
                        defaultValue={projectDetail && projectDetail.company_name} 
                        onChange={handleInputs}/>
                    </FormGroup>
                </Col>
                </Row>
          
                <Row>
                
                <Col md="3">
                    <FormGroup>
                    <Label>Contact</Label>
                    <Input type="select" name="contact_id" 
                        defaultValue={projectDetail && projectDetail.contact_id}
                        onChange={handleInputs}>
                        <option value="">Please Select</option>
                    </Input>
                    </FormGroup>
                </Col>
                
                <Col md="3">
                    <FormGroup>
                    <Label>Start Date</Label>
                        <Input type="date" name="start_date" defaultValue={projectDetail && projectDetail.start_date} onChange={handleInputs}/>
                    </FormGroup>
                </Col>
                <Col md="3">
                    <FormGroup>
                    <Label>Estimated Finish Date</Label>
                    <Input type="date" 
                      name="estimated_finish_date" 
                      defaultValue={projectDetail && projectDetail.estimated_finish_date} onChange={handleInputs}/>
                    </FormGroup>
                </Col>
                <Col md="3">
                    <FormGroup>
                    <Label>Description</Label>
                    <Input type="text" name="description" defaultValue={projectDetail && projectDetail.description} onChange={handleInputs}/>
                    </FormGroup>
                </Col>
                </Row>
                <Row>
                
                <Col md="3">
                    <FormGroup>
                    <Label>Project Manager</Label>
                    <Input type="select" name="project_manager_id" defaultValue={projectDetail && projectDetail.project_manager_id} onChange={handleInputs}>
                        <option value="" selected="selected">Please Select</option>
                      </Input>

                    </FormGroup>
                </Col>
                {/* <Col md="3">
                    <FormGroup>
                    <Label>Ducting Cost (OR) <Link to="" color="primary">
                      <span onClick={()=>setAddDuctingCostModal(true)}><b><u>Add</u></b></span>
                    </Link></Label>
                    <Input type="text" disabled name="actual_submission_date"/>
                    </FormGroup>
                </Col> */}
                </Row>
              
                <Row>
                <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button type="button" className="btn btn-success mr-2" onClick={UpdateData}>
                    Save & Continue
                    </Button>
                    <Button type="submit" className="btn btn-dark">
                    Cancel
                    </Button>
                  </div>
                </Row>
            </ComponentCard>
            </FormGroup> 
        </Form>

  <ComponentCard title="More Details">
    <ToastContainer></ToastContainer>


{/* Call Modal's */}

    <DuctingCostModal addDuctingCostModal={addDuctingCostModal} setAddDuctingCostModal={setAddDuctingCostModal} />
    <AddPurchaseOrderModal projectId={id} addPurchaseOrderModal={addPurchaseOrderModal} setAddPurchaseOrderModal={setAddPurchaseOrderModal}/>
    <TransportCharges addTransportChargesModal={addTransportChargesModal} setAddTransportChargesModal={setAddTransportChargesModal}/>
    <TotalLabourChargesModal addTotalLabourChargesModal={addTotalLabourChargesModal} setTotalLabourChargesModal={setTotalLabourChargesModal} />
    <SalesmanCommissionModal addSalesmanCommissionModal={addSalesmanCommissionModal} setAddSalesmanCommissionModal={setAddSalesmanCommissionModal}  />   
    <FinanceChargesModal addFinanceChargesModal={addFinanceChargesModal} setAddFinanceChargesModal={setAddFinanceChargesModal} />
    <OfficeOverheadsModal addOfficeOverheadsModal={addOfficeOverheadsModal} setAddOfficeOverheadsModal={setAddOfficeOverheadsModal} />
    <OtherChargesModal addOtherChargesModal={addOtherChargesModal} setAddOtherChargesModal={setAddOtherChargesModal} />
    <ViewQuoteLogModal viewQuotationsModal={viewQuotationsModal} setViewQuotationsModal={setViewQuotationsModal} />
    <ViewLineItemModal viewLineModal={viewLineModal} setViewLineModal={setViewLineModal} />
    <EditQuotation editQuoteModal={editQuoteModal} setEditQuoteModal={setEditQuoteModal} />
    <EditWorkOrder editWorkOrderModal={editWorkOrderModal} setEditWorkOrderModal={setEditWorkOrderModal}/>
    <EditDeliveryOrder editDeliveryOrder={editDeliveryOrder} setEditDeliveryOrder={setEditDeliveryOrder}  />
    <EditPoModal editPo={editPo} setEditPo={setEditPo} />
    <EditPOLineItemsModal editPOLineItemsModal={editPOLineItemsModal} setEditPOLineItemsModal={setEditPOLineItemsModal}  />
    <WorkOrderViewLineItem workOrderViewLineItem={workOrderViewLineItem} setWorkOrderViewLineItem={setWorkOrderViewLineItem} />


        <Nav tabs>

          <NavItem>
            <NavLink
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => {
                toggle('1');
              }}
            >
              Costing Summary
            </NavLink>
          </NavItem>
          <NavItem>
          <NavLink
            className={activeTab === '2' ? 'active' : ''}
            onClick={() => {
              toggle('2');
            }}
          >
            Quotations
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '3' ? 'active' : ''}
              onClick={() => {
                toggle('3');
              }}
            >
              Materials Purchased
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '4' ? 'active' : ''}
              onClick={() => {
                toggle('4');
              }}
            >
              Materials used
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '5' ? 'active' : ''}
              onClick={() => {
                toggle('5');
              }}
            >
              Materials Transferred
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '6' ? 'active' : ''}
              onClick={() => {
                toggle('6');
              }}
            >
              Delivery Order
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '7' ? 'active' : ''}
              onClick={() => {
                toggle('7');
              }}
            >
              Subcon Work Order
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '8' ? 'active' : ''}
              onClick={() => {
                toggle('8');
              }}
            >
              Claim
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '9' ? 'active' : ''}
              onClick={() => {
                toggle('9');
              }}
            >
              Finance
            </NavLink>
          </NavItem>
          <NavItem>
          <NavLink
            className={activeTab === '10' ? 'active' : ''}
            onClick={() => {
              toggle('10');
            }}
          >
            Employee & Attachment
          </NavLink>
          </NavItem>
        
        </Nav>

{/* Tab 1 */}

        <TabContent className="p-4" activeTab={activeTab}>

          <TabPane tabId="1">
            {/* <Row>
              <Col md="12" className='mb-4'>
                  <Button color="primary">Edit Costing Summary</Button>
              </Col>
            </Row> */}
            <Row>
              <Col md="3"><FormGroup><h3>Costing Summary</h3> </FormGroup></Col>
              <Col md="2"><FormGroup><Label>Total Cost : <b>{getCostingSummary && getCostingSummary[0].of}</b></Label> </FormGroup></Col>
              <Col md="2"><FormGroup><Label>PO Price (S$ W/o GST) : <b>{getCostingSummary && getCostingSummary[0].po_price}</b></Label> </FormGroup></Col>
              <Col md="3"><FormGroup><Label> Invoiced Price (S$ W/o GST) :</Label> </FormGroup></Col>
              <Col md="2"><FormGroup><Label>Profit Margin : <b>{getCostingSummary && getCostingSummary[0].profit_percentage}</b> %</Label> </FormGroup></Col>
            </Row>
            <hr/>
            <Row>
            <Col md="3">
                <FormGroup>
                <Label>Total Material</Label>
                <br/>
                <span>{getCostingSummary && getCostingSummary[0].total_material_price}</span>
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                <Label>Transport Charges <Link to="" color="primary">
                  <span onClick={()=>{setAddTransportChargesModal(true)}}><b><u>Add</u></b></span>
                </Link></Label>
                <br/>
                <span>{getCostingSummary && getCostingSummary[0].transport_charges}</span>
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                <Label>Total Labour Charges <Link to="" color="primary">
                  <span onClick={()=>{setTotalLabourChargesModal(true)}}><b><u>Add</u></b></span>
                </Link></Label>
                <br/>
                <span>{getCostingSummary && getCostingSummary[0].total_labour_charges}</span>
                </FormGroup>
            </Col>

            <Col md="3">
                <FormGroup>
                <Label>Salesman Commission <Link to="" color="primary">
                  <span onClick={()=>{setAddSalesmanCommissionModal(true)}}><b><u>Add</u></b></span>
                </Link></Label>
                <br/>
                <span>{getCostingSummary && getCostingSummary[0].salesman_commission}</span>
                </FormGroup>
            </Col>
            </Row>
            <br/>
            <Row>
            <Col md="3">
                <FormGroup>
                <Label> Finance Charges <Link to="" color="primary">
                  <span onClick={()=>{setAddFinanceChargesModal(true)}}><b><u>Add</u></b></span>
                </Link></Label>
                <br/>
                <span>{getCostingSummary && getCostingSummary[0].finance_charges}</span>
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                <Label>Office Overheads <Link to="" color="primary">
                  <span onClick={()=>{setAddOfficeOverheadsModal(true)}}><b><u>Add</u></b></span>
                </Link></Label>
                <br/>
                <span>{getCostingSummary && getCostingSummary[0].office_overheads}</span>
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                <Label>Other Charges <Link to="" color="primary">
                  <span onClick={()=>{setAddOtherChargesModal(true)}}><b><u>Add</u></b></span>
                </Link></Label>
                <br/>
                <span>{getCostingSummary && getCostingSummary[0].other_charges}</span>
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                <Label> TOTAL COST </Label>
                <br/>
                <span>{getCostingSummary && getCostingSummary[0].of}</span>
                </FormGroup>
            </Col>
            </Row>
          </TabPane>

{/* Tab 2 */}       

          <TabPane tabId="2">

            <Row  className='mb-4'>
              <Col md="3"> <Button color="primary" onClick={()=>{setViewQuotationsModal(true)}}>View Quote Log</Button></Col>
            </Row>
            <Row>
              <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white"> Quotations </CardTitle>
            </Row>

            <Form className='mt-4'>
                <Row className='border-bottom mb-3'>
                  <Col><FormGroup><Label>Revision</Label> </FormGroup></Col>
                  <Col><FormGroup><Label>Quote Code</Label> </FormGroup></Col>
                  <Col><FormGroup><Label>Quote Date</Label> </FormGroup></Col>
                  <Col><FormGroup><Label>Quote Status</Label> </FormGroup></Col>
                  <Col md="1"><FormGroup><Label>Discount</Label> </FormGroup></Col>
                  <Col md="1"><FormGroup><Label>Amount</Label> </FormGroup></Col>
                  <Col><FormGroup><Label></Label> </FormGroup></Col>
                  <Col><FormGroup><Label>Action</Label> </FormGroup></Col>
                </Row>
                <Row>
                <Col>
                  <FormGroup>
                    <span>Cash</span>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                      <span>test</span>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                      <Label>test</Label>
                  </FormGroup>
                </Col>
                <Col >
                  <FormGroup>
                      <Label>test</Label>
                  </FormGroup>
                </Col>
                <Col md="1">
                  <FormGroup>
                      <Label>test</Label>
                  </FormGroup>
                </Col>
                <Col md="1">
                  <FormGroup>
                      <Label>test</Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                      <Label><Link to="" color="primary"><span onClick={()=>{setViewLineModal(true)}}><u>View Line Items</u></span></Link></Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Row>
              
                      <Col md='4'><Label><Link to=""><span onClick={()=>{setEditQuoteModal(true)}}><Icon.Edit /></span></Link></Label></Col>
                      <Col md='4'><Label><Link to=""><span ><Icon.Printer/></span></Link></Label></Col>
                      {/* <Col md='4'><Label><Link to=""> <span><Icon.PlusCircle /></span> </Link></Label></Col> */}
                    </Row>
                  </FormGroup>
                </Col>
                </Row>
            </Form>
          </TabPane>

{/* Tab 3 Materials Purchased */}

        <TabPane tabId="3">

        <Row  className='mb-4'>
            <Col md="3"><Button color="primary" onClick={()=>{setAddPurchaseOrderModal(true)}}>Add Purchase Order</Button></Col>
            <Col md="3"><Button color="primary" onClick={()=>{insertDelivery()}}>Create Delivery Order</Button></Col>
            <Col md="3"><Button color="success">Add all Qty to Stock</Button></Col>
          </Row>
          {tabPurchaseOrderLineItemTable && tabPurchaseOrderLineItemTable.map((e)=>{
  return (  <>  

          <Row>
            <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white">
              <Row>
                <Col>{e.data[0].company_name}</Col>
                <Col><Link to="" style={{color:"#fff"}}><span onClick={()=>{setEditPo(true)}}><u> Edit Po </u></span></Link></Col> 
                <Col><Link to="" style={{color:"#fff"}}><span onClick={()=>{setEditPOLineItemsModal(true)}}><u> Edit Line Items </u></span></Link></Col> 
                <Col><span><u> print pdf </u></span></Col> 
                <Col> Total : {getTotalOfPurchase(e.data)}</Col> 
                <Col className='d-flex justify-content-end'><Button color="primary" onClick={()=>{deletePurchaseOrder(e.id)}}>X</Button></Col> 
              </Row>
                
            </CardTitle>
          </Row>

        <Form className='mt-4'>
          <Row className='border-bottom mb-3'>
            <Col md="1"><FormGroup><Label></Label> </FormGroup></Col>
            <Col><FormGroup><Label>Title</Label> </FormGroup></Col>
            <Col><FormGroup><Label>UoM</Label> </FormGroup></Col>
            <Col><FormGroup><Label>Quantity</Label> </FormGroup></Col>
            <Col><FormGroup><Label>Unit Price</Label> </FormGroup></Col>
            <Col md="1"><FormGroup><Label>Amount</Label> </FormGroup></Col>
            <Col md="1"><FormGroup><Label>Status</Label> </FormGroup></Col>
            <Col><FormGroup><Label></Label>Remarks</FormGroup></Col>
            <Col><FormGroup><Label></Label> </FormGroup></Col>
          </Row>


        {e.data.map(item=>{
          return <Row>
            <Col md="1">
              <FormGroup check>
                <Input type="checkbox" value={item.purchase_order_id} onChange={(ch)=>{handleCheck(ch)}}/>
              </FormGroup>
            </Col>

            <Col>
            <FormGroup>
              <span>{item.item_title}</span>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
                <span>{item.unit}</span>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
                <span>{item.qty}</span>
            </FormGroup>
          </Col>
          <Col >
            <FormGroup>
              <span>{item.cost_price}</span>
            </FormGroup>
          </Col>
          <Col md="1">
            <FormGroup>
              <span>{item.amount}</span>
            </FormGroup>
          </Col>
          <Col md="1">
            <FormGroup>
              <span>{item.status}</span>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
                <Label>{item.description}</Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Row>
                <u>Transfer</u>
              </Row>
            </FormGroup>
          </Col>
        </Row>
        })}
          
          
          </Form>
  </> 
  
  )})}
          
         
          
        
        </TabPane>


        {/* Tab 4 */}

        <TabPane tabId="4">
            <MaterialsusedTab projectId={id}/>
        </TabPane>

      {/* Tab 5 */}

      <TabPane tabId="5">

      <Row>
          <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white"> Materials Transferred From Other Projects </CardTitle>
      </Row>

      <Form className='mt-4'>
      <Row className='border-bottom mb-3'>
        <Col><FormGroup><Label>Ref Project</Label> </FormGroup></Col>
        <Col><FormGroup><Label>Product</Label> </FormGroup></Col>
        <Col><FormGroup><Label>Quantity</Label> </FormGroup></Col>
        <Col><FormGroup><Label>Updated By</Label> </FormGroup></Col>
      </Row>
      <Row>
        <Col>
        <FormGroup></FormGroup>
        </Col>
        <Col>
        <FormGroup>
        <span>test</span>
        </FormGroup>
        </Col>
        <Col>
        <FormGroup>
        <Label>test</Label>
        </FormGroup>
        </Col>
        <Col >
        <FormGroup>
        <Label>test</Label>
        </FormGroup>
        </Col>
      </Row>
      </Form>
      </TabPane>


{/* Start Tab Content 6  Delivery Order */}
      <TabPane tabId="6">
          <Row  className='mb-4'>
            <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white">Delivery Order</CardTitle>
          </Row>
          <Form>
                <Row className='border-bottom mb-3'>
                  <Col><FormGroup><Label>Date</Label> </FormGroup></Col>
                  <Col><FormGroup><Label>Action</Label> </FormGroup></Col>
                </Row>

                {tabdeliveryorder && tabdeliveryorder.map((res)=>{
                      return  <Row>
                
                    <Col>{res.date}</Col>
                      <Col>
                        <FormGroup>
                            <Row>
                              <Col md='1'><Label><Link to=""><span onClick={()=>{setEditDeliveryOrder(true)}}><Icon.Edit /></span></Link></Label></Col>
                              <Col md='1'><Label><Link to=""><span ><Icon.Printer/></span></Link></Label></Col>
                            </Row>
                        </FormGroup>
                      </Col>
                    </Row>
                    })
                    
                    }
                
          </Form>       
      </TabPane>


{/* Start Tab Content 7 */}

      <TabPane tabId="7">

      <Row  className='mb-4'>
        <Col md="2"><Button color="primary">Add Work Order</Button></Col>
      </Row>

      <Row>
          <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white"> Work Orders </CardTitle>
      </Row>

      <Form className='mt-4'>
        <Row className='border-bottom mb-3'>
          <Col><FormGroup><Label>WO Code</Label> </FormGroup></Col>
          <Col><FormGroup><Label>Date</Label> </FormGroup></Col>
          <Col><FormGroup><Label>Sub Con</Label> </FormGroup></Col>
          <Col><FormGroup><Label>Status</Label> </FormGroup></Col>
          <Col><FormGroup><Label>Due Date</Label> </FormGroup></Col>
          <Col><FormGroup><Label>Completed Date</Label> </FormGroup></Col>
          <Col><FormGroup><Label>Amount</Label> </FormGroup></Col>
          <Col></Col>
          <Col><FormGroup><Label>Action</Label> </FormGroup></Col>
        </Row>
        <Row>
        <Col>
          <FormGroup></FormGroup>
        </Col>
        <Col>
          <FormGroup>
              <span>test</span>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
              <Label>test</Label>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
              <Label>test</Label>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
              <Label>test</Label>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
              <Label>test</Label>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
              <Label>test</Label>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
              <Label><Link to=""><span onClick={()=>{setWorkOrderViewLineItem(true)}}>View Line Items</span></Link></Label>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Row>
              <Col md='2'><Label><Link to=""><span onClick={()=>{setEditWorkOrderModal(true)}}><Icon.Edit /></span></Link></Label></Col>
              <Col md='2'><Label><Link to=""><span ><Icon.Printer /></span></Link></Label></Col>
             <Col md='2'><Label><Link to=""> <span><Icon.PlusCircle /></span> </Link></Label></Col>
            </Row>
          </FormGroup>
        </Col>
        </Row>
      </Form>

      <Row className='mt-4'>
          <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white"> Payment History </CardTitle>
      </Row>

      <Form className='mt-4'>
        <Row className='border-bottom mb-3'>
          <Col><FormGroup><Label>Date</Label> </FormGroup></Col>
          <Col><FormGroup><Label>SubCon Name</Label> </FormGroup></Col>
          <Col><FormGroup><Label>Amount</Label> </FormGroup></Col>
          <Col><FormGroup><Label>Mode of Payment</Label> </FormGroup></Col>
        </Row>
        <Row>
          <Col>
            <FormGroup></FormGroup>
          </Col>
          <Col>
            <FormGroup>
                <span>test</span>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
                <Label>test</Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
                <Label>test</Label>
            </FormGroup>
          </Col>
        </Row>
      </Form>

      </TabPane>

{/* Start Tab Content 8 */}

      <TabPane tabId="8">

          <Row  className='mb-4'>
            <Col md="2"><Button color="primary">New PC</Button></Col>
          </Row>

          <Row>
              <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white"> Claim </CardTitle>
          </Row>

          <Form className='mt-4'>
            <Row className='border-bottom mb-3'>
              <Col><FormGroup><Label>Code</Label> </FormGroup></Col>
              <Col><FormGroup><Label>Date</Label> </FormGroup></Col>
              <Col><FormGroup><Label>Title</Label> </FormGroup></Col>
              <Col><FormGroup><Label>Action</Label> </FormGroup></Col>
              <Col><FormGroup><Label>Status</Label> </FormGroup></Col>
              <Col><FormGroup><Label>Amount</Label> </FormGroup></Col>
              <Col><FormGroup><Label>Action</Label> </FormGroup></Col>
            </Row>
            <Row>
            <Col>
              <FormGroup></FormGroup>
            </Col>
            <Col>
              <FormGroup>
                  <span>test</span>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                  <Label>test</Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                  <Row>
                    <Col md='2'><Label><Link to=""><span><Icon.Edit /></span></Link></Label></Col>
                  </Row>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                  <Label>test</Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                  <Label>test</Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Row>
                  <Col md='2'><Label><Link to=""><span><Icon.Edit /></span></Link></Label></Col>
                  <Col md='2'><Label><Link to=""> <span><Icon.Eye /></span> </Link></Label></Col>
                </Row>
              </FormGroup>
            </Col>
            </Row>
          </Form>

        <Row>
            <Col xs="12" md="3">
                <ComponentCard title="Claim Attachment">
                    <Button color="primary" onClick={()=>{setClaimAttachmentModal(true)}}>
                        Add
                    </Button>
                    <Modal isOpen={claimAttachmentModal}>
                        <ModalHeader>Upload Media</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label htmlFor="exampleFile">Select Files</Label>
                                <Input type="file" placeholder="" />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={()=>{setClaimAttachmentModal(false)}}>Upload</Button>
                            <Button color="secondary" onClick={()=>{setClaimAttachmentModal(false)}}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </ComponentCard>
            </Col>
          </Row>

      </TabPane>

{/* Start Tab Content 9 */}

<TabPane tabId="9">

      <Row>
          <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white"> FINANCE </CardTitle>
      </Row>

      <Row>
        <Col lg="6">
          <CardTitle tag="h4" className="border-bottom p-3 mb-0"> Account Receivables </CardTitle>
            <Table bordered>
              <thead>
                <tr><th colSpan="3" className='bold'>Balance Receivables: $75,250.00</th></tr>
                <tr>
                  <th className='bold'>Description</th>
                  <th className='bold'>Amount Invoiced</th>
                  <th className='bold'>Amount Received</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total Invoice Raised(Total PO Amount : )	</td>
                  <td>$80,250.00	</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Total Payments Received	</td>
                  <td></td>
                  <td>$5000</td>
                </tr>
              </tbody>
            </Table>
        </Col>
        <Col lg="6">
          <CardTitle tag="h4" className="border-bottom p-3 mb-0"> Account Payables </CardTitle>
            <Table bordered>
              <thead>
                <tr><th colSpan="3" className='bold'>Balance Payables : $1,637,681.00</th></tr>
                <tr>
                  <th className='bold'>Description</th>
                  <th className='bold'>Invoice Received</th>
                  <th className='bold'>Amount Paid</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
              </tbody>
            </Table>
        </Col>
      </Row>


      <Form className='mt-4'>
        <Row className='border-bottom mb-3'>
          <Col><FormGroup><Label>WO Code</Label> </FormGroup></Col>
          <Col><FormGroup><Label>Date</Label> </FormGroup></Col>
          <Col><FormGroup><Label>Sub Con</Label> </FormGroup></Col>
          <Col><FormGroup><Label>Status</Label> </FormGroup></Col>
          <Col><FormGroup><Label>Due Date</Label> </FormGroup></Col>
          <Col><FormGroup><Label>Completed Date</Label> </FormGroup></Col>
          <Col><FormGroup><Label>Amount</Label> </FormGroup></Col>
          <Col><FormGroup><Label>Action</Label> </FormGroup></Col>
        </Row>
        <Row>
        <Col>
          <FormGroup></FormGroup>
        </Col>
        <Col>
          <FormGroup>
              <span>test</span>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
              <Label>test</Label>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
              <Label>test</Label>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
              <Label>test</Label>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
              <Label>test</Label>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
              <Label>test</Label>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Row>
              <Col md='2'><Label><Link to=""><span><Icon.Edit /></span></Link></Label></Col>
              <Col md='2'><Label><Link to=""> <span><Icon.Eye /></span> </Link></Label></Col>
              <Col md='2'><Label><Link to=""><span ><Icon.PlusCircle /></span></Link></Label></Col>
            </Row>
          </FormGroup>
        </Col>
        </Row>
      </Form>


      <Row  className='mb-4'>
        <Col md="2"><Button color="primary">CREATE INVOICE</Button></Col>
        <Col md="2"><Button color="primary">CREATE RECEIPT</Button></Col>
      </Row>


      <Row className='mt-4'>
          <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white"> INVOICE(S) </CardTitle>
      </Row>

      <Form className='mt-4'>
        <Row className='border-bottom mb-3'>
          <Col><FormGroup><Label>Invoice Code</Label> </FormGroup></Col>
          <Col><FormGroup><Label>Status</Label> </FormGroup></Col>
          <Col><FormGroup><Label>Invoice Date</Label> </FormGroup></Col>
          <Col><FormGroup><Label>Amount</Label> </FormGroup></Col>
          <Col><FormGroup><Label>Print</Label> </FormGroup></Col>
          <Col><FormGroup><Label>Edit</Label> </FormGroup></Col>
          <Col><FormGroup><Label>Cancel</Label> </FormGroup></Col>
        </Row>
        <Row>
          <Col>
            <FormGroup></FormGroup>
          </Col>
          <Col>
            <FormGroup>
                <span>test</span>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
                <Label>test</Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
                <Label>test</Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
                <Label>test</Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
                <Label>test</Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
                <Label>test</Label>
            </FormGroup>
          </Col>
        </Row>
      </Form>

      <Row className='mt-4'>
          <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white"> RECEIPT(S) </CardTitle>
      </Row>

      <Form className='mt-4'>
        <Row className='border-bottom mb-3'>
          <Col><FormGroup><Label>Receipt Code</Label> </FormGroup></Col>
          <Col><FormGroup><Label>Status</Label> </FormGroup></Col>
          <Col><FormGroup><Label>Receipt Date</Label> </FormGroup></Col>
          <Col><FormGroup><Label>Mode of Payment</Label> </FormGroup></Col>
          <Col><FormGroup><Label>Receipt Amount</Label> </FormGroup></Col>
          <Col><FormGroup><Label>View</Label> </FormGroup></Col>
          <Col><FormGroup><Label>Cancel</Label> </FormGroup></Col>
        </Row>
        <Row>
          <Col>
            <FormGroup></FormGroup>
          </Col>
          <Col>
            <FormGroup>
                <span>test</span>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
                <Label>test</Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
                <Label>test</Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
                <Label>test</Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
                <Label>test</Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
                <Label>test</Label>
            </FormGroup>
          </Col>
        </Row>
      </Form>


</TabPane>

{/* Start Tab Content 10 */}

      <TabPane tabId="10">
          <Row>
            <Col xs="12" md="3">
                <ComponentCard title="Attachments">
                    <Button color="primary" onClick={attachmentToggle.bind(null)}>
                        Add
                    </Button>
                    <Modal isOpen={attachmentModal} toggle={attachmentToggle.bind(null)}>
                        <ModalHeader toggle={attachmentToggle.bind(null)}>Upload Media</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label htmlFor="exampleFile">Select Files</Label>
                                <Input type="file" placeholder="" />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={attachmentToggle.bind(null)}>Upload</Button>
                        </ModalFooter>
                    </Modal>
                </ComponentCard>
            </Col>
          </Row> 
      </TabPane>

{/* End Tab Content 10 */}

        </TabContent>
      </ComponentCard>
    </>
  )
};

export default ProjectEdit;