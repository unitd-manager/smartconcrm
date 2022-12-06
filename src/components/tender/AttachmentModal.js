import React from 'react'
import { FormGroup,Button,Modal,ModalHeader,ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types'
import { FileUploader } from "react-drag-drop-files";
import api from '../../constants/api';
import message from '../Message';

const AttachmentModal = ({attachmentModal,setAttachmentModal,opportunityId}) => {

    AttachmentModal.propTypes = {
        attachmentModal: PropTypes.bool,
        setAttachmentModal: PropTypes.func,
        opportunityId:PropTypes.string
      }
        const fileTypes = ["JPG", "PNG", "GIF", "PDF"];

        const [file, setFile] = React.useState(null);
       

        const handleChange = (fiels) => {
            // setFile(e);
            //console.log(fiels)
            // const arrayOfObj = Object.entries(fiels).map((e) => ( e[1]  ));
            // console.log(arrayOfObj)
            setFile(fiels);

        };


        const uploadFile = () =>{
            if(file){
               // getFiles();
                const data = new FormData() 
                data.append('file', file)
                data.append('record_id', opportunityId) //opportunity_id
                data.append('room_name', 'opportunity')
                data.append('alt_tag_data', 'Image for Opportunity')
                data.append('description', 'Image for Opportunity')
                api.post('/file/uploadFile',data,{'Content-Type':'multipart/form-data'}).then(()=>{

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
                    {/* <Label htmlFor="exampleFile">Select Files</Label>
                    <Input type="file" placeholder="" /> */}

                    <FileUploader
                        multiple={false}
                        handleChange={handleChange}
                        name="file"
                        types={fileTypes}
                    />

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

export default AttachmentModal