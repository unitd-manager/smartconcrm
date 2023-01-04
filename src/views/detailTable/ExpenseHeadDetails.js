import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import { useNavigate,useParams } from 'react-router-dom';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs'
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';



const ContentDetails = () => {
  const {id} = useParams();
  const navigate = useNavigate()


  // const [expensehead, setExpenseHead] = useState();
  // const getExpenseHead = () => {
  //   api.get('/expensehead/getExpenseHead')
  //     .then((res) => {
  //       setExpenseHead(res.data.data)
  //       console.log(expensehead)
  //     })
  // }
 

  const [expenseForms, setExpenseForms] = useState({
    title: "",
  });

  const handleExpenseForms = (e) => {
    setExpenseForms({ ...expenseForms, [e.target.name]: e.target.value });
  }
  const insertExpense = () => {

  
    api.post('/expensehead/insertExpGroup',expenseForms)
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
useEffect(() => {

}, [id])



  return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col md="12">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>Title</Label>

                    <Input type="text" name="title" onChange={(e) => {
                      //getContact(e.target.value)
                      handleExpenseForms(e)
                    }}>
                    </Input>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button onClick={()=>{
                           insertExpense()
                        }} type="button" className="btn btn-success mr-2" >submit
                    </Button>
                    <Button onClick={() => {
                      navigate(-1)
                    }} type="button" className="btn btn-dark">
                      Cancel
                    </Button>
                  </div>
                </Row>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>

      </Row>

    </div>
  );
}

export default ContentDetails
