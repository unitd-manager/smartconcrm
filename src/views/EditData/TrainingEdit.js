import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom';
// import Swal from 'sweetalert2'
import random from 'random'
import moment from 'moment';
import * as $ from "jquery";
import Select from 'react-select';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss'
import AttachmentModalV2 from '../../components/tender/AttachmentModalV2';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import message from '../../components/Message';
import api from '../../constants/api';


const TrainingEdit = () => {


  const [lineItem] = useState(null);
  const [trainingDetails, setTrainingDetails] = useState()


  const { id } = useParams()
  const navigate = useNavigate()
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: ''
  });


  const [addLineItem, setAddLineItem] = useState([{
    "id": random.int(1, 99),
    "employee_name": "",
    "employee_id": "",
    "from_date": "",
    "to_date": ""
  },

  ])
  const onchangeItem = (str,itemId) =>{
    const element = addLineItem.find(el => el.id === itemId)
    element.employee_name = str.label
    element.employee_id = str.value.toString()
    setAddLineItem(addLineItem)
}
  const AddNewLineItem = () => {

    setAddLineItem([...addLineItem, {
      "id": random.int(1, 99),
      "employee_name": "",
      "employee_id": "",
      "from_date": "",
      "to_date": "",

    },

    ])
  }



  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment'
    })
    console.log('inside DataForAttachment');
  }


  const handleInputs = (e) => {
    setTrainingDetails({ ...trainingDetails, [e.target.name]: e.target.value });
  }

  const getLinkedEmployee = () =>{
    
    api.post('/training/getTrainingStaffById', { training_id: id })
    .then((res) => {
      const resData = res.data.data
      const empArray = []
      resData.forEach(element => {
        empArray.push({
          "id": random.int(1, 99),
          "employee_name":element.first_name,
          "employee_id":element.employee_id,
          "from_date": element.from_date.substring(0,10),
          "to_date": element.to_date.substring(0,10),
          "training_staff_id":element.training_staff_id
    
        })
      });
      setAddLineItem([...empArray])
     
    })
    .catch(() => {
      message("Fianance Data Not Found", 'info')
    })
  }
  const getTrainingeById = () => {
    api.post('/training/getTrainingById', { training_id: id })
      .then((res) => {
        setTrainingDetails(res.data.data[0])
        getLinkedEmployee()
      })
      .catch(() => {
        message("Fianance Data Not Found", 'info')
      })
  }


  const [employeeLinked, setEmployeeLinked] = useState();




  //Get employee name and id for linked employee select field
  const getEmployee = () => {
    api.get('/training/getEmployeeName', employeeLinked)
      .then((res) => {
        const items = res.data.data
        const finaldat = []
        items.forEach(item=>{
            finaldat.push({ value: item.employee_id, label: item.first_name})
        })
        setEmployeeLinked(finaldat)
      })
  }

  const insertTrainingStaff = (trainingId,staffObj) => {
       

    api.post('/training/edit-TabEmployeeLinked',{
      training_id: trainingId
    ,employee_id: staffObj.employee_id
    , staff_id:''
     , created_by: '1'
    ,  modified_by : '1'
    , from_date: staffObj.from_date
    , to_date:staffObj.to_date
    })
    .then(()=>{

        message('TrainingStaff Added!','success')
    }) 

  }

  const insertStaff = (inserId,formalArray) => {

    formalArray.forEach(pItems=>{
     if(pItems.item !== ''){
      if(pItems.employee_id !== ''){
        insertTrainingStaff(inserId,pItems)
      }
      
     }

    })
}
  //Insert Training
  const insertTrainingData = () => {
    const result = [];
    const oldArray = addLineItem
    $(".lineitem tbody tr").each(function() {
      const allValues = {}; 
      $(this).find("input").each(function() {
       
          const fieldName = $(this).attr("name");
         
          allValues[fieldName] = $(this).val();
          
      });
      result.push(allValues);
  })  
 
  result.forEach(obj=>{
    if(obj.id){
/* eslint-disable */

       // const objId = parseInt(obj.id)
       
        const foundObj = oldArray.find(el => el.id === parseInt(obj.id))
       console.log(foundObj)
     
        if(foundObj){
            obj.employee_id = foundObj.employee_id
        }
       
    }

  }) 

  console.log("trainingdetails",trainingDetails);
    api.post('/training/edit-Training', trainingDetails)
      .then((res) => {
       
        message('Record inserted successfully', 'success')
        insertStaff(res.data.data.insertId,result) 
      })
      .catch(() => {
        message('Unable to edit record.', 'error')
      })
  }

  useEffect(() => {
    getEmployee();
    getLinkedEmployee();
    getTrainingeById();
    // getTraining()
    // getFiles();
    console.log(lineItem)
  }, [id])
 


  return (
    <>
      <BreadCrumbs heading={trainingDetails && trainingDetails.title} />

      <Form >
        <FormGroup>


        <ComponentCardV2>
            <Row>
              <Col>
                  <Button
                    color="primary"
                    onClick={() => {
                      insertTrainingData();
                       navigate('/Training');
                    }}>Save</Button>
                  </Col>
                  <Col>              
                  <Button color="secondary" 
                  onClick={() => {
                    insertTrainingData();
                     }}>Apply</Button>
                  </Col>
                  <Col>         
                  <Button color="danger" 
                  onClick={() => {
                    navigate('/Training');
                    console.log("back to list");
                  }}>Back to List</Button>
              </Col>
            </Row>
          </ComponentCardV2>
          <ComponentCard title='Main Details'>
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Title </Label>
                  <Input type="text" onChange={handleInputs} value={trainingDetails && trainingDetails.title} name="title" />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> From Date </Label>
                  <Input type="date" onChange={handleInputs} value={moment(trainingDetails && trainingDetails.from_date).format('YYYY-MM-DD')} name="from_date" />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> To date </Label>
                  <Input type="date" onChange={handleInputs} value={moment(trainingDetails && trainingDetails.to_date).format('YYYY-MM-DD')} name="to_date" />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Trainer</Label>
                  <Input type="text" onChange={handleInputs} value={trainingDetails && trainingDetails.trainer} name="trainer" />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Description</Label>
                  <Input type="text" onChange={handleInputs} value={trainingDetails && trainingDetails.description} name="description" />
                </FormGroup>
              </Col>

            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>


      <Form >
        <FormGroup>

          <ComponentCard title='Training Company details'>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Training Company Name </Label>
                  <Input type="text" onChange={handleInputs} value={trainingDetails && trainingDetails.training_company_name} name="training_company_name" />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Training Company address</Label>
                  <Input type="text" onChange={handleInputs} value={trainingDetails && trainingDetails.training_company_address} name="training_company_address" />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Training Company email </Label>
                  <Input type="text" onChange={handleInputs} value={trainingDetails && trainingDetails.training_company_email} name="training_company_email" />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Training Company phone</Label>
                  <Input type="text" onChange={handleInputs} value={trainingDetails && trainingDetails.training_company_phone} name="training_company_phone" />
                </FormGroup>
              </Col>


            </Row>
          </ComponentCard>


        </FormGroup>
      </Form>



      <Form >
        <FormGroup>

          <ComponentCard title='Creation and modification'>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Created By</Label>
                  <span>{trainingDetails && trainingDetails.created_by}</span>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Modified By </Label>
                  <span>{trainingDetails && trainingDetails.modified_by}</span>
                </FormGroup>
              </Col>

            </Row>
          </ComponentCard>

        </FormGroup>
      </Form>

      <br />
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

            <AttachmentModalV2 moduleId={id} roomName='Training' altTagData='Training Data' desc='Training Desc' modelType={attachmentData.modelType} attachmentModal={attachmentModal} setAttachmentModal={setAttachmentModal} />
            <ViewFileComponentV2 moduleId={id} roomName='Training' />
          </ComponentCard>

      <ComponentCard>
        <ToastContainer></ToastContainer>
        <Row>
          <Col md="3">
            <Button color="primary"
              type='button'
              onClick={() => { AddNewLineItem() }}
            >Linked Employee</Button>

          </Col>
        </Row>
        <br />
        <Row>
          <table className='lineitem' >

            <thead>
              <tr>
                <th scope="col">Employee Name</th>
                <th scope="col">From Date</th>
                <th scope="col">To date</th>
              </tr>
            </thead>
            <tbody>

              {addLineItem.map((item) => {
                return (
                  <tr key={item.id}>

                    <td data-label="Employee Name">
              
                      <Select
                          key={item.id}
                          // isDisabled={true}
                          defaultValue={{value:item.employee_id,label:item.employee_name,training_staff_id:item.tra}}
                          onChange={(e)=>{
                              onchangeItem(e,item.id)
                          }}
                          options={employeeLinked}
                      />
                       <Input value={item.employee_id.toString()} type="hidden" name="employee_id"></Input>
                      </td>
                      <td data-label="From Date">
                      <Input type='date'
                          defaultValue={item.from_date}
                          name="from_date"
                          // disabled
                           />
                      </td>
                      <td data-label="To Date">
                      <Input type='date'
                          defaultValue={item.to_date}
                         name="to_date"
                        //  disabled
                           />
                      </td>
                  </tr>
                );
              })}


            </tbody>
          </table>

        </Row>
        <Row>
          <div className="pt-3 mt-3 d-flex align-items-center gap-2">
            <Button onClick={() => {
              insertTrainingData();
              //insertTrainingStaff();

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


    </>
  )
}
export default TrainingEdit;