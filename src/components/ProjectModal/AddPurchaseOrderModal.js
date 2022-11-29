import React,{useState} from 'react';
import { Row,Col,FormGroup,Input,Button,Modal,ModalHeader,ModalBody, ModalFooter,Label } from 'reactstrap';
import {  Link } from 'react-router-dom';
// import * as $ from "jquery";
import PropTypes from 'prop-types'

const AddPurchaseOrderModal = ({addPurchaseOrderModal,setAddPurchaseOrderModal}) => {

    AddPurchaseOrderModal.propTypes = {
        addPurchaseOrderModal: PropTypes.bool,
        setAddPurchaseOrderModal: PropTypes.func
      }

      const [ addNewProductModal, setAddNewProductModal] = useState(false)
      const [addMoreItem, setMoreItem] = useState(2)
      const AddMoreItem = () => {
        setMoreItem(addMoreItem + 1)
      } 

  return (
    <>
         <Modal isOpen={addPurchaseOrderModal}>
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
                            <Button color="primary" onClick={AddMoreItem}>Add More Items</Button>
                        </Col>
                        </Row>
                        <br/>
                        <Row>
                        <Col md="3">
                            <Label>Supplier</Label>
                            <Input type="select" name="supplier">
                                <option value="" selected="selected">Please Select</option>
                                <option value="1">abc </option>
                                <option value="2">ABC New company Pte Ltd</option>
                                <option value="3">ABC Supplier</option>
                                <option value="4">dairyui</option>
                            </Input>
                        </Col>
                        <Col md="3">
                            <Label>PO Date</Label>
                            <Input type="date" name="supplier" />
                        </Col>
                        <Col md="3">
                            <Label>PO No.</Label>
                            <Input type="text" name="supplier" />
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
                            <FormGroup className='mt-3'> Total Amount :</FormGroup>
                        </Row>
                    </Col>
                    </Row>

                <table className='lineitem'>
                    <thead>
                    <tr>
                        <th scope="col">Item</th>
                        <th scope="col">UoM</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Remarks</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>

                    
                    {[...Array(addMoreItem)].map(() => {
                        return (
                        <tr>
                            <td data-label="Item"><Input type="text" name="item" /></td>
                            <td data-label="UoM"><Input type="text" name="uom" /></td>
                            <td data-label="Qty"><Input type="text" name="Quantity" /></td>
                            <td data-label="Unit Price"><Input type="text" name="unitprice" /></td>
                            <td data-label="Total Price"></td>
                            <td data-label="Remarks"><Input type="textarea" name="remarks" /></td>
                            <td data-label="Action"><Link to=""><span>Clear</span></Link></td>
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