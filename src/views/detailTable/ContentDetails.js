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



const ContentDetails = () => {
  const navigate = useNavigate()

  const [contentDetails, setContentDetails] = useState({
    title: "",
  });


  const [content, setContent] = useState();
  const getContent = () => {
    api.get('/content/getContent')
      .then((res) => {
        setContent(res.data.data)
        console.log(content)
      })
  }
  
  const handleInputs = (e) => {
    setContentDetails({ ...contentDetails, [e.target.name]: e.target.value });
  }

  const insertContentData = () => {
   
    api.post('/content/insertContent', contentDetails)
    .then((res) => {
      const insertedDataId= res.data.data.insertId
      console.log(insertedDataId)
      message('Content inserted successfully.','success')
      setTimeout(()=> {
        navigate(`/ContentEdit/${insertedDataId}`)
      },300);     
    })
    .catch(() => {
      message('Unable to edit record.', 'error')
    })
  }
  useEffect(() => {
    getContent();
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
                      value={contentDetails && (contentDetails.title)}
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
                      insertContentData();
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

export default ContentDetails
