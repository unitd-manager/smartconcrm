import React, { useEffect, useState } from 'react';
import {  useNavigate,useParams,Link } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import * as Icon from 'react-feather';
import {  Row,Col,Form,FormGroup,Label,Input,Button,Modal,ModalHeader,ModalBody,ModalFooter,CardBody,Card } from 'reactstrap';
import Swal from 'sweetalert2'
import $ from 'jquery'; 
import ExpenseHeadModal from '../../components/tender/ExpenseHeadModal';
import ComponentCard from '../../components/ComponentCard';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss'
import api from '../../constants/api';



const ExpenseEdit = () => {

    const {id} = useParams();
    const navigate = useNavigate()
    const [ExpenseSuphead, SetExpenseSuphead] = useState(false);
    const [expenseData, setExpenseData] = useState();

    const [expenseDetails, setExpenseDetails] = useState();

    const [addContactModal, setAddContactModal] = useState(false);

    const addContactToggle = () => {
      setAddContactModal(!addContactModal);
    };

   

    // Get Accounts By Id

    const editExpenseById = () =>
    {
       api.post('/expensehead/getExpenseHeadByid',{expense_group_id:id})
       .then((res)=> {
        setExpenseDetails(res.data.data[0])
           
       })
      .catch(() => {
        message("ExpenseHead Data Not Found",'info')
       })
    }
   
    const handleInputs = (e) => {
      setExpenseDetails({...expenseDetails, [e.target.name]:e.target.value});
   }
   
    
     const editExpenseData = () =>
     {
       api.post('/expensehead/editExpenseHead',expenseDetails)
       .then(()=> {
         
         message('Record editted successfully','success')
        
 
       })
         .catch(() => {
           message('Unable to edit record.','error')
         })
     }



     const [SubexpenseDetails, setSubExpenseDetails] = useState(null);
     const SubExpenseById = () =>
     {
      api.post('/expensehead/getExpenseSubHeadLinkedById',{expense_group_id:id})
      .then((res)=> {
       setSubExpenseDetails(res.data.data)
       console.log(res)
          
      })
     }
     const [expensehead, SetexpenseHead] = useState({
      title:''
     
    });

    const handleAddNewContact = (e) => {
      SetexpenseHead({...expensehead, [e.target.name]:e.target.value});
    }
    
const AddNewSubHead = () => {
  const ExpenseHeadExpenseId = expensehead;
  ExpenseHeadExpenseId.expense_group_id = id;
  
  console.log(ExpenseHeadExpenseId.expense_group_id);
  api.post('/expensehead/insertExp',ExpenseHeadExpenseId)
  .then((res)=> {
    const insertedDataId= res.data.data.insertId
     console.log(insertedDataId)
    message('Expense inserted successfully.','success')
    setTimeout(()=> {
    navigate(`/ExpenseHeadEdit/${insertedDataId}`)
    },300);
      
    })
  .catch(() => {
    message('Network connection error.','error')
  })
}
     
   
    
     
    const columns = [
      {
        name: "Title",
        selector: "title",
        sortable: true,
        grow:0,
        wrap: true
      },
     
      {
          name: 'Edit',
          selector: "edit",
          cell: () => <Icon.Edit2 />,
          grow:0,
          width:'auto',
          button:true,
          sortable:false,
      },
      {
          name:'Del',
          selector: "delete",
          cell: () => <Icon.Trash />,
          grow:0,
          width:'auto',
          wrap: true
      },
     
    ]

    const deleteRecord = () => {
      
      // console.log(id)
     
     Swal.fire({
       title: `Are you sure? ${id}`,
       text: "You won't be able to revert this!",
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes, delete it!'
     }).then((result) => {
       if (result.isConfirmed) {
         api.post('/expensehead/deleteExp',{expense_sub_group_id:id}).then(res=>{
           console.log(res)
           Swal.fire(
             'Deleted!',
             'Your expense sub has been deleted.',
             'success'
           )
           SubExpenseById()

         })
       }
     })

    }

    

useEffect(()=>{
     
  editExpenseById();
  SubExpenseById();
  
  setTimeout(() => {
    $('#example').DataTable(
        // {
        //     pagingType: 'full_numbers',
        //       pageLength: 20,
        //       processing: true,
        //       dom: 'Bfrtip',
        //           buttons: ['csv', 'print'
        //           ]
        // }
    );
    } ,
    1000
    );
    
},[id])





 return (
    <>
    <BreadCrumbs heading={expenseDetails && expenseDetails.expense_group_id} />

        <Form >
          <FormGroup>
          <ComponentCard title="Expense Head Details">
          
              <Row>
             
              <Col md="6">
                  <FormGroup>
                  <Label>Title</Label>
                  <Input  type="text" onChange={handleInputs} value={expenseDetails&& expenseDetails.title} name="title" />
                  </FormGroup>
              </Col>
              
              </Row>


                    <Row>
                    <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                        <Button onClick={()=>{
                           editExpenseData()
                        }} type="button" className="btn btn-success mr-2">
                        Save & Continue
                        </Button>
                        <Button onClick={()=>{
                          navigate(-1)
                        }} type="button" className="btn btn-dark">
                        Go to List
                        </Button>
                     </div>
                    </Row>
                  </ComponentCard>
                </FormGroup>
            </Form>

<ComponentCard title="Expense Sup Head Linked">
<ToastContainer></ToastContainer>

              
<Row>
              <table id="example" className="display">
                <thead>
              <tr>
                  {columns.map(cell=>{
                    return (<td key={cell.name}>{cell.name}</td>)
                  })}
              </tr></thead>
         
          <tbody>
            
            {SubexpenseDetails && SubexpenseDetails.map(element=>{
                return (<tr key={element.expense_Sub_group_id}>
                <td>{element.title}</td>
                <td><Link to=""><span onClick={()=>{setExpenseData(element)
                                                    SetExpenseSuphead(true)} }><Icon.Edit2 /></span></Link></td>
                <td><Link to=""><span onClick={()=>deleteRecord(element.expense_sub_group_id)}><Icon.Trash2 /></span></Link></td>
                
               
                </tr>)
            })}
          </tbody>
         
      </table>
      <ExpenseHeadModal ExpenseSuphead={ ExpenseSuphead} SetExpenseSuphead={ SetExpenseSuphead} expenseData={expenseData}
      />
      </Row>
      <Row>
    <Col md="3">
                        <FormGroup>
                        <Button color="primary" onClick={addContactToggle.bind(null)}>Add Expense sup Head </Button>
                        
              

                        <Modal size="lg" isOpen={addContactModal} toggle={addContactToggle.bind(null)}>
                          <ModalHeader toggle={addContactToggle.bind(null)}>Sub Head</ModalHeader>
                          <ModalBody>
                            <Row>
                            <Col md="12">
                              <Card>
                                <CardBody>
                                  <Form>
                                    <Row>
                                    
                                      <Col md="12">
                                        <FormGroup>
                                          <Label>Title</Label>
                                          <Input type="text" name="title" onChange={handleAddNewContact}value={expensehead && expensehead.title}/>
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
                            <Button color="primary" onClick={()=>{
                                AddNewSubHead()
                              }}>
                              Submit
                            </Button>
                            <Button color="secondary" onClick={addContactToggle.bind(null)}>
                              Cancel
                            </Button>
                          </ModalFooter>
                        </Modal>

                    
                        </FormGroup>
                    </Col>
                    </Row>
         </ComponentCard> 
            
            </> 
  )

    };
export default ExpenseEdit;