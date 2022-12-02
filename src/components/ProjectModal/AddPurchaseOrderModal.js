import React,{useState,useEffect} from 'react';
import { Row,Col,FormGroup,Input,Button,Modal,ModalHeader,ModalBody, ModalFooter,Label } from 'reactstrap';
import {  Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import * as $ from "jquery";
import random from 'random'
import Select from 'react-select';
import api from '../../constants/api';
import message from '../Message';

const AddPurchaseOrderModal = ({addPurchaseOrderModal,setAddPurchaseOrderModal}) => {

    AddPurchaseOrderModal.propTypes = {
        addPurchaseOrderModal: PropTypes.bool,
        setAddPurchaseOrderModal: PropTypes.func
      }

      const [ addNewProductModal, setAddNewProductModal] = useState(false)
      const [ getSupplierValue, setGetSupplierValue] = useState()
      const [tabMaterialsPurchased, setTabMaterialsPurchased] = useState();
      //const [selectedOption, setSelectedOption] = useState(null);
      const [addMoreItem, setMoreItem] = useState(
        [{
            "id":random.int(1,99),
            "itemId":"",
            "uom": "",
            "qty": "",
            "unitprice": "",
            "totalprice": "",
            "remarks": "",
            "item":"",
            "description":""
        },{
          "id":random.int(0,9999),
          "itemId":"",
          "uom": "",
          "qty": "",
          "unitprice": "",
          "totalprice": "",
          "remarks": "",
          "item":"",
          "description":""
        },{
          "id":random.int(0,9999),
          "itemId":"",
          "uom": "",
          "qty": "",
          "unitprice": "",
          "totalprice": "",
          "remarks": "",
          "item":"",
          "description":""
        }]
      )
      const [ totalAmount, setTotalAmount ] = useState(0);

      const AddNewLineItem = () => {
        //setMoreItem(addMoreItem + 1)
        setMoreItem([...addMoreItem,{
            "id": random.int(0,9999),
            "itemId":"",
            "uom": "",
            "qty": "",
            "unitprice": "",
            "totalprice": "",
            "remarks": "",
            "item":"",
            "description":""
        }])
      } 


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
            const objId = parseInt(obj.id,10)
            const foundObj = oldArray.find(el => el.id === objId)
            if(foundObj){
                obj.item = foundObj.item
                obj.itemId = foundObj.itemId
            }
           
        }
       
       
      })
      result.forEach(e=>{
        if(e.totalprice)
        {
          totalValue += parseFloat(e.totalprice)
        }
      })
      console.log(result)
      setMoreItem(result)
      setTotalAmount(totalValue)
      }
      
    useEffect(() => {
        getSupplier();
        TabMaterialsPurchased();
    }, [])
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
                            <Input type="select" name="supplier">
                                <option value="" selected="selected">Please Select</option>

                                {getSupplierValue && getSupplierValue.map((res)=>{
                                    return <option value={res.supplier_id}>{res.company_name}</option>
                                })}

                            </Input>
                        </Col>
                        <Col md="3">
                            <Label>PO Date</Label>
                            <Input type="date" name="po_date" />
                        </Col>
                        <Col md="3">
                            <Label>PO No.</Label>
                            <Input type="text" name="po_no" />
                        </Col>
                        <Col md="3">
                            <Label>GST</Label>
                            <FormGroup check>
                            <Input name="gst" type="radio" value="1" />{' '}
                            <Label check>Yes</Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input name="gst" type="radio" value="0" />{' '}
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
                            <td data-label="Item"  key={item.id}>                     

                                 <Select
                                 key={item.id}
                                    defaultValue={{value:item.itemId,label:item.item}}
                                    onChange={(e)=>{
                                        onchangeItem(e,item.id)
                                    }}
                                    options={tabMaterialsPurchased}
                                />
                                <Input defaultValue={item.item} type="hidden" name="item"></Input>
                                <Input defaultValue={item.itemId} type="hidden" name="itemId"></Input>
                            </td>
                            <td data-label="UoM"><Input defaultValue={item.uom} type="text" name="uom" /></td>
                            <td data-label="Qty"><Input defaultValue={item.qty} type="number" name="qty" /></td>
                            <td data-label="Unit Price" ><Input defaultValue={item.unitprice} type="number" onBlur={()=>{
                                    calculateTotal()
                                  }} name="unitprice" /></td>
                            <td data-label="Total Price"><Input type="hidden" defaultValue={item.totalprice} name="totalprice" />{item.totalprice}</td>
                            <td data-label="Remarks"><Input type="input" defaultValue={item.description} name="remarks" /></td>
                            <td data-label="Action"> <Input defaultValue={item.id} type="hidden" name="id"></Input><Link to=""><span>Clear</span></Link></td>
                        </tr>
                        );
                    })}

                    </tbody>

                </table>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={()=>{setAddPurchaseOrderModal(false)}}>Submit</Button>
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




// {tabMaterialsPurchased && tabMaterialsPurchased.map((res)=>{
//     return  
//   })
  
//   }