import React,{useEffect, useState} from 'react'
import {Row,Col,Form,FormGroup,Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types'
import api from '../../constants/api';
import message from '../Message';
import EditWorkOrder from './EditWorkOrder';
import WorkOrderViewLineItem from './WorkOrderViewLineItem';


function SubConWorkOrderPortal({projectId}) {

    SubConWorkOrderPortal.propTypes = {
        projectId: PropTypes.string
      }


    const [subConWorkOrdeData, setSubConWorkOrdeData ] = useState();
    const [editWorkOrderModal, setEditWorkOrderModal] = useState(false);
    const [workOrderViewLineItem, setWorkOrderViewLineItem] = useState(false);

    const SubConWorkOrder = () => {
        api.post('/projecttabsubconworkorder/SubConWorkOrderPortal',{project_id:projectId})
            .then((res) => {
            setSubConWorkOrdeData(res.data.data)
            console.log("SubConWorkOrderPortal",res)
            })
            .catch(()=>{
            message(" SubCon Work Order Data not found","info")
            })    
    }

    useEffect(() => {
        
        SubConWorkOrder();

    },[projectId])

  return (
    <>

        <EditWorkOrder editWorkOrderModal={editWorkOrderModal} setEditWorkOrderModal={setEditWorkOrderModal}/>
        <WorkOrderViewLineItem workOrderViewLineItem={workOrderViewLineItem} setWorkOrderViewLineItem={setWorkOrderViewLineItem} />

        <Form className='mt-4'>
            <Row className='border-bottom mb-3'>
            <Col><FormGroup><Label>WO Code</Label> </FormGroup></Col>
            <Col><FormGroup><Label>Date</Label> </FormGroup></Col>
            <Col><FormGroup><Label>Sub Con</Label> </FormGroup></Col>
            <Col><FormGroup><Label>Status</Label> </FormGroup></Col>
            <Col><FormGroup><Label>Due Date</Label> </FormGroup></Col>
            <Col><FormGroup><Label>Completed Date</Label> </FormGroup></Col>
            <Col><FormGroup><Label>Amount</Label> </FormGroup></Col>
            <Col></Col>
            <Col><FormGroup><Label>Action</Label> </FormGroup></Col>
            </Row>
 
        {subConWorkOrdeData && subConWorkOrdeData.map((e)=>{
            return(
                <Row>
                <Col>
                <FormGroup></FormGroup>
                </Col>
                <Col>
                <FormGroup>
                    <Label>{e.work_order_date}</Label>
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                    <Label>test</Label>
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                    <Label>{e.status}</Label>
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                    <Label>{e.work_order_due_date}</Label>
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                    <Label>{e.completed_date}</Label>
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                    <Label>test</Label>
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                    <Label><Link to=""><span onClick={()=>{setWorkOrderViewLineItem(true)}}>View Line Items</span></Link></Label>
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                    <Row>
                    <Col md='2'><Label><Link to=""><span onClick={()=>{setEditWorkOrderModal(true)}}><Icon.Edit /></span></Link></Label></Col>
                    <Col md='2'><Label><Link to=""><span ><Icon.Printer /></span></Link></Label></Col>
                    <Col md='2'><Label><Link to=""> <span><Icon.PlusCircle /></span> </Link></Label></Col>
                    </Row>
                </FormGroup>
                </Col>
                </Row>
            )
          
        })} 
                    
    </Form></>
  )
}

export default SubConWorkOrderPortal