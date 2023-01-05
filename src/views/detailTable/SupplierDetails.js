import React, {useState ,useEffect} from 'react';
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


const SupplierDetails = () => {
  const {id} = useParams()
  const [supplierForms, setSupplierForms] = useState({
    company_name:"",
    
  });
  
 // Get Supplier By Id

 const editSupplierById = () =>
 {
    api.post('/supplier/edit-Supplier',{company_name:id})
    .then((res)=> {
        setSupplierForms(res.data.data[0])
    })
   .catch(() => {
     message("Supplier Data Not Found",'info')
    })
 }

 

//Logic for adding supplier in db




const handleInputsSupplierForms = (e) => {
  setSupplierForms({...supplierForms, [e.target.name]:e.target.value});
}

const insertSupplier = () => {

 
  api.post('/supplier/insert-Supplier',supplierForms)
  .then(()=> {
    message('Supplier inserted successfully.','success')
  })
  .catch(() => {
    message('Network connection error.','error')
  })
  
  }  
  useEffect(()=>{
    editSupplierById();
  
  },[id])
    


  return (
    <div>
      <BreadCrumbs />
      <Row>
        <ToastContainer></ToastContainer>
        <Col md="12">
          <ComponentCard title="Supplier Name">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="10">
                    <Label> Supplier Name <span className='required'> *</span> </Label>
                    <Input type="text" name="company_name" onChange={handleInputsSupplierForms}/>
                    </Col>
                </Row>
            </FormGroup>
              
              
            </Form>
          </ComponentCard>
        </Col>
      </Row>
      
      <ModalFooter>
        <Button  color="primary" onClick={()=>{ insertSupplier() }} >
          Save And Continue
        </Button>
        <Button color="secondary" onClick={handleInputsSupplierForms}>
          Cancel
        </Button>
      </ModalFooter>
    </div>
  
  );
};

export default SupplierDetails;
