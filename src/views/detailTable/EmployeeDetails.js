import React from 'react';
import {Row,Col,Form,FormGroup,Label,Input,Button } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';

const EmployeeDetails = () => {
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
                    <Input type="text"/>
                </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>Pass Type *</Label>
                    <Input type="select">
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
              
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>Status *</Label>
                    <Input type="select">
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
