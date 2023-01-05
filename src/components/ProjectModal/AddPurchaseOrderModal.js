import React,{useState,useEffect} from 'react';
import { Row,Col,FormGroup,Input,Button,Modal,ModalHeader,ModalBody, ModalFooter,Label } from 'reactstrap';
import {  Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import * as $ from "jquery";
import random from 'random'
import Select from 'react-select';
import api from '../../constants/api';
import message from '../Message';

const AddPurchaseOrderModal = ({projectId,addPurchaseOrderModal,setAddPurchaseOrderModal}) => {

    AddPurchaseOrderModal.propTypes = {
        addPurchaseOrderModal: PropTypes.bool,
        projectId:PropTypes.string,
        setAddPurchaseOrderModal: PropTypes.func
      }

      const [ addNewProductModal, setAddNewProductModal] = useState(false)
      const [ getSupplierValue, setGetSupplierValue] = useState()
      const [tabMaterialsPurchased, setTabMaterialsPurchased] = useState();
      //const [selectedOption, setSelectedOption] = useState(null);
      const [addMoreItem, setMoreItem] = useState(
        [{
            "id":random.int(1,99).toString(),
            "itemId":"",
            "uom": "",
            "qty": "",
            "unitprice": "",
            "totalprice": "",
            "item":"",
            "description":""
        },{
          "id":random.int(0,9999).toString(),
          "itemId":"",
          "uom": "",
          "qty": "",
          "unitprice": "",
          "totalprice": "",
          "item":"",
          "description":""
        },{
          "id":random.int(0,9999).toString(),
          "itemId":"",
          "uom": "",
          "qty": "",
          "unitprice": "",
          "totalprice": "",
          "item":"",
          "description":""
        }]
      )
      const [ totalAmount, setTotalAmount ] = useState(0);

      const AddNewLineItem = () => {
        //setMoreItem(addMoreItem + 1)
        setMoreItem([...addMoreItem,{
            "id": random.int(0,9999).toString(),
            "itemId":"",
            "uom": "",
            "qty": "",
            "unitprice": "",
            "totalprice": "",
            "item":"",
            "description":""
        }])
      } 
      const [ insertPurchaseOrderData,setInsertPurchaseOrderData] = useState({
        po_code:""
        ,supplier_id:""
       , contact_id_supplier:""
       , delivery_terms:""
       , status:"test"
       , project_id:projectId
       , flag:1
       , creation_date:new Date()
       , modification_date:new Date()
       , created_by:"1"
       , modified_by:"1"
       , supplier_reference_no:""
       , our_reference_no:""
       , shipping_method:""
       , payment_terms:""
       , delivery_date:""
       , po_date:""
       , shipping_address_flat:""
       , shipping_address_street:""
       , shipping_address_country:""
       , shipping_address_po_code:""
       , expense_id:0
       , staff_id:0
       , purchase_order_date:new Date()
       , payment_status:"0"
       , title:"Purchase Order"
       , priority:"1"
       , follow_up_date:new Date()
       , notes:"test"
       , supplier_inv_code:""
       , gst:""
       , gst_percentage:"10%"
       , delivery_to:""
       , contact:""
       , mobile:""
       , payment:"0"
       , project:""
    
    
    })

    //   Get Supplier
    const getSupplier = () => {
        api.get('/purchaseorder/suppliers')
        .then((res)=>{
        setGetSupplierValue(res.data.data)
        console.log("Supplier",res)
      })
    }
          
    // Materials Purchased

    const TabMaterialsPurchased = () => {
        api.get('/purchaseorder/TabPurchaseOrderLineItem')
       .then((res) => {
        const items = res.data.data
        const finaldat = []
        items.forEach(item=>{
            finaldat.push({ value: item.product_id, label: item.title})
        })
        setTabMaterialsPurchased(finaldat)
      })
      .catch(()=>{
        message("Tab Purchase Order not found","info")
      })
      }

//  calculate Total
      const calculateTotal = () => {
       const oldArray = addMoreItem
        let totalValue = 0
        const result = [];
        $(".lineitem tbody tr").each(function() {
          const allValues = {}; 
          $(this).find("input").each(function() {
           
              const fieldName = $(this).attr("name");
             
              allValues[fieldName] = $(this).val();
              allValues.totalprice = allValues.qty * allValues.unitprice
              
          });
          result.push(allValues);
      })  
      result.forEach(obj=>{
        if(obj.id){
/* eslint-disable */

           // const objId = parseInt(obj.id)
           
            const foundObj = oldArray.find(el => el.id === obj.id)
            if(foundObj){
                obj.item = foundObj.item
                obj.itemId = foundObj.itemId
            }
           
        }

      })
      console.log(result)
      result.forEach(e=>{
        if(e.totalprice)
        {
          totalValue += parseFloat(e.totalprice)
        }
      })
     
      setMoreItem(result)
      setTotalAmount(totalValue)
      }
      
    //   Insert Purchase Order

    const handleInsertValue = (e) => {
      
        setInsertPurchaseOrderData({...insertPurchaseOrderData, [e.target.name]:e.target.value});
    }
    const poProduct = (inId,itemObj) => {
        api.post('/purchaseorder/insertPoProduct',{
            purchase_order_id:inId
       ,item_title:itemObj.item
      , quantity:itemObj.qty
      , unit:itemObj.uom
      , amount:itemObj.totalprice
      , description:itemObj.description
      , creation_date:new Date()
      , modification_date:new Date()
      , created_by:"1"
      , modified_by:"1"
      , status:"In Progress"
      , cost_price	:parseInt(itemObj.unitprice,10)
      , selling_price:""
      , qty_updated:parseInt(itemObj.qty,10)
      , qty:parseInt(itemObj.qty,10)
      , product_id:parseInt(itemObj.itemId,10)
      , supplier_id:insertPurchaseOrderData.supplier_id
      , gst:0
      , damage_qty:0
      , brand:""
      , qty_requested:0
      , qty_delivered:0
      , price:0

        })
        .then((res)=>{ 
            console.log(res.data)
            message('Product Added!','success')
           
        }).catch(()=>{
            message('Unable to add Product!','error')
        })
    }

    const insertlineItem = (inserId) => {
       addMoreItem.forEach(pItems=>{
        if(pItems.item != ''){
            poProduct(inserId,pItems)
        }

       })
   }

    const insertPurchaseOrder = () => {
       
        
        api.post('/purchaseorder/insertPurchaseOrder',insertPurchaseOrderData)
        .then((res)=>{ 
            setInsertPurchaseOrderData({
                po_code:""
                ,supplier_id:""
               , contact_id_supplier:""
               , delivery_terms:""
               , status:"test"
               , project_id:projectId
               , flag:1
               , creation_date:new Date()
               , modification_date:new Date()
               , created_by:"1"
               , modified_by:"1"
               , supplier_reference_no:""
               , our_reference_no:""
               , shipping_method:""
               , payment_terms:""
               , delivery_date:""
               , po_date:""
               , shipping_address_flat:""
               , shipping_address_street:""
               , shipping_address_country:""
               , shipping_address_po_code:""
               , expense_id:0
               , staff_id:0
               , purchase_order_date:new Date()
               , payment_status:"0"
               , title:"Purchase Order"
               , priority:"1"
               , follow_up_date:new Date()
               , notes:"test"
               , supplier_inv_code:""
               , gst:""
               , gst_percentage:"10%"
               , delivery_to:""
               , contact:""
               , mobile:""
               , payment:"0"
               , project:""
            
            
            })
            setAddPurchaseOrderModal(false)
            insertlineItem(res.data.data.insertId)
            message('Purchase Order Added!','success')
            // insertlineItem()
        }) 
    }
    
  

    useEffect(() => {
        getSupplier();
        TabMaterialsPurchased();
    }, [])
    useEffect(() => {
        setMoreItem([{
            "id":random.int(1,99).toString(),
            "itemId":"",
            "uom": "",
            "qty": "",
            "unitprice": "",
            "totalprice": "",
            "item":"",
            "description":""
        },{
          "id":random.int(0,9999).toString(),
          "itemId":"",
          "uom": "",
          "qty": "",
          "unitprice": "",
          "totalprice": "",
          "item":"",
          "description":""
        },{
          "id":random.int(0,9999).toString(),
          "itemId":"",
          "uom": "",
          "qty": "",
          "unitprice": "",
          "totalprice": "",
          "item":"",
          "description":""
        }])
    }, [addPurchaseOrderModal])
    
    const onchangeItem = (str,itemId) =>{
      
        const element = addMoreItem.find(el => el.id === itemId)
        element.item = str.label
        element.itemId = str.value
        console.log(addMoreItem)
        setMoreItem(addMoreItem)
    }

  return (
    <>
         <Modal size="xl" isOpen={addPurchaseOrderModal}>
            <ModalHeader>Add Purchase Order</ModalHeader>
            
            <ModalBody>
                <FormGroup>
                    <Row>
                    <Col md="12" className='mb-4'>
                        <Row>
                        <Col md="3">
                            <Button color="primary" onClick={()=>{setAddNewProductModal(true)}}>Add New Product</Button>
                        </Col>
                        <Col md="3">
                            <Button color="primary" onClick={()=>{AddNewLineItem()}}>Add More Items</Button>
                        </Col>
                        </Row>
                        <br/>
                        <Row>
                        <Col md="3">
                            <Label>Supplier</Label>
                            <Input type="select" name="supplier_id" onChange={handleInsertValue}>
                                <option selected="selected" 
                                value="">Please Select</option>

                                {getSupplierValue && getSupplierValue.map((res)=>{
                                    return <option 
                                    value={res.supplier_id} 
                                   >{res.company_name}</option>
                                })}

                            </Input>
                        </Col>
                        <Col md="3">
                            <Label>PO Date</Label>
                            <Input type="date" name="po_date" onChange={handleInsertValue} 
                           
                            />
                        </Col>
                        <Col md="3">
                            <Label>PO No.</Label>
                            <Input type="text" name="po_code" onChange={handleInsertValue} 
                          
                            />
                        </Col>
                        <Col md="3">
                            <Label>GST</Label>
                            <FormGroup check>
                            <Input name="gst" type="radio" value="1" onChange={handleInsertValue}
                            />
                            <Label check>Yes</Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input name="gst" type="radio" value="0" onChange={handleInsertValue}/>
                                <Label check> No </Label>
                            </FormGroup>
                        </Col>
                        </Row>
                        <Row>
                            <FormGroup className='mt-3'> Total Amount : {totalAmount} </FormGroup>
                        </Row>
                    </Col>
                    </Row>

                <table className='lineitem'>
                    <thead>
                    <tr className=''>
                        <th width="20%" scope="col">Item</th>
                        <th scope="col">UoM</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Amount</th>
                        <th width="25%" scope="col">Remarks</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>

                    {addMoreItem.map((item) => {
                        return (
                        <tr key={item.id}>
                            <td data-label="Item" key={item.id}>                     

                                 <Select
                                    key={item.id}
                                    defaultValue={{value:item.item,label:item.item}}
                                    onChange={(e)=>{
                                        onchangeItem(e,item.id)
                                    }}
                                    options={tabMaterialsPurchased}
                                />
                                <Input value={item.item} type="hidden" name="item"></Input>
                                <Input value={item.itemId} type="hidden" name="itemId"></Input>
                            </td>
                            <td data-label="UoM"><Input defaultValue={item.uom} type="text" name="uom" /></td>
                            <td data-label="Qty"><Input defaultValue={item.qty} type="number" name="qty" /></td>
                            <td data-label="Unit Price" ><Input defaultValue={item.unitprice} type="number" onBlur={()=>{
                                    calculateTotal()
                                  }} name="unitprice" /></td>
                            <td data-label="Total Price"><Input type="hidden" defaultValue={item.totalprice} name="totalprice" />{item.totalprice}</td>
                            <td data-label="Remarks"><Input type="input" defaultValue={item.description} name="description" /></td>
                            <td data-label="Action"> <Input defaultValue={item.id} type="hidden" name="id"></Input><Link to=""><span>Clear</span></Link></td>
                        </tr>
                        );
                    })}

                    </tbody>

                </table>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={()=>{insertPurchaseOrder()}}>Submit</Button>
                <Button color="secondar" onClick={()=>{setAddPurchaseOrderModal(false)}}>Cancel</Button>
            </ModalFooter>
        </Modal>


        {/* Add New Product Modal */}
        <Modal isOpen={addNewProductModal}>
            <ModalHeader>Add New Materials / Tools</ModalHeader>
            
            <ModalBody>
                <FormGroup>
                    <Row>
                    <Col md="12" className='mb-4'>
                        <Row>
                            <FormGroup>
                                <Row>
                                    <Label sm="2">Product Name <span className='required'> *</span></Label>
                                    <Col sm="10">
                                    <Input type="text" name="product_name" />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                     <Label sm="2">Product Type <span className='required'> *</span></Label>
                                    <Col sm="10">
                                    <Input type="select" name="product_type">
                                        <option value="">Please Select</option>
                                        <option selected="selected" value="Materials">Materials</option>
                                        <option value="Tools">Tools</option>
                                    </Input>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Row>
                    </Col>
                    </Row>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={()=>{setAddNewProductModal(false)}}>Submit</Button>
                <Button color="secondar" onClick={()=>{setAddNewProductModal(false)}}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </>
  )
}

export default AddPurchaseOrderModal