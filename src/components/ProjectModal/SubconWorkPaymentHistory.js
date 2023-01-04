import React,{useEffect,useState } from 'react'
import {CardTitle, Row,Col,Form,FormGroup,Label } from 'reactstrap';
// import { Link } from 'react-router-dom';
// import * as Icon from 'react-feather';
import PropTypes from 'prop-types'
import api from '../../constants/api';
import message from '../Message';


function SubconWorkPaymentHistory({projectId}) {

    SubconWorkPaymentHistory.propTypes = {
        projectId: PropTypes.string
      }


      const [paymentHistoryData, setPaymentHistoryData ] = useState();


      const PaymentHistoryData = () => {
        api.post('/projecttabsubconworkorder/PaymentHistoryPortal',{project_id:projectId})
            .then((res) => {
            setPaymentHistoryData(res.data.data)
            console.log("paymentHistoryData",res)
            })
            .catch(()=>{
            message(" SubCon Work Order Data not found","info")
            })    
    }

    useEffect(() => {
        
        PaymentHistoryData();

    },[projectId])


  return (
    <> 
         <Row className='mt-4'>
            <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white"> Payment History </CardTitle>
        </Row>

        <Form className='mt-4'>
            <Row className='border-bottom mb-3'>
                <Col><FormGroup><Label>Date</Label> </FormGroup></Col>
                <Col><FormGroup><Label>SubCon Name</Label> </FormGroup></Col>
                <Col><FormGroup><Label>Amount</Label> </FormGroup></Col>
                <Col><FormGroup><Label>Mode of Payment</Label> </FormGroup></Col>
            </Row>
            {paymentHistoryData && paymentHistoryData.map(()=>{
                return(
                    <Row>
                        <Col>
                        <FormGroup></FormGroup>
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
                        <Col>
                        <FormGroup>
                            <Label>test</Label>
                        </FormGroup>
                        </Col>
                    </Row>
                )
            })}
           
        </Form>
</>
  )
}

export default SubconWorkPaymentHistory