import React, {useState ,useEffect} from 'react';
import {
    
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
  } from 'reactstrap';
  import { ToastContainer } from 'react-toastify';
  import {   useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';


const SupplierDetails = () => {
  const navigate = useNavigate()
const [supplierForms, setSupplierForms] = useState({
  company_name: "",
})


const handleInputsSupplierForms = (e) => {
  setSupplierForms({...supplierForms, [e.target.name]:e.target.value});
}

    // const [client, setClient] = useState();
    // const getClient = () => {
    //   api.get('/clients/getClients')
    //     .then((res) => {
    //       setClient(res.data.data)
    //       console.log(client)
    //     })
    // }
   
  
   
  
    const insertSupplier = () => {
  
    
      api.post('/supplier/insert-Supplier',supplierForms)
      .then((res)=> {
       const insertedDataId= res.data.data.insertId
       console.log(insertedDataId)
      message('Supplier inserted successfully.','success')
      setTimeout(()=> {
      navigate(`/SupplierEdit/${insertedDataId}`)
      },300);
        
      })
      .catch(() => {
        message('Network connection error.','error')
      })
  
  
  }
  
  
    useEffect(() => {
      // getSupplier();
    }, [])
  
    


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
      
      <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button onClick={()=>{
                           insertSupplier()
                        }} type="button" className="btn btn-success mr-2" >Save & Continue
                    </Button>
                    <Button onClick={() => {
                      navigate(-1)
                    }} type="button" className="btn btn-dark">
                      Go to List
                    </Button>
                  </div>
                </Row>
              </FormGroup>
    </div>
  
  );
};

export default SupplierDetails;
