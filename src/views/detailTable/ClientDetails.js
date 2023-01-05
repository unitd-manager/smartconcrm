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
import { useNavigate } from 'react-router-dom';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs'
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';



const ClientDetails = () => {
  const navigate = useNavigate()


  // const [client, setClient] = useState();
  // const getClient = () => {
  //   api.get('/clients/getClients')
  //     .then((res) => {
  //       setClient(res.data.data)
  //       console.log(client)
  //     })
  // }
 

  const [clientForms, setClientForms] = useState({
    company_name: "",
  });

  const handleClientForms = (e) => {
    setClientForms({ ...clientForms, [e.target.name]: e.target.value });
  }

  const insertClient = () => {

  
    api.post('/clients/insertCompany',clientForms)
    .then((res)=> {
     const insertedDataId= res.data.data.insertId
     console.log(insertedDataId)
    message('Client inserted successfully.','success')
    setTimeout(()=> {
    navigate(`/ClientsEdit/${insertedDataId}`)
    },300);
      
    })
    .catch(() => {
      message('Network connection error.','error')
    })


}


  useEffect(() => {
    // getClient();
  }, [])


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
                    <Label>Company Name</Label>

                    <Input type="text" name="company_name" onChange={(e) => {handleClientForms(e)}}>
                    </Input>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button onClick={()=>{
                           insertClient()
                        }} type="button" className="btn btn-success mr-2" >Save & Continue
                    </Button>
                    <Button onClick={() => {
                      navigate(-1)
                    }} type="button" className="btn btn-dark">
                      Go to List
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

export default ClientDetails