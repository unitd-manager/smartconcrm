import React from 'react';
import {Row,Col,Form,FormGroup,Label,Input,Button } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';

const LoanDetails = () => {
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
                    <Label>Company Name *</Label>
                    <Input type="select">
                        <option value="" selected="selected">Please Select</option>
                        <option value="10">ALEX</option>
                        <option value="3">LAURA PATRICK</option>
                        <option value="11">MRAF</option>
                        <option value="4">PETER JOHN </option>
                        <option value="8">RAMESH VIGNESH</option>
                        <option value="2">RICKSON</option>
                        <option value="1">SELVA SEKARAN</option>
                        <option value="9">SIVA SHANKAR</option>
                        <option value="6">SURENDAR</option>
                        <option value="7">Testing Universal</option>
                        <option value="5">VIGNESHWARAN</option>
                    </Input>
                </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>Total Loan Amount *</Label>
                    <Input type="text"/>
                </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>Amount payable(per month) *</Label>
                    <Input type="text"/>
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

export default LoanDetails;
