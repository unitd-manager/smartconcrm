import React, {  useState,useEffect } from 'react';
import { Row,Col,Form,FormGroup,Label,Input,Button, } from 'reactstrap';
import {ToastContainer} from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import moment from 'moment';
import "datatables.net-buttons/js/buttons.colVis"
import "datatables.net-buttons/js/buttons.flash"
import "datatables.net-buttons/js/buttons.html5"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {  useNavigate,useParams,Link } from 'react-router-dom';
import '../form-editor/editor.scss'
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import PurchaseOrderLinked from '../../components/SupplierModal/Purchaseorderlinked';


const SupplierEdit = () => {

  const [supplier, setSupplier] = useState();
  const [purchaseOrder, setPurchaseOrder] = useState();
  const [PurchaseOrderLinkedModal, setPurchaseOrderLinkedModal] = useState(false);

  const {id} = useParams()
  const navigate = useNavigate()

 // Get Supplier By Id

 const editSupplierById = () =>
 {
    api.post('/supplier/get-SupplierById',{supplier_id:id})
    .then((res)=> {
        setSupplier(res.data.data[0])
        console.log(purchaseOrder)
    })
   .catch(() => {
     message("Tender Data Not Found",'info')
    })
 }

 const handleInputs = (e) => {
  setSupplier({...supplier, [e.target.name]:e.target.value});
 }

//Logic for edit data in db
    
const editSupplierData = () =>
    {
      api.post('/supplier/edit-Supplier',supplier)
      .then(()=> {
        
           
           
        
        message('Record editted successfully','success')
       // setTimeout(() => {
       //   window.location.reload()
        //}, 300);

      })
        .catch(() => {
          message('Unable to edit record.','error')
        })
    }
   



useEffect(()=>{
  editSupplierById();
  
},[id])
// Get purchaseOrder By Id
const getpurchaseOrder = () =>
{
   api.post('/supplier/getPurchaseOrderLinkedss',{supplier_id:id})
   .then((res)=> {
     setPurchaseOrder(res.data.data)
     console.log(res)  
   }).catch(() => {
     message("Supplier not found","info")
   })
}

useEffect(() => {
  setTimeout(() => {
      $('#example').DataTable(
          // {
          //     pagingType: 'full_numbers',
          //       pageLength: 20,
          //       processing: true,
          //       dom: 'Bfrtip'
                
          // }
      );
      } ,
      1000
      );

      getpurchaseOrder()

}, [])


const columns = [
  {
    name: "PO Date",
    selector: "po_date",
    grow:0,
    wrap: true,
    width:'4%'
  },
  {
    name: "PO CODE",
    selector: "po_code",
    sortable: true,
    grow:0,
    wrap: true
  },
  {
    name: "PO value",
    selector: "po_value",
    sortable: true,
    grow:2,
    wrap: true
  },
  {
    name: "Balance",
    selector: "balance",
    sortable: true,
    grow:0,
  },
  {
    name: "Payment Status",
    selector: "payment_status",
    sortable: true,
    grow:0,
  },{
    name: "History",
    selector: "",
    sortable: true,
    grow:0,
  },
  
]



  return (
    <>
    <BreadCrumbs heading={supplier && supplier.company_name} />

        <Form>
          <FormGroup>
          <ComponentCard title= 'Supplier Details'> 
              <Row>
              <Col md="3">
                  <FormGroup>
                  <Label>Name <span className='required'> *</span></Label>
                  <Input  type="text" onChange={handleInputs} value={supplier && supplier.company_name} name="company_name" />
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Email</Label>
                  <Input type="text" onChange={handleInputs} value={supplier && supplier.email} name="email"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Fax</Label>
                  <Input type="text" onChange={handleInputs} value={supplier && supplier.fax} name="fax"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Mobile</Label>
                  <Input type="text" onChange={handleInputs} value={supplier && supplier.mobile} name="mobile"/>
                  </FormGroup>
              </Col>
              <Col md="3">
              <FormGroup>
                                <Label>Status</Label>
                                <Input type="select" value={supplier && supplier.status} name="status" 
                                onChange={handleInputs}
                                >
                                  <option value="" selected="selected">Please Select</option>
                                  <option value="current">Current</option>
                                  <option value="old">Old</option>
                          
                              </Input>
                              </FormGroup>
              </Col>
              
                    
                    <Col md="3">
                  <FormGroup>
                  <Label>GST NO</Label>
                  <Input type="text" onChange={handleInputs} value={supplier && supplier.gst_no} name="gst_no"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Payment Details</Label>
                  <Input type="text" onChange={handleInputs} value={supplier && supplier.payment_details} name="payment_details"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Terms</Label>
                  <Input type="text" onChange={handleInputs} value={supplier && supplier.terms} name="terms"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Contact Person</Label>
                  <Input type="text" onChange={handleInputs} value={supplier && supplier.contact_person} name="contact_person"/>
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
                  <Input  type="text" onChange={handleInputs} value={supplier && supplier.address_flat} name="address_flat" />
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Address 2</Label>
                  <Input type="text" onChange={handleInputs} value={supplier && supplier.address_street} name="address_street"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>State/Zip</Label>
                  <Input type="text" onChange={handleInputs} value={supplier && supplier.address_state} name="address_state"/>
                  </FormGroup>
              </Col>
              <Col md="3">
              <FormGroup>
                                <Label>Country</Label>
                                <Input type="select" name="address_country" value={supplier && supplier.address_country}
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
                  <Input type="text" onChange={handleInputs} value={supplier && supplier.address_po_code} name="address_po_code"/>
                  </FormGroup>
              </Col>
             
                    </Row>
                    <Row>
                    <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                        <Button onClick={()=>{
                            editSupplierData()
                          }}
                         type="button" className="btn btn-success mr-2">
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
                    <Button onClick={()=>{
                      setPurchaseOrderLinkedModal(true)
                    }} color="primary" >
                        Make Supplier Payment
                        </Button>
                        
                     </div>
                    </Row>
                </ComponentCard>
                </FormGroup> 
        </Form>
        <PurchaseOrderLinked PurchaseOrderLinkedModal={PurchaseOrderLinkedModal} setPurchaseOrderLinkedModal={setPurchaseOrderLinkedModal}></PurchaseOrderLinked>         
        <ComponentCard >
          <ToastContainer></ToastContainer>


         
         
                <table id="example" className="display">
        <thead title='Purchase Order Linked '>
            <tr >
                {columns.map(cell=>{
                  return (<td key={cell.name}>{cell.name}</td>)
                })}
            </tr>
        </thead>
        <tbody>
          {purchaseOrder && purchaseOrder.map(element=>{
              return (<tr key={element.supplier_id}>
                <td>{moment(element.po_date).format('YYYY-MM-DD')}</td>
              <td><Link to={`/PurchaseOrderEdit/${element.po_code}`} >{element.po_code}</Link></td>
              <td>{element.po_value}</td>
              <td>{element.balance}</td>
              <td>{element.payment_status}</td>
              <td><Link to={`/SupplierHistory/${element.purchase_order_id}`}>View History</Link></td>
              </tr>)
          })}
        </tbody>
        {/* <tfoot>
        <tr>
                {columns.map(cell=>{
                  return (<td key={cell.name}>{cell.name}</td>)
                })}
            </tr>
        </tfoot> */}
    </table> 
                
          
        </ComponentCard>
    </>
  )
};

export default SupplierEdit;