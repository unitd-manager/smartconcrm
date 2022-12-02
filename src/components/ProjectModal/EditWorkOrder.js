import React from 'react'
import { Row,Col,FormGroup,Input,Button,Modal,ModalHeader,ModalBody, ModalFooter,Label,Form } from 'reactstrap';
import PropTypes from 'prop-types'

const EditWorkOrder = ({editWorkOrderModal, setEditWorkOrderModal}) => {

    EditWorkOrder.propTypes = {
        editWorkOrderModal: PropTypes.bool,
        setEditWorkOrderModal: PropTypes.func,
      }

  return (
    <>
        <Modal isOpen={editWorkOrderModal} >
            <ModalHeader>
                Edit Work Order Display
                <Button color="secondary" onClick={()=>{setEditWorkOrderModal(false)}}> X </Button>
            </ModalHeader>
            
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Row>
                            <Col md="3">
                                <FormGroup>
                                    <Label>Sub Con </Label>
                                    <Input type="select" name="">
                                        <option value="" selected="selected">Please Select</option>
                                        <option value="1">united technologies</option>
                                        <option  value="2">jill</option>
                                    </Input>
                                </FormGroup>
                            </Col>

                            <Col md="3">
                                <FormGroup>
                                    <Label>Date</Label>
                                    <Input type="date" name="date" />
                                </FormGroup>
                            </Col>

                            <Col md="3">
                                <FormGroup>
                                    <Label>Due Date</Label>
                                    <Input type="date" name="Due_Date"/>
                                </FormGroup>
                            </Col>
                            
                            <Col md="3">
                                <FormGroup>
                                    <Label>Completed Date</Label>
                                    <Input type="DATE" name="Completed_Date" />
                                </FormGroup>
                            </Col>

                        </Row>

                        <Row>

                            <Col md="3">
                                <FormGroup>
                                    <Label>Status </Label>
                                    <Input type="select" name="contact_id">
                                        <option value="New">New</option>
                                        <option value="Cancelled">Cancelled</option>
                                        <option selected="selected" value="Confirmed">Confirmed</option>
                                        <option value="Hold">Hold</option>
                                    </Input>
                                </FormGroup>
                            </Col>

                            <Col md="3">
                                <FormGroup>
                                    <Label>Project Location</Label>
                                    <Input type="text" name="Project_Location" />
                                </FormGroup>
                            </Col>

                            <Col md="3">
                                <FormGroup>
                                    <Label>Project Reference</Label>
                                    <Input type="TEXT" name="Project_Reference" />
                                </FormGroup>
                            </Col>

                            <Col md="3">
                                <FormGroup>
                                    <Label>Quotation Reference</Label>
                                    <Input  type="date" name="Quotation_Reference_date"/>
                                </FormGroup>
                            </Col>

                        </Row>

                        <Row>

                            <Col md="3">
                                <FormGroup>
                                    <Label>Quotation Reference</Label>
                                    <Input  type="text" name="Quotation_Reference"/>
                                </FormGroup>
                            </Col>

                        </Row>

                        <Row>

                            <Col md="12">
                                <FormGroup>
                                    <Label>Terms & Condition</Label>
                                    <Input  type="textarea" name="terms_condition"/>
                                </FormGroup>
                            </Col>

                        </Row>
                        
                    </FormGroup> 
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={()=>{setEditWorkOrderModal(false)}}> Submit </Button>
            </ModalFooter>
        </Modal>
       
</>
  )
}

export default EditWorkOrder