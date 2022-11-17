import React, { useState } from 'react';
import { Card,
    CardBody,
    CardTitle,Row,Col,Form,FormGroup,Label,Input,TabContent,TabPane,Nav, NavItem,NavLink,Button,Modal,
    ModalHeader,
    ModalBody,
    ModalFooter, } from 'reactstrap';
    import {ToastContainer} from 'react-toastify'
    import { Link } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';

const ProjectEdit = () => {

    const [activeTab, setActiveTab] = useState('1');
    const [editCostingSummaryModel, setEditCostingSummaryModel] = useState(false);
    const [quotationsModal, setquotationsModal] = useState(false);
    const [attachmentModal, setAttachmentModal] = useState(false);
    const [viewLineModal, setViewLineModal] = useState(false);

    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
      };
    const editCostingSummaryToggle = () => {
      setEditCostingSummaryModel(!editCostingSummaryModel);
      };
      const quotationstoggle = () => {
        setquotationsModal(!quotationsModal);
      };
    const attachmentToggle = () => {
      setAttachmentModal(!attachmentModal);
      };
    const viewLineToggle = () => {
      setViewLineModal(!viewLineModal);
      };
   
  return (
    <>
    <BreadCrumbs />
      
             <Form >
                <FormGroup>
                <ComponentCard title="Project Details | Code: O-1045">
                    <Row>
                    <Col md="3">
                        <FormGroup>
                        <Label>Title</Label>
                        <Input  type="text" value="" name="title" />
                        </FormGroup>
                    </Col>
                    
                    <Col md="3">
                        <FormGroup>
                        <Label>Category <span className='required'> *</span> </Label>
                        <Input type="select" value="" name="company_id">
                            <option value="">Please Select</option>
                            <option value="Project">Project</option>
                            <option selected="selected" value="Maintenance">Maintenance</option>
                            <option value="Tenancy Project">Tenancy Project</option>
                            <option value="Tenancy Work">Tenancy Work</option>
                      </Input>
                        </FormGroup>
                    </Col>

                    <Col md="3">
                        <FormGroup>
                        <Label>Status </Label>
                        <Input type="select"  value="" name="contact_id" >
                            <option value="">Please Select</option>
                            <option selected="selected" value="WIP">WIP</option>
                            <option value="Billable">Billable</option>
                            <option value="Billed">Billed</option>
                            <option value="Complete">Complete</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="On Hold">On Hold</option>
                            <option value="Latest">Latest</option>
                    </Input>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Company</Label>
                        <Input type="text" disabled value="" name="office_ref_no"/>
                        </FormGroup>
                    </Col>
                    </Row>
              
                    <Row>
                    
                    <Col md="3">
                        <FormGroup>
                        <Label>Contact</Label>
                        <Input type="select" value=""  name="mode_of_submission" >
                            <option value="">Please Select</option>
                        </Input>
                        </FormGroup>
                    </Col>
                    
                    <Col md="3">
                        <FormGroup>
                        <Label>Start Date</Label>
                            <Input type="date"  value="" name="site_show_date"/>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Estimated Finish Date</Label>
                        <Input value="" type="date" 
                         name="project_end_date" />
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Description</Label>
                        <Input type="text"  value="" name="services"/>
                        </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    
                    <Col md="3">
                        <FormGroup>
                        <Label>Project Manager</Label>
                        <Input type="select" value=""  name="site_show_attendee">
                            <option value="" selected="selected">Please Select</option>
                           
                         </Input>

                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Ducting Cost (OR) <Link to="" color="primary"><b><u>Add</u></b></Link></Label>
                        <Input type="text" disabled value=""  name="actual_submission_date"/>
                        </FormGroup>
                    </Col>
                    </Row>
                 
                    <Row>
                    <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                        <Button type="button" className="btn btn-success mr-2">
                        Save & Continue
                        </Button>
                        <Button type="submit" className="btn btn-dark">
                        Cancel
                        </Button>
                     </div>
                    </Row>
                </ComponentCard>
                </FormGroup> 
              </Form>

  <ComponentCard title="More Details">
    <ToastContainer></ToastContainer>

    <Modal isOpen={editCostingSummaryModel} toggle={editCostingSummaryToggle.bind(null)}>
      <ModalHeader toggle={editCostingSummaryToggle.bind(null)}>Edit Costing Summary</ModalHeader>
      <ModalBody>
        <Row>
        <Col md="12">
          <Card>
            <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
              Edit Costing Summary
            </CardTitle>
            <CardBody>
              <Form>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <Label>No. of Worker Used</Label>
                      <Input type="text" value=""/>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>No. of Days Worked</Label>
                      <Input type="text"  />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Labout Rates Per Day</Label>
                      <Input type="text"  />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Total Price (S$ W/o GST)</Label>
                      <Input type="text"  />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Profit Margin %</Label>
                      <Input type="text"  />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Profit Margin</Label>
                      <Input type="text" name="profit" class="text" id="fld_profit" value="39909998.00" tabindex="-1"/>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
            <CardBody className="bg-light">
              <CardTitle tag="h4" className="mb-0">
                
              </CardTitle>
            </CardBody>
            <CardBody>
              <Row>
              <Col md="3">
                <FormGroup>
                    <Label>Total Material</Label>
                    <Input type="text"/>
                </FormGroup>
                </Col>
                <Col md="3">
                <FormGroup>
                    <Label>Transport Charges %</Label>
                    <Input type="text"/>
                </FormGroup>
                </Col>
                <Col md="3">
                <FormGroup>
                    <Label>Transport Charges </Label>
                    <Input type="text" />
                </FormGroup>
                </Col>
                <Col md="3">
                <FormGroup>
                    <Label>Total Labour Charges</Label>
                    <Input type="text" />
                </FormGroup>
                </Col>
              </Row>
              <Row>
              <Col md="3">
                <FormGroup>
                    <Label>Salesman Commission %</Label>
                    <Input type="text"/>
                </FormGroup>
                </Col>
                <Col md="3">
                <FormGroup>
                    <Label>Salesman Commission </Label>
                    <Input type="text"/>
                </FormGroup>
                </Col>
                <Col md="3">
                <FormGroup>
                    <Label>Finance Charges % </Label>
                    <Input type="text" />
                </FormGroup>
                </Col>
                <Col md="3">
                <FormGroup>
                    <Label>Finance Charges </Label>
                    <Input type="text" />
                </FormGroup>
                </Col>
              </Row>
              <Row>
              <Col md="3">
                <FormGroup>
                    <Label>Office Overheads %</Label>
                    <Input type="text"/>
                </FormGroup>
                </Col>
                <Col md="3">
                <FormGroup>
                    <Label>Office Overheads </Label>
                    <Input type="text"/>
                </FormGroup>
                </Col>
                <Col md="3">
                <FormGroup>
                    <Label>Other Charges </Label>
                    <Input type="text" />
                </FormGroup>
                </Col>
                <Col md="3">
                <FormGroup>
                    <Label>TOTAL COST</Label>
                    <Input type="text" />
                </FormGroup>
                </Col>
              </Row>
            </CardBody>
            <CardBody>
            <CardTitle className="mb-0 bg-light">
             
              </CardTitle>
              <Form>

                 <Row>
                    <Col><FormGroup><Label>Materials</Label> </FormGroup></Col>
                    <Col><FormGroup><Label>Supplier</Label> </FormGroup></Col>
                    <Col><FormGroup><Label>Sub-Con</Label> </FormGroup></Col>
                   <Col md="1"><FormGroup><Label>UoM</Label> </FormGroup></Col>
                    <Col md="1"><FormGroup><Label>Qty</Label> </FormGroup></Col>
                    <Col><FormGroup><Label>Unit Price</Label> </FormGroup></Col>
                    <Col><FormGroup><Label>Total Cost</Label> </FormGroup></Col>
            </Row>
                <Row>
                  <Col>
                    <FormGroup><Input type="text" value="BRICKS"/></FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Input type="select" name="Select Category">
                          <option value="">Select</option>
                          <option selected="selected" value="1">ABC Supplier</option>
                          <option value="2">Supplier 2</option>
                          <option value="3">ABC New company Pte Ltd</option>
                          <option value="4">XYZ Factory</option>
                          <option value="5">Materials Supplier</option>
                          <option value="6">XYZ ENGINEERING PRIVATE LTD</option>
                          <option value="7">Kate Williams</option>
                          <option value="8">Xac Pte Ltd</option>
                          <option value="9">Jing Shaw Pte Ltd</option>
                          <option value="10">RAM SAND</option>
                          <option value="11">abcd</option>
                          <option value="12">pqrs</option>
                          <option value="13">Philips Boon</option>
                          <option value="14">DK Pte Ltd</option>
                          <option value="15">raj har</option>
                          <option value="16">New Frame Tech Ltd</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Input type="text" placeholder='Please type and select'/>
                    </FormGroup>
                  </Col>
                  <Col md="1">
                    <FormGroup>
                      <Input type="text" placeholder=''/>
                    </FormGroup>
                  </Col>
                  <Col md="1">
                    <FormGroup>
                      <Input type="text" placeholder=''/>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Input type="text" placeholder='' value="2.00"/>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Input type="text" placeholder='' value="2.00"/>
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
        <Button color="primary" onClick={editCostingSummaryToggle.bind(null)}>
          Submit
        </Button>
        <Button color="secondary" onClick={editCostingSummaryToggle.bind(null)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal> 


    <Modal isOpen={quotationsModal} toggle={quotationstoggle.bind(null)}>
      <ModalHeader toggle={quotationstoggle.bind(null)}>Quote History</ModalHeader>
      <ModalBody>
        <Row>
        <Col md="12">
          <Card>
            <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
              Quote History
            </CardTitle>
            <CardBody>
             
            </CardBody>
          </Card>
        </Col>
        </Row>  
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={quotationstoggle.bind(null)}>
          Submit
        </Button>
        <Button color="secondary" onClick={quotationstoggle.bind(null)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal> 


        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => {
                toggle('1');
              }}
            >
              Costing Summary
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => {
                toggle('2');
              }}
            >
              Quotations
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '3' ? 'active' : ''}
              onClick={() => {
                toggle('3');
              }}
            >
              Attachment
            </NavLink>
          </NavItem>
        
        </Nav>
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col md="12" className='mb-4'>
                  <Button color="primary">Edit Costing Summary</Button>
              </Col>
            </Row>
            <Row>
              <Col md="3"><FormGroup><h3>Costing Summary</h3> </FormGroup></Col>
              <Col md="3"><FormGroup><Label>Total Cost : test</Label> </FormGroup></Col>
              <Col md="3"><FormGroup><Label>PO Price (S$ W/o GST) : test</Label> </FormGroup></Col>
              <Col md="3"><FormGroup><Label>Profit Margin : test %</Label> </FormGroup></Col>
            </Row>
            <hr/>
            <Row>
            <Col md="3">
                <FormGroup>
                <Label>Total Material</Label>
                <br/>
                <span>test</span>
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                <Label>Transport Charges</Label>
                <br/>
                <span>test</span>
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                <Label>Total Labour Charges</Label>
                <br/>
                <span>test</span>
                </FormGroup>
            </Col>
           
            <Col md="3">
                <FormGroup>
                <Label>Salesman Commission</Label>
                <br/>
                <span>test</span>
                </FormGroup>
            </Col>
            </Row>
            <br/>
            <Row>
            <Col md="3">
                <FormGroup>
                <Label> Finance Charges </Label>
                <br/>
                <span>test</span>
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                <Label>Office Overheads</Label>
                <br/>
                <span>test</span>
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                <Label>Other Charges</Label>
                <br/>
                <span>test</span>
                </FormGroup>
            </Col>
           
            <Col md="3">
                <FormGroup>
                <Label> TOTAL COST </Label>
                <br/>
                <span>test</span>
                </FormGroup>
            </Col>
            </Row>
          </TabPane>
          
          <TabPane tabId="2">

              <Row>
                  <Col md="3" className='mb-4 d-flex justify-content-between'>
                    <h3>Quotations </h3> 
                    <Button color="primary" onClick={quotationstoggle.bind(null)}>View Quote Log</Button>
                  </Col>
              </Row>


            <Form>
                <Row>
                  <Col><FormGroup><Label>Revision</Label> </FormGroup></Col>
                  <Col><FormGroup><Label>Quote Code</Label> </FormGroup></Col>
                  <Col><FormGroup><Label>Quote Date</Label> </FormGroup></Col>
                  <Col><FormGroup><Label>Quote Status</Label> </FormGroup></Col>
                  <Col md="1"><FormGroup><Label>Discount</Label> </FormGroup></Col>
                  <Col md="1"><FormGroup><Label>Amount</Label> </FormGroup></Col>
                  <Col><FormGroup><Label></Label> </FormGroup></Col>
                  <Col><FormGroup><Label>Action</Label> </FormGroup></Col>
                </Row>
                <Row>
                <Col>
                  <FormGroup></FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                      <span>test</span>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                      <Label>test</Label>
                  </FormGroup>
                </Col>
                <Col >
                  <FormGroup>
                      <Label>test</Label>
                  </FormGroup>
                </Col>
                <Col md="1">
                  <FormGroup>
                      <Label>test</Label>
                  </FormGroup>
                </Col>
                <Col md="1">
                  <FormGroup>
                      <Label>test</Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                      <Label><u>View Line Items</u></Label>

                      <Modal isOpen={viewLineModal} toggle={viewLineToggle.bind(null)}>
                            <ModalHeader toggle={viewLineToggle.bind(null)}>Line Items</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                <table className='lineitem'>
                                  
                                  <thead>
                                    <tr>
                                      <th scope="col">Title	</th>
                                      <th scope="col">Description	</th>
                                      <th scope="col">Qty</th>
                                      <th scope="col">Unit Price</th>
                                      <th scope="col">Amount</th>
                                      <th scope="col">Updated By</th>
                                      <th scope="col">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {/* {lineItem && lineItem.map((e)=>{
                                      return(
                                        <tr>
                                            <td data-label="Title">{e.title}</td>
                                            <td data-label="Description">{e.description}</td>
                                            <td data-label="Qty">{e.quantity}</td>
                                            <td data-label="Unit Price">{e.unit_price}</td>
                                            <td data-label="Amount">{e.amount}</td>
                                            <td data-label="Updated By">{e.created_by}</td>
                                            <td data-label="Action"></td>
                                        </tr>
                                      )
                                        
                                    })} */}
                                   
                                  </tbody>
                                </table>
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={viewLineToggle.bind(null)}>Submit</Button>
                            </ModalFooter>
                        </Modal>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Generate Pdf</Label>
                  </FormGroup>
                </Col>
                </Row>
            </Form>
      </TabPane>


      <TabPane tabId="3">
                <Row>
                <Col xs="12" md="3">
                    <ComponentCard title="Attachments">
                        <Button color="primary" onClick={attachmentToggle.bind(null)}>
                            Add
                        </Button>
                        <Modal isOpen={attachmentModal} toggle={attachmentToggle.bind(null)}>
                            <ModalHeader toggle={attachmentToggle.bind(null)}>Upload Media</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label htmlFor="exampleFile">Select Files</Label>
                                    <Input type="file" placeholder="" />
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={attachmentToggle.bind(null)}>Upload</Button>
                            </ModalFooter>
                        </Modal>
                    </ComponentCard>
                </Col>
                </Row>
               
          </TabPane>
          
        </TabContent>
      </ComponentCard>
    </>
  )
};

export default ProjectEdit;