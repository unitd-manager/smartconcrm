import React, { useEffect, useState } from 'react';
import { CardBody, Row,Col,Form,FormGroup,Label,Input,Button,TabPane,TabContent,Nav,NavItem,NavLink,ModalFooter,Modal,ModalHeader,ModalBody,Card } from 'reactstrap';
import {ToastContainer} from 'react-toastify';
import {  useNavigate,useParams,Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import Swal from 'sweetalert2';
import $ from 'jquery';
import ContactEditModal from '../../components/tender/ContactEditModel';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss'
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
// import { element } from 'prop-types';


const ClientsEdit = () => {


  const [activeTab, setActiveTab] = useState('1');
  const [editContactEditModal, setEditContactEditModal] = useState(false);
  
 
 
    
    const {id} = useParams();
    const navigate = useNavigate()

    const [contactData, setContactData] = useState();
    
    const toggle = (tab) => {
      if (activeTab !== tab) setActiveTab(tab);
    };

    const [addContactModal, setAddContactModal] = useState(false);

    const addContactToggle = () => {
      setAddContactModal(!addContactModal);
    };


    const [clientsDetails, setClientsDetails] = useState();
    
  

  //  Get Clients By Id

    const editClientsById = () =>
    {
       api.post('/clients/getClientsById',{company_id:id})
       .then((res)=> {
           setClientsDetails(res.data.data[0])
           
       })
      .catch(() => {
        message("Clients Data Not Found",'info')
       })
    }
   
    const handleInputs = (e) => {
     setClientsDetails({...clientsDetails, [e.target.name]:e.target.value});
   }
   


     //Logic for edit data in db
    
     const editClientsData = () =>
     {
       api.post('/clients/editClients',clientsDetails)
       .then(()=> {
         
         message('Record editted successfully','success')
        //  setTimeout(() => {
        //    window.location.reload()
        //  }, 300);
 
       })
         .catch(() => {
           message('Unable to edit record.','error')
         })
     }
     
   
   
    const [contactsDetails,setContactsDetails] = useState(null);
    const getContactLinked = () =>{
      
        api.post('/clients/getContactLinkedByCompanyId',{company_id:id})
          .then((res)=> {
            setContactsDetails(res.data.data)
              console.log(res.data.data)
          })
      }

      const [newContactData, setNewContactData] = useState({
        salutation:'',
        first_name:'',
        email:'',
        position:'',
        department:'',
        phone_direct:'',
        fax:'',
        mobile:''
      });
  
      const handleAddNewContact = (e) => {
        setNewContactData({...newContactData, [e.target.name]:e.target.value});
      }
      
  const AddNewContact = () => {
    const newContactWithCompanyId = newContactData;
    newContactWithCompanyId.company_id = id;
    
    console.log(newContactWithCompanyId.company_id);
    api.post('/clients/insertContact',newContactWithCompanyId)
    .then(()=> {
      // setNewContactData(newContactData.company_id);
    message('contact inserted successfully.','success')
    // window.location.reload();
      
    })
    .catch(() => {
      message('Network connection error.','error')
    })
  
  
}


   

   const columns = [
        {
          name: "id",
          selector: "company_id",
          grow:0,
          wrap: true,
          width:'4%'
        },
        {
            name: 'Edit',
            selector: "edit",
            cell: () => <Icon.Edit2 />,
            grow:0,
            width:'auto',
            button:true,
            sortable:false,
        },
        {
            name:'Del',
            selector: "delete",
            cell: () => <Icon.Trash />,
            grow:0,
            width:'auto',
            wrap: true
        },
        {
          name: "Name",
          selector: "first_name",
          sortable: true,
          grow:0,
          wrap: true
        },
        {
          name: "Email",
          selector: "email",
          sortable: true,
          grow:2,
          wrap: true
        },
        {
          name: "Phone(Direct)",
          selector: "phone_direct",
          sortable: true,
          grow:0,
        },
        {
            name: "Mobile",
            selector: "mobile",
            sortable: true,
            width:'auto',
            grow:3,
    
          },
          {
            name: "Position",
            selector: "position",
            sortable: true,
            width:'auto',
            grow:3,
    
          },
          {
            name: "Dept",
            selector: "department",
            sortable: true,
            width:'auto',
            grow:3,
    
          },
          ]
      
      const deleteRecord = () => {
      
         // console.log(id)
        
        Swal.fire({
          title: `Are you sure? ${id}`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            api.post('/clients/deleteContact',{contact_id:id}).then(res=>{
              console.log(res)
              Swal.fire(
                'Deleted!',
                'Your Tender has been deleted.',
                'success'
              )
              getContactLinked()

            })
          }
        })

      }
      useEffect(()=>{
        // editClientsData();
        editClientsById();
        setTimeout(() => {
          $('#example').DataTable(
              // {
              //     pagingType: 'full_numbers',
              //       pageLength: 20,
              //       processing: true,
              //       dom: 'Bfrtip',
              //           buttons: ['csv', 'print'
              //           ]
              // }
          );
          } ,
          1000
          );
  
          getContactLinked()
        
      },[id])
  
    return (
    <>
    <BreadCrumbs heading={clientsDetails && clientsDetails.company_name} />

        <Form >
          <FormGroup>
          <ComponentCard title={`Key Details | Code: ${clientsDetails && clientsDetails.company_id}`}>
              <Row>
              <Col md="3">
                  <FormGroup>
                  <Label>Name <span className='required'> *</span></Label>
                  <Input  type="text" onChange={handleInputs} value={clientsDetails && clientsDetails.company_name} name="company_name" />
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Phone</Label>
                  <Input type="text" onChange={handleInputs} value={clientsDetails && clientsDetails.phone} name="phone"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Website </Label>
                  <Input  type="text" onChange={handleInputs} value={clientsDetails && clientsDetails.website} name="website" />
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Email</Label>
                  <Input  type="text" onChange={handleInputs} value={clientsDetails && clientsDetails.email} name="email" />
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Fax</Label>
                  <Input  type="text" onChange={handleInputs} value={clientsDetails&& clientsDetails.fax} name="fax" />
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Address 1 </Label>
                  <Input  type="text" onChange={handleInputs} value={clientsDetails && clientsDetails.address_flat} name="address_flat" />
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Address 2 </Label>
                  <Input  type="text" onChange={handleInputs} value={clientsDetails && clientsDetails.address_street} name="address_street" />
                  </FormGroup>
              </Col>
                  <CardBody>
                        <Row>
                           <Col md="4">
                            <FormGroup>
                              <Label>Country <span className='required'> *</span></Label>
                              <Input type="select" name="address_country"  value={clientsDetails && clientsDetails.address_country} 
                              onChange={handleInputs}
                              >
                              <option value="" selected="selected">Please Select</option>
                              <option value="AF">Afghanistan</option>
                              <option value="AX">Aland Islands</option>
                              <option value="AL">Albania</option>
                              <option value="DZ">Algeria</option>
                              <option value="AS">American Samoa</option>
                              <option value="AD">Andorra</option>
                              <option value="AO">Angola</option>
                              <option value="AI">Anguilla</option>
                              <option value="A1">Anonymous Proxy</option>
                              <option value="AQ">Antarctica</option>
                              <option value="AG">Antigua and Barbuda</option>
                              <option value="AR">Argentina</option>
                              <option value="AM">Armenia</option>
                              <option value="AW">Aruba</option>
                              <option value="AP">Asia/Pacific Region</option>
                              <option value="AU">Australia</option>
                              <option value="AT">Austria</option>
                              <option value="AZ">Azerbaijan</option>
                              <option value="BS">Bahamas</option>
                              <option value="BH">Bahrain</option>
                              <option value="BD">Bangladesh</option>
                              <option value="BB">Barbados</option>
                              <option value="BY">Belarus</option>
                              <option value="BE">Belgium</option>
                              <option value="BZ">Belize</option>
                              <option value="BJ">Benin</option>
                              <option value="BM">Bermuda</option>
                              <option value="BT">Bhutan</option>
                              <option value="BO">Bolivia</option>
                              <option value="BA">Bosnia and Herzegovina</option>
                              <option value="BW">Botswana</option>
                              <option value="BV">Bouvet Island</option>
                              <option value="BR">Brazil</option>
                              <option value="IO">British Indian Ocean Territory</option>
                              <option value="BN">Brunei Darussalam</option>
                              <option value="BG">Bulgaria</option>
                              <option value="BF">Burkina Faso</option>
                              <option value="BI">Burundi</option>
                              <option value="KH">Cambodia</option>
                              <option value="CM">Cameroon</option>
                              <option value="CA">Canada</option>
                              <option value="CV">Cape Verde</option>
                              <option value="KY">Cayman Islands</option>
                              <option value="CF">Central African Republic</option>
                              <option value="TD">Chad</option>
                              <option value="CL">Chile</option>
                              <option value="CN">China</option>
                              <option value="CX">Christmas Island</option>
                              <option value="CC">Cocos (Keeling) Islands</option>
                              <option value="CO">Colombia</option>
                              <option value="KM">Comoros</option>
                              <option value="CG">Congo</option>
                              <option value="CD">Congo, The Democratic Republic of the</option>
                              <option value="CK">Cook Islands</option>
                              <option value="CR">Costa Rica</option>
                              <option value="CI">Cote dIvoire</option>
                              <option value="HR">Croatia</option>
                              <option value="CU">Cuba</option>
                              <option value="CY">Cyprus</option>
                              <option value="CZ">Czech Republic</option>
                              <option value="DK">Denmark</option>
                              <option value="DJ">Djibouti</option>
                              <option value="DM">Dominica</option>
                              <option value="DO">Dominican Republic</option>
                              <option value="EC">Ecuador</option>
                              <option value="EG">Egypt</option>
                              <option value="SV">El Salvador</option>
                              <option value="GQ">Equatorial Guinea</option>
                              <option value="ER">Eritrea</option>
                              <option value="EE">Estonia</option>
                              <option value="ET">Ethiopia</option>
                              <option value="EU">Europe</option>
                              <option value="FK">Falkland Islands (Malvinas)</option>
                              <option value="FO">Faroe Islands</option>
                              <option value="FJ">Fiji</option>
                              <option value="FI">Finland</option>
                              <option value="FR">France</option>
                              <option value="GF">French Guiana</option>
                              <option value="PF">French Polynesia</option>
                              <option value="TF">French Southern Territories</option>
                              <option value="GA">Gabon</option>
                              <option value="GM">Gambia</option>
                              <option value="GE">Georgia</option>
                              <option value="DE">Germany</option>
                              <option value="GH">Ghana</option>
                              <option value="GI">Gibraltar</option>
                              <option value="GR">Greece</option>
                              <option value="GL">Greenland</option>
                              <option value="GD">Grenada</option>
                              <option value="GP">Guadeloupe</option>
                              <option value="GU">Guam</option>
                              <option value="GT">Guatemala</option>
                              <option value="GG">Guernsey</option>
                              <option value="GN">Guinea</option>
                              <option value="GW">Guinea-Bissau</option>
                              <option value="GY">Guyana</option>
                              <option value="HT">Haiti</option>
                              <option value="HM">Heard Island and McDonald Islands</option>
                              <option value="VA">Holy See (Vatican City State)</option>
                              <option value="HN">Honduras</option>
                              <option value="HK">Hong Kong</option>
                              <option value="HU">Hungary</option>
                              <option value="IS">Iceland</option>
                              <option value="IN">India</option>
                              <option value="ID">Indonesia</option>
                              <option value="IR">Iran, Islamic Republic of</option>
                              <option value="IQ">Iraq</option>
                              <option value="IE">Ireland</option>
                              <option value="IM">Isle of Man</option>
                              <option value="IL">Israel</option>
                              <option value="IT">Italy</option>
                              <option value="JM">Jamaica</option>
                              <option value="JP">Japan</option>
                              <option value="JE">Jersey</option>
                              <option value="JO">Jordan</option>
                              <option value="KZ">Kazakhstan</option>
                              <option value="KE">Kenya</option>
                              <option value="KI">Kiribati</option>
                              <option value="KP">Korea, Democratic Peoples Republic of</option>
                              <option value="KR">Korea, Republic of</option>
                              <option value="KW">Kuwait</option>
                              <option value="KG">Kyrgyzstan</option>
                              <option value="LA">Lao Peoples Democratic Republic</option>
                              <option value="LV">Latvia</option>
                              <option value="LB">Lebanon</option>
                              <option value="LS">Lesotho</option>
                              <option value="LR">Liberia</option>
                              <option value="LY">Libyan Arab Jamahiriya</option>
                              <option value="LI">Liechtenstein</option>
                              <option value="LT">Lithuania</option>
                              <option value="LU">Luxembourg</option>
                              <option value="MO">Macao</option>
                              <option value="MK">Macedonia</option>
                              <option value="MG">Madagascar</option>
                              <option value="MW">Malawi</option>
                              <option value="MY">Malaysia</option>
                              <option value="MV">Maldives</option>
                              <option value="ML">Mali</option>
                              <option value="MT">Malta</option>
                              <option value="MH">Marshall Islands</option>
                              <option value="MQ">Martinique</option>
                              <option value="MR">Mauritania</option>
                              <option value="MU">Mauritius</option>
                              <option value="YT">Mayotte</option>
                              <option value="MX">Mexico</option>
                              <option value="FM">Micronesia, Federated States of</option>
                              <option value="MD">Moldova, Republic of</option>
                              <option value="MC">Monaco</option>
                              <option value="MN">Mongolia</option>
                              <option value="ME">Montenegro</option>
                              <option value="MS">Montserrat</option>
                              <option value="MA">Morocco</option>
                              <option value="MZ">Mozambique</option>
                              <option value="MM">Myanmar</option>
                              <option value="NA">Namibia</option>
                              <option value="NR">Nauru</option>
                              <option value="NP">Nepal</option>
                              <option value="NL">Netherlands</option>
                              <option value="AN">Netherlands Antilles</option>
                              <option value="NC">New Caledonia</option>
                              <option value="NZ">New Zealand</option>
                              <option value="NI">Nicaragua</option>
                              <option value="NE">Niger</option>
                              <option value="NG">Nigeria</option>
                              <option value="NU">Niue</option>
                              <option value="NF">Norfolk Island</option>
                              <option value="MP">Northern Mariana Islands</option>
                              <option value="NO">Norway</option>
                              <option value="OM">Oman</option>
                              <option value="PK">Pakistan</option>
                              <option value="PW">Palau</option>
                              <option value="PS">Palestinian Territory</option>
                              <option value="PA">Panama</option>
                              <option value="PG">Papua New Guinea</option>
                              <option value="PY">Paraguay</option>
                              <option value="PE">Peru</option>
                              <option value="PH">Philippines</option>
                              <option value="PN">Pitcairn</option>
                              <option value="PL">Poland</option>
                              <option value="PT">Portugal</option>
                              <option value="PR">Puerto Rico</option>
                              <option value="QA">Qatar</option>
                              <option value="RE">Reunion</option>
                              <option value="RO">Romania</option>
                              <option value="RU">Russian Federation</option>
                              <option value="RW">Rwanda</option>
                              <option value="SH">Saint Helena</option>
                              <option value="KN">Saint Kitts and Nevis</option>
                              <option value="LC">Saint Lucia</option>
                              <option value="PM">Saint Pierre and Miquelon</option>
                              <option value="VC">Saint Vincent and the Grenadines</option>
                              <option value="WS">Samoa</option>
                              <option value="SM">San Marino</option>
                              <option value="ST">Sao Tome and Principe</option>
                              <option value="A2">Satellite Provider</option>
                              <option value="SA">Saudi Arabia</option>
                              <option value="SN">Senegal</option>
                              <option value="RS">Serbia</option>
                              <option value="SC">Seychelles</option>
                              <option value="SL">Sierra Leone</option>
                              <option value="SG">Singapore</option>
                              <option value="SK">Slovakia</option>
                              <option value="SI">Slovenia</option>
                              <option value="SB">Solomon Islands</option>
                              <option value="SO">Somalia</option>
                              <option value="ZA">South Africa</option>
                              <option value="GS">South Georgia and the South Sandwich Islands</option>
                              <option value="ES">Spain</option>
                              <option value="LK">Sri Lanka</option>
                              <option value="SD">Sudan</option>
                              <option value="SR">Suriname</option>
                              <option value="SJ">Svalbard and Jan Mayen</option>
                              <option value="SZ">Swaziland</option>
                              <option value="SE">Sweden</option>
                              <option value="CH">Switzerland</option>
                              <option value="SY">Syrian Arab Republic</option>
                              <option value="TW">Taiwan</option>
                              <option value="TJ">Tajikistan</option>
                              <option value="TZ">Tanzania, United Republic of</option>
                              <option value="TH">Thailand</option>
                              <option value="TL">Timor-Leste</option>
                              <option value="TG">Togo</option>
                              <option value="TK">Tokelau</option>
                              <option value="TO">Tonga</option>
                              <option value="TT">Trinidad and Tobago</option>
                              <option value="TN">Tunisia</option>
                              <option value="TR">Turkey</option>
                              <option value="TM">Turkmenistan</option>
                              <option value="TC">Turks and Caicos Islands</option>
                              <option value="TV">Tuvalu</option>
                              <option value="UG">Uganda</option>
                              <option value="UA">Ukraine</option>
                              <option value="AE">United Arab Emirates</option>
                              <option value="GB">United Kingdom</option>
                              <option value="US">United States</option>
                              <option value="UM">United States Minor Outlying Islands</option>
                              <option value="UY">Uruguay</option>
                              <option value="UZ">Uzbekistan</option>
                              <option value="VU">Vanuatu</option>
                              <option value="VE">Venezuela</option>
                              <option value="VN">Vietnam</option>
                              <option value="VG">Virgin Islands, British</option>
                              <option value="VI">Virgin Islands, U.S.</option>
                              <option value="WF">Wallis and Futuna</option>
                              <option value="EH">Western Sahara</option>
                              <option value="YE">Yemen</option>
                              <option value="ZM">Zambia</option>
                              </Input>
                            </FormGroup>
                          </Col>
                        </Row>
                      </CardBody>
                    </Row>
                    <Col md="3">
                  <FormGroup>
                  <Label>Postal Code</Label>
                  <Input  type="text" onChange={handleInputs} value={clientsDetails && clientsDetails.address_po_code} name="address_po_code" />
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Retention </Label>
                  <Input  type="text" onChange={handleInputs} value={clientsDetails && clientsDetails.retention} name="retention" />
                  </FormGroup>
              </Col>


                    <Row>
                    <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                        <Button onClick={()=>{
                           editClientsData()
                        }} type="button" className="btn btn-success mr-2">
                        Save & Continue
                        </Button>
                        <Button onClick={()=>{
                          navigate(-1)
                        }} type="button" className="btn btn-dark">
                        Go to List
                        </Button>
                     </div>
                    </Row>
                  </ComponentCard>
                </FormGroup>
              
               
              </Form>
              <ComponentCard>
          <TabPane >

<Row>
    <Col md="3" className='mb-4 d-flex justify-content-between'>
      <h3>Creation & Modification </h3> 
    </Col>
</Row>

<Form>
<Col md="2">
                <FormGroup>
                <Label>Created By</Label>
                <br/>
                <span>{clientsDetails && clientsDetails.created_by}</span>
                </FormGroup>
            </Col>
            <Col md="2">
                <FormGroup>
                <Label>Modificated By</Label>
                <br/>
                <span>{clientsDetails && clientsDetails.modified_by}</span>
                </FormGroup>
            </Col>
  
</Form>
</TabPane></ComponentCard>



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
                Contacts Linked
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === '2' ? 'active' : ''}
                onClick={() => {
                  toggle('2');
                }}
              >
                Add notes
              </NavLink>
            </NavItem>
            </Nav>

            <TabContent className="p-4" activeTab={activeTab}>
              <Row>
<table id="example" className="display">
          <thead>
              <tr >
                  {columns.map(cell=>{
                    return (<td key={cell.name}>{cell.name}</td>)
                  })}
              </tr>
          </thead>
          <tbody>
            {contactsDetails && contactsDetails.map(element=>{
                return (<tr key={element.contact_id}>
                <td>{element.contact_id}</td>
                <td><Link to=""><span onClick={()=>{setContactData(element)
                                                    setEditContactEditModal(true)
                                                    
                                                    }}><Icon.Edit2 /></span></Link></td>
                <td><Link to=""><span onClick={()=>deleteRecord(element.contact_id)}><Icon.Trash2 /></span></Link></td>
                <td>{element.first_name}</td>
                <td>{element.email}</td>
                <td>{element.phone_direct}</td>
                <td>{element.mobile}</td>
                <td>{element.position}</td>
                <td>{element.department}</td>
                </tr>)
            })}
          </tbody>
          
      </table>
      <ContactEditModal editContactEditModal={ editContactEditModal} setEditContactEditModal={ setEditContactEditModal} contactData ={contactData}/>
    </Row>
   <Row>
    <Col md="3">
                        <FormGroup>
                        <Button color="primary" onClick={addContactToggle.bind(null)}>Add New Contact </Button>
                        
              

                        <Modal size="lg" isOpen={addContactModal} toggle={addContactToggle.bind(null)}>
                          <ModalHeader toggle={addContactToggle.bind(null)}>New Contact</ModalHeader>
                          <ModalBody>
                            <Row>
                            <Col md="12">
                              <Card>
                                <CardBody>
                                  <Form>
                                    <Row>
                                    <Col md="12">
                                      <FormGroup>
                                        <Label>Title</Label>
                                        <Input type="select" name="salutation" onChange={handleAddNewContact}value={newContactData && newContactData.salutation}>
                                          <option value="" selected="selected">Please Select</option>
                                          <option value="Ms">Ms</option>
                                          <option value="Mr">Mr</option>
                                          <option value="Mrs">Mrs</option>
                                        </Input>
                                      </FormGroup>
                                    </Col>
                                      <Col md="12">
                                        <FormGroup>
                                          <Label>Name</Label>
                                          <Input type="text" name="first_name" onChange={handleAddNewContact}value={newContactData && newContactData.first_name}/>
                                        </FormGroup>
                                      </Col>
                                      <Col md="12">
                                        <FormGroup>
                                          <Label>Email</Label>
                                          <Input type="text" name="email" onChange={handleAddNewContact}value={newContactData && newContactData.email}/>
                                        </FormGroup>
                                      </Col>
                                      <Col md="12">
                                        <FormGroup>
                                          <Label>Position</Label>
                                          <Input type="text" name="position" onChange={handleAddNewContact}value={newContactData && newContactData.position}/>
                                        </FormGroup>
                                      </Col>
                                      <Col md="12">
                                        <FormGroup>
                                          <Label>Department</Label>
                                          <Input type="text" name="department" onChange={handleAddNewContact}value={newContactData && newContactData.department}/>
                                        </FormGroup>
                                      </Col>
                                      <Col md="12">
                                        <FormGroup>
                                          <Label>Phone (Direct)</Label>
                                          <Input type="number" name="phone_direct" onChange={handleAddNewContact}value={newContactData && newContactData.phone_direct}/>
                                        </FormGroup>
                                      </Col>
                                      <Col md="12">
                                        <FormGroup>
                                          <Label>Fax (Direct)</Label>
                                          <Input type="number" name="fax" onChange={handleAddNewContact}value={newContactData && newContactData.fax}/>
                                        </FormGroup>
                                      </Col>
                                      <Col md="12">
                                        <FormGroup>
                                          <Label>Mobile</Label>
                                          <Input type="number" name="mobile" onChange={handleAddNewContact}value={newContactData && newContactData.mobile}/>
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
                            <Button color="primary" onClick={()=>{
                                AddNewContact()
                              }}>
                              Submit
                            </Button>
                            <Button color="secondary" onClick={addContactToggle.bind(null)}>
                              Cancel
                            </Button>
                          </ModalFooter>
                        </Modal>

                    
                        </FormGroup>
                    </Col>
                    </Row>
              
      
  </TabContent>
  
  </ComponentCard>    
          
        
            </> 
  )

    };


export default ClientsEdit;