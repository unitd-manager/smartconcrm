import React from 'react'
import { Row,Col,FormGroup,Input,Button,Modal,ModalHeader,ModalBody,Label,Form } from 'reactstrap';
import PropTypes from 'prop-types'

const EditPoModal = ({editPo, setEditPo}) => {

    EditPoModal.propTypes = {
        editPo: PropTypes.bool,
        setEditPo: PropTypes.func,
      }

  return (
    <>
         <Modal size="lg" isOpen={editPo}>
            <ModalHeader> Edit Purchase Order </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Form>
                        <FormGroup>
                            <Row>
                                <Col md="4">
                                    <FormGroup>
                                    <Label>Supplier</Label>
                                    <Input type="select" name='supplier' >
                                        <option value="">Please Select</option><option value="1">abc </option>
                                        <option value="2">ABC New company Pte Ltd</option>
                                        <option selected="selected" value="3">ABC Supplier</option>
                                        <option value="4">dairyui</option>
                                        <option value="5">abc company</option>
                                        <option value="6">united technologies</option>
                                        <option value="7">jhjghjgj</option>
                                        <option value="8">New Frame Tech Ltd</option>
                                        <option value="9">ndfjbfjd</option>
                                        <option value="10">abc company</option>
                                    </Input>
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                    <Label>PO Date</Label>
                                    <Input type="date" name="po_date" />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                    <Label>Delivery To</Label>
                                    <Input type="text" name="delivery_to" />
                                    </FormGroup>
                                </Col>
                                
                            </Row>
                            
                            <Row>
                                <Col md="4">
                                    <FormGroup>
                                    <Label>Delivery Date</Label>
                                    <Input type="date" name="delivery_date" />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                    <Label>Delivery Contact</Label>
                                    <Input type="text" name="contact"/>
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                    <Label>Mobile</Label>
                                        <Input type="text" name="mobile"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="4">
                                    <FormGroup>
                                    <Label>Payment</Label>
                                    <Input type="text" name="payment" />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                    <Label>Shipping method</Label>
                                        <Input type="text" name="shipping_method"/>
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label>Project</Label>
                                        <Input type="text" name="project"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <FormGroup>
                                    <Label>PaymentTerms</Label>
                                    <Input type="textarea" name="payment_terms"/>
                                </FormGroup>
                            </Row>

                        
                            <Row>
                            <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                                <Button type="button" className="btn btn-success mr-2" onClick={()=>{setEditPo(false) }}>
                                    Save & Continue
                                </Button>
                                <Button color="secondary" onClick={()=>{setEditPo(false) }}>Cancel</Button>
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


export default EditPoModal