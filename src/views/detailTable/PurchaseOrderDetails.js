import React, {useState, useEffect} from 'react';
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
import { useNavigate } from "react-router-dom";
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
//import message from '../../components/Message';

const PurchaseOrderDetails = () => {
    const [modal, setModal] = useState(false);
    const [supplier, setSupplier] = useState();
    const getSupplier = () =>{
      api.get('/supplier/getSupplier')
      .then((res)=> {
        setSupplier(res.data.data);
        console.log(res.data.data);
      })
    }


    const toggle = () => {
      setModal(!modal);
    };

    useEffect(() => {
      getSupplier()
    }, [])

    const [supplierForms, setSupplierForms] = useState({
      title:"",
      company_id:"",
      contact_id:"",
      category_id:"",
    });
    
    const handleSupplierForms = (e) => {
      setSupplierForms({...supplierForms, [e.target.name]:e.target.value});
    }

    // const insertPurchaseOrder = () => {
    //   console.log("company_name : ",supplierForms.company_name);

    //   // if(supplierForms.company_name !== ''){
    //   //   api.post('/company/insertCompany',companyInsertData)
    //   //   .then(()=> {
    //   //   message('Company inserted successfully.','success')
    //   //     toggle()
    //   //     getCompany()
    //   //   })
    //   //   .catch(() => {
    //   //     message('Network connection error.','error')
    //   //   })
    //   // }else{
    //   //   message('Please fill all required fields.','error')
    //   // }
    
    // }   
    const navigate = useNavigate(); 
    const routeChange = () =>{ 
      const path = `/PurchaseOrderAdd/${supplierForms.company_name}`; 
      console.log("inside routeChange : ",supplierForms);
      navigate(path);
    } 

  return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col md="12">
          <ComponentCard title="Purchase Order Header">
            <Form>
              <FormGroup>
              <Row>
                  <Col md="10">
                    <Label>Supplier Name </Label>

                    <Input type="select" name="company_name" onChange={(e)=>{
                      //getContact(e.target.value)
                      handleSupplierForms(e)
                    }}>
                    <option value="" selected >Please Select</option>

                      {supplier && supplier.map((ele)=>{
                        return  <option value={ele.company_name} >{ele.company_name}</option>

                      })}
                    </Input>
                </Col>
                </Row>
                <Row>
                    <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                        <Button type="submit" name="routechange" className="btn btn-success mr-2" onClick={()=>{
                          routeChange()
                        }}>
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