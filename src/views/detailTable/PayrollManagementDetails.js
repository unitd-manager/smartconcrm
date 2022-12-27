import { TextArea } from '@blueprintjs/core';
import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { Row,Col,FormGroup,Input,Button,Label,Form,Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap';
import ComponentCard from '../../components/ComponentCard';

function PayrollManagementDetails() {
    const{id}=useParams();
    const navigate=useNavigate();

useEffect(()=>{
    console.log(id);
},[id])

const [modal1, setModal1] = useState(false);
const [modal2, setModal2] = useState(false);

const toggle1 = () => {
    setModal1(!modal1);
  };

  const toggle2 = () => {
    setModal2(!modal2);
  };

const handleInputs=()=>{
    
}
  return (
    <>
     <Form>
        <FormGroup>
            <ComponentCard >
     <Row>
            <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                <Button onClick={()=>{
                   
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
    <Form>
        <FormGroup>
            <ComponentCard title="Leave Summary">
                <Row>
            <Col md="8">
                <table>
                <thead><tr><h5>ANNUAL LEAVE AS PER MOM</h5></tr></thead>
                    <tbody>
                        <tr>
                            <td><span>1st year: 7 days</span></td>
                        <td><span>2nd year: 8 days</span></td>
                        <td><span>3rd year: 9 days</span></td>
                        </tr>
                        <tr>
                            <td><span>4th year: 10 days</span></td>
                        <td><span>5th year: 11 days</span></td>
                        <td><span>6th year: 12 days</span></td>
                        </tr>
                        <tr>
                            <td><span>7th year: 13 days</span></td>
                        <td><span>8th year thereafter: 14 days</span></td>
                        <td></td>
                        </tr>
                    </tbody>
                </table>
                <table>
                <thead><tr><h5>SICK LEAVE AS PER MOM</h5></tr></thead>
                    <tbody>
                        <tr>
                            <td><span>After 3 months: 5 days</span></td>
                        <td><span>After 4 months: 8 days</span></td>
                        <td></td>
                        </tr>
                        <tr>
                            <td><span>After 5 months: 11 days</span></td>
                        <td><span>6 months and thereafter: 14 days</span></td>
                        <td></td>
                        </tr>
                        
                    </tbody>
                </table>
               
         
            </Col>
            <Col md="2">
          <h5>Total No of leave taken this year</h5>
          <Row><span>Annual leave : 0</span></Row>
          <Row><span>Sick leave : 0</span></Row>
          <Row><span>Hospitalization leave : 0</span></Row>
          <Row><span>Absent leave : 0</span></Row>
            </Col>
            <Col md="2">
         <h5>Total No of leave taken this month</h5>
         <Row><span>Annual leave : 0</span></Row>
          <Row><span>Sick leave : 0</span></Row>
          <Row><span>Hospitalization leave : 0</span></Row>
          <Row><span>Absent leave : 0</span></Row>
            </Col>
            </Row>
            </ComponentCard>
        </FormGroup>
    </Form>

    {/* Payslip summary */}
    <Form >
 <FormGroup>
  <ComponentCard title='Payslip Summary'>
      <Row>
      <Col md="3">
          <FormGroup>
          <Label>Start Date <span className='required'> *</span></Label>
          <Input  type="date" onChange={handleInputs} name="title" />
          </FormGroup>
      </Col>
      <Col md="3">
          <FormGroup>
          <Label>End Date</Label>
          <Input type="Date" onChange={handleInputs} name="office_ref_no"/>
          </FormGroup>
      </Col>
      <Col md="3">
                <FormGroup>
                <Label>Working Days in Month</Label>
                <Input type="text" onChange={handleInputs} name="actual_submission_date"/>
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                <Label>Actual worked days in month</Label>
                <Input type="text" onChange={handleInputs} name="actual_submission_date"/>
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                <Label>Mode Of Payment</Label>
                    <Input type="Select" onChange={handleInputs}name="site_show_date"/>
                </FormGroup>
            </Col>
            </Row>
      
            <Row>
            
            <Col md="3">
                <FormGroup>
                <Label>Employee Name(DOB)</Label>
                <Input type="text" onChange={handleInputs} name="mode_of_submission" />
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                <Label>Generated Date</Label>
                <Input type="Date" onChange={handleInputs} name="services"/>
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                <Label>Basic Pay</Label>
                    <Input type="text" onChange={handleInputs} name="site_show_date"/>
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                <Label>Status</Label>
                <Input type="date" 
                onChange={handleInputs} name="project_end_date" />
                </FormGroup>
            </Col>
            </Row>
            
        </ComponentCard>
        </FormGroup> 
</Form>
{/* Earnings and deductions table */}
<Form>
    <Row>
   
        <Col md="6">
        <ComponentCard title="Earnings">
        <Row><Col md="9">Gross Pay</Col> <Col md="3"><Input/></Col> </Row>
        <Row><Col md="9">Overtime Pay Rate/ Hour</Col><Col md="3"><Input/></Col></Row>
        <Row><Col md="9">OT Hours</Col><Col md="3"><Input/></Col></Row>
        <Row><Col md="9">Overtime Amount</Col><Col md="3"><Input/></Col></Row>
        <Row><Col md="9">Transport</Col><Col md="3"><Input/></Col></Row>
        <Row><Col md="9">Entertainment</Col><Col md="3"><Input/></Col></Row>
        <Row><Col md="9">Food</Col><Col md="3"><Input/></Col></Row>
        <Row><Col md="9">Shift Allowance</Col><Col md="3"><Input/></Col></Row>
        <Row><Col md="9">Others</Col><Col md="3"><Input/></Col></Row>
        <Row><Col md="9"><b>Gross Pay</b></Col><Col md="3"><Input/></Col></Row>
        <Row><Col md="9"><b>Other Additional Payment</b></Col><Col md="3"><Input/></Col></Row>
        <Row><Col md="9">Reimbursement</Col><Col md="3"><Input/></Col></Row>
        <Row><Col md="9">Director Fees</Col><Col md="3"><Input/></Col></Row>
        <Row><Col md="9"><b>NET PAY</b></Col><Col md="3"></Col></Row>
        </ComponentCard>
        </Col>
        <Col md="6">
            <ComponentCard title="Deductions">
                <Row><Col md="9">CPF-Employee</Col><Col md="3"><Input/></Col></Row>
                <Row><Col md="9"> SDL</Col><Col md="3"><Input/></Col></Row>
                <Row><Col md="9">Advance / Loan View loan breakup</Col><Col md="3"><Input/></Col></Row>
                <Row><Col md="9">Income Tax</Col><Col md="3"><Input/></Col></Row>
                <Row><Col md="9">Housing</Col><Col md="3"><Input/></Col></Row>
                <Row><Col md="9">Transportation</Col><Col md="3"><Input/></Col></Row>
                <Row><Col md="9">Others</Col><Col md="3"><Input/></Col></Row>
                <Row><Col md="9">Food</Col><Col md="3"><Input/></Col></Row>
                <Row><Col md="9"></Col><Col md="3"></Col></Row>
                <Row><Col md="9"><b>Total Deductions</b></Col><Col md="3"><Input/></Col></Row>
                <Row><Col md="9"></Col><Col md="3"></Col></Row>
                <Row><Col md="9"></Col><Col md="3"><Input/></Col></Row>
                <Row><Col md="9"></Col><Col md="3"><Input/></Col></Row>
                <Row><Col md="9"><b>100.00</b></Col><Col md="3"></Col></Row>
            </ComponentCard>
        </Col>
    
    </Row>
</Form>
{/* Notes */}
<Form>
<Row>
<ComponentCard>
            <Col md="3">
                <FormGroup>
                <Label>Notes</Label>
                <TextArea type="text" onChange={handleInputs} name="notes" />
                </FormGroup>  
            </Col>
            </ComponentCard>
</Row>
</Form>
{/* Attachment */}
<ComponentCard title="Picture">
                        <Button color="primary" onClick={toggle1.bind(null)}>
                           Add Picture
                        </Button>
                        <Modal isOpen={modal1} toggle={toggle1.bind(null)}>
                            <ModalHeader toggle={toggle1.bind(null)}>Upload Media</ModalHeader>
                            <ModalBody>
                            <FormGroup>
                                <Label htmlFor="exampleFile">Select Files</Label>
                                <Input type="file" placeholder="" />
                            </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={toggle2.bind(null)}>Upload</Button>
                            </ModalFooter>
                        </Modal>
                    </ComponentCard>
            </>
  )
}

export default PayrollManagementDetails