import React,{useState} from 'react';
import {Row,Col,Form,FormGroup,Label,Input,Button } from 'reactstrap';
// import { useDispatch } from 'react-redux';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';


const EmployeeDetails = () => {
  // const dispatch=useDispatch();
const [employeeData,setEmployeeData]=useState();
const [passtype,setPasstype]=useState('');

  const handleInputs=(e)=>{
    setEmployeeData({...employeeData, [e.target.name]:e.target.value})
  }
  const handlePasstype=(e)=>{
    setPasstype(e.target.value)
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
                  <Col md="12">
                    <Label>Full Name *</Label>
                    <Input onChange={handleInputs} type="text"/>
                </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>Pass Type *</Label>
                    <Input onChange={(e)=>{handleInputs(e);handlePasstype(e)}} type="select">
                        <option value="" selected="selected">Please Select</option>
                        <option value="Citizen">Citizen</option>
                        <option value="PR">PR</option>
                        <option value="EP">EP</option>
                        <option value="SP">SP</option>
                        <option value="WP">WP</option>
                        <option value="DP">DP</option>
                    </Input>
                </Col>
                </Row>
              </FormGroup>
              {passtype === "Citizen" && <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>NRIC No *</Label>
                    <Input onChange={handleInputs} type="number"/>
                  </Col>
                </Row>
              </FormGroup> }
               {passtype === "PR" && <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>NRIC No *</Label>
                    <Input onChange={handleInputs} type="number"/>
                  </Col>
                </Row>
              </FormGroup> }
              {passtype === "EP" &&  <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>Fin No *</Label>
                    <Input onChange={handleInputs} type="number"/>
                  </Col>
                </Row>
              </FormGroup>}
              {passtype === "SP" &&  <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>Fin No *</Label>
                    <Input onChange={handleInputs} type="number"/>
                  </Col>
                </Row>
              </FormGroup>}
               { passtype === "DP" &&  <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>Fin No *</Label>
                    <Input onChange={handleInputs} type="number"/>
                  </Col>
                </Row>
              </FormGroup>}
              {/* <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>NRIC No *</Label>
                    <Input onChange={handleInputs} type="number"/>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>Fin No *</Label>
                    <Input onChange={handleInputs} type="number"/>
                  </Col>
                </Row>
              </FormGroup> */}
              {passtype === "WP" && 
              <>
               <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>Fin No *</Label>
                    <Input onChange={handleInputs} type="number"/>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>Work Permit No</Label>
                    <Input onChange={handleInputs} type="number"/>
                  </Col>
                </Row>
              </FormGroup>
              </>
              }
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>Status *</Label>
                    <Input onChange={handleInputs} type="select">
                        <option selected="selected" value="Current">Current</option>
                        <option value="Archive">Archive</option>
                        <option value="Cancel">Cancel</option>
                    </Input>
                </Col>
                </Row>
                <Row>
                    <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                        <Button type="submit" className="btn btn-success mr-2">
                        Save & Continue
                        </Button>
                        <Button type="submit" className="btn btn-dark">
                        Cancel
                        </Button>
                     </div>
                </Row>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
        
      </Row>
      
    </div>
  );
};

export default EmployeeDetails;
