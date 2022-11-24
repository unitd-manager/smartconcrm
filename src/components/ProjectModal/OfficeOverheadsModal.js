import React from 'react';
import { Row,Col,FormGroup,Input,Button,Modal,ModalHeader,ModalBody, ModalFooter,Label } from 'reactstrap';
import PropTypes from 'prop-types'

const OfficeOverheadsModal = ({addOfficeOverheadsModal,setAddOfficeOverheadsModal}) => {

    OfficeOverheadsModal.propTypes = {
        addOfficeOverheadsModal: PropTypes.bool,
        setAddOfficeOverheadsModal: PropTypes.func
      }

  return (
    <>
        <Modal isOpen={addOfficeOverheadsModal}>
        <ModalHeader>Add Actual Charges</ModalHeader>
        
        <ModalBody>
            <h5> Office Overheads</h5>
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
            <Button color="primary" onClick={()=>{setAddOfficeOverheadsModal(false)}}>Submit</Button>
            <Button color="secondar" onClick={()=>{setAddOfficeOverheadsModal(false)}}>Cancel</Button>
        </ModalFooter>
        </Modal>
    </>
  )
}

export default OfficeOverheadsModal