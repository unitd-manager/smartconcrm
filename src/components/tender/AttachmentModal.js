import React, { useState } from 'react'
import { FormGroup,Button,Modal,ModalHeader,ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types'
import { FileUploader } from "react-drag-drop-files";




const AttachmentModal = ({attachmentModal,setAttachmentModal}) => {

    AttachmentModal.propTypes = {
        attachmentModal: PropTypes.bool,
        setAttachmentModal: PropTypes.func
      }
        const fileTypes = ["JPG", "PNG", "GIF"];

        const [file, setFile] = useState(null);

        const handleChange = (e) => {
            setFile(e);
            console.log(e)
        };

  return (

    
    <div>
        
        <Modal isOpen={attachmentModal} >
            <ModalHeader>Upload Media</ModalHeader>
            <ModalBody>
                <FormGroup>
                    {/* <Label htmlFor="exampleFile">Select Files</Label>
                    <Input type="file" placeholder="" /> */}

                    <FileUploader
                        multiple="true"
                        handleChange={handleChange}
                        name="file"
                        types={fileTypes}
                    />
                    <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p>
                    
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={()=>{setAttachmentModal(false)}}>Upload</Button>
            </ModalFooter>
        </Modal>
    </div>
  )
}

export default AttachmentModal