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



const TrainingDetails = () => {
  const navigate = useNavigate()


  const [training, setTraining] = useState();
  const getTraining = () => {
    api.get('/training/getTraining')
      .then((res) => {
        setTraining(res.data.data)
        console.log(training)
      })
  }
  useEffect(() => {
    getTraining()
  }, [])

  const [trainingForms, setTrainingForms] = useState({
    title: "",
  });

  const handleTrainingForms = (e) => {
    setTrainingForms({ ...trainingForms, [e.target.name]: e.target.value });
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
                    <Label>Title</Label>

                    <Input type="text" name="title" onChange={(e) => {
                      //getContact(e.target.value)
                      handleTrainingForms(e)
                    }}>
                    </Input>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button type="submit" className="btn btn-success mr-2">
                      <Link to={`/TrainingEdit/${trainingForms.title}`} >Save & Continue</Link>
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

export default TrainingDetails
