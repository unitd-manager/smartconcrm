import React,{useState} from 'react'
import { FormGroup,Button,Modal,ModalHeader,ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types'
import { FileUploader } from "react-drag-drop-files";
import api from '../../constants/api';
import message from '../Message';

const AttachmentModalJob = ({attachmentModal,setAttachmentModal,jobid}) => {

    AttachmentModalJob.propTypes = {
        attachmentModal: PropTypes.bool,
        setAttachmentModal: PropTypes.func,
        jobid:PropTypes.string
      }
      
            const fileTypes = ["JPG", "PNG", "GIF", "PDF"];
    
            const [file, setFile] = useState([]);
            const [ handleValue, setHandleValue ] = useState()
           
            const handleChange = (fiels) => {
              
                const arrayOfObj = Object.entries(fiels).map((e) => ( e[1]  ));
    
                setFile(fiels);
                setHandleValue(arrayOfObj);
                console.log(fiels)
            };
    
    
            const uploadFile = () =>{
                
                if(file){
    
                   // getFiles();
                
              
                    const data = new FormData() 
                    const arrayOfObj = Object.entries(file).map((e) => (  e[1] ));
    
                    arrayOfObj.forEach((ele) => {
                        console.log(ele)
                        data.append(`files`, ele);
                      });
                    //data.append('file', file)
                    data.append('record_id', jobid) //opportunity_id
                    data.append('room_name', 'jobinformation')
                    data.append('alt_tag_data', 'Image for jobinformation')
                    data.append('description', 'Image for jobinformation')
    
                    api.post('/file/uploadFiles',data).then(()=>{
    
                        setAttachmentModal(false)
                        message('Files Uploaded Successfully','success')
                        
                        setTimeout(() => {
                            window.location.reload()
                        }, 400);
                    }).catch(()=>{
                        setAttachmentModal(false)
                        message('Unable to upload File','error')
                        // setTimeout(() => {
                        //     window.location.reload()
                        // }, 400);
                    })
                }else{
                    message('No files selected','info')
                }
            }
            
      return (
    
        
        <div>
            
            <Modal isOpen={attachmentModal} >
                <ModalHeader>Upload Media</ModalHeader>
                <ModalBody>
                    <FormGroup>
                      
                        <FileUploader
                            multiple
                            handleChange={handleChange}
                            name="file"
                            types={fileTypes}
                        />
    
                        {handleValue ? (
                            handleValue.map((e) => (
                            <div>
                                <span> Name: {e.name} </span>
                            </div>
                            ))
                        ) : (
                            <span>No file selected</span>
                        )}
    
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=>{
                        uploadFile()
                    }}>Upload</Button>
                    <Button color="secondary" onClick={()=>{ setAttachmentModal(false) }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
      )
    }
    
    
        const fileTypes = ["JPG", "PNG", "GIF", "PDF"];

        const [file, setFile] = useState([]);
        const [ handleValue, setHandleValue ] = useState()
       
        const handleChange = (fiels) => {
          
            const arrayOfObj = Object.entries(fiels).map((e) => ( e[1]  ));

            setFile(fiels);
            setHandleValue(arrayOfObj);
            console.log(fiels)
        };


        const uploadFile = () =>{
            
            if(file){

               // getFiles();
            
          
                const data = new FormData() 
                const arrayOfObj = Object.entries(file).map((e) => (  e[1] ));

                arrayOfObj.forEach((ele) => {
                    console.log(ele)
                    data.append(`files`, ele);
                  });
                //data.append('file', file)
                data.append('record_id', jobid) //opportunity_id
                data.append('room_name', 'job')
                data.append('alt_tag_data', 'Image for Job')
                data.append('description', 'Image for Job')

                api.post('/file/uploadFiles',data).then(()=>{

                    setAttachmentModal(false)
                    message('Files Uploaded Successfully','success')
                    
                    setTimeout(() => {
                        window.location.reload()
                    }, 400);
                }).catch(()=>{
                    setAttachmentModal(false)
                    message('Unable to upload File','error')
                    // setTimeout(() => {
                    //     window.location.reload()
                    // }, 400);
                })
            }else{
                message('No files selected','info')
            }
        }
        
 

export default AttachmentModalJob