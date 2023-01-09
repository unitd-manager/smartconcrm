import React, { useEffect, useState } from 'react';
import {  Row,Col,Form,FormGroup,Label,Input,Button,TabPane,TabContent,Nav,NavItem,NavLink } from 'reactstrap';
import {  useNavigate,useParams } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Swal from 'sweetalert2'
import moment from 'moment';
import AttachmentModal from '../../components/tender/AttachmentModal';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import message from '../../components/Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss'
import api from '../../constants/api';


const SectionEdit = () => {

    const [activeTab, setActiveTab] = useState('1');
    
    const {id} = useParams();
    const navigate = useNavigate(); 

    const toggle = (tab) => {
      if (activeTab !== tab) setActiveTab(tab);
    };
    const [getFile, setGetFile] = React.useState(null);
    const [attachmentModal, setAttachmentModal] = useState(false);
    const [section, setSection] = useState({});
  
    const applyChanges = () => {

    }
   
    const backToList = () => {
      navigate("/Section");
      
    }
  

    const editSectionyId = () =>
    {
       api.post('/section/getSectionById',{section_id:id})
       .then((res)=> {
        console.log(res)
        setSection(res.data.data[0])
           
       })
      .catch(() => {
        message("Section Data Not Found",'info')
       })
    }
   
    const handleInputs = (e) => {
      setSection({...section, [e.target.name]:e.target.value});

   }
   


    
     const editSectionData = () =>
     {
       api.post('/section/editSection',section)
       .then(()=> {
         
         message('Record editted successfully','success')
        //  setTimeout(() => {
        //    window.location.reload()
        //  }, 300);
 
       })
         .catch(() => {
           message('Unable to edit record.','error')
         })
     }

      // get Files
      const getFiles = () => {
        api.post('/file/getFileList',{record_id:id})
        .then((res)=>{
          setGetFile(res.data.data);
        })
    }


    
    const deleteFile = (fileId) =>{
      Swal.fire({
        title: `Are you sure?`,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          api.post('/file/deleteFile',{media_id:fileId}).then((res)=>{
            console.log(res)
            Swal.fire(
              'Deleted!',
              'Media has been deleted.',
              'success'
            )
            window.location.reload();
          }).catch(()=>{
            message("Unable to Delete Media","info")
          })
        }
      })
    }

    const DeleteSection = () => {
      api.post('/section/deleteSection', {section_id: id} )
          .then(() => {
              message('Record editted successfully', 'success')
          })
          .catch(() => {
              message('Unable to edit record.', 'error')
          })
  }
  

     
     useEffect(()=>{
      
      getFiles();
      editSectionyId();
      
      
    },[id])
  
  
  
    return (
    <>
     <BreadCrumbs />
      <Form>
        <FormGroup>
          <ComponentCardV2>
            <Row>
              
              <Col>
                  <Button
                    color="primary"
                    onClick={() => {
                      editSectionData();
                      navigate('/Section');
                    }}
                  >
                    Save
                  </Button>
                  </Col>
                  <Col>              
                  <Button color="primary" 
                  onClick={() => {
                    editSectionData();
                    applyChanges();
                    console.log("cancel process");
                  }
                  }>
                    Apply
                  </Button>
                  </Col>
                  <Col>         
                  <Button color="danger" 
                  onClick={() => {
                    if (window.confirm("Are you sure you want to cancel  \n  \n You will lose any changes made")) {
                        navigate("/Section");
                      } else {
                        applyChanges();
                      }
                  }
                  }>
                    Cancel
                  </Button>
              </Col>
              <Col>         
                  <Button color="danger" 
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this record? You cannot undo this action!")) {
                      DeleteSection();
                        navigate("/Section")
                      } else {
                        applyChanges();
                      }
                    console.log("back to list");
                  }
                  }>
                    Delete
                  </Button>
                  </Col>
                  <Col>         
                  <Button color="danger" 
                  onClick={() => {
                    backToList();
                    console.log("back to list");
                  }
                  }>
                    Back to List
                  </Button>
              </Col>
            </Row>
            </ComponentCardV2>
            </FormGroup>
            </Form>
    {/* <BreadCrumbs heading={section && section.section_id} /> */}

        <Form >
          <FormGroup>
          <ComponentCard >
          <Row>
    <Col md="3" className='mb-4 d-flex justify-content-between'>
      <h3>Section Details</h3> 
    </Col>
</Row>

          
         <Row>
              <Col md="3">
                  <FormGroup>
                  <Label>Title</Label>
                  <Input  type="text" onChange={handleInputs} value={section && section.title} name="title" />
                  </FormGroup>
              </Col>
              <Col md="3">
                        <Label>Section Type</Label>
                        <Input type="select" onChange={handleInputs} value={section && section.section_type}name="section_type">
                        <option value="" selected="selected">Please Select</option>
                        <option value="Get Started">Get Started</option>
                        <option value="Lead">Lead</option>
                        <option value="Opportunity">Opportunity</option>
                        <option value="Project">Project</option>
                        <option value="Company">Company</option>
                        <option value="Contact">Contact</option>
                        <option value="Help">Help</option>
                        </Input>
                    </Col>
                <Col md="3">
                        <Label>Button Position</Label>
                        <Input type="select" onChange={handleInputs} value={section && section.button_position}name="button_position">
                        <option value="" selected="selected">Please Select</option>
                        <option value="Top">Top</option>
                       
                        </Input>
                    </Col>
                </Row>
                 <Row>
                <Col md="3">
                        <Label>Published</Label>
                            <FormGroup >
                            <Input type='radio' name='published' value="1" onChange={handleInputs} 
                            checked={section && section.published === 1 && true} ></Input>
                            <Label>Yes</Label>
                            <br></br>
                            <Input type='radio' name='published' value="0" onChange={handleInputs} 
                            checked={section && section.published === 0 && false} ></Input>
                            <Label >No</Label>
                            </FormGroup>
                        </Col>
                        </Row>
                    </ComponentCard>
                </FormGroup>
            </Form>

     
    <ComponentCard>
          <TabPane >

<Row>
    <Col md="3" className='mb-4 d-flex justify-content-between'>
      <h3>Creation & Modification </h3> 
    </Col>
</Row>

<Form>
<Col md="2">
                <FormGroup>
                <Label>Created By</Label>
                <br/>
                <span>{section &&  moment(section.creation_date).format('YYYY-MM-DD')}</span>
                </FormGroup>
            </Col>
            <Col md="2">
                <FormGroup>
                <Label>Modificated By</Label>
                <br/>
                <span>{section && moment(section.modification_date).format('YYYY-MM-DD')}</span>
                </FormGroup>
            </Col>
  
</Form>
</TabPane></ComponentCard>


      
   <ComponentCard>
   <ToastContainer></ToastContainer>

   <Nav tabs>
            <NavItem>
              <NavLink
                className={activeTab === '1' ? 'active' : ''}
                onClick={() => {
                  toggle('1');
                }}
              >
               Banner
              </NavLink>
            </NavItem>
           
            </Nav>

            <TabContent className="p-4" activeTab={activeTab}>
            <TabPane tabId="1">
        

            <Row>
                <Col xs="12" md="3" className='mb-3'>
                    <Button color="primary" onClick={()=>{setAttachmentModal(true)}}>
                        Add
                    </Button>
                </Col>
                </Row>

               <AttachmentModal opportunityId={id} attachmentModal={attachmentModal} setAttachmentModal={setAttachmentModal} />
               <table>
               {getFile ? getFile.map(res=>{
                        return (
                          <>
                          
                            <tr>
                              <th> <p><a href={`http://43.228.126.245/smartco-api/storage/uploads/${res.file_name}`} target="_blank" rel="noreferrer">{res.file_name}</a> </p></th>
                              <th width="5%"></th>
                              <th> <button type="button" className="btn btn-secondary" onClick={()=>{deleteFile(res.media_id)}}> X </button></th>
                            </tr>
                          
                        </>
                        )
                    }) : (<p>no files uploaded yet</p>)}
             </table>
          </TabPane>


 </TabContent>
   </ComponentCard>
            </> 
  )

    };
export default SectionEdit;