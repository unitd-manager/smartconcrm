// import React,{useState } from 'react';
// import { Row,Col,FormGroup,Input,Button,Modal,ModalHeader,ModalBody, ModalFooter, } from 'reactstrap';
// import {  Link } from 'react-router-dom';
// import * as $ from "jquery";
// import PropTypes from 'prop-types'

// const AddMaterialsUsed = ({addMaterialsUsed,setAddMaterialsUsed}) => {
 

//     AddMaterialsUsed.propTypes = {
//         addMaterialsUsed: PropTypes.bool,
//         setAddMaterialsUsed: PropTypes.func,
//   }
//   // Logic for Add New Item Row

//   const [addLineItem, setAddLineItem] = useState(2)

//   const AddNewLineItem = () => {
   
//     setAddLineItem([...addLineItem,{
//       "id": new Date().getTime().toString(),
//       "uom": "",
//       "qty": "",
//       "unitprice": "",
//       "totalprice": "",
//       "remarks": "",
//       "item":"",
//       "description":""
//   }])
//   }


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

//   return (
//     <>

//            <Modal isOpen={addMaterialsUsed}>
//               <ModalHeader>Add Line Item</ModalHeader>
              
//               <ModalBody>
//                   <FormGroup>
//                     <Row>
//                       <Col md="12" className='mb-4'>
//                         <Row>
//                           <Col md="3">
//                             <Button color="primary" 
//                             type='button'
//                             onClick={()=>{AddNewLineItem()}}
//                             >Add Line Item</Button>
//                           </Col>
//                           <Col md="3">
//                             <b> Discount : </b>
//                           </Col>
//                           <Col md="3">
//                             <b>Total Amount: </b>
//                           </Col>
//                         </Row>
//                       </Col>
//                     </Row>
//                   <table className='lineitem' >
                    
//                     <thead>
//                       <tr>
//                         <th scope="col">Item</th>
//                         <th scope="col">Description	</th>
//                         <th scope="col">UoM</th>
//                         <th scope="col">Qty</th>
//                         <th scope="col">Unit Price</th>
//                         <th scope="col">Total Price</th>
//                         <th scope="col">Remarks</th>
//                         <th scope="col"></th>
//                       </tr>
//                     </thead>
//                     <tbody>

//                       {addLineItem.map((item) => {
//                             return (
//                               <tr key={item.id}>
//                                   <td data-label="Item"><Input type="text" name="item" /></td>
//                                   <td data-label="Description"><Input type="text" name="description" /></td>
//                                   <td data-label="UoM"><Input type="text" name="uom" /></td>
//                                   <td data-label="Qty"><Input type="number" name="qty" /></td>
//                                   <td data-label="Unit Price"><Input type="number" name="unitprice" /></td>
//                                   <td data-label="Total Price"><Input type="text" name="totalprice" disabled/></td>
//                                   <td data-label="Remarks"><Input type="text" name="remarks" /></td>
//                                   <td data-label="Action"><Link to=""><Input type='hidden' name="id"></Input><span>Clear</span></Link></td>
//                               </tr>
//                               );
//                           })}

//                     </tbody>
//                   </table>
//                   </FormGroup>
//               </ModalBody>
//               <ModalFooter>
//                   <Button color="primary" type='button' onClick={()=>{
//                     getAllValues()
//                   }}>Submit</Button>
//                   <Button color="secondary" onClick={()=>{
//                     setAddMaterialsUsed(false)
//                   }}>Cancel</Button>
//               </ModalFooter>
//           </Modal>
//     </>
//   )
// }

// export default AddMaterialsUsed