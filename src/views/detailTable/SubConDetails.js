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


const SubConDetails = () => {
  const navigate = useNavigate()
const [subConForms, setSubConForms] = useState({
  company_name: "",
})


const handleInputsSubConForms = (e) => {
  setSubConForms({...subConForms, [e.target.name]:e.target.value});
}

    // const [client, setClient] = useState();
    // const getClient = () => {
    //   api.get('/clients/getClients')
    //     .then((res) => {
    //       setClient(res.data.data)
    //       console.log(client)
    //     })
    // }
   
  
   
  
    const insertSubCon = () => {
  
    
      api.post('/subcon/insertsub_con',subConForms)
      .then((res)=> {
       const insertedDataId= res.data.data.insertId
       console.log(insertedDataId)
      message('Subcon inserted successfully.','success')
      setTimeout(()=> {
      navigate(`/SubConEdit/${insertedDataId}`)
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
          <ComponentCard title="SubCon Name">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="10">
                    <Label> Subcon Name <span className='required'> *</span> </Label>
                    <Input type="text" name="company_name" onChange={handleInputsSubConForms}/>
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
                           insertSubCon()
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
  

  )
};

export default SubConDetails;
