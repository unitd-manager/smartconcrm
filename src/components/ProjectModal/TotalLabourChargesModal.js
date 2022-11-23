import React from 'react'
import { Row,Col,FormGroup,Input,Button,Modal,ModalHeader,ModalBody, ModalFooter,Label } from 'reactstrap';
import PropTypes from 'prop-types'


const TotalLabourChargesModal = ({addTotalLabourChargesModal,setTotalLabourChargesModal}) => {


    TotalLabourChargesModal.propTypes = {
        addTotalLabourChargesModal: PropTypes.bool,
        setTotalLabourChargesModal: PropTypes.func
      }

  return (
    <>
        <Modal isOpen={addTotalLabourChargesModal}>
            <ModalHeader>Add Actual Charges</ModalHeader>
            
            <ModalBody>
                <h5>Total Labour Charges</h5>
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
                <Button color="primary" onClick={()=>{setTotalLabourChargesModal(false)}}>Submit</Button>
                <Button color="secondar" onClick={()=>{setTotalLabourChargesModal(false)}}>Cancel</Button>
            </ModalFooter>
        </Modal>
    
    </>
  )
}

export default TotalLabourChargesModal