import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';


const ValueListDetails = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [valuelistname, setValueListName] = useState();

  const getValueListName = () => {
    api.get('/valuelist/getValueList')
      .then((res) => {
        setValueListName(res.data.data);
        console.log(res.data.data);
      })
  }

  const [valuelistdetails, setValueListDetails] = useState({
    key_text: "",
    value: "",
  });
  
  const handleInputs = (e) => {
    setValueListDetails({ ...valuelistdetails, [e.target.name]: e.target.value });
  }

  const insertValueListData = () => {
    api.post('/valuelist/insertValueList', valuelistdetails)
    .then((res) => {
      const insertedDataId= res.data.data.insertId
      console.log(insertedDataId)
      message('Valuelist inserted successfully.','success')
      setTimeout(()=> {
        navigate(`/ValueListEdit/${insertedDataId}`)
      },300);     
    })
    .catch(() => {
      message('Unable to edit record.', 'error')
    })
}

  useEffect(() => {
    getValueListName();
  },[id]);


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
                    <Label>Value List Name</Label>
                    <Input type="select"
                      onChange={handleInputs}
                      value={valuelistdetails && (valuelistdetails.key_text)}
                      name="key_text">
                      <option value="" selected >Please Select</option>
                      {valuelistname && valuelistname.map((ele) => {
                        return <option value={ele.key_text} >{ele.key_text}</option>
                      })}
                    </Input>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>Value</Label>
                    <Input type="text"
                      onChange={handleInputs}
                      value={valuelistdetails && (valuelistdetails.value)}
                      name="value" />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button type="button" className="btn btn-success mr-2" 
                    onClick={() => {
                      insertValueListData();
                      // routeChange();
                    }}>
                      Save & Continue
                    </Button>
                    <Button type="submit" className="btn btn-dark">
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
};

export default ValueListDetails;
