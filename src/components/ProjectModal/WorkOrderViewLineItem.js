import React from 'react'
import { FormGroup,Button,Modal,ModalHeader,ModalBody, ModalFooter,Label,Row,Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types'

const WorkOrderViewLineItem = ({workOrderViewLineItem,setWorkOrderViewLineItem}) => {
    WorkOrderViewLineItem.propTypes = {
        workOrderViewLineItem: PropTypes.bool,
        setWorkOrderViewLineItem: PropTypes.func
      }
  return (
    <>
        <Modal size="xl" isOpen={workOrderViewLineItem}>
            <ModalHeader>Work Order View Line Items</ModalHeader>
            <ModalBody>
                <FormGroup>
                <table className='lineitem'>
                    
                    <thead>
                    <tr>
                        <th scope="col">Description	</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Updated By</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td> </td>
                            <td>
                            <Row>
                                <Col md='3'><Label><Link to=""><span><Icon.Edit /></span></Link></Label></Col>
                                <Col md='3'><Label><Link to=""> <span><Icon.Delete /></span> </Link></Label></Col>
                            </Row>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={()=>{setWorkOrderViewLineItem(false)}}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </>
  )
}

export default WorkOrderViewLineItem