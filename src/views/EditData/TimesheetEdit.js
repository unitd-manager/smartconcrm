import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';

const TimesheetEdit = () => {
  const [timesheetDetails, setPurchaseOrderDetails] = useState();
  const { id } = useParams();

  const handleInputs = (e) => {
    setPurchaseOrderDetails({ ...timesheetDetails, [e.target.name]: e.target.value });
  };

  const editPurchaseOrderById = () => {
    api
      .post('/timesheet/getTimeSheetByAttendanceId', { attendance_id: id })
      .then((res) => {
        setPurchaseOrderDetails(res.data.data[0]);
        console.log(res.data.data[0]);
      })
      .catch(() => {
        message('Purchase Order Data Not Found', 'info');
      });
  };

  useEffect(() => {
    editPurchaseOrderById();
  }, [id]);
  

  return (
    <>
      <BreadCrumbs heading={timesheetDetails && timesheetDetails.staff_id} />

      <Form>
        <FormGroup>
          <ComponentCard
            title="`Details"
          >
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Staff</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={timesheetDetails && timesheetDetails.staff_name}
                    name="staff_name"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={timesheetDetails && moment(timesheetDetails.creation_date).format('YYYY-MM-DD')}
                    name="creation_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>On Leave</Label>
                </FormGroup>
              </Col>
              <Col md="1">
                <FormGroup>
                  <input type="radio"  name="on_leave" onChange={handleInputs} value={timesheetDetails && timesheetDetails.on_leave}/>Yes
                </FormGroup>
              </Col>
              <Col md="1">
                <FormGroup>
                  <input type="radio"  name="on_leave" onChange={handleInputs} value={timesheetDetails && timesheetDetails.on_leave}/>No
                </FormGroup>
              </Col>                            
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Type Of Leave</Label>
                  <Input
                    value={timesheetDetails && timesheetDetails.type_of_leave}
                    type="select"
                    onChange={handleInputs}
                    name="type_of_leave"
                  >
                    <option value="">Please Select</option>
                    <option value="earning leave">Earning Leave</option>
                    <option value="sick leave">Sick Leave</option>
                    <option value="loss of pay">Loss of Pay</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Latitude</Label>
                  <Input
                    value={timesheetDetails && timesheetDetails.latitude}
                    type="text"
                    onChange={handleInputs}
                    name="latitude"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Longitude</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={timesheetDetails && timesheetDetails.longitude}
                    name="longitude"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Notes</Label>
                  <Input
                    type="textarea"
                    value={timesheetDetails && timesheetDetails.notes}
                    onChange={handleInputs}
                    name="notes"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Time in (HH:MM)</Label>
                  <Input
                    type="textarea"
                    value={timesheetDetails && timesheetDetails.time_in}
                    onChange={handleInputs}
                    name="time_in"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Time out (HH:MM)</Label>
                  <Input
                    type="textarea"
                    value={timesheetDetails && timesheetDetails.leave_time}
                    onChange={handleInputs}
                    name="leave_time"
                  />
                </FormGroup>
              </Col>              
              <Col md="3">
                <FormGroup>
                  <Label>Description</Label>
                  <Input
                    type="textarea"
                    value={timesheetDetails && timesheetDetails.description}
                    onChange={handleInputs}
                    name="description"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Created By</Label>
                  <Input
                    type="text"
                    value={timesheetDetails && timesheetDetails.created_by}
                    onChange={handleInputs}
                    name="created_by"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Modified By</Label>
                  <Input
                    type="text"
                    value={timesheetDetails && timesheetDetails.modified_by}
                    onChange={handleInputs}
                    name="modified_by"
                  />
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
    </>
  );
};

export default TimesheetEdit;
