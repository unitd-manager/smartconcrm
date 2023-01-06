import React,{useState,useEffect} from 'react';
import { Row,Col,FormGroup,Input,Button,Modal,ModalHeader,ModalBody, ModalFooter,Label } from 'reactstrap';
import {  Link } from 'react-router-dom';
import PropTypes from 'prop-types'
//import * as $ from "jquery";
import random from 'random'
//import Select from 'react-select';
import api from '../../constants/api';
import message from '../Message';

const AddPurchaseOrderModal = ({projectId,addPurchaseOrderModal,setAddPurchaseOrderModal}) => {

    AddPurchaseOrderModal.propTypes = {
        addPurchaseOrderModal: PropTypes.bool,
        projectId:PropTypes.string,
        setAddPurchaseOrderModal: PropTypes.func
      }

      const [ addNewProductModal, setAddNewProductModal] = useState(false)
      const [ getProductValue, setProductValue] = useState()
      //const [tabMaterialsPurchased, setTabMaterialsPurchased] = useState();
      //const [selectedOption, setSelectedOption] = useState(null);
      const [ productDetail, setProductDetail] = useState({
        category_id: ""
        , sub_category_id : "" 
        , title: ""
        , product_code: ""
        , description: ""
        , qty_in_stock: ""
        , price: ""
        , published: ""
        , member_only: ""
        , creation_date: ""
        , modification_date: ""
        , chi_title: ""
        , chi_description: ""
        , sort_order: ""
        , meta_title: ""
        , meta_description: ""
        , meta_keyword: ""
        , latest : "" 
        , description_short: ""
        , chi_description_short: ""
        , general_quotation: ""
        , unit: ""
        , product_group_id: ""
        , department_id: ""
        , item_code: ""
        , modified_by: ""
        , created_by: ""
        , part_number: ""
        , price_from_supplier: ""
        , model: ""
        , carton_no: ""
        , batch_no: ""
        , vat: ""
        , fc_price_code: ""
        , batch_import: ""
        , commodity_code: ""
        , show_in_website: ""
        , most_selling_product: ""
        , site_id: ""
        , damaged_qty: ""
        , item_code_backup: ""
        , hsn_sac: ""
        , deals_of_week: ""
        , top_seller: ""
        , hot_deal: ""
        , most_popular : "" 
        , top_rating: ""
        , section_id: ""
        , discount_type: ""
        , discount_percentage: ""
        , discount_amount: ""
        , hsn: ""
        , gst: ""
        , product_weight: ""
        , tam_title: ""
        , tam_description: ""
        , tam_description_short: ""
        , supplier_id: ""
        , product_type: ""
        , bar_code: ""
        , tag_no: ""
        , pack_size : "" 
        , discount_from_date: ""
        , discount_to_date: ""
        , mrp: ""        
      });
      const [addMoreItem, setMoreItem] = useState(
        [{
            "id":random.int(1,99).toString(),
            "itemId":"",
            "unit": "",
            "qty": "",
            "price": "",
            "mrp": "",
            "gst":"",
            "description":""
        },{
          "id":random.int(0,9999).toString(),
          "itemId":"",
          "unit": "",
          "qty": "",
          "price": "",
          "mrp": "",
          "gst":"",
          "description":""
        },{
          "id":random.int(0,9999).toString(),
          "itemId":"",
          "unit": "",
          "qty": "",
          "price": "",
          "mrp": "",
          "gst":"",
          "description":""
        }]
      )
      //const [ totalAmount, setTotalAmount ] = useState(0);

      const AddNewLineItem = () => {
        //setMoreItem(addMoreItem + 1)
        setMoreItem([...addMoreItem,{
            "id": random.int(0,9999).toString(),
            "itemId":"",
            "unit": "",
            "qty": "",
            "price": "",
            "mrp": "",
            "gst":"",
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

    const handleNewProductDetails = (e) => {
        setProductDetail({...productDetail, [e.target.name]:e.target.value});
      }

    //   Get Supplier
    const getProduct = () => {
        api.get('/product/getProducts')
        .then((res)=>{
        setProductValue(res.data.data)
        console.log("Supplier",res)
      })
    }
         
    const insertProduct = () => {
        api.post('/product/insertProduct',productDetail)
        .then(()=>{
            message('Product inserted successfully', 'success');
      })
      .catch(() => {
        message('Unable to insert product.', 'error');
      });
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
        //setTabMaterialsPurchased(finaldat)
      })
      .catch(()=>{
        message("Tab Purchase Order not found","info")
      })
      }

//  calculate Total
    //   const calculateTotal = () => {
    //    const oldArray = addMoreItem
    //     let totalValue = 0
    //     const result = [];
    //     $(".lineitem tbody tr").each(function() {
    //       const allValues = {}; 
    //       $(this).find("input").each(function() {
           
    //           const fieldName = $(this).attr("name");
             
    //           allValues[fieldName] = $(this).val();
    //           allValues.totalprice = allValues.qty * allValues.unitprice
              
    //       });
    //       result.push(allValues);
    //   })  
    //   result.forEach(obj=>{
    //     if(obj.id){
    //     /* eslint-disable */

    //        // const objId = parseInt(obj.id)
           
    //         const foundObj = oldArray.find(el => el.id === obj.id)
    //         if(foundObj){
    //             obj.item = foundObj.item
    //             obj.itemId = foundObj.itemId
    //         }
           
    //     }

    //   })
    //   console.log(result)
    //   result.forEach(e=>{
    //     if(e.totalprice)
    //     {
    //       totalValue += parseFloat(e.totalprice)
    //     }
    //   })
     
    //   setMoreItem(result)
    //   setTotalAmount(totalValue)
    //   }
      
    //   Insert Purchase Order

    // const handleInsertValue = (e) => {
      
    //     setInsertPurchaseOrderData({...insertPurchaseOrderData, [e.target.name]:e.target.value});
    // }
    const poProduct = (inId,itemObj) => {
        api.post('/purchaseorder/insertPoProduct',{
            purchase_order_id:inId
       ,item_title:itemObj.item
      , quantity:itemObj.qty
      , unit:itemObj.unit
      , amount:0
      , description:itemObj.description
      , creation_date:new Date()
      , modification_date:new Date()
      , created_by:"1"
      , modified_by:"1"
      , status:"In Progress"
      , cost_price	:parseInt(itemObj.unit,10)
      , selling_price:itemObj.mrp
      , qty_updated:parseInt(itemObj.qty,10)
      , qty:parseInt(itemObj.qty,10)
      , product_id:parseInt(itemObj.itemId,10)
      , supplier_id:insertPurchaseOrderData.supplier_id
      , gst:itemObj.gst
      , damage_qty:0
      , brand:""
      , qty_requested:0
      , qty_delivered:0
      , price:itemObj.price

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
        if(pItems.item !== ''){
            poProduct(inserId,pItems)
        }

       })
   }

    const insertPurchaseOrder = () => {
       
        console.log("insertPurchaseOrderData : ",insertPurchaseOrderData)
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
            setAddPurchaseOrderModal(false);
            insertlineItem(res.data.data.insertId);
            getProduct();
            message('Purchase Order Added!','success')
            // insertlineItem()
        }) 
    }
    
  

    useEffect(() => {
        getProduct();
        TabMaterialsPurchased();
    }, [])
    useEffect(() => {
        setMoreItem([{
            "id":random.int(1,99).toString(),
            "itemId":"",
            "unit": "",
            "qty": "",
            "price": "",
            "mrp": "",
            "gst":"",
            "description":""
        },{
          "id":random.int(0,9999).toString(),
          "itemId":"",
          "unit": "",
          "qty": "",
          "price": "",
          "mrp": "",
          "gst":"",
          "description":""
        },{
          "id":random.int(0,9999).toString(),
          "itemId":"",
          "unit": "",
          "qty": "",
          "price": "",
          "mrp": "",
          "gst":"",
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
            <ModalHeader>Add Product</ModalHeader>
            
            <ModalBody>
                <FormGroup>
                    <Row>
                    <Col md="12" className='mb-4'>
                        <Row>
                        <Col md="3">
                            <Button color="primary" onClick={()=>{setAddNewProductModal(true)}}>Add New Product</Button>
                        </Col>
                        <Col md="3">
                            <Button color="primary" onClick={()=>{AddNewLineItem()}}>Add Item</Button>
                        </Col>
                        </Row>
                        <br/>
                        {/* <Row>
                            <FormGroup className='mt-3'> Total Amount : {totalAmount} </FormGroup>
                        </Row> */}
                    </Col>
                    </Row>

                <table className='lineitem'>
                    <thead>
                    <tr className=''>
                        <th width="20%" scope="col">Item</th>
                        <th scope="col">Unit</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Cost Price (without GST)</th>
                        <th scope="col">Selling Price (without GST)</th>
                        <th scope="col">GST</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>

                    {addMoreItem.map((item) => {
                        return (
                        <tr key={item.id}>
                            <td data-label="Item" key={item.id}>                     

{/*                                  <Select
                                    key={item.id}
                                    defaultValue={{value:item.item,label:item.item}}
                                    onChange={(e)=>{
                                        onchangeItem(e,item.id)
                                    }}
                                    options={tabMaterialsPurchased}
                                /> */}
                            <Input type="select" name="item" onChange={(e)=>{
                                        onchangeItem(e,item.id)
                                    }} value={insertPurchaseOrderData&& insertPurchaseOrderData.item}>
                                <option selected="selected" 
                                value="">Please Select</option>

                                {getProductValue && getProductValue.map((res)=>{
                                    return <option key={item.id}
                                    value={res.product_id} 
                                   >{res.title}</option>
                                })}

                            </Input>                                
                                <Input value={item.item} type="hidden" name="item"></Input>
                                <Input value={item.itemId} type="hidden" name="itemId"></Input>
                            </td>
                            <td data-label="Unit"><Input defaultValue={item.uom} type="text" name="unit" value={insertPurchaseOrderData&& insertPurchaseOrderData.unit}/></td>
                            <td data-label="Qty"><Input defaultValue={item.qty} type="number" name="qty" value={insertPurchaseOrderData&& insertPurchaseOrderData.qty}/></td>
                            <td data-label="Cost Price" ><Input defaultValue={item.unitprice} type="number" value={insertPurchaseOrderData&& insertPurchaseOrderData.price} onBlur={()=>{
                                    //calculateTotal()
                                  }} name="price" /></td>
                            <td data-label="Selling Price"><Input type="input" defaultValue={item.totalprice} name="mrp" value={insertPurchaseOrderData&& insertPurchaseOrderData.mrp} />{item.totalprice}</td>
                            <td data-label="GST"><Input type="input" defaultValue={item.description} name="gst" value={insertPurchaseOrderData&& insertPurchaseOrderData.gst} /></td>
                            <td data-label="Action"> <Input defaultValue={item.id} type="hidden" name="id"></Input><Link to=""><span>Clear</span></Link></td>
                        </tr>
                        );
                    })}

                    </tbody>

                </table>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={()=>{
                    insertPurchaseOrder();
                    //insertlineItem(res.data.data.insertId);
                    getProduct();
                    }}>Submit</Button>
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
                                    <Input type="text" name="title" onChange={handleNewProductDetails} value={productDetail.title}/>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                     <Label sm="2">Product Type <span className='required'> *</span></Label>
                                    <Col sm="10">
                                    <Input type="select" name="product_type" onChange={handleNewProductDetails} value={productDetail.product_type}>
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
                <Button color="primary" onClick={()=>{
                    setAddNewProductModal(false);
                    insertProduct();
                    getProduct();
                    console.log(productDetail);
                    }}>Submit</Button>
                <Button color="secondar" onClick={()=>{setAddNewProductModal(false)}}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </>
  )
}

export default AddPurchaseOrderModal