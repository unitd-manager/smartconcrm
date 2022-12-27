import React, { useEffect, useState } from 'react';
import {  Row, Col, Form, FormGroup, Label, Input, Nav, NavItem, NavLink, TabContent, TabPane, Button, ModalFooter, } from 'reactstrap';
import moment from 'moment';
import { ToastContainer } from 'react-toastify'
import { useNavigate,Link, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss'
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';

const BookingUpdate = () => {
  const [activeTab, setActiveTab] = useState('1');
  //const [bookingDetails, setBookingDetails] = useState()
  //const [companyDetails, setCompanyDetails] = useState()

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

 // const [addCompanyModal, setAddCompanyModal] = useState(false);
  //const [company, setCompany] = useState();
  //const [employee, setEmployee] = useState();
 const [booking, setBooking] = useState();
  const [servicelinkeddetails, setServiceLinkedDetails] = useState(null)

  const { id } = useParams()
  const navigate = useNavigate()
  const [employee, setEmployee] = useState();
  
  
  const getEmployee = () =>{
    api.get('/booking/getEmployeeName')
    .then((res)=> {
      setEmployee(res.data.data);
      console.log(res.data.data);
    }).catch(()=>{
      message("Employee not found","info")
    })
  }

   

  const getBooking = () =>{
   api.get('/booking/getBooking')
   .then((res)=> {
     setBooking(res.data.data);
     console.log(booking);
    }).catch(()=>{
      message("Booking not found","info")
  })
 }
 

  

  // Get Company Data
 
  
// const handleCompanyInputs = (e) => {
   // setCompany({ ...company, [e.target.name]: e.target.value });
  //}
  //Get Employee Data

   
  //const handleEmployeeInputs = (e) => {
   // setEmployee({ ...employee, [e.target.name]: e.target.value });
  //}

  
  //const handleCompanyInputs = (e) => {
  //  setCompanyDetails({ ...companyDetails, [e.target.name]: e.target.value });
  //}


  const [bookingDetails, setBookingDetails] = useState({
    booking_date: "",
    company_name:"",
    address_flat:"",
    first_name:"",
    assign_time:"",
    status:"",
    gps_parameter:""

  });

 
  

  // Get Booking By Id
  const editBookingById = () => {
    api.post('/booking/getBookingById', { booking_id: id })
      .then((res) => {
        setBookingDetails(res.data.data[0]);
        console.log(res.data.data[0]);
        //getContact(res.data.data.company_id)
      })
      .catch(() => {
        message("Booking Data Not Found", 'info')
      })
  }

  const handleInputs = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  }
  

  //Logic for edit data in db

  const insertBookingData = () => {
    api.post('/booking/insertBooking', bookingDetails)
      .then(() => {

        message('Record editted successfully', 'success')
       // setTimeout(() => {
       //   window.location.reload()
       // }, 300);

      })
      .catch(() => {
        message('Unable to edit record.', 'error')
      })


  }
  const insertCompanyData = () => {
    api.post('/company/insertCompany', bookingDetails)
      .then(() => {

        message('Record editted successfully', 'success')
       

      })
      .catch(() => {
        message('Unable to edit record.', 'error')
      })


  }
  const insertEmployeeData = () => {
    api.post('/employee/insertEmployee', bookingDetails)
      .then(() => {

        message('Record insert successfully', 'success')
        // setTimeout(() => {
        //   //window.location.reload()
        // }, 300);

      })
      .catch(() => {
        message('Unable to edit record.', 'error')
      })


  }
 
  const editCreationModificationById = () => {
    api.post('/booking/getCreationModificationById', { booking_id: id })
      .then((res) => {
        setBookingDetails(res.data.data[0]);
        console.log(res.data.data[0]);
        //getContact(res.data.data.company_id)
      })
      .catch(() => {
        message("Booking Data Not Found", 'info')
      })
  }
  
 
  const getServiceLinked = () => {
    api.post('/booking/getTabServiceLinkById', { booking_service_id: id })
        .then((res) => {
          setServiceLinkedDetails(res.data.data[0])

            console.log(res.data.data[0])
        }).catch(() => {
            message("service linked not found", "info")
        })
}
const handleserviceInputs = (e) => {
  setServiceLinkedDetails({ ...servicelinkeddetails, [e.target.name]: e.target.value });
}

  useEffect(() => {

    editBookingById();
    //getCompany();
    //getEmployee();
    getBooking();
    getEmployee();
    getServiceLinked();
        

  }, [id])


  return (
    <>
      <BreadCrumbs heading={bookingDetails && bookingDetails.booking_id} />

      <Form >
        <FormGroup>
          <ComponentCard title={`Key Details | Code: ${bookingDetails && bookingDetails.booking_id}`}>
            <Row>
            <Col md="3">
                <FormGroup>
                  <Label> BookingDate </Label>
                  <Input type="date" onChange={handleInputs} value={bookingDetails && moment(bookingDetails.booking_date).format('YYYY-MM-DD')} name="booking_date" />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label>Customer Name</Label>
                <Input type="text"   onChange={handleInputs} value={id} name="company_name" />
               </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label>Address</Label>
                <Input type="text" value={bookingDetails && bookingDetails.address_flat} onChange={handleInputs} name="address_flat">
                        </Input>
                </FormGroup>
            </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Employee Name</Label>
                  
                        
                        <Input type="select" value={bookingDetails && bookingDetails.first_name} onChange={handleInputs} name="first_name">
                            <option value="" selected="selected">Please Select</option>
                           {employee && employee.map((e)=>{
                            return(
                              <option value={e.employee_id} >{e.first_name}</option>
                            )
                           })} 
                         
                        </Input>
               
                  </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Assign Time</Label>
                  <Input type="text" onChange={handleInputs} value={bookingDetails && bookingDetails.assign_time} name="assign_time" />
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                <Label> Status <span className='required'> *</span></Label>
                  <Input value={bookingDetails && bookingDetails.status}
                    type="select" onChange={handleInputs} name="status">
                    <option value="">Please Select</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Waiting for Approval">Waiting for Approval</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Awarded">Awarded</option>
                    <option value="Not Awarded">Not Awarded</option>
                    <option value="Enquiry">Enquiry</option>
                    <option value="Cancelled">Cancelled</option>
                    <option selected="selected" value="Converted to Project">Converted to Project</option>
                  </Input>

                </FormGroup>
              </Col>


              <Col md="3">
                <FormGroup>
                  <Label>GPS Parameter</Label>
                  <Input value={bookingDetails && bookingDetails.gps_parameter} type="text"
                    onChange={handleInputs} name="gps_parameter" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
            </Row>

            <Row>
              <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                <Button onClick={() => {
                  insertBookingData();
                  insertCompanyData();
                  insertEmployeeData();
                  //editBookingById();

                }} type="button" className="btn btn-success mr-2">
                 <Link to="/Booking" >Save & Continue</Link>
                </Button>
                <Button onClick={() => {
                  navigate(-1)
                }} type="button" className="btn btn-dark">
                  Go to List
                </Button>
              </div>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>

      <ComponentCard title="Creation & Modification">
        <Row>
          <Col md="3">
            <FormGroup>
              <Label>Created By</Label>
              <Input value={bookingDetails && bookingDetails.created_by} type="text"
                    onChange={handleInputs} name="created_by"  />
               {() => {
                  
                  editCreationModificationById();
                       
                }} 
              
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="3">
            
              <Label>Modified By</Label>
              <Input value={bookingDetails && bookingDetails.created_by} type="text"
                    onChange={handleInputs} name="modified_by"  />
               {() => {
                  
                  editCreationModificationById();
                       
                }} 
              
              
          </Col>
        </Row>
      </ComponentCard>
      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => {
                toggle('1');
              }}
            >
              ServiceLinked
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => {
                toggle('2');
              }}
            >
              Customer Acknowledgement
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '3' ? 'active' : ''}
              onClick={() => {
                toggle('3');
              }}
            >
              Attachment
            </NavLink>
          </NavItem>

        </Nav>
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            <ComponentCard title="ServiceLinked">

              <Row>
                <Col md="3">
                  <FormGroup>
                    <Label>BookingId</Label>
                    <Input type="text" onChange={handleserviceInputs} value={servicelinkeddetails && servicelinkeddetails.booking_id} name="booking_id" >
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <Label>BookingService</Label>

                    <Input value={servicelinkeddetails && servicelinkeddetails.booking_service_id}
                      type="text" onChange={handleserviceInputs} name="booking_service_id" >

                    </Input>
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <Label>Service</Label>

                    <Input value={servicelinkeddetails && servicelinkeddetails.service}
                      type="text" onChange={handleserviceInputs} name="service" >

                    </Input>
                  </FormGroup>
                </Col>
                <ModalFooter>
                                {() => {
                                    getServiceLinked()
                                }} 
                                  
                                

                            </ModalFooter>
                
              </Row>


            </ComponentCard>
          </TabPane>

          <TabPane tabId="2">
            <ComponentCard title="Customer Acknowledgement">
            </ComponentCard>

          </TabPane>
          <TabPane tabId="3">
            <ComponentCard title="Add a note">
            </ComponentCard>

          </TabPane>
        </TabContent>

      </ComponentCard>
    </>
  )
};

export default BookingUpdate;