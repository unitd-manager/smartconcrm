import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';

const PurchaseOrderEdit = () => {
  const [purchaseOrderDetails, setPurchaseOrderDetails] = useState();
  const { id } = useParams();

  const handleInputs = (e) => {
    setPurchaseOrderDetails({ ...purchaseOrderDetails, [e.target.name]: e.target.value });
  };

  const editPurchaseOrderById = () => {
    api
      .post('/purchaseorder/getPurchaseOrderByPurchaseOrderId', { purchase_order_id: id })
      .then((res) => {
        setPurchaseOrderDetails(res.data.data[0]);
        console.log(res.data.data[0]);
      })
      .catch(() => {
        message('Purchase Order Data Not Found', 'info');
      });
  };

  useEffect(() => {
    editPurchaseOrderById();
  }, [id]);
  
  const columns = [
    {
      name: "",
      selector: "po_code",
      grow:0,
      wrap: true,
      width:'4%'
    },
    {
        name: 'D.O.',
        selector: "edit",
        grow:0,
        width:'auto',
        button:true,
        sortable:false,
    },
    {
        name:'S.No',
        selector: "delete",
        grow:0,
        width:'auto',
        wrap: true
    },
    {
      name: "Product Code",
      selector: "po_code",
      sortable: true,
      grow:0,
      wrap: true
    },
    {
      name: "Product Title",
      selector: "title",
      sortable: true,
      grow:2,
      wrap: true
    },
    {
      name: "Cost Price",
      selector: "payment",
      sortable: true,
      grow:0,
    },
    {
        name: "Selling Price",
        selector: "status",
        sortable: true,
        width:'auto',
        grow:3,
      },
      {
        name: "GST%",
        selector: "po_date",
        sortable: true,
        grow:2,
        width:'auto',
      },
      {
        name: "Stock",
        selector: "supplier_inv_code",
        sortable: true,
        grow:2,
        wrap: true,
      },
      {
        name: "Qty",
        selector: "creation_date",
        sortable: true,
        width:'auto',
      },
      {
        name: "Damaged Qty",
        selector: "creation_date",
        sortable: true,
        width:'auto',
      },
      {
        name: "Added to Stock",
        selector: "creation_date",
        sortable: true,
        width:'auto',
      },
      {
        name: "Qty Balance",
        selector: "creation_date",
        sortable: true,
        width:'auto',
      },
      {
        name: "Status",
        selector: "creation_date",
        sortable: true,
        width:'auto',
      },
      {
        name: "Total Amount",
        selector: "creation_date",
        sortable: true,
        width:'auto',
      },
      {
        name: "Actual Total Amount",
        selector: "creation_date",
        sortable: true,
        width:'auto',
      },
      {
        name: "Edit",
        selector: "creation_date",
        sortable: true,
        width:'auto',
      },
      {
        name: "History",
        selector: "creation_date",
        sortable: true,
        width:'auto',
      },
      {
        name: "Delete",
        selector: "creation_date",
        sortable: true,
        width:'auto',
      },                           
  ]
  return (
    <>
      <BreadCrumbs heading={purchaseOrderDetails && purchaseOrderDetails.title} />

      <Form>
        <FormGroup>
          <ComponentCard
            title={`Purchase Order Details | Code: ${
              purchaseOrderDetails && purchaseOrderDetails.purchase_order_id
            }`}
          >
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>PO Code</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={purchaseOrderDetails && purchaseOrderDetails.po_code}
                    name="title"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Title</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={purchaseOrderDetails && purchaseOrderDetails.title}
                    name="title"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Status</Label>
                  <Input type="select" name="status" onChange={handleInputs} value={purchaseOrderDetails && purchaseOrderDetails.status}>
                    <option
                      value=""
                      selected="selected"
                    >
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
                    value={purchaseOrderDetails && purchaseOrderDetails.supplier_inv_code}
                    name="supplier_inv_code"
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Priority</Label>
                  <Input
                    type="text"
                    value={purchaseOrderDetails && purchaseOrderDetails.priority}
                    onChange={handleInputs}
                    name="priority"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>PO Date</Label>
                  <Input
                    value={purchaseOrderDetails && moment(purchaseOrderDetails.purchase_order_date).format('YYYY-MM-DD')}
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
                    value={purchaseOrderDetails && moment(purchaseOrderDetails.follow_up_date).format('YYYY-MM-DD')}
                    name="follow_up_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Notes to Supplier</Label>
                  <Input
                    type="textarea"
                    value={purchaseOrderDetails && purchaseOrderDetails.notes}
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
                    value={purchaseOrderDetails && purchaseOrderDetails.delivery_terms}
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
                    value={purchaseOrderDetails && purchaseOrderDetails.payment_terms}
                    onChange={handleInputs}
                    name="payment_terms"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Payment Status</Label>
                  <Input
                    value={purchaseOrderDetails && purchaseOrderDetails.payment_status}
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
                    value={purchaseOrderDetails && purchaseOrderDetails.supplier_inv_code}
                    onChange={handleInputs}
                    name="supplier_inv_code"
                  />
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
          <ComponentCard title="Product Linked">
            <Row>
              <Col md="2">
              <Button className="btn btn-primary" onClick={()=>{

                  }}
              >Add Product</Button>
              </Col>
              <Col md="2">
              <Button className="btn btn-success" onClick={()=>{

              }}
              >Add all Qty to Stock</Button>
              </Col>
              <Col md="2">
              <Button className="btn btn-info" onClick={()=>{

              }}
              >Delivery Order</Button>
              </Col>

            </Row>

            <Row>
                <div className="MainDiv">
                  <div className="container">
                    <table id="example" className="display">
                        <thead>
                            <tr>
                                {columns.map(cell=>{
                                  return (<td key={cell.name}>{cell.name}</td>)
                                })}
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                        <tfoot>
                        </tfoot>          
                    </table>
                  </div>
                </div>
            </Row>
          </ComponentCard>
          <ComponentCard title="Delivery Order">
            <Row>

            </Row>

            <Row>

            </Row>
          </ComponentCard>         
          <ComponentCard title="Add a note">
            <Row>

            </Row>

            <Row>

            </Row>
          </ComponentCard>  
          <ComponentCard title="Picture">
            <Row>

            </Row>

            <Row>

            </Row>
          </ComponentCard> 
          <ComponentCard title="Attachments">
            <Row>

            </Row>

            <Row>

            </Row>
          </ComponentCard>                                          
        </FormGroup>
      </Form>
    </>
  );
};

export default PurchaseOrderEdit;
