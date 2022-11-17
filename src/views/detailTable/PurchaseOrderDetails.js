import React, {useState} from 'react';
import {
    Card,
    CardBody,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,Modal, ModalHeader, ModalBody,ModalFooter
  } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';

const PurchaseOrderDetails = () => {
    const [modal, setModal] = useState(false);
    const toggle = () => {
      setModal(!modal);
    };
  return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col md="12">
          <ComponentCard title="Purchase Order Header">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>Supplier</Label>
                    <Input type="select">
                        <option value="3">ABC New company Pte Ltd</option>
                        <option value="1">ABC Supplier</option>
                        <option value="11">abcd</option>
                        <option value="14">DK Pte Ltd</option>
                        <option value="9">Jing Shaw Pte Ltd</option>
                        <option value="7">Kate Williams</option>
                        <option value="5">Materials Supplier</option>
                        <option value="16">New Frame Tech Ltd</option>
                        <option value="13">Philips Boon</option>
                        <option value="12">pqrs</option>
                        <option value="15">raj har</option>
                        <option value="10">RAM SAND</option>
                        <option value="2">Supplier 2</option>
                        <option value="8">Xac Pte Ltd</option>
                        <option value="6">XYZ ENGINEERING PRIVATE LTD</option>
                        <option value="4">XYZ Factory</option>
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
      <Modal isOpen={modal} toggle={toggle.bind(null)}>
      <ModalHeader toggle={toggle.bind(null)}>New Customer</ModalHeader>
      <ModalBody>
        <Row>
        <Col md="12">
          <Card>
            <CardBody>
              <Form>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <Label>Name</Label>
                      <Input type="text" />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <Label>Phone</Label>
                      <Input type="text"  />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <Label>Website</Label>
                      <Input type="text"  />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                  <FormGroup>
                    <Label>Address 1</Label>
                    <Input type="text" placeholder=" " />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label>Address 2</Label>
                    <Input type="text" placeholder="" />
                  </FormGroup>
                </Col>
                  <Col md="12">
                    <FormGroup>
                      <Label>Area</Label>
                      <Input type="text"  />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <Label>Zip Code</Label>
                      <Input type="text"  />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <Label>Latitude</Label>
                      <Input type="text"  />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <Label>Longitude</Label>
                      <Input type="text"  />
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
        <Button color="primary" onClick={toggle.bind(null)}>
          Save & Continue
        </Button>
        <Button color="secondary" onClick={toggle.bind(null)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
    </div>
  );
};

export default PurchaseOrderDetails;