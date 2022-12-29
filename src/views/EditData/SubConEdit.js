import React, {  useState,useEffect } from 'react';
import { Row,Col,Form,FormGroup,Label,Input,TabPane,Button, } from 'reactstrap';
import {ToastContainer} from 'react-toastify'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {  useNavigate,useParams } from 'react-router-dom';
import '../form-editor/editor.scss'
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';


const SubConEdit = () => {

  const [subCon, setSubCon] = useState();
  const [subConWorkOrder, setSubConWorkOrder] = useState();
  const [subConDetails, setSubConDetails] = useState();
  const {id} = useParams()
  const navigate = useNavigate()



// Get SubCon By Id
const getsubCon = () =>
{
   api.get('/subcon/getSubCon',{supplier_id:id})
   .then((res)=> {
     setSubCon(res.data.data[0])
     console.log(res)  
   }).catch(() => {
     message("Supplier not found","info")
   })
}

// Get subConWorkOrder By Id
const getsubConWorkOrder = () =>
{
   api.get('/subcon/getTabWorkOrder',{purchase_order_id:id})
   .then((res)=> {
     setSubConWorkOrder(res.data.data[0])
     console.log(res)  
   }).catch(() => {
     message("SubCon not found","info")
   })
}
//Logic for edit data in db
    
const editSubConData = () =>
{
  api.post('/subcon/edit-Subcon',subConDetails)
  .then(()=> {
    
    message('Record editted successfully','success')
    // setTimeout(() => {
    //   window.location.reload()
    // }, 300);

  })
    .catch(() => {
      message('Unable to edit record.','error')
    })
}
// Get Supplier By Id

const editSubConById = () =>
{
   api.post('/subcon/getsubConById',{sub_con_id:id})
   .then((res)=> {
       setSubConDetails(res.data.data)
       (res.data.data.company_name)
   })
  .catch(() => {
    message("SubCon Data Not Found",'info')
   })
}
// Insert Supplier
const insertSubCon = () => {

 
    api.post('/subcon/insertsub_con')
    .then(()=> {
    message('SubCon inserted successfully.','success')
      getsubCon()
    })
    .catch(() => {
      message('Network connection error.','error')
    })
  
  
}

const handleInputs = (e) => {
 setSubConDetails({...subConDetails, [e.target.name]:e.target.value});
}
const editSubConWorkOrder = () =>
{
  api.post('/subcon/editWorkOrderPortal',subConDetails)
  .then(()=> {
    
    message('Record editted successfully','success')
    // setTimeout(() => {
    //   window.location.reload()
    // }, 300);

  })
    .catch(() => {
      message('Unable to edit record.','error')
    })
}
useEffect(()=>{
  getsubCon();
  getsubConWorkOrder();
  editSubConData();
  editSubConById();
  editSubConWorkOrder();
  insertSubCon();
},[id])

  return (
    <>
    <BreadCrumbs heading={subCon && subCon.company_name} />

        <Form>
          <FormGroup>
          <ComponentCard title= 'SubCon Details'> 
              <Row>
              <Col md="3">
                  <FormGroup>
                  <Label>Name <span className='required'> *</span></Label>
                  <Input  type="text" onChange={handleInputs} value={subCon && subCon.company_name} name="company_name" />
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Email</Label>
                  <Input type="text" onChange={handleInputs} value={subCon && subCon.email} name="email"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Fax</Label>
                  <Input type="text" onChange={handleInputs} value={subCon && subCon.fax} name="fax"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Mobile</Label>
                  <Input type="text" onChange={handleInputs} value={subCon && subCon.mobile} name="mobile"/>
                  </FormGroup>
              </Col>
              <Col md="3">
              <FormGroup>
                                <Label>Status</Label>
                                <Input type="select" name="status" 
                                onChange={handleInputs}
                                >
                                  <option value="" selected="selected">Please Select</option>
                                  <option value="current">Current</option>
                                  <option value="old">Old</option>
                          
                              </Input>
                              </FormGroup>
              </Col>
              
                    </Row>
                    
                   
                </ComponentCard>
                </FormGroup> 
                <FormGroup>
          <ComponentCard title= 'Address'> 
              <Row>
              <Col md="3">
                  <FormGroup>
                  <Label>Address 1 <span className='required'> *</span></Label>
                  <Input  type="text" onChange={handleInputs} value={subCon && subCon.address_flat} name="address_flat" />
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Address 2</Label>
                  <Input type="text" onChange={handleInputs} value={subCon && subCon.address_street} name="address_street"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>State/Zip</Label>
                  <Input type="text" onChange={handleInputs} value={subCon && subCon.address_state} name="address_state"/>
                  </FormGroup>
              </Col>
              <Col md="3">
              <FormGroup>
                                <Label>Country</Label>
                                <Input type="select" name="address_country" 
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
              <Col md="3">
                  <FormGroup>
                  <Label>Pin Code</Label>
                  <Input type="text" onChange={handleInputs} value={subCon && subCon.address_po_code} name="address_po_code"/>
                  </FormGroup>
              </Col>
             
                    </Row>
                    <Row>
                    <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                        <Button onClick={()=>{
                           editSubConData()
                           insertSubCon()
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
              
                    <Row>
                    <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button color="primary" onClick={()=>{
                                handleInputs()
                              }}>
                        Make SubCon Payment
                        </Button>
                        
                     </div>
                    </Row>
                </ComponentCard>
                </FormGroup> 
        </Form>

        <ComponentCard>
          <ToastContainer></ToastContainer>


         
          <TabPane tabId="2">

              <Row>
                  <Col md="3" className='mb-4 d-flex justify-content-between'>
                    <h3>Work Order Linked </h3> 
                  </Col>
              </Row>

            <Form>
                <Row>
                  <Col><Col md="3">
                        <FormGroup>
                        <Label>Project Start Date</Label>
                            <Input type="date" onChange={handleInputs} />
                        </FormGroup>
                    </Col></Col>
                  <Col><FormGroup><Label>Project</Label><Input type="text" onChange={handleInputs} /> </FormGroup></Col>
                  <Col><FormGroup><Label>WO Code</Label><Input type="text" onChange={handleInputs} /> </FormGroup></Col>
                  <Col><FormGroup><Label>Amount</Label> <Input type="number" onChange={handleInputs} /></FormGroup></Col>
                  <Col md="1"><FormGroup><Label>Status</Label><Input type="text" onChange={handleInputs} /> </FormGroup></Col>
                  <Col md="1"><FormGroup><Label></Label> Balance<Input type="number" onChange={handleInputs} /></FormGroup></Col>
                  <Col md="1"><FormGroup><Label></Label> <Input type="number" onChange={handleInputs} /></FormGroup></Col>
                  
                </Row>
                <Row>
                <Col>
                  <FormGroup></FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                      <span>{subConWorkOrder && subConWorkOrder.work_order_date}</span>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                      <Label>{subConWorkOrder && subConWorkOrder.project_id}</Label>
                  </FormGroup>
                </Col>
                <Col >
                  <FormGroup>
                      <Label>{subConWorkOrder && subConWorkOrder.sub_con_worker_code}</Label>
                  </FormGroup>
                </Col>
                <Col md="1">
                  <FormGroup>
                      <Label>{subConWorkOrder && subConWorkOrder.status}</Label>
                  </FormGroup>
                </Col>
                <Col md="1">
                  <FormGroup>
                      <Label>{subConWorkOrder && subConWorkOrder.history}</Label>
                  </FormGroup>
                </Col>
                
                
                

                
                </Row>
            </Form>
      </TabPane>


      
          
          
        </ComponentCard>
    </>
  )
};

export default SubConEdit;