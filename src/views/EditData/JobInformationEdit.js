import React, {  useState,useEffect  } from 'react';
import { Row,Col,Form,FormGroup,Label,Input,Button,TabPane,CardTitle } from 'reactstrap';
import Swal from 'sweetalert2'
import {ToastContainer} from 'react-toastify'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {  useNavigate,useParams } from 'react-router-dom';
import '../form-editor/editor.scss';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import JobInformation from '../../components/SupplierModal/JobInformationEditModal';
import AttachmentModalJob from '../../components/tender/AttachmentModal';
import ViewFileComponent from '../../components/ProjectModal/ViewFileComponent';







const JobInformationEdit = () => {

const [job, setJob] = useState();
const {id} = useParams()
// const {ids} = useParams()
const navigate = useNavigate()
const [JobInformationEditModal, setJobInformationEditModal] = useState(false);
const [attachmentModal, setAttachmentModal] = useState(false);



// Get jobinformation By Id

const editJobById = () =>
{
  api.post('/jobinformation/EditjobinformationById',{job_information_id:id})
  .then((res)=> {
      setJob(res.data.data[0])
  })
 .catch(() => {
   message("JobInformation Data Not Found",'info')
  })
}

const handleInputsJobInformation = (e) => {
setJob({...job, [e.target.name]:e.target.value});
}

//Logic for edit data in db
  
const editJobData = () =>
  {
    api.post('/jobinformation/edit-jobinformation',job)
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
  const insertJobInformation = () => {
    
    // console.log(id)
   
    Swal.fire({
     title: `Are you sure? ${id}`,
     text: "Do you wish to duplicate the job information",
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Ok'
   }).then((result) => {
     if (result.isConfirmed) {
       api.post('/jobinformation/edit-jobinformation',{job_information_id:id}).then(res=>{
         console.log(res)
         Swal.fire(
           'Your Job Information duplicated successfully',
           'success'
         ).then(()=>{setJobInformationEditModal(true)})
         editJobData()

       })
     }
   })

   
}
useEffect(()=>{
    editJobById();
    
    },[id])

  return (
    <>
    <CardTitle>Step 1 (Job Information)</CardTitle><BreadCrumbs/>
    <CardTitle><Label>Employee Name:</Label>{job && job.first_name}</CardTitle>
    <CardTitle><Label>Fin no:</Label>{job && job.fin_no}</CardTitle>

        <Form>
          <FormGroup>
          <ComponentCard title='Details of Employment (KET)'> 
          <ToastContainer></ToastContainer>
              <FormGroup >
                <Row >
              <Col md="3">
                  <Label>Employment Start/Commencement Date</Label>
                  <Input  type="date" onChange={handleInputsJobInformation} value={job && moment(job.act_join_date).format("YYYY-MM-DD")} name="act_join_date" />
                  
              </Col>
              <Col md="3">
                  
                  <Label>Duties & Responsibility</Label>
                  <Input type="text" onChange={handleInputsJobInformation} value={job && job.duty_responsibility} name="duty_responsibility"/>
                 
              </Col>
              <Col md="3">
                  
                  <Label>Duration of Employment(only for employees on fixed term contract)</Label>
                  <Input type="text" onChange={handleInputsJobInformation} value={job && job.duration_of_employment} name="duration_of_employment"/>
                  
              </Col>
              <Col md="3">
                  
                  <Label>Place of Work(if different from companys registered address)</Label>
                  <Input type="text" onChange={handleInputsJobInformation} value={job && job.place_of_work} name="place_of_work"/>
               
              </Col>
            </Row>
            </FormGroup>
</ComponentCard>
<ComponentCard title='Working hours & Rest Days (KET)'>
                    
                    <FormGroup >
              <Row >
              <Col md="3">
                  <FormGroup>
                  <Label>Details of Working Hours</Label>
                  <Input type="text" onChange={handleInputsJobInformation} value={job && job.work_hour_details} name="work_hour_details"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Rest day per Week</Label>
                  <Input type="text" onChange={handleInputsJobInformation} value={job && job.rest_day_per_week} name="rest_day_per_week"/>
                  </FormGroup>
              </Col>
              
                    </Row>
                    </FormGroup>
                    <FormGroup >
                      <Row title='Leave and Medical Benefits (KET)'>
                    <Col md="3">
                  <FormGroup>
                  <Label>Paid Annual Leave per year</Label>
                  <Input type="text" onChange={handleInputsJobInformation} value={job && job.paid_annual_leave_per_year} name="paid_annual_leave_per_year"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Paid Outpatient Sick Leave per year</Label>
                  <Input type="text" onChange={handleInputsJobInformation} value={job && job.paid_outpatient_sick_leave_per_year} name="paid_outpatient_sick_leave_per_year"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Paid Hospitalisation Leave per year</Label>
                  <Input type="text" onChange={handleInputsJobInformation} value={job && job.paid_hospitalisation_leave_per_year} name="paid_hospitalisation_leave_per_year"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                            <Label>Paid medical examination fee</Label>
                            <FormGroup check>
                            <Input name="paid_medical_examination" type="radio" value="1" defaultChecked={job && job.paid_medical_examination===1 && true } onChange={handleInputsJobInformation} 
                            />
                            <Label check>Yes</Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input name="paid_medical_examination" type="radio" value="0" defaultChecked={job && job.paid_medical_examination===1 && true } onChange={handleInputsJobInformation} />
                                <Label check> No </Label>
                            </FormGroup>
                        </Col>
              </Row>
            <Row>
              <Col md="3">
                  <FormGroup>
                  <Label>Other types of leave</Label>
                  <Input type="text" onChange={handleInputsJobInformation} value={job && job.other_type_of_leave} name="other_type_of_leave"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Other Medical Benefits</Label>
                  <Input type="text" onChange={handleInputsJobInformation} value={job && job.other_medical_benefits} name="other_medical_benefits"/>
                  </FormGroup>
              </Col>
            
                    </Row>
                    </FormGroup>
</ComponentCard>
<ComponentCard title='Probation Details (KET)'>
                    <FormGroup >
                      <Row >
              <Col md="3">
                            <Label>Under Probation</Label>
                            <FormGroup check>
                            <Input name="probationary" type="radio" value="1" defaultChecked={job && job.probationary===1 && true } onChange={handleInputsJobInformation} 
                            />
                            <Label check>Yes</Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input name="probationary" type="radio" value="0" defaultChecked={job && job.probationary===1 && true } onChange={handleInputsJobInformation} />
                                <Label check> No </Label>
                            </FormGroup>
                        </Col>
             
              { job && job.probationary === "1" && <Col md="3">
                  <FormGroup>
                  <Label>Length of Probation</Label>
                  <Input type="text" onChange={handleInputsJobInformation} value={job && job.length_of_probation} name="length_of_probation"/>
                  </FormGroup>
              </Col>}
              {job && job.probationary === "1" &&<Col md="3">
                  <Label>Probation Start Date</Label>
                  <Input  type="date" onChange={handleInputsJobInformation} value={job && moment(job.probation_start_date).format("YYYY-MM-DD")} name="probation_start_date" />
                  
              </Col> }
             {job && job.probationary === "1" &&<Col md="3">
                  <Label>Probation End Date</Label>
                  <Input  type="date" onChange={handleInputsJobInformation} value={job && moment(job.probation_end_date).format("YYYY-MM-DD")} name="probation_end_date" />
                  
              </Col>}
              </Row>
              <Row>
              <Col md="3">
                  <FormGroup>
                  <Label>Employment Type</Label>
                  <Input type="select" value={job && job.emp_type} name="emp_type" 
                                onChange={handleInputsJobInformation}
                                >
                                  <option value="" selected="selected">Please Select</option>
                                  <option value="full time">Full Time</option>
                                  <option value="part time">Part Time</option>
                                  <option value="contract">Contract</option>

                              </Input>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Designation</Label>
                
                  <Input type="select" value={job && job.designation} name="designation" 
                                onChange={handleInputsJobInformation}
                                >
                                  <option value="" selected="selected">Please Select</option>
                                  <option value="super visor">Super Visor </option>
                                  <option value="employee">Employee </option>
                                  <option value="manager">Manager </option>

                              </Input>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Department</Label>
                  
                  <Input type="select" value={job && job.department} name="department" 
                                onChange={handleInputsJobInformation}
                                >
                                  <option value="" selected="selected">Please Select</option>
                                  <option value="civil">Civil</option>
                                  <option value="mehanic">Mehanic</option>
                                  <option value="engineer">Engineer</option>
                                 

                              </Input>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Joined/Arrival Date</Label>
                  <Input type="date" onChange={handleInputsJobInformation} value={job && moment(job.join_date).format("YYYY-MM-DD")} name="join_date" />
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Status</Label>
                 
                  <Input type="select" value={job && job.status} name="status" 
                                onChange={handleInputsJobInformation}
                                >
                                  <option value="" selected="selected">Please Select</option>
                                  <option value="current">current</option>
                                  <option value="archive">Archive </option>
                                  <option value="cancel">Cancel</option>
                          
                              </Input>
                  </FormGroup>
              </Col>
                    </Row>
                    </FormGroup>
                    </ComponentCard>
                    {job && job.status === 'archive' && alert('Please enter TERMINATION INFORMATION of employee if employee is leaving company.')}
<ComponentCard title='Salary Information'>
                    <FormGroup >
                      <Row>
                    <Col md="3">
                  <FormGroup>
                  <Label>Salary Period</Label>
                  
                  <Input type="select"  value={job && job.payment_type} name="payment_type" 
                                onChange={handleInputsJobInformation}
                                >
                                  <option value="" selected="selected">Please Select</option>
                                  <option value="monthly">Monthly</option>
                                  <option value="fortnightly">Fort Nightly</option>
                                  <option value="weekly">Weekly</option>
                                  <option value="daily">Daily</option>
                                  <option value="hourly">Hourly</option>

                          
                              </Input>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Date(s) of Salary Payment</Label>
                  <Input type="date" onChange={handleInputsJobInformation} value={job && moment(job.salary_payment_dates).format("YYYY-MM-DD")} name="salary_payment_dates"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Date(s) of Overtime Payment (if different)</Label>
                  <Input type="date" onChange={handleInputsJobInformation} value={job && moment(job.overtime_payment_date).format("YYYY-MM-DD")} name="overtime_payment_date"/>
                  </FormGroup>
              </Col>
              </Row>
              <Row>
                    <Col md="3">
                  <FormGroup>
                  <Label>Working Calendar(No of Days/Week)(KET) <span className='required'> *</span></Label>
                  <Input type="numbers" onChange={handleInputsJobInformation} value={job && job.working_days} name="working_days"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Basic Pay <span className='required'> *</span></Label>
                  <Input type="numbers" onChange={handleInputsJobInformation} value={job && job.basic_pay} name="basic_pay"/>
                  </FormGroup>
              </Col>
              
              <Col md="3">
                            <Label> Overtime Applicable</Label>
                            <FormGroup check>
                            <Input name="overtime" type="radio" value="1" defaultChecked={job && job.overtime===1 && true } onChange={handleInputsJobInformation} 
                            />
                            <Label check>Yes</Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input name="overtime" type="radio" value="0" defaultChecked={job && job.overtime===1 && true } onChange={handleInputsJobInformation} />
                                <Label check> No </Label>
                            </FormGroup>
                        </Col>
                        
                       {job && job.overtime === "1" && <Col md="3"> 
                  <FormGroup>
                  <Label>Over Time Rate<span className='required'> *</span></Label>
                  
                  <Input type="select" value={job && job.over_time_rate} name="govt_donation" 
                                onChange={handleInputsJobInformation}
                                >
                                  <option value="" selected="selected">Please Select</option>
                                  <option value="1.5">1.5</option>
                                  <option value="2.0">2.0</option>
                          
                              </Input>
                  </FormGroup>
              </Col>}
                        
              <Col md="3">
                  <FormGroup>
                  <Label>Overtime Pay Rate/ Hour</Label>
                  <Input type="numbers" onChange={handleInputsJobInformation} value={job && job.overtime_pay_rate} name="overtime_pay_rate"/>
                  </FormGroup>
              </Col>
              </Row>
              <Row>
                    <Col md="3">
                  <FormGroup>
                  <Label>Transport</Label>
                  <Input type="numbers" onChange={handleInputsJobInformation} value={job && job.allowance1} name="allowance1"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Entertainment</Label>
                  <Input type="numbers" onChange={handleInputsJobInformation} value={job && job.allowance2} name="allowance2"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Food</Label>
                  <Input type="numbers" onChange={handleInputsJobInformation} value={job && job.allowance3} name="allowance3"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Shift Allowance</Label>
                  <Input type="numbers" onChange={handleInputsJobInformation} value={job && job.allowance4} name="allowance4"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Others</Label>
                  <Input type="numbers" onChange={handleInputsJobInformation} value={job && job.allowance5} name="allowance5"/>
                  </FormGroup>
              </Col>
              </Row>
              <Row>
                    <Col md="3">
                  <FormGroup>
                  <Label>Housing</Label>
                  <Input type="numbers" onChange={handleInputsJobInformation} value={job && job.deduction1} name="deduction1"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Transportation</Label>
                  <Input type="numbers" onChange={handleInputsJobInformation} value={job && job.deduction2} name="deduction2"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Others</Label>
                  <Input type="numbers" onChange={handleInputsJobInformation} value={job && job.deduction3} name="deduction3"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Food</Label>
                  <Input type="numbers" onChange={handleInputsJobInformation} value={job && job.deduction4} name="deduction4"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Levy</Label>
                  <Input type="numbers" onChange={handleInputsJobInformation} value={job && job.levy_amount} name="levy_amount"/>
                  </FormGroup>
              </Col>
              </Row>
              </FormGroup>    
</ComponentCard>
<ComponentCard title='CPF Information'>

              <FormGroup >
                      <Row >
              <Col md="3">
                            <Label>CPF Applicable</Label>
                            <FormGroup check>
                            <Input name="cpf_applicable" type="radio" value="1" defaultChecked={job && job.cpf_applicable===1 && true } onChange={handleInputsJobInformation} 
                            />
                            <Label check>Yes</Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input name="cpf_applicable" type="radio" value="0" defaultChecked={job && job.cpf_applicable===1 && true } onChange={handleInputsJobInformation} />
                                <Label check> No </Label>
                            </FormGroup>
                        </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Govt donation<span className='required'> *</span></Label>
                  
                  <Input type="select" value={job && job.govt_donation} name="govt_donation" 
                                onChange={handleInputsJobInformation}
                                >
                                  <option value="" selected="selected">Please Select</option>
                                  <option value="cdac">CDAC</option>
                                  <option value="sinda">SINDA</option>
                                  <option value="mbmf">MBMF</option>
                                  <option value="euef">EUEF</option>
                          
                          
                              </Input>
                  </FormGroup>
              </Col>
             {job && job.govt_donation === "cdac" && <Col md="3">  
                  <FormGroup>
                  <Label>Pay CDAC</Label>
                  <Input type="numbers" onChange={handleInputsJobInformation} value={job && job.pay_cdac} name="pay_cdac"/>
                  </FormGroup>
              </Col>}
              {job && job.govt_donation === "sinda" &&<Col md="3">
                  <FormGroup>
                  <Label>Pay SINDA</Label>
                  <Input type="numbers" onChange={handleInputsJobInformation} value={job && job.pay_sinda} name="pay_sinda"/>
                  </FormGroup>
              </Col>}
              {job && job.govt_donation === "mbmf" &&<Col md="3">
                  <FormGroup>
                  <Label>Pay MBMF</Label>
                  <Input type="numbers" onChange={handleInputsJobInformation} value={job && job.pay_mbmf} name="pay_mbmf"/>
                  </FormGroup>
              </Col>}
              {job && job.govt_donation === "euef" &&<Col md="3">
                  <FormGroup>
                  <Label>Pay EUEF</Label>
                  <Input type="numbers" onChange={handleInputsJobInformation} value={job && job.pay_euef} name="pay_euef"/>
                  </FormGroup>
              </Col>}
              <Col md="3">
                  <FormGroup>
                  <Label>Income Tax No</Label>
                  <Input type="text" onChange={handleInputsJobInformation} value={job && job.income_tax_id} name="income_tax_id"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Income Tax Amount</Label>
                  <Input type="text" onChange={handleInputsJobInformation} value={job && job.income_tax_amount} name="income_tax_amount"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>CPF No</Label>
                  <Input type="text" onChange={handleInputsJobInformation} value={job && job.cpf_account_no} name="cpf_account_no"/>
                  </FormGroup>
              </Col>
              </Row>
              </FormGroup>   

<ComponentCard title='Bank Information'>

              <FormGroup >
                      <Row >
                    <Col md="3">
                  <FormGroup>
                  <Label>Mode of Payment</Label>
                 
                  <Input type="select" value={job && job.mode_of_payment} name="mode_of_payment" 
                                onChange={handleInputsJobInformation}
                                >
                                  <option value="" selected="selected">Please Select</option>
                                  <option value="cheque">Cheque</option>
                                  <option value="cash">Cash</option>
                                  <option value="giro payment transfer">giro payment transfer</option>
                          
                              </Input>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Account No</Label>
                  <Input type="text" onChange={handleInputsJobInformation} value={job && job.account_no} name="account_no"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Bank Name</Label>
                  <Input type="text" onChange={handleInputsJobInformation} value={job && job.bank_name} name="bank_name"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Bank Code</Label>
                  <Input type="text" onChange={handleInputsJobInformation} value={job && job.bank_code} name="bank_code"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Branch Code</Label>
                  <Input type="text" onChange={handleInputsJobInformation} value={job && job.branch_code} name="branch_code"/>
                  </FormGroup>
              </Col>
              </Row>
              </FormGroup> 
</ComponentCard>
<ComponentCard title='Termination Information'>
              <FormGroup >
                      <Row >
                    <Col md="3">
                  <FormGroup>
                  <Label>Notice Period for Termination</Label>
                  <Input type="date" onChange={handleInputsJobInformation} value={job && job.notice_period_for_termination} name="notice_period_for_termination"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Date of Resignation Notice</Label>
                  <Input type="date" onChange={handleInputsJobInformation} value={job &&moment(job.resignation_notice_date).format("YYYY-MM-DD")} name="resignation_notice_date"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Termination/Cessation Date</Label>
                  <Input type="date" onChange={handleInputsJobInformation} value={job && moment(job.termination_date).format("YYYY-MM-DD")} name="termination_date"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Reason for Termination</Label>
                  <Input type="text" onChange={handleInputsJobInformation} value={job && job.termination_reason} name="termination_reason"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Departure Date</Label>
                  <Input type="date" onChange={handleInputsJobInformation} value={job && moment(job.departure_date).format("YYYY-MM-DD")} name="departure_date"/>
                  </FormGroup>
              </Col>
              </Row>
              </FormGroup>      
              </ComponentCard>
              <Row>
                    <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                        <Button onClick={()=>{
                           editJobData()
                          }}
                         type="button" className="btn btn-success mr-2">
                        Save & Continue
                        </Button>
                        <Button onClick={()=>{
                          navigate(-1)
                        }} type="button" className="btn btn-dark">
                        Go to List
                        </Button>
                       
                       
              
                <Button onClick={()=>insertJobInformation(id)} color="primary" >Duplicate</Button>
                <JobInformation JobInformationEditModal ={JobInformationEditModal} setJobInformationEditModal={setJobInformationEditModal}></JobInformation>
                       
                     </div>
                    </Row>   
                    
                    
                </ComponentCard>
                </FormGroup> 
        </Form>
        <ComponentCard><TabPane tabId="3">
                <Row>
                <Col xs="12" md="3" className='mb-3'>
                    <Button color="primary" onClick={()=>{setAttachmentModal(true)}}>
                        Add
                    </Button>
                </Col>
                </Row>

               <AttachmentModalJob jobid={id} attachmentModal={attachmentModal} setAttachmentModal={setAttachmentModal}  />
               <ViewFileComponent jobid={id} />

      </TabPane>
</ComponentCard>
        
        
    </>
  )

                    }
export default JobInformationEdit;