import React,{useEffect,useState} from 'react';
import { Card, CardBody, CardTitle,Row,Col,Form,FormGroup,Label,Input,Button,Modal,ModalHeader,ModalBody, ModalFooter, } from 'reactstrap';
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom';
import moment from 'moment';
import api from '../../constants/api';
import message from '../Message';



const CreateReceipt = ({editCreateReceipt,setEditCreateReceipt}) => {

  CreateReceipt.propTypes = {
    editCreateReceipt: PropTypes.bool,
    setEditCreateReceipt: PropTypes.func,
   
      }

    const [createReceipt, setCreateReceipt] = useState(null);
    const { id } = useParams()

     

      const handleInputreceipt = (e) => {
        setCreateReceipt({ ...createReceipt, [e.target.name]: e.target.value });
      }
    
      const insertReceipt = () => {
    
      
        api.post('/finance/insertreceipt', createReceipt)
          .then(() => {
            message('data inserted successfully.')
            message("Receipt Data Not Found",'info')
            window.location.reload()
          })
          .catch(() => {
            console.log('Network connection error.')
          })
      }
    
    
      const [invoiceReceipt,setInvoiceReceipt] = useState();
      const getinvoiceReceipt = () =>{
    
        api.post('/invoice/getInvoiceReceiptById',{order_id:id})
          .then((res)=> {
            setInvoiceReceipt(res.data.data[0])
              console.log(res.data.data)
          })
      }

  useEffect(() => {
    getinvoiceReceipt();

  }, [id])
  return (
    <>
        <Modal size="lg" isOpen={editCreateReceipt}>
            <ModalHeader>Create Receipt
            <Button color="secondary" onClick={()=>{setEditCreateReceipt(false)}}>
                X
              </Button>
            </ModalHeader>

            <ModalBody>
              <Row>
              <Col md="12">
                <Card>
                  <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
                    Create Receipt
                  </CardTitle>
                  <CardBody>
                    <Form>
                      <Row>
                      <Col md="3">
                           
                          <Label></Label>
                            <FormGroup check>
                            <Input name="invoice_code(prev_amount)" type="checkbox"/>
                             <span>{invoiceReceipt && invoiceReceipt.invoice_code}({invoiceReceipt && invoiceReceipt.prev_amount})</span>
                            </FormGroup>
                            </Col>
                             </Row>
                       <Row>
                        <Col md="8">
                          <FormGroup>
                            <Label>Amount</Label>
                            <Input type="text" 
                            onChange={handleInputreceipt} defaultValue={createReceipt && createReceipt.amount} 
                            name="amount"/>
                          </FormGroup>
                        </Col>

                        <Col md="8">
                          <FormGroup>
                            <Label>Date</Label>
                            <Input type="date" 
                            onChange={handleInputreceipt} defaultValue={moment(createReceipt && createReceipt.date).format('YYYY-MM-DD')} 
                            name="date"/>
                          </FormGroup>
                        </Col>

                        <Col md="8">
                          <FormGroup>
                            <Label>Mode of Payment</Label>
                            <Input type="Text" 
                            onChange={handleInputreceipt} defaultValue={createReceipt && createReceipt.mode_of_payment} 
                            name="mode_of_payment"/>
                          </FormGroup>
                        </Col>

                        <Col md="8">
                          <FormGroup>
                            <Label>Notes</Label>
                            <Input type="text" 
                            onChange={handleInputreceipt} defaultValue={createReceipt && createReceipt.remarks} 
                            name="remarks" />
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
                          <Button color="primary" onClick={() => { insertReceipt() }} > Submit </Button>
                          <Button color="secondary" onClick={() => { setEditCreateReceipt(false) }}>
                            Cancel
                          </Button>
                        </ModalFooter>
            </Modal>
      
    </>
  )
}

export default CreateReceipt