import React,{useState,useEffect} from 'react'
import { Row,Col,FormGroup,Input,Button,Modal,ModalHeader,ModalBody, ModalFooter,Label,Card, CardBody, Form } from 'reactstrap';
import PropTypes from 'prop-types'
import api from '../../constants/api';

const EditMaterialused = ({editMaterialsUsed,setEditMaterialsUsed,FetchMaterialsUsed}) => {

    EditMaterialused.propTypes = {
        editMaterialsUsed: PropTypes.bool,
        setEditMaterialsUsed: PropTypes.func,
        FetchMaterialsUsed: PropTypes.object
      }

      const [editMaterialsUsedData, setEditMaterialsUsedData] = useState(null);


      const handleEditMaterialsUsedInputs = (e) => {
        setEditMaterialsUsedData({...editMaterialsUsedData, [e.target.name]:e.target.value});
      }
  
      const EditMaterialusedData = () => {

        api.post('/projecttabmaterialusedportal/editTabMaterialUsedPortal',editMaterialsUsedData)
        .then((res)=> {
            console.log(res)
            setEditMaterialsUsedData(false);
            window.location.reload()
       })
     }

    useEffect(() => {

        setEditMaterialsUsedData(FetchMaterialsUsed);

    }, [FetchMaterialsUsed])
    
  return (
    <div>  
        
<Modal isOpen={editMaterialsUsed} >
    <ModalHeader>Edit Material Used</ModalHeader>
    <ModalBody>
      <Row>
      <Col md="12">
        <Card>
          <CardBody>
            <Form>
              <Row>
              <Col md="12">
                <FormGroup>
                  <Label>Date</Label>
                  <Input type="date" name="date" 
                  defaultValue={editMaterialsUsedData && editMaterialsUsedData.date}
                  onChange={handleEditMaterialsUsedInputs}
                  />
                    
                </FormGroup>
              </Col>
                <Col md="12">
                  <FormGroup>
                    <Label>Description</Label>
                    <Input type="text" name="description" 
                    defaultValue={editMaterialsUsedData && editMaterialsUsedData.description}
                    onChange={handleEditMaterialsUsedInputs}
                    />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label>Type</Label>
                    <Input type="text" name="type" 
                    // defaultValue={editMaterialsUsedData && editMaterialsUsedData.description}
                    onChange={handleEditMaterialsUsedInputs}
                    />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label>Stock</Label>
                    <Input type="text" name="stock" 
                    // defaultValue={editMaterialsUsedData && editMaterialsUsedData.description}
                    onChange={handleEditMaterialsUsedInputs}
                    />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label>UoM</Label>
                    <Input type="text" name="UoM" 
                    defaultValue={editMaterialsUsedData && editMaterialsUsedData.unit}
                    onChange={handleEditMaterialsUsedInputs}
                    />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label>Quantity</Label>
                    <Input type="number" name="quantity" 
                    defaultValue={editMaterialsUsedData && editMaterialsUsedData.quantity} 
                    onChange={handleEditMaterialsUsedInputs}
                    />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label>Remarks</Label>
                    <Input type="number" name="remarks" 
                    // defaultValue={editMaterialsUsedData && editMaterialsUsedData.title}
                    onChange={handleEditMaterialsUsedInputs}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
      </Row>  
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={()=>{EditMaterialusedData()}}> Submit </Button>
      <Button color="secondary" onClick={()=>{setEditMaterialsUsed(false)}}> Cancel </Button>
    </ModalFooter>
  </Modal></div>
  )
}

export default EditMaterialused