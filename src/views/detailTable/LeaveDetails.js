import React, { useState,useEffect } from 'react';
import {Row,Col,Form,FormGroup,Label,Input,Button} from 'reactstrap';
import { useNavigate } from 'react-router-dom';

import moment from 'moment';

import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';

const LeaveDetails = () => {
  const navigate = useNavigate()

  const [employee, setEmployee] = useState();
  const getEmployee = () =>{
    api.get('/leave/getEmployee')
    .then((res)=> {
      setEmployee(res.data.data);
      console.log(res.data.data);
    })
  }

  const [leaveInsertData,setLeaveInsertData ] = useState({
    employee_id:"",
    from_date:"",
    to_date:"",
    leave_type:""
    
  });
  
  const handleInputs = (e) => {
    setLeaveInsertData({...leaveInsertData, [e.target.name]:e.target.value});
  }
  
  const insertLeave = () => {
  
    
      api.post('/leave/insertLeave',leaveInsertData)
      .then((res)=> {
        const insertedDataId= res.data.data.insertId
        console.log(insertedDataId)
       message('Leave inserted successfully.','success')
       setTimeout(()=> {
       navigate(`/LeavesEdit/${insertedDataId}`)
       },300);
         
       })
      .catch(() => {
        message('Network connection error.','error')
      })
    
    
  }
  
     
  useEffect(() => {
    getEmployee();
  }, [])
  
  

return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col md="12">
          <ComponentCard title="Key Details">
            <Form>
                <FormGroup>
                <Row>
                  <Col md="10">
                    <Label>employee_name </Label>

                    <Input type="select" name="employee_id" onChange={handleInputs}value={leaveInsertData && leaveInsertData.employee_id}>
                    <option value="" selected >Please Select</option>

                      {employee && employee.map((ele)=>{
                        return  <option  value={ele.employee_id} >{ele.employee_name}</option>

                      })}
                    </Input>
                </Col>
                </Row>
                </FormGroup>
                <FormGroup>
                <Row>
                  <Col md="3">
                    <Label>From date *</Label>
                    <Input type="date" onChange={handleInputs} value={leaveInsertData && moment(leaveInsertData.from_date).format('YYYY-MM-DD')} name="from_date"/>
                </Col>
                </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                    <Col md="3">
                        <Label>To date *</Label>
                        <Input type="date" onChange={handleInputs} value={leaveInsertData && moment(leaveInsertData.to_date).format('YYYY-MM-DD')} name="to_date"/>
                    </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                    <Col md="12">
                        <Label>Type of Leave *</Label>
                        <Input type="select" onChange={handleInputs} value={leaveInsertData && leaveInsertData.leave_type}name="leave_type">
                        <option value="" selected="selected">Please Select</option>
                        <option value="Absent">Absent</option>
                        <option value="Annual Leave">Annual Leave</option>
                        <option value="Hospitalization Leave">Hospitalization Leave</option>
                        <option value="Sick Leave">Sick Leave</option>
                        </Input>
                    </Col>
                    </Row>
                    
                <Row>
                    <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                        <Button onClick={()=>{
                           insertLeave()
                        }} type="button" className="btn btn-success mr-2" >
                        Submit
                        </Button>
                        <Button type="submit" className="btn btn-dark">
                        Cancel
                        </Button>
                     </div>
                </Row>
                </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default LeaveDetails;
