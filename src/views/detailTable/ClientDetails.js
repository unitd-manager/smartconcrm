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
import { useNavigate, Link } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs'
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';



const ClientDetails = () => {
  const navigate = useNavigate()


  const [client, setClient] = useState();
  const getClient = () => {
    api.get('/clients/getClients')
      .then((res) => {
        setClient(res.data.data)
        console.log(client)
      })
  }
  useEffect(() => {
    getClient();
  }, [])

  const [clientForms, setClientForms] = useState({
    company_name: "",
  });

  const handleClientForms = (e) => {
    setClientForms({ ...clientForms, [e.target.name]: e.target.value });
  }


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
                    <Button type="submit" className="btn btn-success mr-2">
                      <Link to={`/ClientsUpdate/${clientForms.company_name}`} >Save & Continue</Link>
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

export default ClientDetails;