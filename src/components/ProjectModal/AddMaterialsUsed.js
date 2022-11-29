import React,{useState } from 'react';
import { Row,Col,FormGroup,Input,Button,Modal,ModalHeader,ModalBody, ModalFooter, } from 'reactstrap';
import {  Link } from 'react-router-dom';
// import * as $ from "jquery";
import PropTypes from 'prop-types'

const AddMaterialsUsed = ({addMaterialsUsed,setAddMaterialsUsed}) => {
 
    AddMaterialsUsed.propTypes = {
        addMaterialsUsed: PropTypes.bool,
        setAddMaterialsUsed: PropTypes.func,
  }
  // Logic for Add New Item Row

  const [addMoreItem, setMoreItem] = useState(2)

  const AddMoreItem = () => {
    setMoreItem(addMoreItem + 1)
  } 


// function getAllValues() {
//      const result = [];
     
//     $("table tbody tr").each(function() {
//         const allValues = {}; 
//         $(this).find("input").each(function( ) {
             
//              const fieldName = $(this).attr("name");
//              allValues[fieldName] = $(this).val();
//         });
//         result.push(allValues);
//     })
//     console.log(result);
     
//  }

  return (
    <>

           <Modal isOpen={addMaterialsUsed}>
              <ModalHeader>Add Materials</ModalHeader>
              
              <ModalBody>
                  <FormGroup>
                    <Row>
                      <Col md="12" className='mb-4'>
                        <Row>
                          <Col md="3">
                            <Button color="primary" 
                            type='button'
                            onClick={()=>{AddMoreItem()}}
                            >Add Materials</Button>
                          </Col>
                          {/* <Col md="3">
                            <b> Discount : </b>
                          </Col>
                          <Col md="3">
                            <b>Total Amount: </b>
                          </Col> */}
                        </Row>
                      </Col>
                    </Row>
                  <table className='lineitem' >
                    
                    <thead>
                      <tr>
                        <th scope="col">Item</th>
                        <th scope="col">Type</th>
                        <th scope="col">Stock</th>
                        <th scope="col">UoM</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Remarks</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>

                        {[...Array(addMoreItem)].map(() => {
                            return (
                              <tr>
                                  <td data-label="Item"><Input type="text" name="item" /></td>
                                  <td></td>
                                  <td></td>
                                  <td data-label="UoM"><Input type="number" name="UoM" /></td>
                                  <td data-label="UoM"><Input type="number" name="quantity" /></td>
                                  <td data-label="Remarks"><Input type="text" name="remarks" /></td>
                                  <td data-label="Action"><Link to=""><Input type='hidden' name="id"></Input><span>Clear</span></Link></td>
                              </tr>
                              );
                          })}

                    </tbody>
                  </table>
                  </FormGroup>
              </ModalBody>
              <ModalFooter>
                  <Button color="primary" type='button' onClick={()=>{setAddMaterialsUsed(false)}}>Submit</Button>
                  <Button color="secondary" onClick={()=>{setAddMaterialsUsed(false)}}>Cancel</Button>
              </ModalFooter>
          </Modal>
    </>
  )
}

export default AddMaterialsUsed