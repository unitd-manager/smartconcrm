import React, {  useState,useEffect  } from 'react';
import { Row,Col,Form,FormGroup,Label,Input,Button,Modal,ModalBody } from 'reactstrap';
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom';
import api from '../../constants/api';
import message from '../Message';
import ComponentCard from '../ComponentCard';

const PurchaseOrderLinked = ({PurchaseOrderLinkedModal,setPurchaseOrderLinkedModal}) => {
  PurchaseOrderLinked.propTypes = {
    PurchaseOrderLinkedModal: PropTypes.bool,
    setPurchaseOrderLinkedModal: PropTypes.func
  }
  const {id} = useParams();
    const [purchaseOrder,setPurchaseOrder] = useState();
    const getpurchaseOrder = () =>{
    
      api.post('/supplier/getMakePayment',{supplier_id:id})
        .then((res)=> {
            setPurchaseOrder(res.data.data[0])
            console.log(res.data.data)
        })
    }

    //API FOR INSERTING SUPPLIER RECEIPT
    
    const [supplier,setSupplier] = useState({
        amount:"",
        mode_of_payment:"",
        remarks:"",
         });

    const handleInputsSupplierForms = (e) => {
        setSupplier({...supplier, [e.target.name]:e.target.value});
      }
     
    const insertSupplierreceipt = () => {

 
        api.post('/supplier/insert-SupplierReceipt',supplier)
        .then(()=> {
          message('Supplier inserted successfully.','success')
           //window.location.reload()
        })
        .catch(() => {
          message('Network connection error.','error')
        })
        
        }  
        
        useEffect(()=>{
            getpurchaseOrder();
        
          },[id])

return (
  <div>
        
  <Modal size="lg" isOpen={PurchaseOrderLinkedModal} >
      
      <ModalBody>
      <Form>
       <FormGroup>
       <ComponentCard title= 'Create Purchase Order'> 
<Row>
                  <Col md="12" className='mb-4 d-flex justify-content-between'>
                    <h3>Please Select Purchase Order</h3> 
                  </Col>
              </Row>
              <Col md="3">
                            <Label></Label>
                            <FormGroup check>
                            <Input name="po_code(prev_inv_amount)" type="checkbox"/>
                             <span>{purchaseOrder&&purchaseOrder.po_code}({purchaseOrder&&purchaseOrder.prev_inv_amount})</span>
                            </FormGroup>
                            </Col>
                            
           <Col md="12">
                  <FormGroup>
                  <Label>Amount</Label>
                  <Input  type="text" onChange={handleInputsSupplierForms}  name="amount" />
                  </FormGroup>
              </Col>
              <Col md="12">
              <FormGroup>
                                <Label>Mode Of Payment</Label>
                                <Input type="select" name="mode_of_payment" 
                                onChange={handleInputsSupplierForms}
                                >
                                  <option value="" selected="selected">Please Select</option>
                                  <option value="cash">Cash</option>
                                  <option value="cheque">Cheque</option>
                                  <option value="giro">Giro</option>
                          
                              </Input>
                              </FormGroup>
              </Col>

              <Col md="12">
                  <FormGroup>
                  <Label>Note</Label>
                  <Input  type="text" onChange={handleInputsSupplierForms}  name="remarks" />
                  </FormGroup>
              </Col>

              <input type='hidden' name='supplier_id' value='1' />
            
           </ComponentCard>
           </FormGroup>
           <FormGroup>
                <Row>
                    <div className="pt-3 mt-3 d-flex align-items-center gap-2">
        <Button  color="primary" onClick={()=>{insertSupplierreceipt() }} >
          Submit
        </Button>
        <Button color="secondary"  onClick={()=>{ setPurchaseOrderLinkedModal(true) }}>
          Cancel
        </Button>
                     </div>
                </Row> 
              </FormGroup>
           </Form>
            
      </ModalBody>
      
  </Modal>
</div>

 



    );


};
export default PurchaseOrderLinked