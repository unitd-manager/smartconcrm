import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';

const BookingDetails = () => {

  const [company, setCompany] = useState();
  //const [contact, setContact] = useState();
  const [modal, setModal] = useState(false);
  //const [modal1, setModal1] = useState(false);
  const navigate = useNavigate()
  const toggle = () => {
    setModal(!modal);
  };


  //Api call for getting company dropdown
  const getCompany = () => {
    api.get('/company/getCompany')
      .then((res) => {
        setCompany(res.data.data);
        console.log(company);
      })
  }

  // Api call for getting Contact


  //Logic for adding company in db
  const [companyInsertData, setCompanyInsertData] = useState({
    company_name: "",
    phone: "",
    website: "",
    address_flat: "",
    address_street: "",
    address_town: "",
    address_state: "",
    longitude: "",
    latitude: ""



  });

  const handleInputs = (e) => {
    setCompanyInsertData({ ...companyInsertData, [e.target.name]: e.target.value });
  }

  const insertCompany = () => {


    api.post('/company/insertCompany', companyInsertData)
      .then(() => {
        message('Company inserted successfully.', 'success')
        toggle()
        getCompany()
      })
      .catch(() => {
        message('Network connection error.', 'error')
      })
  }
  //Logic for adding tender in db

  const [bookingForms, setBookingForms] = useState({
    company_name: ""
  });


  const handleInputsBookingForms = (e) => {
    setBookingForms({ ...bookingForms, [e.target.name]: e.target.value });
  }





  useEffect(() => {
    getCompany()
  }, [])


  return (
    <div>
      <BreadCrumbs />
      <Row>
        <ToastContainer></ToastContainer>
        <Col md="12">
          <ComponentCard title="New Booking details">
            <Form>

              <FormGroup>
                <Row>
                  <Col md="8">
                    <Label>Company Name </Label>

                    <Input type="select" name="company_name"  onChange={(e) => {
                      handleInputsBookingForms(e)
                    }}>
                       <option value="" selected>Please Select</option>
                      {company && company.map((e)=>{
                        return  <option  value={e.company_name} >{e.company_name}</option>

                    })}

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

                </Row>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button type="button" className="btn btn-success mr-2" >
                      <Link to={`/BookingInsert/${bookingForms.company_name}`} >Save & Continue</Link>
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
        <ModalHeader toggle={toggle.bind(null)}>New Booking details</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Card>
                <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
                  New Customer
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
                          <Label> Phone <span className='required'> *</span></Label>
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
                          <Input type="text" name="address_street" placeholder=" "
                            onChange={handleInputs}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <Label>Area</Label>
                          <Input type="text" name="address_town" placeholder=" "
                            onChange={handleInputs}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <Label>Zipcode</Label>
                          <Input type="text" name="address_state" placeholder=" "
                            onChange={handleInputs}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <Label>Latitude</Label>
                          <Input type="text" name="latitude" placeholder=" "
                            onChange={handleInputs}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <Label>Longitude</Label>
                          <Input type="text" name="longitude" placeholder=" "
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
          <Button color="primary" onClick={() => {
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
};

export default BookingDetails;
