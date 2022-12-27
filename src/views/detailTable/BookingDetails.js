import React, { useState, useEffect } from 'react';
import {
  Modal,ModalBody,ModalFooter,Card,CardBody,CardTitle,
  ModalHeader,Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import { useNavigate, Link } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs'
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';


const BookingDetails = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };


  const navigate = useNavigate()


  const [company, setCompany] = useState();
  const getCompany = () => {
    api.get('/company/getCompany')
      .then((res) => {
        setCompany(res.data.data)
        console.log(company)
      })
  }



  const [companyInsertData, setCompanyInsertData] = useState({
    company_name:"",
    phone:"",
    website:"",
    address_flat:"",
    address_street:"",
    address_town:"",
    address_state:"",
    latitude:"",
    longitude:""
    
    
  });
  
  const handleInputs = (e) => {
    setCompanyInsertData({...companyInsertData, [e.target.name]:e.target.value});
  }
  
  const insertCompany = () => {
  
    if(companyInsertData.company_name !== '' && 
    companyInsertData.phone !== '' && 
    companyInsertData.address_flat !== ''){
      api.post('/company/insertCompany',companyInsertData)
      .then(()=> {
      message('Company inserted successfully.','success')
        toggle()
        //getCompany()
      })
      .catch(() => {
        message('Network connection error.','error')
      })
    }else{
      message('Please fill all required fields.','error')
    }
    
  }

  

  useEffect(() => {
    getCompany()
  }, [])

  // const [trainingInsertData, setTrainingInsertData] = useState({
  //   title:"",

  // });

  // const handleInputs = (e) => {
  //   setTrainingInsertData({...trainingInsertData, [e.target.name]:e.target.value});
  // }
  const [bookingForms, setBookingForms] = useState({
    company_name: "",
  });

  const handleBookingForms = (e) => {
    setBookingForms({ ...bookingForms, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col md="12">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="8">
                    <Label>Customer Name</Label>

                    <Input type="text" name="company_name" onChange={(e) => {
                      //getContact(e.target.value)
                      handleBookingForms(e)
                    }}>
                    </Input>
                    </Col>
                    <Col md="2" className='addNew'>
                <Label>Add New Name</Label>
                    <Button color="primary" onClick={toggle.bind(null)}>Add New</Button>
                </Col>
                  
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button type="submit" className="btn btn-success mr-2">
                      <Link to={`/BookingUpdate/${bookingForms.company_name}`} >Save & Continue</Link>
                    </Button>
                    <Button onClick={() => {
                      navigate(-1)
                    }} type="button" className="btn btn-dark">
                      Go to List
                    </Button>
                  </div>
                </Row>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>

      </Row>
      <Modal size='xl' isOpen={modal} toggle={toggle.bind(null)}>
      <ModalHeader toggle={toggle.bind(null)}>New Booking</ModalHeader>
      <ModalBody>
        <Row>
        <Col md="12">
          <Card>
            <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
                New Company
            </CardTitle>
            <CardBody>
              <Form>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Company Name <span className='required'> *</span></Label>
                      <Input type="text" name="company_name" 
                      onChange={handleInputs}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Phone <span className='required'> *</span></Label>
                      <Input type="text" name="phone" 
                       onChange={handleInputs}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Website</Label>
                      <Input type="text" name="website"
                        onChange={handleInputs}
                       />
                    </FormGroup>
                  </Col>
                <Col md="12">
                  <FormGroup>
                    <Label>Address 1</Label>
                    <Input type="text" name="address_flat" placeholder=" " 
                     onChange={handleInputs}
                    />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label>Address 2</Label>
                    <Input type="text" name="address_street" placeholder=""  onChange={handleInputs}
                      />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Address3</Label>
                    <Input type="text" name="address_town" placeholder="" 
                     onChange={handleInputs}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Address4</Label>
                    <Input type="text" name="address_state" placeholder="" 
                     onChange={handleInputs}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Latitude</Label>
                    <Input type="text" name="latitude" placeholder="" 
                     onChange={handleInputs}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Longitude</Label>
                    <Input type="text" name="longitude" placeholder="" 
                     onChange={handleInputs}
                    />
                  </FormGroup>
                </Col>
                
              </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
        </Row>  
      </ModalBody>
      <ModalFooter>
        <Button color="primary"  onClick={()=>{
          insertCompany()
        }} >
          Save & Continue
        </Button>
        <Button color="secondary" onClick={toggle.bind(null)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal> 


    </div>
  );
}
export default BookingDetails;