import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { ToastContainer } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import message from '../../components/Message';
import api from '../../constants/api';
import AddPurchaseOrderModal from '../../components/ProjectModal/AddPurchaseOrderModal';

const PurchaseOrderEdit = () => {
  //const [purchaseOrderDetails, setPurchaseOrderDetails] = useState();
  const [addPurchaseOrderModal, setAddPurchaseOrderModal] = useState(false);
  //const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { title } = useParams();
  //const [products, setProducts] = useState(null);
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [purchaseOrderInsertData, setpurchaseOrderInsertData] = useState(null);
  /*   const [supplier, setSupplier] = useState();
  
    const getSupplier = () =>{
      api.get('/supplier/getSupplier')
      .then((res)=> {
        setSupplier(res.data.data);
        console.log(res.data.data);
      })
    } */
  // const getPurchaseOrder = () => {
  //   api.get('/product/getProducts').then((res) => {
  //     setProducts(res.data.data);
  //     console.log(res.data.data);
  //   });
  // };

  const attachmentToggle = () => {
    setAttachmentModal(!attachmentModal);
  };

  const handleInputs = (e) => {
    setpurchaseOrderInsertData({ ...purchaseOrderInsertData, [e.target.name]: e.target.value });
  };

  /*   const editPurchaseOrderById = () => {
      api
        .post('/purchaseorder/getPurchaseOrderByPurchaseOrderId', { purchase_order_id: cname })
        .then((res) => {
          setPurchaseOrderDetails(res.data.data[0]);
          console.log(res.data.data[0]);
        })
        .catch(() => {
          message('Purchase Order Data Not Found', 'info');
        });
    }; */

  const insertPurchaseOrder = () => {
    console.log("purchaseOrderInsertData : ", purchaseOrderInsertData);
    api.post('/purchaseorder/insertPurchaseOrder', purchaseOrderInsertData)
      .then(() => {
        message('Purchase Order inserted successfully.', 'success')
      })
      .catch(() => {
        message('Network connection error.', 'error')
      })
  }
  /*   const [supplierForms, setSupplierForms] = useState({
      title:"",
      company_id:"",
      contact_id:"",
      category_id:"",
    }); */

  /*   const handleSupplierForms = (e) => {
      setSupplierForms({...supplierForms, [e.target.name]:e.target.value});
    } */

    const applyChanges = () => {

    }
    const backToList = () => {
      navigate("/PurchaseOrder");
      
    }    
  useEffect(() => {
    //editPurchaseOrderById();
    //getPurchaseOrder();
    //setSearchParams();
    //getSupplier();
    console.log("title", title);
    setpurchaseOrderInsertData({ title });
  }, [title]);

  const columns = [
    {
      name: '',
      selector: 'po_code',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'D.O.',
      selector: 'edit',
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: 'S.No',
      selector: 'delete',
      grow: 0,
      width: 'auto',
      wrap: true,
    },
    {
      name: 'Product Code',
      selector: 'po_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Product Title',
      selector: 'title',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Cost Price',
      selector: 'payment',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Selling Price',
      selector: 'status',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'GST%',
      selector: 'po_date',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
    {
      name: 'Stock',
      selector: 'supplier_inv_code',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Qty',
      selector: 'creation_date',
      sortable: true,
      width: 'auto',
    },
    {
      name: 'Damaged Qty',
      selector: 'creation_date',
      sortable: true,
      width: 'auto',
    },
    {
      name: 'Added to Stock',
      selector: 'creation_date',
      sortable: true,
      width: 'auto',
    },
    {
      name: 'Qty Balance',
      selector: 'creation_date',
      sortable: true,
      width: 'auto',
    },
    {
      name: 'Status',
      selector: 'creation_date',
      sortable: true,
      width: 'auto',
    },
    {
      name: 'Total Amount',
      selector: 'creation_date',
      sortable: true,
      width: 'auto',
    },
    {
      name: 'Actual Total Amount',
      selector: 'creation_date',
      sortable: true,
      width: 'auto',
    },
    {
      name: 'Edit',
      selector: 'creation_date',
      sortable: true,
      width: 'auto',
    },
    {
      name: 'History',
      selector: 'creation_date',
      sortable: true,
      width: 'auto',
    },
    {
      name: 'Delete',
      selector: 'creation_date',
      sortable: true,
      width: 'auto',
    },
  ];
  return (
    <>
      <BreadCrumbs />
      <Form>
        <FormGroup>
          <ComponentCardV2>
            <Row>
              <Col>
                  <Button
                    color="primary"
                    onClick={() => {
                      insertPurchaseOrder();
                      navigate('/PurchaseOrder');
                    }}
                  >
                    Save
                  </Button>
                  </Col>
                  <Col>              
                  <Button color="secondary" 
                  onClick={() => {
                    applyChanges();
                    console.log("cancel process");
                  }
                  }>
                    Apply
                  </Button>
                  </Col>
                  <Col>         
                  <Button color="danger" 
                  onClick={() => {
                    backToList();
                    console.log("back to list");
                  }
                  }>
                    Back to List
                  </Button>
              </Col>
            </Row>
          </ComponentCardV2>
          <ComponentCard
            title={`Purchase Order Details | Company Name: ${title
              }`}
          >
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>PO Code</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={purchaseOrderInsertData && purchaseOrderInsertData.po_code}
                    name="po_code"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Title</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={purchaseOrderInsertData && purchaseOrderInsertData.title}
                    name="title"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Status</Label>
                  <Input
                    type="select"
                    name="status"
                    onChange={handleInputs}
                    value={purchaseOrderInsertData && purchaseOrderInsertData.status}
                  >
                    <option value="" selected="selected">
                      Please Select
                    </option>
                    <option value="inprogress">Inprogress</option>
                    <option value="sendtosupplier">send to supplier</option>
                    <option value="orderacknowledge">order acknowledge</option>
                    <option value="partiallyreceived">partially received</option>
                    <option value="closed">closed</option>
                    <option value="onhold">onhold</option>
                    <option value="cancelled">cancelled</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Supplier</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={purchaseOrderInsertData && purchaseOrderInsertData.title}
                    name="supplier_inv_code"
                  />
                </FormGroup>
              </Col>

              {/*               <Col md="10">
                    <Label>Supplier</Label>

                    <Input type="select" name="company_name" onChange={(e)=>{
                      //getContact(e.target.value)
                      handleSupplierForms(e)
                    }} value={purchaseOrderInsertData && purchaseOrderInsertData.company_id_supplier}>
                    <option value="" selected >Please Select</option>

                      {supplier && supplier.map((ele)=>{
                        return  <option value={ele.supplier_id} >{ele.company_name}</option>

                      })}
                    </Input>
                </Col> */}

            </Row>

            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Priority</Label>
                  <Input
                    type="text"
                    value={purchaseOrderInsertData && purchaseOrderInsertData.priority}
                    onChange={handleInputs}
                    name="priority"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>PO Date</Label>
                  <Input
                    value={
                      purchaseOrderInsertData &&
                      moment(purchaseOrderInsertData.purchase_order_date).format('YYYY-MM-DD')
                    }
                    type="date"
                    onChange={handleInputs}
                    name="purchase_order_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Follow up Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={
                      purchaseOrderInsertData &&
                      moment(purchaseOrderInsertData.follow_up_date).format('YYYY-MM-DD')
                    }
                    name="follow_up_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Notes to Supplier</Label>
                  <Input
                    type="textarea"
                    value={purchaseOrderInsertData && purchaseOrderInsertData.notes}
                    onChange={handleInputs}
                    name="notes"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Delivery Terms</Label>
                  <Input
                    type="textarea"
                    value={purchaseOrderInsertData && purchaseOrderInsertData.delivery_terms}
                    onChange={handleInputs}
                    name="delivery_terms"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Payment Terms</Label>
                  <Input
                    type="textarea"
                    value={purchaseOrderInsertData && purchaseOrderInsertData.payment_terms}
                    onChange={handleInputs}
                    name="payment_terms"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Payment Status</Label>
                  <Input
                    value={purchaseOrderInsertData && purchaseOrderInsertData.payment_status}
                    type="select"
                    onChange={handleInputs}
                    name="payment_status"
                  >
                    <option value="">Please Select</option>
                    <option value="Due">Due</option>
                    <option value="Paid">Paid</option>
                    <option value="Partially Paid">Partially Paid</option>
                    <option value="Cancelled">Cancelled</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Supplier Invoice Code</Label>
                  <Input
                    type="text"
                    value={purchaseOrderInsertData && purchaseOrderInsertData.supplier_inv_code}
                    onChange={handleInputs}
                    name="supplier_inv_code"
                  />
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
          <ComponentCard title="Product Linked">
            <AddPurchaseOrderModal
              addPurchaseOrderModal={addPurchaseOrderModal}
              setAddPurchaseOrderModal={setAddPurchaseOrderModal}
            />
            <Row className="mb-4">
              <Col md="3">
                <Button
                  color="primary"
                  onClick={() => {
                    setAddPurchaseOrderModal(true);
                  }}
                >
                  Add Purchase Order
                </Button>
              </Col>
              <Col md="3">
                <Button color="primary">Create Delivery Order</Button>
              </Col>
              <Col md="3">
                <Button color="success">Add all Qty to Stock</Button>
              </Col>
            </Row>
            <Row>
              <div className="MainDiv">
                <div className="container">
                  <table border="1" id="example" className="table w-auto text-xsmall">
                    <thead>
                      <tr>
                        {columns.map((cell) => {
                          return <td key={cell.name}>{cell.name}</td>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    <tfoot></tfoot>
                  </table>
                  <table>
                    No Records Linked
                  </table>
                </div>
              </div>
            </Row>
          </ComponentCard>
          <ComponentCard title="Delivery Order">
            <ToastContainer></ToastContainer>
            <Row></Row>
          </ComponentCard>
          <ComponentCard title="Add a note">
            <Row>
              <textarea id="note" name="note" rows="4" cols="50" />
            </Row>
            <Row className="mb-2">
            </Row>
            <Row className="mb-1">
              <Col md="1">
                <button type="button" className="btn btn-primary btn-sm">Submit</button>
              </Col>
              <Col md="1">
                <button type="button" className="btn btn-warning btn-sm">Cancel</button>
              </Col>
            </Row>
          </ComponentCard>
          <ComponentCard title="Picture">
            <Row>
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
                  <Button color="primary" onClick={attachmentToggle.bind(null)}>
                    Upload
                  </Button>
                </ModalFooter>
              </Modal>
            </Row>
          </ComponentCard>
          <ComponentCard title="Attachments">
            <Row>
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
                  <Button color="primary" onClick={attachmentToggle.bind(null)}>
                    Upload
                  </Button>
                </ModalFooter>
              </Modal>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
    </>
  );
};

export default PurchaseOrderEdit;
