import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Row, Col, Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import * as $ from "jquery";
import random from 'random'
import api from '../../constants/api';
import message from '../Message';


const InvoiceData = ({ editInvoiceData, setEditInvoiceData, projectInfo }) => {

  InvoiceData.propTypes = {
    editInvoiceData: PropTypes.bool,
    setEditInvoiceData: PropTypes.func,
    projectInfo: PropTypes.object,
  }

  // const [invoiceCreate, setInvoiceCreate] = useState();
  // const getInvoiceCode = () => {

  //   api.get('/finance/getMaxInvoiceCode')
  //     .then((res) => {
  //       setInvoiceCreate(res.data.data)
  //       console.log(res.data.data)
  //     })
  // }

  useEffect(() => {

    // getInvoiceCode()

  }, [])

  const [createInvoice, setCreateInvoice] = useState({
    discount: "",
    quote_code: "",
    po_number: "",
    project_location: "",
    project_reference: "",
    invoice_date: "",
    code: "",
    so_ref_no: "",
    site_code: "",
    attention: "",
    reference: "",
    invoice_terms: "",

  });


  const handleInserts = (e) => {
    setCreateInvoice({ ...createInvoice, [e.target.name]: e.target.value });
  }

  const insertInvoice = () => {


    api.post('/finance/insertInvoice', createInvoice)
      .then(() => {
        console.log('Invoice inserted successfully.')
        console.log('createInvoice', createInvoice)
        window.location.reload()
      })
      .catch(() => {
        console.log('Network connection error.')
      })
  }

  const [addLineItem, setAddLineItem] = useState(
    [{
      "id": random.int(1, 99),
      "unit": "",
      "qty": "",
      "unit_price": "",
      "total_cost": "",
      "remarks": "",
      "item_title": "",
      "description": ""
    }])


  const [totalAmount, setTotalAmount] = useState(0);
  
  const AddNewLineItem = () => {
   
    setAddLineItem([...addLineItem,{
      "id": new Date().getTime().toString(),
      "uom": "",
      "qty": "",
      "unitprice": "",
      "total_cost": "",
      "remarks": "",
      "item":"",
      "description":""
  }])
  }
  const addLineItemApi = (obj) => {
    api.post('/finance/insertInvoiceItem', {
      "description": obj.description, "amount": obj.total_cost, "item_title": "", "item_code": projectInfo.item_code,
      "cost_price": 0, "qty": obj.qty, "site_id": projectInfo.site_id, "created_by": "", "modified_by": "",
      "unit": obj.unit, "remarks": obj.remarks, "s_no": "", "model": "", "vat": 0, "discount_percentage": 0,
      "item_code_backup": "", "erection": 0, "dismantle": 0, "unit_price": parseFloat(obj.unit_price),
    }).then(() => {
      message('Line Item Added Successfully', 'sucess')
    }).catch(() => {
      message('Cannot Add Line Items', 'error')
    })
  }
  const getAllValues = () => {

    const result = [];

    $(".lineitem tbody tr").each(function () {
      const allValues = {};
      $(this).find("input").each(function () {

        const fieldName = $(this).attr("name");
        allValues[fieldName] = $(this).val();
      });
      result.push(allValues);
    })
    console.log(result)
    result.forEach(obj => {
      if (obj.item !== '' && obj.total_cost) {
        addLineItemApi(obj)
      }
    })
    setTotalAmount(0)
    setAddLineItem([{
      "id": random.int(1, 99),
      "unit": "",
      "qty": "",
      "unit_price": "",
      "total_cost": "",
      "remarks": "",
      "item_title": "",
      "description": ""
    }])
  }

  const calculateTotal = () => {

    let totalValue = 0
    const result = [];
    $(".lineitem tbody tr").each(function () {
      const allValues = {};
      $(this).find("input").each(function () {

        const fieldName = $(this).attr("name");
        allValues[fieldName] = $(this).val();
        allValues.total_cost = allValues.qty * allValues.unit_price

      });
      result.push(allValues);
    })
    result.forEach(e => {
      if (e.total_cost) {
        totalValue += parseFloat(e.total_cost)
      }
    })
    setAddLineItem(result)
    setTotalAmount(totalValue)
  }

  // Clear row value
  const ClearValue = (ind) => {
    setAddLineItem(current =>
      current.filter(obj => {
        return obj.id !== ind.id;
      }),
    );
    if (ind.total_cost) {
      const finalTotal = totalAmount - parseFloat(ind.total_cost)
      setTotalAmount(finalTotal)
    }
  }


  return (
    <>
      <Modal size="lg" isOpen={editInvoiceData}>
        <ModalHeader>Create Invoice
          <Button color="secondary" onClick={() => { setEditInvoiceData(false) }}>
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col md="12">
              <Card>
                <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
                  Create Invoice
                </CardTitle>
                <CardBody>
                  <Form>
                   
                    <Card>
                      <Row>
                        <Row>
                          <Col md="3">
                            <Button color="primary"
                              type='button' onClick={() => { AddNewLineItem() }}>Add Line Item</Button>
                          </Col>
                          <Col md="3">
                            <Button color="primary"
                              type='button' onClick={() => { '/AddMoreDetail' }}>Add More Detail</Button>
                          </Col>

                        </Row>


                        <Col md="8">
                          <FormGroup>
                            <Label>Invoice Code</Label>
                            <Input type="text"
                                onChange={handleInserts} Value={createInvoice && createInvoice.invoice_code}
                              name="invoice_code" />
                          </FormGroup>
                        </Col>
                        <Col md="8">
                          <FormGroup>
                            <Label>Discount</Label>
                            <Input type="text"
                              onChange={handleInserts} value={createInvoice && createInvoice.discount}
                              name="discount" />
                          </FormGroup>
                        </Col>

                        <Col md="8">
                          <FormGroup>
                            <Label>Order ID</Label>
                            <Input type="text"
                              onChange={handleInserts} value={createInvoice && createInvoice.order_id}
                              name="order_id"/>
                          </FormGroup>
                        </Col>


                        <Col md="8">
                          <FormGroup>
                            <Label>Quote Code</Label>
                            <Input type="text"
                              onChange={handleInserts} value={createInvoice && createInvoice.quote_code}
                              name="quote_code" />
                          </FormGroup>
                        </Col>

                        <Col md="8">
                          <FormGroup>
                            <Label>PO Number</Label>
                            <Input type="text"
                              onChange={handleInserts} value={createInvoice && createInvoice.po_number}
                              name="po_number" />
                          </FormGroup>
                        </Col>

                        <Col md="8">
                          <FormGroup>
                            <Label>Project Location</Label>
                            <Input type="text"
                              onChange={handleInserts} value={createInvoice && createInvoice.project_location}
                              name="project_location" />
                          </FormGroup>
                        </Col>

                        <Col md="8">
                          <FormGroup>
                            <Label>Project Reference</Label>
                            <Input type="text"
                              onChange={handleInserts} value={createInvoice && createInvoice.project_reference}
                              name="project_reference" />
                          </FormGroup>
                        </Col>

                        <Col md="8">
                          <FormGroup>
                            <Label>Invoice date</Label>
                            <Input type="date"
                              onChange={handleInserts} value={createInvoice && createInvoice.invoice_date}
                              name="invoice_date" />
                          </FormGroup>
                        </Col>

                        <Col md="8">
                          <FormGroup>
                            <Label>Code</Label>
                            <Input type="text"
                              onChange={handleInserts} value={createInvoice && createInvoice.code}
                              name="code" />
                          </FormGroup>
                        </Col>

                        <Col md="8">
                          <FormGroup>
                            <Label>SO Ref Number</Label>
                            <Input type="text"
                              onChange={handleInserts} value={createInvoice && createInvoice.so_ref_no}
                              name="so_ref_no" />
                          </FormGroup>
                        </Col>

                        <Col md="8">
                          <FormGroup>
                            <Label>Site Code</Label>
                            <Input type="text"
                              onChange={handleInserts} value={createInvoice && createInvoice.site_code}
                              name="site_code" />
                          </FormGroup>
                        </Col>

                        <Col md="8">
                          <FormGroup>
                            <Label>Attention</Label>
                            <Input type="text"
                              onChange={handleInserts} value={createInvoice && createInvoice.attention}
                              name="attention" />
                          </FormGroup>
                        </Col>


                        <Col md="8">
                          <FormGroup>
                            <Label>Reference</Label>
                            <Input type="textarea"
                              onChange={handleInserts} value={createInvoice && createInvoice.reference}
                              name="reference" />
                          </FormGroup>
                        </Col>

                        <Col md="8">
                          <FormGroup>
                            <Label>Invoice Terms</Label>
                            <Input type="text"
                              onChange={handleInserts} value={createInvoice && createInvoice.invoice_terms}
                              name="invoice_terms" />
                          </FormGroup>
                        </Col>

                        <Card>
                          <table className='lineitem' >

                            <thead>
                              <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Description	</th>
                                <th scope="col">UoM</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Unit Price</th>
                                <th scope="col">Total Price</th>
                                <th scope="col">Remarks</th>
                                <th scope="col"></th>
                              </tr>
                            </thead>
                            <tbody>

                              {addLineItem.map((item) => {
                                return (
                                  <tr key={item.id}>
                                    <td data-label="Item"><Input defaultValue={item.item} type="text" name="item_title" /></td>
                                    <td data-label="Description"><Input defaultValue={item.description} type="text" name="description" /></td>
                                    <td data-label="UoM"><Input defaultValue={item.unit} type="text" name="unit" /></td>
                                    <td data-label="Qty"><Input defaultValue={item.qty} type="number" name="qty" /></td>
                                    <td data-label="Unit Price"><Input defaultValue={item.unit_price} onBlur={() => {
                                      calculateTotal()
                                    }} type="number" name="unit_price" /></td>
                                    <td data-label="Total Price"><Input defaultValue={item.total_cost} type="text" name="total_cost" disabled /></td>
                                    <td data-label="Remarks"><Input defaultValue={item.remarks} type="text" name="remarks" /></td>
                                    <td data-label="Action"><Link to=""><Input type='hidden' name="id" defaultValue={item.id}></Input><span onClick={() => { ClearValue(item) }}>Clear</span></Link></td>
                                  </tr>
                                );
                              })}

                            </tbody>
                          </table>
                        </Card>
                        <ModalFooter>
                          <Button color="primary" onClick={() => {
                            insertInvoice();
                            getAllValues();
                          }} > Submit </Button>
                          <Button color="secondary" onClick={() => {
                            setEditInvoiceData(false)
                          }}>
                            Cancel
                          </Button>
                        </ModalFooter>


                      </Row>
                    </Card>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>

      </Modal>


    </>
  )
}

export default InvoiceData