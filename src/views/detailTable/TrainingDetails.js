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
import { useNavigate} from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs'
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';



const TrainingDetails = () => {
  const navigate = useNavigate()
  const [trainingDetails, setTrainingDetails] = useState({
    title: "",
    training_id:"",
  });

  const [training, setTraining] = useState();
  const getTraining = () => {
    api.get('/training/getTraining')
      .then((res) => {
        setTraining(res.data.data)
        console.log(training)
      })
  }



  const handleInputs = (e) => {
    setTrainingDetails({ ...trainingDetails, [e.target.name]: e.target.value });
  }

  const insertTrainingData = () => {
   
    api.post('/training/insertTraining', trainingDetails)
    .then((res) => {
      const insertedDataId= res.data.data.insertId
      console.log(insertedDataId)
      message('Training inserted successfully.','success')
      setTimeout(()=> {
        navigate(`/TrainingEdit/${insertedDataId}`)
      },300);     
    })
    .catch(() => {
      message('Unable to edit record.', 'error')
    })
  }


  useEffect(() => {
    getTraining();
    setTrainingDetails();
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
                    <Label>Title</Label>
                    <Input type="text"
                      onChange={handleInputs}
                      value={trainingDetails && (trainingDetails.title)}
                      name="title" />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                  <Button
                    color="primary"
                    onClick={() => {
                      insertTrainingData();
                    }}>
                    Save
                  </Button>
                    <Button onClick={() => {
                      navigate('-1')
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
