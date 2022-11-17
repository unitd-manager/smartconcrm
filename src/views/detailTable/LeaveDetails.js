import React from 'react';
import {Row,Col,Form,FormGroup,Label,Input,} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';

const LeaveDetails = () => {

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
                        <Label> Employee Name * </Label>
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
                    <Label>From date *</Label>
                    <Input type="date"/>
                </Col>
                </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                    <Col md="12">
                        <Label>To date *</Label>
                        <Input type="date"/>
                    </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                    <Col md="12">
                        <Label>Type of Leave *</Label>
                        <Input type="select">
                        <option value="" selected="selected">Please Select</option>
                        <option value="Absent">Absent</option>
                        <option value="Annual Leave">Annual Leave</option>
                        <option value="Hospitalization Leave">Hospitalization Leave</option>
                        <option value="Sick Leave">Sick Leave</option>
                        </Input>
                    </Col>
                    </Row>
                </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default LeaveDetails;
