import React from 'react'
import { FormGroup,Button,Modal,ModalHeader,ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types'

const ViewLineItemModal = ({viewLineModal,setViewLineModal}) => {
    ViewLineItemModal.propTypes = {
        viewLineModal: PropTypes.bool,
        setViewLineModal: PropTypes.func
      }
  return (
    <>
        <Modal size="xl" isOpen={viewLineModal}>
            <ModalHeader>Line Items</ModalHeader>
            <ModalBody>
                <FormGroup>
                <table className='lineitem'>
                    
                    <thead>
                    <tr>
                        <th scope="col">Title	</th>
                        <th scope="col">Description	</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Updated By</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    
                    </tbody>
                </table>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={()=>{setViewLineModal(false)}}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </>
  )
}

export default ViewLineItemModal