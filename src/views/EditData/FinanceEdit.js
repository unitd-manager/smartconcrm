import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, TabContent, TabPane, Nav, NavItem, NavLink, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify'
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss'
import InvoiceData from '../../components/finance/InvoiceData';
import CreateReceipt from '../../components/finance/CreateReceipt';
import CreateNote from '../../components/finance/CreateNote';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';


const FinanceEdit = () => {


  const [activeTab, setActiveTab] = useState('1');
  const [lineItem] = useState(null);

  const [financeDetails, setFinanceDetails] = useState()

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };


  const [editInvoiceData, setEditInvoiceData] = useState(false);
  const [editCreateReceipt, setEditCreateReceipt] = useState(false);
  const [editCreateNote, setEditCreateNote] = useState(false);
  // const [editCostingSummaryData, seteditCostingSummaryData] = useState(null);
  const { id } = useParams()


  const navigate = useNavigate()



  
  const columns = [
    {
      name: "Invoice Code",
      selector: "invoice_code",
      grow:0,
      wrap: true,
      width:'4%'
    },
  //   {
  //     name: 'Edit',
  //     selector: "edit",
  //     cell: () => <Link to="/"><Icon.Edit3 /></Link>,
  //     grow:0,
  //     width:'auto',
  //     button:true,
  //     sortable:false,
  // },

    {
      name: "Status",
      selector: "status",
      sortable: true,
      grow:0,
      wrap: true
    },
    {
      name: "Invoice Date",
      selector: "invoice_date",
      sortable: true,
      grow:0,
    },
    {
        name: "Amount",
        selector: "Invoice_amount",
        sortable: true,
        width:'auto',
        grow:3,
       
      } 
      ]

  const handleInputs = (e) => {
    setFinanceDetails({ ...financeDetails, [e.target.name]: e.target.value });
  }

  const editFinanceById = () => {
    api.post('/finance/getFinancesById', { order_id: id })
      .then((res) => {
        setFinanceDetails(res.data.data)
       
      })
      .catch(() => {
        message("Fianance Data Not Found", 'info')
      })
  }



  const editFinanceData = () => {
    api.post('/finance/editFinances', financeDetails)
      .then(() => {

        message('Record editted successfully', 'success')
         })
      .catch(() => {
        message('Unable to edit record.', 'error')
      })
  }

  const [invoiceamount, setInvoiceAmount] = useState(null);
  const getInvoiceAmount = () => {

    api.post('/invoice/getInvoiceById', { invoice_id: id })
    .then((res) => {
      setInvoiceAmount(res.data.data)
    
    })
    .catch(() => {
      message("Fianance Data Not Found", 'info')
    })
}

  useEffect(() => {
    // getInvoice();
    editFinanceById();
    getInvoiceAmount();
    console.log(lineItem)
  }, [id])



  return (
    <>

      <BreadCrumbs heading={financeDetails && financeDetails.order_id} />

      <Form >
        <FormGroup>

          <ComponentCard title='Main Details'>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Order Id </Label>
                  <br />
                  <span>{financeDetails && financeDetails.order_id} </span>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Project code </Label>
                  <br />
                  <span>{financeDetails && financeDetails.project_id}</span>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Project Category </Label>
                  <br />
                  <span>{financeDetails && financeDetails.project_type}</span>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Order Date</Label>
                  <br />
                  <span>{moment(financeDetails && financeDetails.creation_date.folloe_up_date).format('YYYY-MM-DD')}</span>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Amount</Label>
                  <br />
                  <span>{financeDetails && financeDetails.order_amount}</span>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Status</Label>
                  <br />
                  <span>{financeDetails && financeDetails.order_status}</span>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Terms </Label>
                  <br />
                  <Input type="text" onChange={handleInputs} value={financeDetails && financeDetails.invoice_terms} name="invoice_terms" />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Notes</Label>
                  <br />
                  <Input type="text" onChange={handleInputs} value={financeDetails && financeDetails.notes} name="notes" />
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>





      <Form >
        <FormGroup>

          <ComponentCard title='Delivery address'>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Company Name </Label>
                  <Input type="text" onChange={handleInputs} value={financeDetails && financeDetails.shipping_first_name} name="shipping_first_name" />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Address 1 </Label>
                  <Input type="text" onChange={handleInputs} value={financeDetails && financeDetails.shipping_address1} name="shipping_address1" />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Address 2 </Label>
                  <Input type="text" onChange={handleInputs} value={financeDetails && financeDetails.shipping_address2} name="shipping_address2" />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Country </Label>
                  <Input type="text" onChange={handleInputs} value={financeDetails && financeDetails.shipping_address_country} name="shipping_address_country" />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Postal Code </Label>
                  <Input type="text" onChange={handleInputs} value={financeDetails && financeDetails.shipping_address_po_code} name="shipping_address_po_code" />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Delivery Date</Label>
                  <Input type="date" onChange={handleInputs} value={moment(financeDetails && financeDetails.delivery_date.folloe_up_date).format('YYYY-MM-DD')} name="delivery_date" />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Delivery Terms </Label>
                  <Input type="text" onChange={handleInputs} value={financeDetails && financeDetails.delivery_terms} name="delivery_terms" />
                </FormGroup>
              </Col>

            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>





      <Form >
        <FormGroup>

          <ComponentCard title='Customer Details'>
            <Row>
              <Col md="8">
                <FormGroup>
                  <Label>Company Name</Label><br />

                  {financeDetails && financeDetails.company_name}
                </FormGroup>
              </Col>
              <Col md="8">
                <FormGroup>
                  <Label> Address 1 </Label>
                  <br />
                  <span>{financeDetails && financeDetails.cust_address1}</span>
                </FormGroup>
              </Col>
              <Col md="8">
                <FormGroup>
                  <Label> Address 2 </Label>
                  <br />
                  <span>{financeDetails && financeDetails.cust_address2}</span>
                </FormGroup>
              </Col>
              <Col md="8">
                <FormGroup>
                  <Label> Country </Label>
                  <br />
                  <span>{financeDetails && financeDetails.cust_address_country}</span>
                </FormGroup>
              </Col>
              <Col md="8">
                <FormGroup>
                  <Label> Postal Code</Label>
                  <br />
                  <span>{financeDetails && financeDetails.cust_address_po_code}</span>
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>

      <Form >
        <FormGroup>

          <ComponentCard title='Creation&modification'>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Created By</Label>                       <span>{financeDetails && financeDetails.created_by}</span>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Modified By </Label>                      <span>{financeDetails && financeDetails.modified_by}</span>
                </FormGroup>
              </Col>

            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>

      <Row>
        <div className="pt-3 mt-3 d-flex align-items-center gap-2">
          <Button onClick={() => {
            editFinanceData()
          }} type="button" className="btn btn-success mr-2">
            Save & Continue
          </Button>
          <Button onClick={() => {
            navigate(-1)
          }} type="button" className="btn btn-dark">
            Go to List
          </Button>
        </div>
      </Row>


      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>



        <InvoiceData
          editInvoiceData={editInvoiceData}
          setEditInvoiceData={setEditInvoiceData}
          projectInfo={InvoiceData}

        />
        <CreateReceipt
          editCreateReceipt={editCreateReceipt}
          setEditCreateReceipt={setEditCreateReceipt}

        />
        <CreateNote
          editCreateNote={editCreateNote}
          setEditCreateNote={setEditCreateNote}

        />


        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => {
                toggle('1');
              }}
            >
              Invoice
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => {
                toggle('2');
              }}
            >
              Receipt
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '3' ? 'active' : ''}
              onClick={() => {
                toggle('3');
              }}
            >
              Notes
            </NavLink>
          </NavItem>

        </Nav>

        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col md="12" className='mb-4'>
                <Button color="primary" onClick={() => {
                  setEditInvoiceData(true)
                }}
                >Create Invoice</Button>
              </Col>
            </Row>

            <hr />

            <br />

          </TabPane>

          <TabPane tabId="2">
            <Row>
              <Col md="12" className='mb-4'>
                <Button color="primary" onClick={() => {
                  setEditCreateReceipt(true)
                }}
                >Create Receipt</Button>
              </Col>
            </Row>

            <hr />

            <br />

          </TabPane>


          <TabPane tabId="3">
            <Row>
              <Col md="12" className='mb-4'>
                <Button color="primary" onClick={() => {
                  setEditCreateNote(true)
                }}
                >Create Notes</Button>
              </Col>
            </Row>

            <hr />

            <br />

          </TabPane>


        </TabContent>
      </ComponentCard>

      <ComponentCard title='Invoice(s)'>

        <Form>
          <Row>
            <div className="container">

              <table id="example" className="display">
                <thead>
                  <tr >
                    {columns.map(cell => {
                      return (<td key={cell.name}>{cell.name}</td>)
                    })}
                  </tr>
                </thead>
                <tbody>
            {invoiceamount && invoiceamount.map(element=>{
                return (<tr key={element.invoice_code}>
                    <td>{element.invoice_code}</td><br/>
                    <td>{element.status}</td>
                    <td>{moment(element.invoice_date).format('YYYY-MM-DD')}</td>
                    <td>{element.invoice_amount}</td>
                    </tr>)
            })}
          </tbody>
                <tfoot>
                  <tr>
                    {columns.map(cell => {
                      return (<td key={cell.name}>{cell.name}</td>)
                    })}
                  </tr>
                </tfoot>
              </table>
            </div>
          </Row>
        </Form>

      </ComponentCard>
      <ComponentCard title='Receipt(s)'>

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
        </Form>

      </ComponentCard>
      <ComponentCard title='Credit Note(s)'>

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
        </Form>

      </ComponentCard>
    </>
  )
}

export default FinanceEdit;