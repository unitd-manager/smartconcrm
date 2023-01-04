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



const SectionDetails = () => {
  const navigate = useNavigate()


  
  

  const [sectionForms, setSectionForms] = useState({
    title: "",
  });

  const handleSectionForms = (e) => {
    setSectionForms({ ...sectionForms, [e.target.name]: e.target.value });
  }
  const insertSection = () => {

  
    api.post('/section/insertSection',sectionForms)
    .then((res)=> {
     const insertedDataId= res.data.data.insertId
     console.log(insertedDataId)
    message('Section inserted successfully.','success')
    setTimeout(()=> {
    navigate(`/SectionEdit/${insertedDataId}`)
    },300);
      
    })
    .catch(() => {
      message('Network connection error.','error')
    })


}






  useEffect(() => {
    
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

                    <Input type="text" name="title" onChange={(e) => {handleSectionForms(e)}}>
                    </Input>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button onClick={()=>{
                           insertSection()
                        }} type="button" className="btn btn-success mr-2"  >Save & Continue
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

export default SectionDetails;