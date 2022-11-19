import React,{useState } from 'react';
import { Row,Col,FormGroup,Input,Button,Modal,ModalHeader,ModalBody, ModalFooter, } from 'reactstrap';
import {  Link } from 'react-router-dom';
import * as $ from "jquery";
import PropTypes from 'prop-types'
 
function AddLineItemModal({addLineItemModal,setAddLineItemModal}) {

  AddLineItemModal.propTypes = {
    addLineItemModal: PropTypes.bool,
    setAddLineItemModal: PropTypes.func
  }
  // Logic for Add New Item Row
  const [addLineItem, setAddLineItem] = useState(2)

  const AddNewLineItem = () => {
    setAddLineItem(addLineItem + 1)
  }

  // Get Line Item Values

  const getAllValues = () => {

  const result = [];
    
    $("table tbody tr").each(function() {
        const allValues = {}; 
        $(this).find("input").each(function( ) {
            
            const fieldName = $(this).attr("name");
            allValues[fieldName] = $(this).val();
        });
        result.push(allValues);
    })
    console.log(result);
    
}

  return (
    <>

           {/* Add Line Item Modal */}
           <Modal isOpen={addLineItemModal}>
                        <ModalHeader>Add Line Item</ModalHeader>
                        
                        <ModalBody>
                            <FormGroup>
                              <Row>
                                <Col md="12" className='mb-4'>
                                  <Row>
                                    <Col md="3">
                                      <Button color="primary" 
                                      onClick={AddNewLineItem}
                                      >Add Line Item</Button>
                                    </Col>
                                    <Col md="3">
                                      <b> Discount : </b>
                                    </Col>
                                    <Col md="3">
                                      <b>Total Amount </b>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            <table className='lineitem'>
                              
                              <thead>
                                <tr>
                                  <th scope="col">Item</th>
                                  <th scope="col">Description	</th>
                                  <th scope="col">UoM</th>
                                  <th scope="col">Qty</th>
                                  <th scope="col">Unit Price</th>
                                  <th scope="col">Total Price</th>
                                  <th scope="col">Remarks</th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                              <tbody>

                                {[...Array(addLineItem)].map(() => {
                                      return (
                                        <tr>
                                            <td data-label="Item"><Input type="textarea" name="item" /></td>
                                            <td data-label="Description"><Input type="textarea" name="description" /></td>
                                            <td data-label="UoM"><Input type="text" name="uom" /></td>
                                            <td data-label="Qty"><Input type="text" name="qty" /></td>
                                            <td data-label="Unit Price"><Input type="text" name="unitprice" /></td>
                                            <td data-label="Total Price"><Input type="text" name="totalprice" /></td>
                                            <td data-label="Remarks"><Input type="text" name="remarks" /></td>
                                            <td data-label="Action"><Link to=""><span>Clear</span></Link></td>
                                        </tr>
                                        );
                                    })}

                              </tbody>
                            </table>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={getAllValues}>Submit</Button>
                            <Button color="secondary" onClick={()=>{
                              setAddLineItemModal(false)
                            }}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    {/* END Add Line Item Modal */}
    </>
  )
}

export default AddLineItemModal