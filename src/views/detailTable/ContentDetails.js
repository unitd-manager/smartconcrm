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



const ContentDetails = () => {
  const navigate = useNavigate()


  const [content, setContent] = useState();
  const getContent = () => {
    api.get('/content/getContent')
      .then((res) => {
        setContent(res.data.data)
        console.log(content)
      })
  }
  useEffect(() => {
    getContent();
  }, [])

  const [contentForms, setContentForms] = useState({
    title: "",
  });

  const handleContentForms = (e) => {
    setContentForms({ ...contentForms, [e.target.name]: e.target.value });
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
                      handleContentForms(e)
                    }}>
                    </Input>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button type="submit" className="btn btn-success mr-2">
                      <Link to={`/ContentEdit/${contentForms.title}`} >Save & Continue</Link>
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

export default ContentDetails
