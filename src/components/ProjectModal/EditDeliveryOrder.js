import React from 'react'
import { Input,Button,Modal,ModalHeader,ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types'

const EditDeliveryOrder = ({editDeliveryOrder, setEditDeliveryOrder}) => {

    EditDeliveryOrder.propTypes = {
        editDeliveryOrder: PropTypes.bool,
        setEditDeliveryOrder: PropTypes.func,
      }

  return (
    <>
        <Modal size="xl" isOpen={editDeliveryOrder} >
            <ModalHeader>
                    Edit Delivery Order
                <Button color="secondary" onClick={()=>{setEditDeliveryOrder(false)}}> X </Button>
            </ModalHeader>
            
            <ModalBody>
                <table className='lineitem' >
                    
                    <thead>
                      <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Status</th>
                        <th scope="col">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label="Item"><Input disabled type="text" name="item" /></td>
                            <td data-label="UoM"><Input type="number" name="quantity" /></td>
                            <td data-label="UoM"><Input type="select" name="status">
                                <option value="">Please Select</option>
                                <option selected="selected" value="In Progress">In Progress</option>
                                <option value="Delivered">Delivered</option>
                                <option value="On-hold">On-hold</option>
                                <option value="Cancelled">Cancelled</option>
                            </Input>
                            </td>
                            <td data-label="Remarks"><Input type="text" name="remarks" /></td>
                        </tr>
                    </tbody>
                  </table>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={()=>{setEditDeliveryOrder(false)}}> Submit </Button>
            </ModalFooter>
        </Modal>
       
</>
  )
}

export default EditDeliveryOrder