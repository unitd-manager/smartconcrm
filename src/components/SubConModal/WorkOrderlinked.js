import React, {  useState,useEffect  } from 'react';
import { Row,Col,Form,FormGroup,Label,Input,Button,Modal,ModalBody } from 'reactstrap';
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom';
import api from '../../constants/api';
import message from '../Message';
import ComponentCard from '../ComponentCard';

const WorkOrderLinked = ({WorkOrderLinkedModal,setWorkOrderLinkedModal}) => {
  WorkOrderLinked.propTypes = {
    WorkOrderLinkedModal: PropTypes.bool,
    setWorkOrderLinkedModal: PropTypes.func
  }
  const {id} = useParams();
    const [workOrder,setWorkOrder] = useState();
    const getworkOrder = () =>{
    
      api.post('/subcon/getSubMakePayment',{sub_con_id:id})
        .then((res)=> {
            setWorkOrder(res.data.data[0])
            console.log(res.data.data)
        })
    }

    //API FOR INSERTING SUPPLIER RECEIPT
    
    const [subCon,setSubCon] = useState({
        amount:"",
        mode_of_payment:"",
        remarks:"",
         });

    const handleInputsSubCon = (e) => {
        setSubCon({...subCon, [e.target.name]:e.target.value});
      }
     
    const insertSubConPayment = () => {

 
        api.post('/subcon/insertsub_con_payments',subCon)
        .then(()=> {
          message('subCon inserted successfully.','success')
           //window.location.reload()
        })
        .catch(() => {
          message('Network connection error.','error')
        })
        
        }  
        
        useEffect(()=>{
            getworkOrder();
        
          },[id])

return (
  <div>
        
  <Modal size="lg" isOpen={WorkOrderLinkedModal} >
      
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
                            <Input name="sub_con_worker_code(prev_amount)" type="checkbox"/>
                             <span>{workOrder&&workOrder.sub_con_worker_code}({workOrder&&workOrder.prev_amount})</span>
                            </FormGroup>
                            </Col>
                            
           <Col md="12">
                  <FormGroup>
                  <Label>Amount</Label>
                  <Input  type="text" onChange={handleInputsSubCon}  name="amount" />
                  </FormGroup>
              </Col>
              <Col md="12">
              <FormGroup>
                                <Label>Mode Of Payment</Label>
                                <Input type="select" name="mode_of_payment" 
                                onChange={handleInputsSubCon}
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
                  <Input  type="text" onChange={handleInputsSubCon}  name="remarks" />
                  </FormGroup>
              </Col>

              <input type='hidden' name='sub_con_id' value='1' />
            
           </ComponentCard>
           </FormGroup>
           <FormGroup>
                <Row>
                    <div className="pt-3 mt-3 d-flex align-items-center gap-2">
        <Button  color="primary" onClick={()=>{insertSubConPayment() }} >
          Submit
        </Button>
        <Button color="secondary"  onClick={()=>{ setWorkOrderLinkedModal(true) }}>
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
export default WorkOrderLinked