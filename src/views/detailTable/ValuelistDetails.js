import React from 'react';
import {Row,Col,Form,FormGroup,Label,Input,Button } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';

const JobInformationDetails = () => {
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
                    <Label>Value List Name</Label>
                    <Input type="select">
                        <option value="" selected="selected">Please Select</option>
                        <option value="bank">Bank</option>
                        <option value="clientType">Client Type</option>
                        <option value="companyCategory">Company Category</option>
                        <option value="companyGroupName">Company Group Name</option>
                        <option value="companyIndustry">Company Industry</option>
                        <option value="companySize">Company Size</option>
                        <option value="companySource">Company Source</option>
                        <option value="companyStatus">Company Status</option>
                        <option value="contactCategory">Contact Category</option>
                        <option value="contactTitle">Contact Title</option>
                        <option value="creditInsurance">Credit Insurance</option>
                        <option value="currency">Currency</option>
                        <option value="deliveryTerms">Delivery Terms</option>
                        <option value="employeeCategory">Employee Category</option>
                        <option value="employeeStatus">Employee Status</option>
                        <option value="employeeWorkType">Employee Work Type</option>
                        <option value="ideasByWhen">Ideas By When</option>
                        <option value="ideasStatus">Ideas Status</option>
                        <option value="invoiceCurrency">Invoice Currency</option>
                        <option value="invoiceNotes">Invoice Notes</option>
                        <option value="invoiceStatus">Invoice Status</option>
                        <option value="invoiceTerms">Invoice Terms</option>
                        <option value="invoiceType">Invoice Type</option>
                        <option value="invoiceTypes">Invoice Types</option>
                        <option value="callRegistryIndustry">Lead Industry</option>
                        <option value="callRegistryReffer">Lead Reference</option>
                        <option value="nationality">Nationality</option>
                        <option value="opportunityChance">Opportunity Chance</option>
                        <option value="opportunitySourceChannel">Opportunity Source Channel</option>
                        <option value="opportunityStatus">Opportunity Status</option>
                        <option value="paymentQuoteType">Payment Quote Type</option>
                        <option value="paymentTerms">Payment Terms</option>
                        <option value="paymentType">Payment Type</option>
                        <option value="percentCompleted">Percent Completed</option>
                        <option value="positionType">Position Type</option>
                        <option value="preferredCurrency">Preferred Currency</option>
                        <option value="projectCategory">Project Category</option>
                        <option value="projectDesignation">Project Designation</option>
                        <option value="projectDifficulty">Project Difficulty</option>
                        <option value="projectStatus">Project Status</option>
                        <option value="candidateQualification">Qualification</option>
                        <option value="quoteCategoryName">Quote Category Name</option>
                        <option value="quoteCategoryType">Quote Category Type</option>
                        <option value="quoteColumn">Quote Column</option>
                        <option value="quoteCurrency">Quote Currency</option>
                        <option value="quoteItemType">Quote Item Type</option>
                        <option value="quoteSignatory">Quote Signatory</option>
                        <option value="quoteStatus">Quote Status</option>
                        <option value="quoteType">Quote Type</option>
                        <option value="serviceType">Service Type</option>
                        <option value="services">Services</option>
                        <option value="shipmentType">Shipment Type</option>
                        <option value="singaporeHolidays">Singapore Holidays</option>
                        <option value="staffStatus">Staff Status</option>
                        <option value="staffTeam">Staff Team</option>
                        <option value="staffType">Staff Type</option>
                        <option value="supplierType">Supplier Type</option>
                        <option value="taskCategory">Task Category</option>
                        <option value="taskHistoryPriority">Task History Priority</option>
                        <option value="taskStatus">Task Status</option>
                        <option value="team">Team</option>
                        <option value="thirdPartyItem">Third Party Item</option>
                        <option value="timesheetType">Timesheet Type</option>
                        <option value="typeOfLeave">Type of Leave</option>
                        <option value="unit">Unit</option>
                    </Input>
                </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>Value</Label>
                    <Input type="text"/>
                </Col>
                </Row>
              </FormGroup>
              <FormGroup>
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

export default JobInformationDetails;
