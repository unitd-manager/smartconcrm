import React from 'react'
import { Row,Col,FormGroup,Input,Button,Modal,ModalHeader,ModalBody,Label,Form } from 'reactstrap';
import PropTypes from 'prop-types'

const EditQuotation = ({editQuoteModal, setEditQuoteModal}) => {

    EditQuotation.propTypes = {
        editQuoteModal: PropTypes.bool,
        setEditQuoteModal: PropTypes.func,
      }

  return (
    <>
         <Modal size="lg" isOpen={editQuoteModal}>
            <ModalHeader>Edit Quote Display </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Form>
                        <FormGroup>
                            <Row>
                                <Col md="4">
                                    <FormGroup>
                                    <Label>Quote Date</Label>
                                    <Input type="date" name="quote_date" />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                    <Label>Quote Status</Label>
                                    <Input disabled type="text" name='quote_status' />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                    <Label>Discount</Label>
                                    <Input type="text" name="discount" />
                                    </FormGroup>
                                </Col>
                                
                            </Row>
                            
                            <Row>
                                <Col md="4">
                                <Label>Drawing Nos</Label>

                                    <Form inline>
                                        <div className="form-check form-check-inline">
                                        <Input
                                            className="form-check-input"
                                            type="radio"
                                            name="drawing_nos"
                                            value="1"
                                        />
                                        <Label for="inlineradio1">yes</Label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                        <Input
                                            className="form-check-input"
                                            type="radio"
                                            name="drawing_nos"
                                            value="0"
                                        />
                                        <Label for="inlineradio2">No</Label>
                                        </div>
                                    </Form>
    

                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                    <Label>Project Location</Label>
                                    <Input type="text" name="project_location"/>
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                    <Label>Project Reference</Label>
                                        <Input type="text" name="project_reference"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="4">
                                    <FormGroup>
                                    <Label>Mode of Payment</Label>
                                    <Input type="select" name="payment_method">
                                        <option value="">Please Select</option><option value="15 days">15 days</option>
                                        <option selected="selected" value="40 days">40 days</option>
                                        <option value="60 days">60 days</option>
                                        <option value="COD">COD</option>
                                    </Input>
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                    <Label>Ref No</Label>
                                        <Input type="text" name="Ref_No"/>
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label>Quote Revision</Label>
                                        <Input type="text" name="revision"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <FormGroup>
                                    <Label>Terms & Condition</Label>
                                    <Input type="textarea" name="terms_condition"/>
                                </FormGroup>
                            </Row>

                        
                            <Row>
                            <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                                <Button type="button" className="btn btn-success mr-2" onClick={()=>{setEditQuoteModal(false) }}>
                                Save & Continue
                                </Button>
                                <Button color="secondary" onClick={()=>{setEditQuoteModal(false) }}>Cancel</Button>
                            </div>
                            </Row>

                        </FormGroup> 
                    </Form>
                </FormGroup>
            </ModalBody>
        </Modal>
       
</>
  )
}

export default EditQuotation