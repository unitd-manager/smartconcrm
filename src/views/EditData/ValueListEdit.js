import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import message from '../../components/Message';
import api from '../../constants/api';

const ValueListEdit = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const applyChanges = () => {

    }
    const backToList = () => {
        navigate("/ValueList");

    }

    const [valuelisteditdetails, setValueListEDitDetails] = useState()

    const getValueListById = () => {
        api.post('/valuelist/getValueListById', { valuelist_id: id })
            .then((res) => {
                setValueListEDitDetails(res.data.data[0])
                console.log(res.data.data[0])
            })
            .catch(() => {
                message("Staff Data Not Found", 'info')
            })
    }

    const [valuelistname, setValueListName] = useState();
    const getValueListName = () => {
        api.get('/valuelist/getValueList')
            .then((res) => {
                setValueListName(res.data.data);
                console.log(res.data.data);
            })
    }

    const handleInputs = (e) => {
        setValueListEDitDetails({ ...valuelisteditdetails, [e.target.name]: e.target.value });
    }

    const editValueListData = () => {
        api.post('/valuelist/editValueList', valuelisteditdetails)
            .then(() => {
                message('Record editted successfully', 'success')
            })
            .catch(() => {
                message('Unable to edit record.', 'error')
            })
    }

    const deleteValueListData = () => {
        api.post('/valuelist/deleteValueList', { valuelist_id: id })
            .then(() => {
                message('Record editted successfully', 'success')
            })
            .catch(() => {
                message('Unable to edit record.', 'error')
            })
    }

    useEffect(() => {
        getValueListName();
        getValueListById();
    }, [id])


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
                                        editValueListData();
                                        navigate(`/ValueList`);
                                    }}
                                >
                                    Save
                                </Button>
                            </Col>
                            <Col>
                                <Button color="primary"
                                    onClick={() => {
                                        editValueListData();
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
                                            navigate(`/ValueList`);
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
                                            deleteValueListData();
                                            navigate(`/ValueList`)
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

            <BreadCrumbs />
            <Form >
                <FormGroup>
                    <ComponentCard title={`Valuelist Details| Code: ${valuelisteditdetails && valuelisteditdetails.valuelist_id}`}>
                        <Row>
                            <Col md="3">
                                <FormGroup>
                                    <Label>Value List Name</Label>
                                    <Input type="select"
                                        onChange={handleInputs}
                                        value={valuelisteditdetails && valuelisteditdetails.key_text}
                                        name="key_text"
                                    >
                                        <option value="" selected >Please Select</option>
                                        {valuelistname && valuelistname.map((ele) => {
                                            return <option value={ele.key_text} >{ele.key_text}</option>
                                        })}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md="3">
                                <FormGroup>
                                    <Label>Value</Label>
                                    <Input type="textarea"
                                        onChange={handleInputs}
                                        value={valuelisteditdetails && valuelisteditdetails.value}
                                        name="value" />
                                </FormGroup>
                            </Col>
                            <Col md="3">
                                <FormGroup>
                                    <Label>Code</Label>
                                    <Input type="text"
                                        onChange={handleInputs}
                                        value={valuelisteditdetails && valuelisteditdetails.code}
                                        name="code" />
                                </FormGroup>
                            </Col>
                        </Row>
                    </ComponentCard>
                </FormGroup>
            </Form>

            <Form >
                <FormGroup>
                    <ComponentCard title={`Creation & Modification | Code: ${valuelisteditdetails && valuelisteditdetails.valuelist_id}`}>
                        <Row>
                            <Col md="3">
                                <FormGroup>
                                    <Label>Creation</Label><br />
                                    <span>{valuelisteditdetails && moment(valuelisteditdetails.creation_date).format('YYYY-MM-DD')} </span>
                                </FormGroup>
                            </Col>
                            <Col md="3">
                                <FormGroup>
                                    <Label>Modification</Label><br />
                                    <span>{valuelisteditdetails && moment(valuelisteditdetails.modification_date).format('YYYY-MM-DD')} </span>
                                </FormGroup>
                            </Col>
                        </Row>
                    </ComponentCard>
                </FormGroup>
            </Form>
        </>
    )
};

export default ValueListEdit;