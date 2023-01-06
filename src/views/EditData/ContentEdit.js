import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom';
// import Swal from 'sweetalert2'
import moment from 'moment';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss'
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import AttachmentModalV2 from '../../components/tender/AttachmentModalV2';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import PictureAttachmentModalV2 from '../../components/tender/PictureAttachmentModalV2';
import message from '../../components/Message';
import api from '../../constants/api';


const ContentUpdate = () => {
  const [lineItem] = useState(null);
  const [contentDetails, setContentDetails] = useState()
  const [sectionLinked, setSectionLinked] = useState();
  const [categoryLinked, setCategoryLinked] = useState();
  const [subcategoryLinked, setSubCategoryLinked] = useState();
  const [description, setDescription] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: ''
  });
  const [pictureData, setDataForPicture] = useState({
    modelType: ''
  });


  const handleInputs = (e) => {
    setContentDetails({ ...contentDetails, [e.target.name]: e.target.value });
  }

  const handleDataEditor = (e, type) => {

    setContentDetails({ ...contentDetails, [type]: draftToHtml(convertToRaw(e.getCurrentContent())) });

  }
  const convertHtmlToDraft = (existingQuoteformal) =>{
   
        const contentBlock = htmlToDraft(existingQuoteformal && existingQuoteformal);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState = EditorState.createWithContent(contentState);
          setDescription(editorState)
        }
}
  //Content By id
  const getContentById = () => {
    
    api.post('/content/getContentById', {content_id:id})
      .then((res) => {
        setContentDetails(res.data.data)
        convertHtmlToDraft(res.data.data.description)
      })
      .catch(() => {
        message("Content Data Not Found", 'info')
      })
  }

  //Edit Content
  const editContentData = () => {
    api.post('/content/editContent', contentDetails)
      .then(() => {
        message('Record edited successfully', 'success')
      })
      .catch(() => {
        message('Unable to edit record.', 'error')
      })
  }

  //Section Select field

  const getsection = () => {
    api.get('/content/getSection', sectionLinked)
      .then((res) => {
        setSectionLinked(res.data.data);
      })
  }

  //Category Select field
  const getCategory = () => {
    api.get('/content/getCategory', categoryLinked)
      .then((res) => {
        setCategoryLinked(res.data.data);
      })
  }

  //sub category select field
 
  const getSubCategory = () => {
    api.get('/content/getSubCategory', subcategoryLinked)
      .then((res) => {
        setSubCategoryLinked(res.data.data);
      })
  }


  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment'
    })
    console.log('inside DataForAttachment');
  }

  
  const dataForPicture = () => {
    setDataForPicture({
      modelType: 'picture'
    });
    console.log('inside DataForPucture');
  }

  useEffect(() => {

    getsection();
    getCategory();
    getSubCategory();
    getContentById();
    console.log(lineItem)
  }, [id])


  return (
    <>

      <BreadCrumbs heading={contentDetails && contentDetails.content_id} />

      <Form >
        <FormGroup>
        <ComponentCardV2>
            <Row>
              <Col>
                  <Button
                    color="primary"
                    onClick={() => {
                      editContentData();
                      navigate('/Content');
                    }}
                  >
                    Save
                  </Button>
                  </Col>
                  <Col>              
                  <Button color="secondary" 
                  onClick={() => {
                    editContentData();
                    console.log("cancel process");
                  }
                  }>
                    Apply
                  </Button>
                  </Col>
                  <Col>         
                  <Button color="danger" 
                  onClick={() => {
                    navigate('/Content');
                    console.log("back to list");
                  }
                  }>
                    Back to List
                  </Button>
              </Col>
            </Row>
          </ComponentCardV2>

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
                  <Input type="select" name="section_id" value={contentDetails && contentDetails.section_id} onChange={handleInputs} >
                    <option value="" selected="selected" >Please Select</option>
                    {sectionLinked && sectionLinked.map((ele) => {
                      return <option value={ele.section_id} >{ele.section_title}</option>

                    })}
                  </Input>

                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Category</Label>
                  <Input type="select" name="category_id" value={contentDetails && contentDetails.category_id} onChange={handleInputs} >
                    <option value="" selected="selected" >Please Select</option>
                    {categoryLinked && categoryLinked.map((ele) => {
                      return <option value={ele.category_id} >{ele.category_title}</option>

                    })}
                  </Input>

                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Sub Category</Label>
                  <Input type="select" name="sub_category_id" value={contentDetails && contentDetails.sub_category_id} onChange={handleInputs} >
                    <option value="" selected="selected" >Please Select</option>
                    {subcategoryLinked && subcategoryLinked.map((ele) => {
                      return <option value={ele.sub_category_id} >{ele.sub_category_title}</option>

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
                  <br></br>
                  <Label > Yes </Label>
                  <Input name="show_title"  value="1" type="radio" defaultChecked={contentDetails && contentDetails.show_title===1 && true } onChange={handleInputs} />
                  
                  <Label > No </Label>
                  <Input name="show_title"  value="0" type="radio" defaultChecked={contentDetails && contentDetails.show_title===0 && true } onChange={handleInputs} />
                 

                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Published</Label>
                  <br></br>
                  <Label >Yes</Label>
                  <Input name="published" value="1" type="radio"  defaultChecked={contentDetails && contentDetails.published===1 && true } onChange={handleInputs} />

                  <Label >No</Label>
                  <Input name="published" value="0"  type="radio" defaultChecked={contentDetails && contentDetails.published=== 0 && true} 
                  onChange={handleInputs} />
                 

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
                  editorState={description}
                  wrapperClassName="demo-wrapper mb-0"
                  editorClassName="demo-editor border mb-4 edi-height"
                  onEditorStateChange={(e) => {
                    handleDataEditor(e, 'description')
                    setDescription(e)
                  }}
                />

              </ComponentCard>

            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>

      <Form >
        <FormGroup>

        <ComponentCard title="Picture">
            <Row>
              <Col xs="12" md="3" className='mb-3'>
                <Button color="primary" onClick={() => {
                  dataForPicture();
                  setAttachmentModal(true);
                }}>
                  Add
                </Button>
              </Col>
            </Row>
            <PictureAttachmentModalV2 moduleId={id} roomName='Content' altTagData='Content Data' desc='Content Data' modelType={pictureData.modelType} attachmentModal={attachmentModal} setAttachmentModal={setAttachmentModal} />
            <ViewFileComponentV2 moduleId={id} roomName='Content' />
          </ComponentCard>

        <ComponentCard title="Attachments">
            <Row>
              <Col xs="12" md="3" className='mb-3'>
                <Button color="primary" onClick={() => {
                  dataForAttachment();
                  setAttachmentModal(true);
                }}>
                  Add
                </Button>
              </Col>
            </Row>

            <AttachmentModalV2 moduleId={id} roomName='Content' altTagData='Content Data' desc='Content Data' modelType={attachmentData.modelType} attachmentModal={attachmentModal} setAttachmentModal={setAttachmentModal} />
            <ViewFileComponentV2 moduleId={id} roomName='Content' />
          </ComponentCard>
        </FormGroup>
      </Form>
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
          </ComponentCard>

      <br />


    </>
  )
}
export default ContentUpdate;