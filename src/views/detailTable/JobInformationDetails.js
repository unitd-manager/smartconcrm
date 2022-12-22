import React, {useState,useEffect } from 'react';
import {
    
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,ModalFooter
  } from 'reactstrap';
  import { ToastContainer } from 'react-toastify';
  

import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';


const JobInformationDetails = () => {
 
  const [employee, setEmployee] = useState();

  
  // Get Supplier By Id

 const editJobById = () =>
 {
    api.get('/jobinformation/getEmployee')
    .then((res)=> {
      console.log(res.data.data)
        setEmployee(res.data.data)
    })
   .catch(() => {
    
    })
 }
 

    
    //Logic for adding tender in db
    const [jobForms, setJobForms] = useState({
      first_name:"",
      
    });
    
    
    const handleInputsJobForms = (e) => {
      setJobForms({...jobForms, [e.target.name]:e.target.value});
    }
    
    const insertJobInformation = () => {
    
      
      api.post('/jobinformation/insertjob_information',jobForms)
      .then(()=> {
        message('JobInformation inserted successfully.','success')
      })
      .catch(() => {
        message('Network connection error.','error')
      })
      }
      useEffect(()=>{
        editJobById();
      
      },[])
  
    

  return (
    <div>
      <BreadCrumbs />
      <Row>
      <ToastContainer></ToastContainer>
        <Col md="12">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
              <Row>
                  
                
                <Label>Employee Name </Label>

                    <Input type="select" name="employee_id" onChange={(e)=>{
                      handleInputsJobForms(e)
                    }}>
                    <option value="" selected >Please Select</option>

                      {employee && employee.map((ele)=>{
                        return  (<option key={ele.employee_id} value={ele.employee_id} >{ele.first_name}</option>)
                      })}
                    </Input>
                    </Row>
                    
                <ModalFooter>
                
                      
        
       
            < Button color="primary" onClick={()=>{ insertJobInformation() }}>
          Save and Continue</Button>
           < Button color="secondary" onClick={handleInputsJobForms}>
          Cancel</Button>


            
      </ModalFooter>

              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        
      </Row>
      </div>
     
  );
}
export default JobInformationDetails;
