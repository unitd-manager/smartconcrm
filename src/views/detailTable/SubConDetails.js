import React, {useState,useEffect} from 'react';
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
  import {   useParams } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';

const SubConDetails = () => {
  const {id} = useParams()
  const [subConForms, setSubConForms] = useState({
    company_name:"",
    
  });
  
 // Get Supplier By Id

 const editSubConById = () =>
 {
    api.post('/subcon/edit-Subcon',{company_name:id})
    .then((res)=> {
        setSubConForms(res.data.data[0])
    })
   .catch(() => {
     message("SubCon Data Not Found",'info')
    })
 }

 

//Logic for adding subcon in db




const handleInputsSubConForms = (e) => {
  setSubConForms({...subConForms, [e.target.name]:e.target.value});
}

const insertSubCon = () => {

 
  api.post('/subcon/insertsub_con',subConForms)
  .then(()=> {
    message('Supplier inserted successfully.','success')
  })
  .catch(() => {
    message('Network connection error.','error')
  })
  
  }  
  useEffect(()=>{
    editSubConById();
  
  },[id])
    

  

  return (
    <div>
      <BreadCrumbs />
      <Row>
        <ToastContainer></ToastContainer>
        <Col md="12">
          <ComponentCard title="SubCon Name">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="10">
                    <Label> SubCon Name <span className='required'> *</span> </Label>
                    <Input type="text" name="company_name" onChange={handleInputsSubConForms}/>
                    </Col>
                </Row>
            </FormGroup>
              
              
            </Form>
          </ComponentCard>
        </Col>
      </Row>
      
      <ModalFooter>
        <Button color="primary" onClick={()=>{ insertSubCon() }}>
          Save & Continue
        </Button>
        <Button color="secondary" onClick={handleInputsSubConForms}>
          Cancel
        </Button>
      </ModalFooter>
    </div>
  )
};

export default SubConDetails;
