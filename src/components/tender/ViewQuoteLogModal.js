import React from 'react'
import { Card, CardBody, CardTitle,Row,Col,Button,Modal,ModalHeader,ModalBody, ModalFooter, } from 'reactstrap';
import PropTypes from 'prop-types'


const ViewQuoteLogModal = ({quotationsModal,setquotationsModal}) => {

    ViewQuoteLogModal.propTypes = {
        quotationsModal: PropTypes.bool,
        setquotationsModal: PropTypes.func,
      }
      
  return (
    <>
        <Modal size="lg" isOpen={quotationsModal}>
            <ModalHeader>Quote History</ModalHeader>
            <ModalBody>
                <Row>
                <Col md="12">
                <Card>
                    <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
                    Quote History
                    </CardTitle>
                    <CardBody>
                    
                    </CardBody>
                </Card>
                </Col>
                </Row>  
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={()=>{setquotationsModal(false)}}> Submit </Button>
                <Button color="secondary" onClick={()=>{setquotationsModal(false)}}> Cancel </Button>
            </ModalFooter>
        </Modal> 
    </>
  )
}

export default ViewQuoteLogModal