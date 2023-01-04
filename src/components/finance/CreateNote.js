import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Row, Col, Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import PropTypes from 'prop-types'
import api from '../../constants/api';



const CreateNote = ({ editCreateNote, setEditCreateNote}) => {

  CreateNote.propTypes = {
    editCreateNote: PropTypes.bool,
    setEditCreateNote: PropTypes.func,
  
  }

  const [createInvoice, setCreateInvoice] = useState(null);

  //edit Tab Costing Summary Form


  const handleInserts = (e) => {
    setCreateInvoice({ ...createInvoice, [e.target.name]: e.target.value });
  }

  const insertInvoice = () => {


    api.post('/finance/insertInvoice', createInvoice)
      .then(() => {
        console.log('Invoice inserted successfully.')
        console.log('createInvoice', createInvoice)
        window.location.reload()
      })
      .catch(() => {
        console.log('Network connection error.')
      })
  }




  return (
    <>
      <Modal size="lg" isOpen={editCreateNote}>
        <ModalHeader>Credit Note
          <Button color="secondary" onClick={() => { setEditCreateNote(false) }}>
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col md="12">
              <Card>
                <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
                  Create Receipt
                </CardTitle>
                <CardBody>
                  <Form>

                    <Row>

                      <Col md="4">
                        <FormGroup>
                          <Label>Title</Label>
                          <Input type="text"
                            onChange={handleInserts} defaultValue={createInvoice && createInvoice.no_of_worker_used}
                            name="no_of_worker_used" />
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <Label>Description</Label>
                          <Input type="text"
                            onChange={handleInserts} defaultValue={createInvoice && createInvoice.no_of_days_worked}
                            name="no_of_days_worked" />
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <Label>Credit Amount</Label>
                          <Input type="number"
                            onChange={handleInserts} defaultValue={createInvoice && createInvoice.labour_rates_per_day}
                            name="labour_rates_per_day" />
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
          <Button color="primary" type='button' onClick={() => {
                            insertInvoice();
                          }} >Submit</Button>
          <Button color="secondary">Cancel</Button>
        </ModalFooter>
      </Modal>

    </>
  )
}

export default CreateNote