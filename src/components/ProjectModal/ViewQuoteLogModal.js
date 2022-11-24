import React from 'react'
import { Card,CardBody,CardTitle,Row,Col,Button,Modal,ModalHeader,ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types'

const ViewQuoteLogModal = ({viewQuotationsModal,setViewQuotationsModal}) => {

    ViewQuoteLogModal.propTypes = {
        viewQuotationsModal: PropTypes.bool,
        setViewQuotationsModal: PropTypes.func
      }
  return (
    <>
         <Modal isOpen={viewQuotationsModal}>
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
                <Button color="primary" onClick={()=>{setViewQuotationsModal(false)}}>
                Submit
                </Button>
                <Button color="secondary" onClick={()=>{setViewQuotationsModal(false)}}>
                Cancel
                </Button>
            </ModalFooter>
        </Modal> 
    </>
  )
}

export default ViewQuoteLogModal