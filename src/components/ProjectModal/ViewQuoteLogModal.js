import React,{useState} from 'react'
import { Row,Col,Form,FormGroup,Label,Button,Modal,ModalHeader,ModalBody,Card,CardBody,CardTitle} from 'reactstrap';
import { Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import * as Icon from 'react-feather';
import QuoteLogViewLineItems from './QuoteLogViewLineItems';


const ViewQuoteLogModal = ({viewQuotationsModal,setViewQuotationsModal}) => {

    ViewQuoteLogModal.propTypes = {
        viewQuotationsModal: PropTypes.bool,
        setViewQuotationsModal: PropTypes.func
      }

    const [quoteLogViewLineItems, setQuoteLogViewLineItems]= useState(false);

  return (
    <>
         <Modal size="xl" isOpen={viewQuotationsModal}>
            <ModalHeader>
                <div>Quote History</div>
                <Button color="secondary" onClick={()=>{setViewQuotationsModal(false)}}> X </Button>
            </ModalHeader>
            <ModalBody>
                <Row>
                <Col md="12">
                <Card>
                    <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
                        Quotations
                    </CardTitle>
                    <CardBody>
                    <Form>
                <Row>
                  <Col><FormGroup><Label>Revision</Label> </FormGroup></Col>
                  <Col><FormGroup><Label>Quote Code</Label> </FormGroup></Col>
                  <Col><FormGroup><Label>Quote Date</Label> </FormGroup></Col>
                  <Col><FormGroup><Label>Quote Status</Label> </FormGroup></Col>
                  <Col md="1"><FormGroup><Label>Discount</Label> </FormGroup></Col>
                  <Col md="1"><FormGroup><Label>Amount</Label> </FormGroup></Col>
                  <Col><FormGroup><Label></Label> </FormGroup></Col>
                  <Col><FormGroup><Label>Action</Label> </FormGroup></Col>
                </Row>
                <Row>
                <Col>
                  <FormGroup>
                    <span>Cash</span>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                      <span>test</span>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                      <Label>test</Label>
                  </FormGroup>
                </Col>
                <Col >
                  <FormGroup>
                      <Label>test</Label>
                  </FormGroup>
                </Col>
                <Col md="1">
                  <FormGroup>
                      <Label>test</Label>
                  </FormGroup>
                </Col>
                <Col md="1">
                  <FormGroup>
                      <Label>test</Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                      <Label><Link to="" color="primary"><span onClick={()=>{setQuoteLogViewLineItems(true)}}><u>View Line Items</u></span></Link></Label>
                      <QuoteLogViewLineItems quoteLogViewLineItems={quoteLogViewLineItems} setQuoteLogViewLineItems={setQuoteLogViewLineItems} />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Row>
                      <Col md='4'><Label><Link to=""><span ><Icon.Printer/></span></Link></Label></Col>
                    </Row>
                  </FormGroup>
                </Col>
                </Row>
                    </Form>
                    </CardBody>
                </Card>
                </Col>
                </Row>  
                
            </ModalBody>
            {/* <ModalFooter>
                <Button color="secondary" onClick={()=>{setViewQuotationsModal(false)}}>
                Cancel
                </Button>
            </ModalFooter> */}
        </Modal> 
    </>
  )
}

export default ViewQuoteLogModal