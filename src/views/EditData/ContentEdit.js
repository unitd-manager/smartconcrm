import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify'
import { useNavigate,useParams} from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
// import Swal from 'sweetalert2'
import moment from 'moment';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss'
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';


const ContentEdit = () => {

  const [contentDetails, setContentDetails] = useState()
  const [sectionLinked, setSectionLinked] = useState();
  const [categoryLinked, setCategoryLinked] = useState();
  const [subcategoryLinked, setSubCategoryLinked] = useState();
  const [conditions, setConditions] = useState('')
  const { title } = useParams()
  const navigate = useNavigate()




  const handleInputs = (e) => {
    setContentDetails({ ...contentDetails, [e.target.name]: e.target.value });
  }

  
  const handleDataEditor = (e, type) => {

    setContentDetails({ ...contentDetails, [type]: draftToHtml(convertToRaw(e.getCurrentContent())) });

  }

  //Insert Content
  const insertContentData = () => {
    api.post('/content/insertContent', contentDetails)
      .then(() => {
        message('Record inserted successfully', 'success')
      })
      .catch(() => {
        message('Unable to edit record.', 'error')
      })
  }

  //Section select field
  const getsection = () => {
    api.get('/content/getSection', sectionLinked)
      .then((res) => {
        setSectionLinked(res.data.data);
        console.log(res.data.data);
      })
  }

  //Category Select field
  const getCategory = () => {
    api.get('/content/getCategory', categoryLinked)
      .then((res) => {
        setCategoryLinked(res.data.data);
        console.log(res.data.data);
      })
  }

  //Sub Category Select field
  const getSubCategory = () => {
    api.get('/content/getSubCategory', subcategoryLinked)
      .then((res) => {
        setSubCategoryLinked(res.data.data);
        console.log(res.data.data);
      })
  }
  useEffect(() => {

    getsection();
    getCategory();
    getSubCategory();
    setContentDetails({title });
  }, [title])


  return (
    <>

      <BreadCrumbs heading={contentDetails && contentDetails.content_id} />

      <Form >
        <FormGroup>

          <ComponentCard title='Content details'>
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Title </Label>
                  <Input type="text" onChange={handleInputs} value={contentDetails && contentDetails.title} name="title" />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Section</Label>
                  <Input type="select" name="section_id" value={contentDetails && contentDetails.section_type} onChange={handleInputs} >
                    <option value="" selected="selected" >Please Select</option>
                    {sectionLinked && sectionLinked.map((ele) => {
                      return <option value={ele.section_id} >{ele.section_type}</option>

                    })}
                  </Input>

                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Category</Label>
                  <Input type="select" name="category_id" value={contentDetails && contentDetails.category_type} onChange={handleInputs} >
                    <option value="" selected="selected" >Please Select</option>
                    {categoryLinked && categoryLinked.map((ele) => {
                      return <option value={ele.category_id} >{ele.category_type}</option>

                    })}
                  </Input>

                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Sub Category</Label>
                  <Input type="select" name="sub_category_id" value={contentDetails && contentDetails.sub_category_type} onChange={handleInputs} >
                    <option value="" selected="selected" >Please Select</option>
                    {subcategoryLinked && subcategoryLinked.map((ele) => {
                      return <option value={ele.sub_category_id} >{ele.sub_category_type}</option>

                    })}
                  </Input>

                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Content Type</Label>
                  <Input type="text" onChange={handleInputs} value={contentDetails && contentDetails.content_type} name="content_type" />
                </FormGroup>
              </Col>


            </Row>
          </ComponentCard>

          <ComponentCard title='Content details'>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label> Show Title</Label>

                  <Input name="show_title" type="radio" value="1" onChange={handleInputs} />
                  <Label check> Yes </Label>

                  <Input name="show_title" type="radio" value="0" onChange={handleInputs} />
                  <Label check> No </Label>

                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Published</Label>

                  <Input name="published" type="radio" value="1" onChange={handleInputs} />
                  <Label check>Yes</Label>

                  <Input name="published_test" type="radio" value="0" onChange={handleInputs} />
                  <Label check>No</Label>


                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Content Date</Label>
                  <Input type="date" onChange={handleInputs} value={moment(contentDetails && contentDetails.content_date).format('YYYY-MM-DD')} name="content_date" />
                </FormGroup>
              </Col>

              <ComponentCard title='Description'>

                <Editor
                  editorState={conditions}
                  wrapperClassName="demo-wrapper mb-0"
                  editorClassName="demo-editor border mb-4 edi-height"
                  onEditorStateChange={(e) => {
                    handleDataEditor(e, 'description')
                    setConditions(e)
                  }}
                />

              </ComponentCard>

            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>



      <Form >
        <FormGroup>

          <ComponentCard title='Creation & modification'>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Created By</Label>
                  <span>{contentDetails && contentDetails.created_by}</span>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Modified By </Label>
                  <span>{contentDetails && contentDetails.modified_by}</span>
                </FormGroup>
              </Col>

            </Row>
            <Row>
              <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                <Button onClick={() => {
                  insertContentData();
                }} type="button" className="btn btn-success mr-2">
                  Save & Continue
                </Button>
                <Button onClick={() => {
                  navigate(-1)
                }} type="button" className="btn btn-dark">
                  Go to List
                </Button>
              </div>
            </Row>
          </ComponentCard>

        </FormGroup>
      </Form>

      <br />


    </>
  )
}
export default ContentEdit;