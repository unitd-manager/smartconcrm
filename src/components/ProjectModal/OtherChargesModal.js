import React from 'react';
import { Row,Col,FormGroup,Input,Button,Modal,ModalHeader,ModalBody, ModalFooter,Label } from 'reactstrap';
import PropTypes from 'prop-types'

const OtherChargesModal = ({addOtherChargesModal,setAddOtherChargesModal}) => {

    OtherChargesModal.propTypes = {
        addOtherChargesModal: PropTypes.bool,
        setAddOtherChargesModal: PropTypes.func
      }

  return (
    <>
        <Modal isOpen={addOtherChargesModal}>
        <ModalHeader>Add Actual Charges</ModalHeader>
        
        <ModalBody>
            <h5>Other Charges</h5>
            <FormGroup>
                <Row>
                <Col md="12" className='mb-4'>
                    <Row>
                        <FormGroup>
                            <Row>
                                <Label sm="2">Date</Label>
                                <Col sm="10">
                                <Input type="date" name="product_name" />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                    <Label sm="2">Amount</Label>
                                <Col sm="10">
                                <Input type="text" name="product_type"/>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                    <Label sm="2">Description</Label>
                                <Col sm="10">
                                <Input type="text" name="product_type"/>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Row>
                </Col>
                </Row>
            </FormGroup>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={()=>{setAddOtherChargesModal(false)}}>Submit</Button>
            <Button color="secondar" onClick={()=>{setAddOtherChargesModal(false)}}>Cancel</Button>
        </ModalFooter>
        </Modal>
    </>
  )
}

export default OtherChargesModal