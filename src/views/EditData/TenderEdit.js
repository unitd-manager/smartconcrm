import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle,Row,Col,Form,FormGroup,Label,Input,TabContent,TabPane,Nav, NavItem,NavLink,Button,Modal,ModalHeader,ModalBody, ModalFooter, } from 'reactstrap';
import {ToastContainer} from 'react-toastify'
import {  Link, useParams } from 'react-router-dom';
import * as Icon from 'react-feather';
import Swal from 'sweetalert2'
import pdfMake from "pdfmake"
import pdfFonts from 'pdfmake/build/vfs_fonts';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';

const TenderEdit = () => {

    const [activeTab, setActiveTab] = useState('1');
    const [costingsummary,setCostingSummary] = useState(null);
    const [quote,setQuote] = useState(null);
    const [lineItem, setLineItem] = useState(null);
    const [tenderDetails, setTenderDetails] = useState()

    const toggle = (tab) => {
      if (activeTab !== tab) setActiveTab(tab);
    };
    
    const [editCostingSummaryModel, setEditCostingSummaryModel] = useState(false);
    const [quotationsModal, setquotationsModal] = useState(false);
    const [attachmentModal, setAttachmentModal] = useState(false);
    const [viewLineModal, setViewLineModal] = useState(false);
    const [addContactModal, setAddContactModal] = useState(false);
    const [addCompanyModal, setAddCompanyModal] = useState(false);
    const [editCostingSummaryData, seteditCostingSummaryData] = useState(null);

   
    const [contact, setContact] = useState();
    const [company, setCompany] = useState();
    const [incharge, setIncharge] = useState();
    const [selectedCompany, setSelectedCompany] = useState()
    const {id} = useParams()

    const editCostingSummaryToggle = () => {
      setEditCostingSummaryModel(!editCostingSummaryModel);
      };
      const quotationstoggle = () => {
        setquotationsModal(!quotationsModal);
      };
    const attachmentToggle = () => {
      setAttachmentModal(!attachmentModal);
      };
    const viewLineToggle = () => {
      setViewLineModal(!viewLineModal);
      };
    const addContactToggle = () => {
      setAddContactModal(!addContactModal);
    };
    const addCompanyToggle = () => {
      setAddCompanyModal(!addCompanyModal);
    };

    // Get Costing Summary Data
    const getCostingbySummary = () =>
    {
      api.post('/tender/getCostingSummaryById',{opportunity_id:id})
      .then((res)=> {
          setCostingSummary(res.data.data)
          seteditCostingSummaryData(res.data.data)
          console.log('costing summary',res.data.data)
      }).catch(()=>{
        message("Costing Summary not found","info")
      })
    }

    // Get Company Data
     const getCompany = () =>{
      api.get('/company/getCompany')
      .then((res)=> {
        setCompany(res.data.data)
      }).catch(()=>{
        message("Company not found","error")
      })
    }

    // Get Quote By Id
     const getQuote = () =>
     {
        api.post('/tender/getQuoteById',{opportunity_id:id})
        .then((res)=> {
          setQuote(res.data.data[0])
          //console.log(res)  
        }).catch(() => {
          message("Quote not found","error")
        })
     }


     //Logic for adding company in db

      const [companyInsertData, setCompanyInsertData] = useState({
        company_name:"",
        address_street:"",
        address_town:"",
        address_country:"",
        address_po_code:"",
        phone:"",
        fax:"",
        website:"",
        supplier_type:"",
        industry:"",
        company_size:"",
        source:""
        
      });

      const companyhandleInputs = (e) => {
        setCompanyInsertData({...companyInsertData, [e.target.name]:e.target.value});
      }

      // Insert Company
     const insertCompany = () => {

        if(companyInsertData.company_name !== '' && 
        companyInsertData.phone !== '' && 
        companyInsertData.address_country !== ''){
          api.post('/company/insertCompany',companyInsertData)
          .then(()=> {
          message('Company inserted successfully.','success')
            toggle()
            getCompany()
          })
          .catch(() => {
            message('Network connection error.','error')
          })
        }else{
          message('Please fill all required fields.','error')
        }
        
      }

     const getContact = (companyId) =>{
        setSelectedCompany(companyId)
        api.post('/company/getContactByCompanyId',{company_id:companyId})
        .then((res)=> {
          setContact(res.data.data)
        })
        .catch(() => {
          setContact([])
          message('No contacts found','info')
        })
      }

      // Get Incharge
    const getIncharge = () =>{
      api.get('/tender/projectIncharge')
      .then((res)=> {
         setIncharge(res.data.data)
      })
      .catch(() => {
        message('No Incharge found','info')
      })
    }
    
    // Get Tenders By Id

     const editTenderById = () =>
     {
        api.post('/tender/getTendersById',{opportunity_id:id})
        .then((res)=> {
            setTenderDetails(res.data.data)
            getContact(res.data.data.company_id)
        })
       .catch(() => {
         message("Tender Data Not Found",'error')
        })
     }
    
     const handleInputs = (e) => {
      setTenderDetails({...tenderDetails, [e.target.name]:e.target.value});
    }
    
    //Logic for edit data in db
    
    const editTenderData = () =>
    {
      api.post('/tender/edit-Tenders',tenderDetails)
      .then(()=> {
        
        message('Record editted successfully','success')

      })
        .catch(() => {
          message('Unable to edit record.','error')
        })
    }

    // edit Tab Costing Summary Form


    const handleCostingSummeryInputs = (e) => {
      seteditCostingSummaryData({...editCostingSummaryData, [e.target.name]:e.target.value});
    }

    const EditCostingSummary = () => {

      api.post('/tender/edit-TabCostingSummaryForm',editCostingSummaryData)
      .then((res)=> {
          console.log(res)
          setEditCostingSummaryModel(false);
      })
    }

    // Add new Contact 

    const [newContactData, setNewContactData] = useState({
      salutation:'',
      first_name:'',
      email:'',
      position:'',
      department:'',
      phone_direct:'',
      fax:'',
      mobile:''
    });

    const handleAddNewContact = (e) => {
      setNewContactData({...newContactData, [e.target.name]:e.target.value});
    }

    const AddNewContact = () => {
      const newDataWithCompanyId = newContactData
      newDataWithCompanyId.company_id = selectedCompany
      if(newDataWithCompanyId.salutation !== '' && newDataWithCompanyId.first_name !== '' && newDataWithCompanyId.email !== ''
      && newDataWithCompanyId.position !== '' && newDataWithCompanyId.department !== '' && newDataWithCompanyId.phone_direct !== '' 
      && newDataWithCompanyId.fax !== '' && newDataWithCompanyId.mobile !== '' ){

        api.post('/tender/insertContact',newDataWithCompanyId)
        .then(()=> {
          getContact(newDataWithCompanyId.company_id)
          message("Contact Inserted Successfully",'success')
          window.location.reload();
        }).catch(()=>{
          message("Unable to add Contact! try again later",'error')
        })
      }
      else{
        message("All fields are required.",'info')
      }
    }

    // Get Line Item 

    const getLineItem = (quotationId) => {
      api.post('/tender/getQuoteLineItemsById',{quote_id:quotationId})
      .then((res)=> {
          setLineItem(res.data.data)
          console.log(res)
          setViewLineModal(true);
      }).catch(()=>{
        message("Line Items not found","info")
      })
    }

    const deleteRecord = (quoteItemsId) => {
          
      Swal.fire({
        title: `Are you sure? `,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          api.post('tender/deleteQuoteItems',{quote_items_id:quoteItemsId}).then((res)=>{
            console.log(res)
            Swal.fire(
              'Deleted!',
              'Quote has been deleted.',
              'success'
            )
            setViewLineModal(false)
          }).catch(()=>{
            message("Unable to Delete line Item","info")
          })
        }
      })

    }

      useEffect(()=>{
        getCostingbySummary();
        editTenderById();
        getQuote();
        getIncharge();
        getCompany();
      },[id])

      //Open PDF
      const makePdf = (data) =>{
        let total = 0;
        const tableData = [[
          {
              text: 'Sn',
              fillColor: '#eaf2f5',
              border: [false, true, false, true],
              margin: [0, 5, 0, 5],
              textTransform: 'uppercase',
            },
        {
          text: 'Description',
          fillColor: '#eaf2f5',
          border: [false, true, false, true],
          margin: [0, 5, 0, 5],
          textTransform: 'uppercase',
        },
        {
          text: 'EA',
          fillColor: '#eaf2f5',
          border: [false, true, false, true],
          margin: [0, 5, 0, 5],
          textTransform: 'uppercase',
        },
        {
          text: 'Qty',
          fillColor: '#eaf2f5',
          border: [false, true, false, true],
          margin: [0, 5, 0, 5],
          textTransform: 'uppercase',
        },
        {
          text: 'U/R(S$)',
          fillColor: '#eaf2f5',
          border: [false, true, false, true],
          margin: [0, 5, 0, 5],
          textTransform: 'uppercase',
        },
        {
          text: 'Amt(S$)',
          fillColor: '#eaf2f5',
          border: [false, true, false, true],
          margin: [0, 5, 0, 5],
          textTransform: 'uppercase',
        },
        {
          text: 'Remarks',
          border: [false, true, false, true],
          alignment: 'right',
          fillColor: '#eaf2f5',
          margin: [0, 5, 0, 5],
          textTransform: 'uppercase',
        },
      ]]
        data.forEach((element,index) => {
          total += element.amount;
          tableData.push([
            {
                text:index+1,
                border: [false, false, false, true],
                margin: [0, 5, 0, 5],
                alignment: 'left',
              },
          {
            text: `${element.quote_item_title} \n ${element.description}`,
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
            alignment: 'left',
          },
          {
            text: element.unit,
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
            alignment: 'left',
          },
          {
            text: element.quantity,
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
            alignment: 'left',
          },
          {
            text:element.unit_price,
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
            alignment: 'left',
          },
          {
            text: element.amount,
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
            alignment: 'left',
          },
          {
            border: [false, false, false, true],
            text: "",
            fillColor: '#f5f5f5',
            alignment: 'right',
            margin: [0, 5, 0, 5],
          },
        ])
        });
        //console.log(tableData)
        const gstAmount = (7/100) * total
        const NetTotal = total + gstAmount;
        const dd = {
          content: [
            {
              // content: [
                 
              //     'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
              // ],
              columns: [
                  
                {
                  image:
                    'data:image/jpeg;base64,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dGEvIiB4OnhtcHRrPSIzLjEuMS0xMTEiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4YXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyI+CiAgICAgICAgIDx4YXBNTTpEb2N1bWVudElEPjZDRDQ4NTgzNEY2RDI5NDk3MzlGQTMxRkVENjA1MzkxPC94YXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eGFwTU06SW5zdGFuY2VJRD51dWlkOjAzMjFDRUQ0OTVBOUVCMTE5MDEwRjMyNDZDNDY1QTI3PC94YXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eGFwTU06T3JpZ2luYWxEb2N1bWVudElEPjZDRDQ4NTgzNEY2RDI5NDk3MzlGQTMxRkVENjA1MzkxPC94YXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4YXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDozNjBFNzA0ODQ2RkRFOTExOTM3QUVCOTAxQTdCNEM5NDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOS0xMS0wMlQxMzozMjozMiswNTozMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveGFwTU06SGlzdG9yeT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvanBlZzwvZGM6Zm9ybWF0PgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIj4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHBob3Rvc2hvcDpIaXN0b3J5Lz4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRlRGF0ZT4yMDE5LTExLTAyVDEzOjE1OjUyKzA1OjMwPC94YXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhhcDpNb2RpZnlEYXRlPjIwMjEtMDQtMzBUMTU6MDA6NTIrMDU6MzA8L3hhcDpNb2RpZnlEYXRlPgogICAgICAgICA8eGFwOk1ldGFkYXRhRGF0ZT4yMDIxLTA0LTMwVDE1OjAwOjUyKzA1OjMwPC94YXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8eGFwOkNyZWF0b3JUb29sPkFkb2JlIFBob3Rvc2hvcCBDUzIgV2luZG93czwveGFwOkNyZWF0b3JUb29sPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpJbWFnZVdpZHRoPjMwNTwvdGlmZjpJbWFnZVdpZHRoPgogICAgICAgICA8dGlmZjpJbWFnZUxlbmd0aD43NTwvdGlmZjpJbWFnZUxlbmd0aD4KICAgICAgICAgPHRpZmY6Qml0c1BlclNhbXBsZT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGk+ODwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPjg8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT44PC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC90aWZmOkJpdHNQZXJTYW1wbGU+CiAgICAgICAgIDx0aWZmOlBob3RvbWV0cmljSW50ZXJwcmV0YXRpb24+MjwvdGlmZjpQaG90b21ldHJpY0ludGVycHJldGF0aW9uPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpTYW1wbGVzUGVyUGl4ZWw+MzwvdGlmZjpTYW1wbGVzUGVyUGl4ZWw+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8dGlmZjpOYXRpdmVEaWdlc3Q+MjU2LDI1NywyNTgsMjU5LDI2MiwyNzQsMjc3LDI4NCw1MzAsNTMxLDI4MiwyODMsMjk2LDMwMSwzMTgsMzE5LDUyOSw1MzIsMzA2LDI3MCwyNzEsMjcyLDMwNSwzMTUsMzM0MzI7MkZFMkJDNkQ2NDI4RjIzMzYzRjU3MzNERDBGMTQzREM8L3RpZmY6TmF0aXZlRGlnZXN0PgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8ZXhpZjpFeGlmVmVyc2lvbj4wMjIxPC9leGlmOkV4aWZWZXJzaW9uPgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPi0xPC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4zMTA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+NzU8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpOYXRpdmVEaWdlc3Q+MzY4NjQsNDA5NjAsNDA5NjEsMzcxMjEsMzcxMjIsNDA5NjIsNDA5NjMsMzc1MTAsNDA5NjQsMzY4NjcsMzY4NjgsMzM0MzQsMzM0MzcsMzQ4NTAsMzQ4NTIsMzQ4NTUsMzQ4NTYsMzczNzcsMzczNzgsMzczNzksMzczODAsMzczODEsMzczODIsMzczODMsMzczODQsMzczODUsMzczODYsMzczOTYsNDE0ODMsNDE0ODQsNDE0ODYsNDE0ODcsNDE0ODgsNDE0OTIsNDE0OTMsNDE0OTUsNDE3MjgsNDE3MjksNDE3MzAsNDE5ODUsNDE5ODYsNDE5ODcsNDE5ODgsNDE5ODksNDE5OTAsNDE5OTEsNDE5OTIsNDE5OTMsNDE5OTQsNDE5OTUsNDE5OTYsNDIwMTYsMCwyLDQsNSw2LDcsOCw5LDEwLDExLDEyLDEzLDE0LDE1LDE2LDE3LDE4LDIwLDIyLDIzLDI0LDI1LDI2LDI3LDI4LDMwO0JBMUJFQUJCMEJFM0U5RjQyQzgzQTNDNTEwNkY4Q0ZFPC9leGlmOk5hdGl2ZURpZ2VzdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz7/7gAmQWRvYmUAZEAAAAABAwAVBAMGCg0AAAAAAAAAAAAAAAAAAAAA/9sAhAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgICAgICAgICAgIDAwMDAwMDAwMDAQEBAQEBAQEBAQECAgECAgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwP/wgARCABLATYDAREAAhEBAxEB/8QBLgAAAgICAwEBAAAAAAAAAAAAAAcGCAUJAgMEAQoBAAEEAwEBAAAAAAAAAAAAAAAEBQYHAgMIAQkQAAEEAQIEBAMFBgcAAAAAAAQCAwUGAQAHEBITFDARFQggUDUhMSM0FjMkJTYXNyIyRSZGJ0gRAAEDAgQDAwYFDQsNAAAAAAIBAwQRBQASEwYhMRRBIhUQUWEyIwdxQlIzFiAwgZGxYnKyQ2NzJDRQoYJTw3Q1RXW1F5Kig6OzRGSElCVlxYYSAAECAwMHBwkECAYDAQAAAAECAwARBCExEkFRYXGBEwUQ8JHBIiMUIKGx0TJCUnKCMOFzBlBiksLSM0MV8aKyU4N0Y8MkhBMBAQACAQMDAwQDAQAAAAAAAREAITFBUWEQcYHwkbEgMKHB0eHxUP/aAAwDAQMCEQMRAAAB3+AABFliWjts18jp1GLQVhNro1lOfXhmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGlSbXVbNdUIt2uscvTS5qXWOoNmYVI17bV4v+xrvdPL33DbMNfU1iTtaXK2McfgAKUymPXWi0hAAA4+CzombepwTsS54iBx8FzSsyY91w36AAAAAAAAAH5buqueYxKI5yDt157Pea3nG0LzXE9EfzKR02EyjsSyEqunUbZUA2awCa4bbrX6xM+GdzUbmg1rzuHudtWbHYHM6vSFkRjy0bDKznao5KtJ3dX1jgYg6wepZQ0OgIMp+drAY12QyC1JKmbfMHyj4jAAAAAAA/Gl1VQVgkO18qGWoUvYuPps5o2ZWt4ogDcgVnTu55A9LLs7TpaFd7i6vsQDVrYML2FQmWU0lcaSDog2HQmV1WksfTrkg2OQSZU3lcZuZx/eEYgT43+la7XVKzL2OCbEsDhHYM8TO1I15W3e5una4+gAAAAAB+Zrp7n2Qac7BSLnmYRa03hzrO2rzA3dzfvAYtySawdiW3q+sGEzZJvlCZTWZ/ZXU0OneeU9kzBZtheXwzulDpjFrGsTwzYg+2GoGx17TEvyD0jlllMHQ3bsUwr/G172BckSzMnbZBL2oAAAAAADSP1Xwo8YJc1SLU5468vNhPz2uLE1wl6lyfuQKXlaVj2cnN2/AUDkgYCJV1++R3dqkWnb5MvIcqTOBtcIoo0RBTobLaujsNd8q/oOe7HGsq3IOyTjh76nDRGoK9SScsvduxAAAAAAA/PL2F8/MPl4B6PcdmnE1trayo77vVMB5mg1uJzfVt5T0HEVGhRObew0KxkIlYHzwVDiibDetgitNBVaR6tLop3BE2G9bgtuuFKkzSQLQOPhUmTR+2Maf+89A4+CwXo+jLxsN60AACktoUlq8ubn5fLkXsMLJakOM3pXRRcsnXParYhLOyJDueKyvzMkXVuq3IWNxNbkpXJBYRldqzP7JbWNSBsNy2vz20JtzQudpcUa8tTBQq1i4I7LMD1X56adoEAmeoOzIDZRgeszq2Q1UnmKVQjXhrlyVRG9+pot67YLDJTNkqgCOLmvW/cFBa67Rpyw2+OtyLzjY3QvVDajc2AAWq5FD1Ojry8nSNTTeUR6yjC85DDPqDL688VswhKtK3G1wRru1s1vXefLHp98yevNioVkbUaeXhGFGmUpt+A36fBnjGlGntxyYqJUyEKz6AAAFPrSoupNmUptn5n7WyGlSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//2gAIAQEAAQUC4y83EwIk9vGQXlq6WQZ6vbyAu6YfZKZ+QSsxFwYlr3/TnR9hOlTPVM6hBJyyFMViuwmGb/YBXa5uREy+sZxnGjzwooM/3MU1s2ibzUrcAjjS9wpyw7mfCZagBn42yBSJHGvypMp4lx3HLtVqwdza7zSDuRyI3EqdsiJSEkoZzQMeZJO7dql2GNb8yMjbrvXK1C1SLJpVYLsX9SBf6lyZqYyN26vQ+4ldr90gaLu897jSYsqNkgZiPvu8lfpMgn3DmRb7J40rE0l0TDSh2FvSkuPFJXaS2MBlsnD03UnKixLKrOU0kQtg5jwJdjmldoqsLb7jY9oZ2OZytSc9TOtqAdxwmXKlGlSQzI4bVUz5ympXnH913D/1PbP5W9sn9s9v4KLl/cBuNDiTtF9sJ7xm23tvbRZbDeoMKx1D2vSRBm3srVhjXQJaViTzzQQEF2YIkSm/R6bqWMSm1rs7Liaah9obwNwdp7DVydg2uTcceTMjTCv0TdngtuqPSJLqfidfXX1TFc8jrf6jzjh1c9ye3clHQO9sbcbhuLJL2633uu9NflIj2y/2zAuhFC3o3K32pjtO2QqJdN2+pU2zsRuHuPvnUW61s7UTdvduRrZDPoMIxZZq0eTMzIWCN7Om/R6bqbw7EzuLHC5bj5EeTZ8CLtctXTKpnbBU46/jLqHf8co905LvNZOVhPea2+c6hfA/b+jShMdFRkONKREVOCQlRrFbRFxETBiswEEOTHbf0eIO1LQcNPDw9EplfI09ExhC2R2BkOstEIHjQBFMjsDIZGHH0pKV49EiOZKEoT4EgpTZ3W11tNO/izMPJFEkTtciNCWOVmq/6hravK3U6m52IrcbWN1aRcS6raYu4w3GsXKHtrmrFZYOpxtR3HqN5e0q5Q6bjrMlHYPqdviLpH8f667U9424283xq9uiLexKXKHiLL8F52fDnnZ6uzdbJ62h3vx3yyyEagcZVWK3t7LzeYuLDhwtbr0sO/Vel3m3MWdm63N/aoAe7P7o53AuRewnqNnqe7olsl6dT9vntwhrhuxR8XyIiN2LSFkyeu1f29mHXMb9nXu1N+3nFcJX7jRdybmxt0CbZKVur6neJWv0eWLnqbSoa6W6h2gaywFnlH7TI7kRU3eZyo1a5ze4Vxd3JuEVtuXBnQW8hVr3ItkvZJi8St99KK/TnCTiY6ZGuexCsaejJSKlM/fXaTOWRVWqEdVhONpqNeukZVds6TStN7X0ZqIZqsCPZdzdqv8ArOubaUmpybW3tOZAqu3tUpjtspVavANW28p1LHA2a22jJVdVgF2POxm1ikTe31SsM4xttSB4Kq7a0ulks7f1EePi4wGFjq5VYGoin1aCk5y17fVG6qrtXgKnGVah1Kk6b26pbUTCbR7f146Z2noc9LEVKvlT/wAO5vb+Va7T1IX8t8g//9oACAECAAEFAuLLDxKwatpcHFrQfWSGdKTlOfkDLDpCwKsrOhxRxUaLMFBblLovOlnEuONGIXxShTikwBXIZFlhY4lBNMgfDJbgQ4JsHeImbN406wnT3iRzIgTPBWPNM7WpRSnG3GladeaYTFFpLZ1DIQKI++6Q4kp9LPYq7BCedZwign3hHjIzEFhxK0KbWHFvFozBpcweh9A+1BMekZYQjpM/ZAa8h3cCSETGyIksFtnqesMdXRV32RGRHSIkqH4HT89GFvACMS7eVcLOZXkNGyzfMtS3VVn8rpvyzW+H/HWP28/9QNecbhQnVMl2FGEHz37uyI8tgmxN4SdYdvgZYiHsdhrcxLSsVDsyN6izo7bDP+1tstWKUbTuK5fB3m9sGSxo7wAZEcrU4nyj3GWn21BnA4sNvkktEPvlK5Ncmq5jyG1DGM4Q9AHoceiXBRQW++hxYp5tyf8AqChUmRQEOV3UsSko0prMwCDDk5ftMspKAdxasY1JGovVrv2cC2iYuUF6dth/K22erWl+t27F3quR4abBnhfAKBGNQaLMJa4WZPmd0tdk90+nqCxyscEGFtpWtbuW3HGlOkkP6cccdVl13OFmlup0266yp0wp7Gia9BGuChiAtEDDltBQsRHKFDEBaGBCC0tCXE/pWtcyEIbT4CftTxk40g+TiqPhOrgAKGD0NRaORvTTTj6yI4sVJDDgzvF8Z0bgyw8S4SCSHjXbO9trkXyEDOir4+jyPJ93wPjuDZbGdcY+CMsSh0sEMFI4JbbRnV5/KsiuOaQhLadRxagiCxBcj5EExIryJiO7IVM10xyYxQ7ZRRmAsixxfZuORo69JZEeObx/BUhj+uddPoWQBcmKQwVHdMRt8ttLJRTooxY+WHx28DoAcaDaJIFaCGwAM4eh1DsVgcAZthoRAfUT1uA5L4qwLK25pC0OJ0dLhgYkpN6Sc4jkviOEnll6zIF5dyQ9liPkf4g+eWS3k0rKyDSCtDFviLINKLyuUPcb7h7oeryPm0aSyzk8vLpB5RScmE5W4tTq3yHiVIIebaHNJF0+Q8SsgwkvXfFZcdkjXkNSJjLaSXks/DXufR/U6Dn+f5B//9oACAEDAAEFAuLrzTCSp3z0mTNSoWcaXrGcKx8gddbZSXYMadIdfXzaYYfIyZMREXr9aTmCIa6x8jr7+ClJQnM0NziyIxfwDlOOmfCPBFPNGwxIbXGXAZB8Q1RhTnnrz1hXlmUQmcFkIs+Lc0IEUc5TvUWG9SqlkEtMtsIyOyp7u094rPKkQlJbLRLIshmYyhSVJWkqRZGXiYyjI6m1OWZsjK8POpbBj3j8pgh3ckDuivWPQID57mINhzJDDorvgJd8sNDsGP5Dw6jgxlxljNZCfNYaYGbg8+chpzzxP8P9cd/ZQv5AVpC5YpvDw0GvKgob8d0hpLzEEvKgwJ14ZBceBICCjFFqHhCWCLH9RsegB1ZgUwjiFWRTS3vAJFdaxGL5iWX3xXhZ8YtReRY8pOU4X1ddXVdVzHalRXcqamgloak2ySDHOzlCJFpSIX8gklQsmZKDdvGD5GEHdxFGGSg6WYMDkQ9ASTSh2cwsbB/iRocQb3Fk+o2TUZlEhFejSfOWG8C54AMkZGuATcM/w8tGuckj3Ou9+zudVJfOVwWKM4pKEowtCHEtsMs6Q2hvGG28ZQKM2rS223cNjDtZ02ea0l1115TbjjSnjCyMOOuvKceee1jOU59TkPLKsqz4Gcfb5a8tZxqTjT3y1FRIOsyph0P3mqIpTnBxxDSGDhiFMvIfb4svtv8AB15phA5g5Wdddvr65k8zD7ZCePqgHP8AAy+h/C320O/BM1JJKyBSBHfLWcfYt95xOmMZzAwtPkpTIAI0aLo4ZJbAxJHXwUTkBPc99gshUTlbzEgl9wcYXvMEHDd02g95OlOktBq+r5Lf9G6WfWcGk9thTw53UKWyM5l0cdsggZ7rMvLU+s1DhTrDJLpRGTSEBrbU3JZfMfW86Sorkz0uBYQpzUnUH2NOJyjhF1+Rlcw8GLDscXx2SUMBDC6wENhvoNYeNB/cGQxmF4FHwlgVkfT47JKGBBxsJjg0L6DXW9MB8nBWHXcBjYbYDGGzgVjCEIS2hphpjCmGluPisE6aZaYQwKwNrtB+RsARpSwhnHMsNKd+G3dPyiej3TP7L5B//9oACAECAgY/AuUNsNlS9EByvX9I6z6umMHhANIv6YK6M7xvN73387IKVCSh+gQ2y2VL0QHK9ch8I6zG7p2glPJvKp4JT5zqEKa4cnCM+X1DznTCnVuTUYkqxXKEITNRgLecbbnnMY3EgtZxd5FFVIJ3jl/lK4dSsP1dWkyIZTMAjJOdv0zj+2Bp5jiNskOJlOQmbp5LZGXkcZ8ahsbh/AnCCLLb5k/aIp2rFytOc6+VQBkYVUNvl5Pn2j1T1RhcQQeTE6uQhSkE4RyVXE3B2hYOem6FOvLmsw5Tbw7hWTzx4/GMOKUoQjOZQWFLxGU44W2yn1DXB3HEG1vj3R659UKbWJLBgvFQbpx7xg+D4g26sZP8CqKxtsEVIQqWfFIy88cSpFqSOMF6Zn7ZbwplrkrFMZJ6YYrHKZBq2p4VyGJMxIyN9oim8S245UPEhttsTUqUp6LJjTbYDCaniH5Nq2eHfHMzlOVqS2kCelQ0ThjiFE5ipnBMdYOkGwx+Zv8At/xQKmuWcSrEITapZ0D0m4QKuu/J1W1wz/cnMyzlJQkDavbDNfQuhdM4LD1HMRlH2TjrQmRKw3WmEs1rZYqP1vZOpV3K54nCqq/Vl/mNx1WnVCk0SLM56oK3FTVDvzevkdCb52/tjq5f+Xrhn5h6YV8oigQhUgu+KZxN+MRiHvIB9I6ooaJH8sJ6cnrhl1BtChCVD3kDrHVCuJcOqDScUnPEn2Sc5FhCtKSM5BMUv5c/NXeMukBDt5tsScXvpnYcXbTec0JruKvobSLEkiatSQJq1y2xXsM8H4g7TuMqTjDPdmac5Xdnshv8dzqj8zf9v+KGVVVG/UMUTaZNtjEcWDeBQToKwSb+yM0Lad/K/E1NKEiCzeD9UcVYfp3m6fxE0BwEGRTp1Ccsv2KWVd3VStQqw7M8K+dH+oRu3mwpGmCeFvzb/wBtdo+k3iNzMJUcgs6csY33Jnld18j3D6k90512eeCGkBaNYHphb9U4lK/dTlNvPPD9G2rv0qnz84gP1vdU6DlvOgQr5RFAyHQKiU06c4hC6lvAygzM9EOLQZtiwbPvimqKYzqECShl52WZ4Q5Ut4GEmZnoiv4hTMF7cNHCkXrw22WG86DGNytLDkrUuJM+kTSdhnojgrXBWlKoKNQUt0ggSxJUb7R7MkzkSqdkhOPyxxHibZVwJF9kwFYiVTszYDL3gkyEPU/DqgVVa82UNtNWklQy/CBeZ9EI/Hc6o/M3/b/ijh/5uTTlfDlJwO4dWC36cOGd5ThjxH96awSnK3F+xLFPRKHKzh5WacOFE1JwzkAZieS2Wuf2ID6O1kOUbYRSBe/pMabffEjl5V/MfSeQu4OxyODTy4W6lYTrMYnFkq0xjaWUrziAXnlKlnMY3VlStNsISXFYU3W3aowOVKyjWeTE04Uq0RhdqFqTmnyF6q4RTreOUoTM6zK2AxRUzbTOZCQkeaFMVTCHGFXpUAQdhhS6HhjDSzlSgA9OaNxRUrbLM54UJCR0CyHfB0jbWMzVgSE4jnMrzBQtIKDkMY/7DST/AA0+iUoCG0BKBkH2IPkPNstkqxn0mA5XKloy+r0xSopmsM8X7vI5yBtpGJZhK3m5JJleL9kFl32x5DO8l204hq5A0yjEuEF9EgdIN2rk8XZucWHbybzAcGfJAbdliKZ2Gd/kbzw3Z1p9cSN/kIDsu0meeww9UJlu25T2+SinrE4mhcrKPXAcYcCkcqlIbAUb7L+Si1q/ciarEQEpu5N+lvEnDbq6skIrqNStypcilWQ89euK9ssDdIYmB0RT13gUbzeYZWyy6dEKY3ALO7nh2RVPeFDa2iJETt1zvjhTb3seGB1yjEgteKCvcxSw/VlhxamsbJTJWoxRP0zivCvOBMjeOcj98P8ADvBBLaQe1biEspiWTxXVDtPuBuMF2S4QP/nR/Mw/5fav9qEdz2E0uPCPeMzFRVeGS042oXTkZ5LY4YyaNB3raZ35ef8AhFQ0j2UrI88UVU86sOJZHZAvvyzjitc/ThSgsEDWYd4gaRKnC7KRnhSOfVt4a+pgBp5PaRm06rZ7IrN4gF0vYUaALZ9EcPaLfYLAUdJjiZTShu1N08/pEUQe3WFaApRVjxW/DhsEcRfLQdDbgw6pxvd2MOKeHJfdq5d4w4UqgN1ycKviF23NAWhQKTyScXN34Rf90JU4AG03DyN7TrwrhO/emBsHmh14u94tOE2C0dEJpSvuAqctPpgVVc97spy/hEJaeem2OdufbDLm97bYknJIQA8oEagPRBcp1yVzzwkvukyu5iC0qoOGUsk+m+PDY+4xTlp9MJPibQJXDz2W7Ycp23O5VeLD6Ybf3x3qBIHRAS+7NGawDzQw4XO20AE2CyV3MwtxZ7ajMwlTy5kJls2Q6whfdLv0yhQZckk3iwjoMb15ZUuEeIdxYboZe33eIEk6ocbce7td4kPVAaQ73YumAZapiyHacL7lZtHlHB4n6cODbihUvES/8eCfr6IVfflv2/oH/9oACAEDAgY/AuXG6sJTBTSI+o9Q9fRGLxJnpu6ICakYFZ/d+7nbAUk2foErdWEpgoo0fUeoRjecKlch3SJgZcg1mCnH4qs+FP8ALGtWXZAeQ8lLQ/p4Rgl6fPCWavuKrT7J1HJtiYu5CpRkkQUNNrXqEYW1SczG/wAirp1AYEXeUH3FoabPxR4jElbGceRS7kq7aZmez7RVQ5aidmgauUEicN01NW+FWn3P6S9ZF22cbutpyjMfdOpVx5N1SMlavMNZyRW8M4goHcYMNs7F4rJ7OSm4cgyCrTz0WmEttJkgQh8t98nLHg8JxYZzgqzQHkpkI4kt1WbWdUDfUTiGTlPql1wlaDNJgNYSt74RA8VQuNoOXmBDCyZskjohh0T8Jh2Yp9YlC2g4d0q8ZIc3akpQi8m4Ru2OLNqfzc1H0Qth4ScTHD/w/VG7ZFgvOQQW2eKtKqPh5k+iFMvJk4PsQIShywWzI0CFP8PfS+wPh9ofMm8coTxEp/t6/cWMRX8iL56tcOVG7UzQ5GpzVtNstQJ1wGadoIbGQRxf5Wf/AGcjWK6Vn7J6+X/ihzUYRrMVy1C1N0PtqypMS+FZHX1xWVivbKujnZ0Q60u4iCk+6sjr64DFQje0/n+/bDlfw3srTen7sh1WQWaZJOfNthhaqplK0qBlitv1R9Ajh/4fqhQacShbpPaNmWXoHngKTxFgKH60Uy0LSV4LZc9f2JeaIcpZ2KTaIP4a/wDTG+p3Sh0ZRCW+M0/a/wB1Fh+oXHWIRR0CQajd4y4rtYUm7CLio5M18KdKip43qVao7c2gSGjl4v8AKz+/yNVtOO+b9F8AuLwLzSPVCWaZsqRlVkEM1Sx3BTLn5oLNH3r6hZLJpMI+YxWuFubExi0ZjCk07mJ1YkJaYbQsds2mKhh+xhZmk5OeeFIp3Mb6hIS0xT0zq8ClqtOacSS1jTnBHXFWqrUA85cnZznojiDFOqVYfRKzzz1ThDlQjdtIVMqVoj/jHXHD/wAP1Q/wvHJ8Wp6Z+m+MHhFT2S6boS0/LGUzst+xKqV2Scqb0nWIdfeR4es3avkMxk9XKjTQsdcXwhW7XuVGQXhOCebFF8cYOhn9/lxLp0FWoRhQkBMYHEAp0wd00lOoRhbQEp0QtQQMSr7L9cY26dAVqHJhcQFJ0xiaYSlWrkwN1SwnXGN5wqVpM4C2llK9EAPVC1DSYxvOFS85M4TvXVKldMzgFJkYl41zpMYlGavsTO/yKSpaCEUfg2QXFqwoEh0k6BHdpNbVj3l9lofK3731RxZdW7MIcYkLgntG4ZLovjiz0uwS2AdWOfIVuLkiClpc1SncbtsBxv2fIc3fuqkdY5C46uSIUGVzI0EX6+Tw39XDi2cmDEMcFbc5TldLyMHiO1qPpl5Ki3OxUuiGmFe2uctnkuVfDlhLyrSg+yTozE9GqCzVMlDunqz8hhCHHlKQm4E3auTjsh7zH+pUJdqAWaLObz8o6zZDVJSIwsp5zOnk3JXhM7NfXCqOqQN6ETmMoihXvjvFvSJ2mHqPxasGDFOyeTR1Ql7fSexyntimZ8QVocBmDKzVKOJuN+34gjVOJLDnhsPv4Z4vpyQhKXMLgVMaxFWy+hPiWm8Vlx52QzXeLKlkjs2SM8gj/wDP1wio3vfYr9pg9+v+XPJ8Xs3XefTDne9tVTgn8Ihin36nG1pN8rJZbBHEXfFKG6cVK7JDDqvaUkHzRW07TaMCnjaTddklHDaNl8pSUkHYIbohUlKA1OdkyY4gyl0lxo9lWfRryRS4FSbDWJWs2Sivcx9tLxSNAsjhwVUFftXyzaIqyzvMSFkJw4MNmedsUDO8LZWg4uiN3vDiwynl16+Us1bIWjT1ZoU7w1W8a+A+1sOWHEOJKVjIbDyAtN4af41XbM+yFtt9txcsROWV1mYeRu3kTRB3LUpw00G+whWIWm+DUYe+IlPRBpqNrLdP1mFONNSWeezZDqN32VmZ0mDugekn0xgfRNMFLLQE4DiWBinPR0XR4jD3uGU9EKTuLCdPmts2Q28tHepuMONbru1GZ1wVNNyVnv8ATDyAjsuElV9s74S2gdgCUKDSZAme2GnlJ7xF22E71E1DYfNG7ZQAiF7hvDivh1vd9hZmdcNrQ1203GZ5+qC6pvtnSRPXI2w28U96i7yk7zwd3v497swZNdkIn4Sc/wCrvcPms/ahv2bvdu2aP0D/AP/aAAgBAQEGPwLylOvFwi2+KH5WS6LeYuwGxXvOuF2CNVVcHH2vG6KPy8ZurNZLifKgWklFQqnI5KjRfyRYSSxum8FIrmVJrkadCd84uwCYaZFsvzOiqdipgI26o4Wp3gni8RTfszn30jNWVav9JmaH+Mw1IjOtvx3wF1l5kxcadbNMwG2YqomBJyVP3BOfd58W3Q207z8p0Wg+Aa8TL0JVcORNnQ0pxHxq6NkgfhQrdUXHfQTqinoXC3C6z5NzncaSpjmoTSLzGK0lGIbfDk2I49bCw7Fb5FyeCmsbfchxBWntJ05ykaKCIte8tfMi4z7ln/Sq5p/Udodcj7fjnx7k+4d2TdMq8xHK2vaK4Z6IokKBGAGY1oixGWraxHbTK2w2yIoQgI8OCpgI1wpa5xUT2hfqjpfm31pkVfMWEVFqi8UVOSp508km43KUxCgw2iflSpLgtMMNB6xuGVERPurh2JZLRuPcSMopFKgw22WCAVoTjQSXhmaaKqcTaDngbfa5MqDeCA3AtF1ZCPKeFpDN1YrjLsiLKyNtqaoLmdA4qPBaeXfu0JzVuC17a1PDzjsPBLLTmNR06l05LrblQPsAeP1RRWW5E54VUSSMKKKEnMcyr3lT0IqY6TTfjSlzZWnw9fKKmSIoqtFQErxp9RP6hGk6Z9G29ISHurn9aplVe79cu0q7SnSyT5DUCM4RdLb4zbpgzHjNqukKi36xcFMqquKoVcc8NGQi6LbrbhsuZtN8QNCJlzIonpuolFoqLTELbrEhr3eyo45Atnda21cXFRKfrzaArLikn5eiInxiXCBOjE2J8WZAe0iyBWuU2JAVbMTRKp208mjCjm+fxlTg22nndcXuAmLjZ7qYueGdEUUhNXfZTElEoaiohKIK1wTs8mz/AHTWx82I856JNuxCtBNyW84LSvDVNVu1wY7kjLyJTTtFMRrPYYDMCFGbAKNgOq+QpxflPU1JMlxeJGVVVVxbd2OWmOG4bUshY9yYRY7ziSYr8RwZmiohNRGpBZdRCUF5U44/w28LkdV4d4h4p1DfT06PrNLp8mpXLwrm54uFyMFdC3wZc0mhXKTgxGDfUBVeCKSBTCbhjW962t9dJhdM+8D55oyNKp6jYANC1fNj3wXi/wAkmmc77MWMwOtOnyiuTCjFhR6jquqnFaqginElRMR3Nx+7LdNg2/Le0495mK8Drol3hJuHKtUKM6WmikohKLgnCuId0tsluXAnx25USS1XI8y6OYCSqIScOaLxReC4asDMKfuXc7yAo2Ozjnda1Q1GUlu5XFaceDiIADjmVULLRUVY/wBOPdjurZ9ukvAw3cZCS3hzlmzexnWezaiNgOZUbJw8qLQVwNxtMluZGnQlkQJUcs7bwOtKTLjZJ56/Ci4lMKoDPJ7N3uDhx8gIiCq8SyOIVU7K4bkEy2r7ObSeUE1AzioEgnzRCFcNaovOuyCIWGGAzG4o5c3aiIiZ09PHCOyrBNYjKvzxGfBK0SonGbEVX0kmGpUcszTqVHsVKcCEk7CEkouLv/Ox/lcaslVVTqjTIcXXST5KcOCV4r2YR+RYZrMRfy+ZVVBXkSgTAClfSWG5MY87TiVRe1POJJ8UhXn9ZuS+efLX/XniJt65y5kW3yIk99xyITaPNrEiuSEUNZt4ETuceHHD9z21KZ3lY2lJTkWoCS5wwSv9IWcqymqInrBnGnFaYVFqipwVF4Ki+lPJFcucgIOxpBJmtW5WHJq3NlaE4FgtH9IC64BVR0NJntVSpTD0sWXrfbSJFYtmtnf5d7WeRTRkSL4gkSp8rAsRWW2GR5A2iCnwr2kvpXF//Q2X8Sf5LS5NXMw+1H6JMuTKDm0JURpM2UdT/uSGtePm7KeX/wCZ/wDR43L/AGBef7ukYT+37r+LEx7yJlxiNy3bLJmTLcjwobTEtycwx1OmSKJPNNkuRfiqtedKbrt0xsDbOxXJ5onG0c0JcWI7JhyhFVT2kaS0JpxTlzw5HdXuWrcl0gRuKrRlyPbrovD4v6xcnMe8DflyTXu0mey1HN32hw27k5MlyxacLMo5gBpsctMrYZeS0xuK0Tmm3GpNpnaauAJ9PKajuORJbWdCyvRZAiYr2KmJkJ5czdo3FOjRPvI0mNCuBN/9XKdL+FhZcR1YUtSzqQfNGfy1FFQmz9I/awzar17Vt1RBqSq5iTP3ANHeGs1n55u8n72BkzXG28tUaVRzOKq0zC0iIp8acafZxKaCDc3m3WHm0dSIOguZtUqpK8ioKV82PglP/cDF3/nY/wArgCfYflNQG2skdkUcJTVjXExBVp3XHUX+Dgmzs91IDFRIVjIqEJJRUXv9qYmtuNvNtJJQmUeAgXvBQuaInIUrT6zMuzbY3nbkiU+7HvlsXqYwtuOqQhOQKlEfFCoubuV5KuIC/wDi79/dEvCyYMp6JIbMsrrBqBetyWnrCvai8FwA71s/S3EyRF3NYMkCa4q/HuUdG3Isv0nkU/NhlqyQPFbssYJy3i+k3cQtzDhKLBQIiNMwylPKlRMhVQpWuDfMzekucHJL56j5p8nPwQG/vBQQTzY54543Av5uzfiT/JY/eXtNo3rxtjQ65lgDcfWNBlLOgzm2gL2ww3iNHhRMxNknYOGHr9Mk7cuaNgkuG7brlPY16e0WHJtsWZqR83q6iNn6MW7bWzrNc7vbi13L1uF5h6JDtzARJDrBiyTRO0fkNoGZ/Q4rQUJVxYN9XSO+W3LpaxhPymW9XJSG/bZYAKKhasPMy+o8yBe7VeUnbmwNXeW5NwQZMKNFgxZYRoLEphxl+bPekNRxAY7SkWWvClXFAeOE/t+6/ixMe8e/O2qRcNurdjt24pMUFcetLEyaKxJyCi0UUkM5VQuBVpVCUa3K37Uui3u97hgu2yGxEjTGShhcWdB6VIKRGaVp1ll5cjaVcJ2iURKqltgXFjprncH5F5uEdRyuMPTdMWWX0Xj1DMFhoTT4pJTsxuva+6234e2b+83KtF1Bh52K22y8+UB9G2xMiYOLLVp9W85NOtIipSqpcLVtK6eP7ivcRy2W5m2MSHEjOXFrQSU44bCNq60j3caHO4TtBUedAZnxC8ZmOyr7cYSF7Rp99tlpiIRJqUcZhRW86IndPN8K5jfKMdO8282dU+AmxMC+3XEBu3gZRoSib0khUEyK4BmtFoopQKDWiquLRKlip24EFCTLmFHBeInapTjUMi07UHDrMR3rH5DRssR4yKRKrgKKV7vcEa/Dj/mn/uN4u/8AOx/lcRb4jRORTFG5OROKLkVhULsqraoo15qlMavXtIlK5VRzU+DSyalfsYORF1NIXSZzOBkzKIgSkCLxyd/7f1mR0Ej9XNwwkQXkR2HIbWokDrBdxUIeHnw5uxiIu1twMwLiBwWnVSyyXZcZxlx6OzlLScUXC7iZRw4qLwUyp9vA/hJ93EX77a9g/wBkeK5kRE5qvBPt4bd0ZPTuuI03M0HEiE6qKqAj6ogkpU7OGOeNwl6LQn+ZP8pzLjtDbkyW585Jfs8E3nPS45o5nC9K1wMK026FbIgepFt8ViHHH0o1HBsK/YwcC822DdYLiiRxLhFZlx1IFqB6T4GOcF4ovNFw+FhsFptSSUyyVhQWGTkB8h90Q1Hm07BJVRMdFZrZb7TD1De6S2w48GNquU1HNCM223nOnFadmLjMYs1qZl3dKXWS1b4gSLmlKZZ7wtI5LHjycUueEudr2nt+BPFatyY1qiNOMLyrGytUjLT+Ly+TpL3abdd4qFmRi4w2JjYnw74C+BoB8OaccdXZdr2O3S0Sgy41ujDLBF5iElQV8BXtRCRF8mo9Aima8zVkMxfhKiVL7ONOOy0wHyGgFsfhoKJxwrT7TbzZcwcBDFf4JVTClGhx2SLgpA0KFRezNStPRjTjstMN1UsjIC2NV5rlBESq4Pp2GWNQsx6TQN5y+UWREzLhRIUIV4KJIioqeZUXguM3hsOv6BvL/kUyYQQEQFOQiiCifAicE+sywKokL7iKi804+Vv9IH4yYtk5vpYlt+jVlB653CQEaG0oMKqjmrncc4+qKccUhNFua4DylzwKPZ2T+VHt9dWTTzuLzxuZy5yleGNK2+cdpABtmNnkyUMWG2xEWxVGkxzxfZCium45bgbPsNWhmZ8q9uXOnkfu98nsW23RsutKkKuVFMsgAIihOOuOEtEEUUl82JUGwXN+XLh25y7OsuWu6RSK3sutsOSGephtC8guvANB7yqXBOeGb7Zup6CQ7Iab6uOcV7NGdJlyrR8cuYeH1F8btPVV29d5FkuHUsoynXRlUXUYo4eo0ip63DyOXfcNxYtlvaJAV97OSm6SEossMsg4/JfNBWgNiRLTE2Pty4PS37e1HkSmnrdcIRAxKr07qLMjMi4LqJwoq8OPLyN7HXqvG3bR42PsU6ToUdNqqv6ldXO2vdy+QbUs6H4mbByht3Us9cUVsgE5KRM+voAbgop0y1JMSbnZet6WLcpdqd6+E/Ad6qHpq9lZkCLmn7VOPNFqK0JFRPKsAt2tNSBfKMSP2q+sMg6BqBI5KetYRWxEk9ZTQfTgHWjB1p0BcbcbJDbcbNMwGBjUSAhWqKnP6i5SLP1enarrKs0rrIjsMush5NbTF5EU20z8+deCoi4sG1JfVeKblCWdt02UOMqQmydf13dRFaVADh3Vr9TIulldGFcnlJ12OXCM+6tVIgL8kZl2L3ar8XBxrrCeYUfjqC6ZJ2EhcUUV86cMc8Mfpm/x0w00/KkPNR0yMNuvOOAyHyWgMlFsfg8m7sqKvtdu8kr/ALzO82AkSxK225aErzw+3eH/AIdhePH5RUH4cM2+A1pR2EonaZkvEnHC4Z3DXmvkDbsi7NWeW9c40izyHl9m9dGGJahEJjVZWUj0Qnu6lVGmdEXJi4+7jfUK0nuC2bdfuEDcNjcHRlRAbY7rzOVsmDc9bgDPEPmkShY93lyb3Pc2rxefeN4RLuZOk887ENya2DL4qQa0cMgrkqlaY3T7t/8AEjcfhg7cY3CNzcatx3dl7UtodPFdSMLEVk5NyqekAVaFASnrYh31dxS418DeLdmW96ujIKFUyTq3mgqYgjtCKiqognNcbN2+u87juu37xt1xkXOBcBg5YatR5clqbbm4gMBDik5GqCInzYGne7PfHdLGYsXB/wB6022tzCAXFghMfeR2U2LnsVeEAyjn7qEVezHTXBjesjZ06yqbknerlikzY1+ZNTRyG9ZniRq3yI/BBWveLj2Li2W6NeWLLfIF0G7WF2TlcYkTIrLiEw6wtTcDK5mqImoUrlVKovvB25uu02ct57F2ncL61PtZqduuDMVlh0RfbTvs8Z0c1EVHMilUW1TG2vemPvEud2ul1uEIpW3JI28rJNalvvC9aocRphTYksA1QyHiOUqIK4N8M7Dqe6SY8PHK404j8004pxQ2y/fxZdxjuS4DuGRuV2G5dOq/XnWxn3VOnVzmSJGZHh8kcS2fpRuBol274+joSY6OrHW7sv8A0cRVj/0GILkRv5zInrYnODf3gud297snaDd/nqMk7JaTtsCT7DX9kKNLm9b1RUlTjRU2vs093XbeNp3RaJ8mbHvXSvz7TIhsSnmp7b8dhs24r6xcqAtB9bmtMe92/tb+3Bb12Xum9JaoMdWCZNmG+a9NIedA31ijH7rbYKAiXeLPwRNr3meolOudhtc2YQCgAcl+G0b5iCcAQ3FVackxvfZ9hsVkkWm7b7uSydw3a5o0trlNpZXXEatgxXn3CbYYBRdFaori8OGPc77utv7ruFojPWCVaZ0yOImkgbVbxApXSOErPUaTRaNao0aivey0xZPdc3va8Wi22vZoXWXd4XShftwTxPRzvSn23RA8qIaiA07rleaZPe3t6LuS4zrvsG6Gm3t1RMjUy6sQzlvO21046CMqT09vICXiuZ8eK0TGwRttylxbNatkt7i3e1EepHm3mYRwAtkpQUa6U2NqIi1qGdKJxx7x7s1d5Ui5xveTK27bZsouoctVuJGSyxUdEw7gAQjX1VOvPHuiYm7xuO7ifh3qQLl0WK4/GU7XKRx1h6O2BLAnKlWhNTyaa95a4365YHN6pN27f5lm2/C20u3Q29D6B42Q+kDN0VJ852XpKSqg5U40qncT3Wbcbvtx2hI3NtGRI3DGh6boxrg3bbjJuKNsERsLJaVggZc46ZZT40pjwTxid13gnhX0g7viXVdD0njHyOu1fbebP5SiXOIzLYKvddGqjXtbP1my+DDs7ajylzNbe7TP28G14C5+8uGIdwhPx3xlNCok2XY4lezC4E4zHTwq96fJRQYp+aT1n14/Fw6wwpSX5WmsyS8ie1VrNpiLfqg22pLROK1X6hLPuW3jcYAyW5jbSvyYxNSmgdbbfaeiPMPAYtvmnrUVCVF4Ykrt2xtQ3prRsSpbj8uZMcYOmZhJMt951llcqd0FEVVEXnxxabCFjy2qxXZL7aoviV4XpbqhGaStdbgsl7vOL3HDNv73Evd7UDLuKdbhtMq4dVMLUt4nGcGP0hSFghQ4bfeFtD7vPiuPod7uLD/X8W6eHeKfeupJf6u+3H8Hu6vwJiXebDY2odymArRSSflylYYWn6tCGW+83Bj0REytICZUQfVRETcFsGxsHA3ROeuV9jSJE2U3NnSCzuSU6mS6UVzP3h0VbyElRouHn9vwZEZ59gYinJul0uGnEAhIIzAT5kluOyJAnqIirRK8kw1btzW7xGNHe6iOnUy4psP5Fb1W3Yb7B1yLTiqp6MSo+3bHGhjPDSnOOG/Nfltd72L7852Q6THfX2dcnow1eYe2WAlx5KzYrZy7g/AiS1UFWRGtr8tyA05VoaUboGVMtKJhN2nAQtwDbFs6T1ky6eGqZOLGWH1HQrUzXvaWf04mNFtVpWpsnqjaS5XhsGHeKr0SNXAOgbKvEWcgqlB9URRLXuS6WrWvdnVpYU9mXNiOIjDqvstvpEkMhKbbcVaI4hJRVT1VVMXPbQWFgrJeLg9drhBkSJ0pHbk+LAHLbflSnpMV7LGDLpGGSndpxw9N2/ZhjTn2RjHOkSptwlpFFGxGM0/PkSTYYQWhTKGVFQUryTG47UzackDdsqVN3Ax19zXr5M39pc1CmK9F1PMyTYp2UxBtFsZ6a322KzChR9R57RjRwRtlvVkOOvuZAGlSIiXz4lwtvQPD40+4yLtKa6qZL1bhKbYaffzzZElwM7cYEyiqAlOCc8Wfck6DrXqwDJG0zOpmN9IMxtWpCdO1ICK/qAS/OAdOzEV3cVpGVKg8Ic5iTLgTo45lLTGXBfjvEzUlXISkCKtaV44Gz7etjFst4kTistZzV10hETekPPm6/JeIQRFJwiKiUxcF2vZ2rUt1cacnKEiZI1lY1dEU6yTI0Wmtc8oBlBM3LF7saWJk7VuOe7dLxEfkzpIy7g8rZHKE5Ep16K4hNCo6JN5CSo0XFrulrsOhc7MrywJ53G6vSG9dhYxi6rs0wlNjHLKAuIQtJ6iJh+93Cyl4jLQUnuQ7ldLa3cMvLro9vmRmJBU9ZVHMfxq4tG537fnvlhivw7VN6qaPSRpLL8d5vpgkjDezsyTSrjZqleHJPqmtf6K0y93xHxPxmtE/ZvDe9k/C7uG830YzaiafjnjXTc/i6Psc3m1e3DPzHzY/sv7Ny/I/m/N+4P8A/9oACAEBAwE/IfXQKRGJzy3ommBcql7cR6cDWcNhhBZag5V3ciFmW5fKrRIVbWSdeBVzIHSwYoRP/BX2p1c7+/oa9DFVmx07IeCegbkmY9FBinI1j1rl+tXziIoinegLjbORrD0ZqXhpOmek4M0v7RCAmwaU1OMQ1IS6kOCY6n4XATAEBQUQ0ieh2WyBVH0Y6oBVw8vf5jUjSTfZlCjYQsgsNoQ/Qu9QJfmcxfFQ1+pCZy3QIK7XMdcBHSLHLDrUHU1f0flnsVrodv3AJ4MHyxFE6gVyDVO7bl/94S52RbbO57hpHEZ11U3gupPLYJwiQLN1gSBbT04LhDS7X7pr0HBWsWgRRCaHKGvRM/ruUA4RqTcg4IIkseVSmo9sM7F40dLB7ldB+gOEP9dGGZgyE+mOl0LjFvy+0IjENiY9QFWk0YFOpxsIbAxorZVnj4umdBBgmtaAZARMNlN28PwVacDKTZNq7krrHSpRHmX1TLIbDWtBBJjqgsAdNgHS6C85OUyB4QWESzeP/TVxuVZPmuA5KrxId56aEo6Lmyn8lSbZvA7npc42hoWqKgmpqjqgxx0r6Yjb4iPfAqznpDT+xIHh/Z0n/YYKNBMJsI7m41rnGxSkpe4x66bqswA1mkBpEiJlNc3U5t6TLlto/QuXUTiVlYVMGoVZOQl1HGdSovnrDZ6orl52L0ZaXXwWDuFc9+D9IUv+W1jbEAAHSdFgqWuPjkyVSzFxbibamsWhdDVbyuHNPPrDCeRmjiOzYVwUCMmXD4Q4ODPcue3puCjgLSNFKW23aneVabpKhWJNOtqusAwVNt0dpHQ9mNyOJ2dBdLsTEpq6RehWHYr6TnI0sIQNovOnbGNa/qHOwmNbxgeBsvFJf2ZEvM0WQhFRcxROljJMEPNm0IuV1DFsXfZYpysXl1Bjc1dNBlPEUnaIZfOXctICXXRD1V1w1eiq+eXfsQuaZVw0sIBF3HeSJz1q+Tki4uR9iUEOTKXzQAYnjaMBtCY1BUOdo9B/5b1HXH1LECiQzrK18oSCmaWGeqhO5vQBHir72AQWmGO3PEWDF4xf9aQg6CBeLeHUQaWLUCIFuAEary+mDtPYzRZmDC6KIU7qbxdTdKAvlPIWAY0I/nVR0LSPA0evR2aXxbcnUVR4LOrUoR+Qj2FcvgrBfMFQCsYSa/Z7/AmcXoKQI64IAqzIySQmwQUyxpNDpFplRr7vhlPZ+In94kFbAgA7qQDFdy5JI7RjVdfQ3RfxvU35JYs4XrOqprOY14hxCq6uzhlAgbJBhjOUI51Mq7WN4h2K0Z1R3kNQXLyEBwGUBm4lJSQtBt3cZCBtUpgTooUZ6H+2Bqw8Rxac4eXxrkKbUNEC8HogQ1sY6ip8sPDPdzuEV1eXOnYLq4UKHTAmcrvzcS71TO0OJf8ARGb1nyZDm8reXALeqHchIOR+FLfc/FhRDh58wQH7Ip6GZL0nRz3Z7suN5D74awCFCA1EIlo4ubGXpS9EKOBQUpmyInDvEfQ7Xvkdv3/3gzblGXH3A9/TVP8AjPC/QvuhYwmEp39DRJFJDbNDcPykp66n2/RsW4XronWUVePSl1GfD4jAJMg4YdoWqp+mppFC5uSyE9GyIkLk36ARdawBg1IQLUwqDpBbYgDeCE/oOKAoTue7Y9c6YQ8FuNMCiCBp+hAm2cM1xBNABATOA3L0+74dQn6YfEBhWTqSCuYYkFWMUwLshF9Fz2soV5H74xDJ/wCdGI7EPQbX4GUlYFlcuY0M1WSuXXgOjA8QVRBp6Xv2IQ9LQlD83opHvLjGRuBb0Guq0e0SYOW4/VVkuulucWF2iL7wW2RwSsw3lwwaig8qLHj8qLkCg3rjjZzdj0jiroi4CRLW5SiCnTtwcJ9s6lGJlPqx62ADf6JOCPMbT4jM/LBZ6T01vWqjNkMNkgw0fMZulrI14nguDjadK5E1gNHnvKR4ldQgAoUWwy+jxJCEmAMFs2A0C6qsShckGTIZKccpLk8kMcCfEu4E7gw+YZ76iNJb9eQFGRIMunWoAsQNcMSUxIxOIDxZdOpGB54vR8e2WESAecJfYHexjAb+wEDR5L0aM5MvRz59ZCuAl0TptzRP0jKa+lg/+renqMFBCuKSahtl66zrQMR1v+9XDk+kEq6JTCF3NZ/IfzjgWEraWhOcAndMcn/OXj6suYFe3rqQuAru+xggpMKc6iO3fbrog5dj0ow4RfzDwzuxsFUige1mmx0G+j0/2WbmWCSuNpeY7VEHosKokYQSEqpnQttAkjBIActc77yg9hEdrDmJBOnwQg3yfhd3bcN+4TaSvQYeDwayltNdYePlxXYmYmNBwR9kYG5VfVBaoCv5PlxSoVXRTeP0UkeHLA60dZCBHPP79tWO2xQJGgDqwU588hCUKzCSK12dMfwrZuuWHNrxyFVvzQxEZWR1N6TG2oVQMYZR17227mcTEx0fK+ubYKG7Ar0bWoMI/wAaVWfclpMqSojDEQgbjHKL/XE4VCh+n/VSs/59zn5Hiz/y7TPq++n7P/B//9oACAECAwE/IfV6u6C/8xv5v+n2wdy51Afdv5ufw+wfHHx3hP6IjpH/AMFIf6C5/KyP4D4++C/A5z7vL85MUSbR2PkfwdUztI9xf5+GHTKkFVu6vKrtfNyX/Xff1a0qAbV8Y+hHGz+BPsubWhOf5aE7bOf0d7hCT41f5f1OYYI5hQUOmANFHWUB3Jl0lChdnBS/o/2qMiN0bJ7fuBYCLEZbX3cdDpkyY7KglOTye2dZFrfzHX+hzirzn9RnWcdfSb38z7HLjiDwvJz/AI9Asovw/wCSV030cRAz7eA6HjB5oKtmk0vGw45z7JVvmc5EGJfczBbAKCc++UvO1XgjtdD89MLiysPwbzNpO8x9cJHo546sJ5nf30XVuREqxB/yuNw84PEsdH8hpjZOEIIALsGwt2hGboGJrQxgREscdq/B/E2A291gMzi7waC2egu6hvNhuzh0wHQCHRH05xRUCL0saNUShWoL5rvgeisJ2jsrlNZA14Q5VRNj+z1JgRHEpsB3O/fFr/g/yN8x6bwjs49CkQc8D05IJ0B92VS+pp/n+ceC/Vwz0Tpd/cp8cP0D6v2em0cCnkFZ7XH5QfILE9kY4J5HPe/hGJ0q5mqIL/LyvfEeHzBdnsmnOTNz7j+AY1DXpw9R0V5hdgzmJ35akkUlSIqwMNoNoBeREWGnguhcPP6CgxUDN2dIoOsRNdAexV6NPchrOgIdFlcwMaaMAgIidCMcCCtU8XQDjSTb9kakR1BO7h26+Mt8ijDOBT685A6d72qewWZ0hjvPyqg7WeMtx2uh7HqQX159JA7RdAiizUSPAnnLLnpETyI37U85rGvaKQO7NDde6YRBqhZ1E+/wMs665YVRQ2ALb3+1dem7ulF4Z/JOP8VBxJshGrCOxnPAb8M25Pa6jwpT3w8G+Jyl562q4LvpkuLLrRWc2PV0Bu5fvi4gYheSNJ06ZJ80JHsPiieDKrJMojABCdtAoiyYFAsiredULQ2b6oLiGgwOhYMST1s4LF1Gxv7qSRyRrNWnOT7f4I3sYSIwyqQ7PXIaCa/ZodHDpu5yyyMSjQCHca53hoDDkz2dmbaDeTbAz257JP79Txf0CPzrHrn1Sv3d4LDOoj9zGW3hRnt2zSjeUr7uL/cdU9jg+M8RmWH33v59POtkj/GeR4nPtx6PVzf81D5XC2vjcG7CFd16tXP5v6GwI4P54og9IL7LPGAKC2HeWJT11n9QbmWe41wLaRARPI6cAn9j/Q7YLwtAAewaP2UBOkPU5MCeuEv2BfsM6wz4PGPy5H104cvQXqzWrzK5XbHAmlP79HvcIPGDC2O/Cxpmh5yKkBYibLyfoMXFweri+jA06H5V0HlZhx0oSjq5PHpZxDrb0vHadfSy0LNHZ6Xi64zUIGoJw2fXXhH9GkGzdIx8F/xcRSEH6N8gDE7DjjBX7g3tCH6WsCgcXQToPvO+OXXb+zkfD6vY2oArupz8+o0X+y+DADg9NVsg+absdHl8dc7oda2cO6fPL2Y7n0lBjp553nIHHdyKvJQ03zvfGJ15Hb7K/wBzfbCBq+sEEo1vflOOp3UsONFnf3mFhuKSkdY4P8ZfRMjU6g99eL3GOeamRFmu/sa1vEteg7A0yxHoeTnAnlD8ceiG9fdff+cgtTtPNf7nHjDvYr0aTfv47GBoFDqUGidltPGc9r7tdKRlu1bendwjS9hTJ8T+G42XVaTg84sWCdL6puXnql2Lcjs34gugR8bcNqrVZcJuyoe7K+GZ52h90HvG4cEOzXNz1957ZFdj0nWDV8knPGGTy4XyaB9/zhaYm0qIXrHVPc1n+C87efZ7eovxz19zhPfP5KM+zn+RnAKZGnow+Rny6fLLI0n0vKvVYfo4wWWDp6I06GbBbgQp3gBfLnJJ74WTQ4NgPnOEgMHcWzudWZ5Lfg6J/RiCtiQK94CvNbV5XEU4WAg4NBfm3rhBYbreeVgr75TDEdDTtAmOXfEB7AC+ecUkdNBG9JKNvL1bzgSHgR4Wz8sCGuc5T6BtuvLklHKHISkMfadOxjPIpgILqACbebeuSyDYKO8Bvbt75tegcDsSM92VrMTuvLCH21kRHHQQWGh3du8gQnMOSm0p8JhPWiCPgT55xCs9Xp4DQHghm4sJQHPPAVYVduNUB2AIOmgpt5t4cothoRjemjeUi9bnZODZO5H4OQxgZG0RNymw4T9W3mX67z7bzxy3+Vfuz9e/7P8Awf/aAAgBAwMBPyH1YnPVcXRjs/T74Q1+yFfZ+Jnsbra/v5awdBZROH/wR7nqswGwfh/s+ZnvSHp7HB8ZWAj8jgHdNGWOLqxd/wCcX750W6EHZPy2xyd9bb/pSfdwQCVegjwVXgM1QZzq/lH+Mfr9i+HI99L+jX4+g3ffc/j9R8ipUUes6fKPjOj31+Kwo+dav6NtHKB32QO/7hDLqRva+z5y++X3yTAHjo+Mi+zvpPlLpqJ065U+fJ5Svc006h6d70z7ja/LsYt0VZ1bs3DidOmvRXCj2d/gQ7zCqk4P77vdcOZsnB2Juc6XnP6SqZUuAv2x3zqR8ZAuOh1Ow6/11mOjxq1+4HfhcYaEVHxgIV6Nfn6XrJiYyAKp/Pu6r4w8KO9Gy/EwhUJ1wpV7cB6zWEWw27RpTjSc5NghfAbPPR8a2mMIdxD+ERncU6zKCRvs9k8Jsz87C8HM/D589jr7XPFXDr2EZnhZU+fpHs8j+zsTjHFZKCxHs/jOViz/ACX8XG8aaefThkD48mvyAHLRlUoj803xXrJxngdUEP8Ab5d5RfXPQH3X8ROfyfn9D9G7Z9T75bnPbovX/GHETkFjNPuO8q/AHzPzWA2GYvIapfs8HZhYbvw9E8nJ2zh4A9mfksFrGR4HatB46NCGaFQvAa2nhbOT5uWPsRZpwphrpfjNlaM8Rqdfi4T6/fPzsXe+LE3izqgYUfQiKicPGaHLXHh1xe8X9lULVWjzOHvkn9VYMfGlR/2eHTm+RZp9774F8YpNDSmTiyWnUcuM5URr2HZ2GPTHvz35Z/TPTa9yG6hjXhtOo+Mc91Em/CGnbh8Z2hGk0M5LtJueLjNe3Qvf8beSyucKCDgHqaAO194bz6j3xFkpHN/cLb/mDxoYVSJXWkujm6nKR6W9x6PkIfGETxw07fwzsnbeaApO8dB/njlcAuptutO4aAOQuSPpr8IhPtPOE3NCa2gNaeaih1XWBKKpuNE2vy9QzR7jgEV1va/bz6K/Kw0CrZ26P3HYNxLaVzfyPyzWVkrQVI+dfafsvkTk0ey6/vznEdk3WF7Xy+7iVX0Xt/0cQCshjNbyYOjoN8a9DZf/AA9azvks/eYXOuAAPsYuQ+gE+zhQMeYF98L2XgAfY1g9/Ii+51+cCdwwn8ejnt4BP5zy8QA/fn0HD/AOHsdPjFXc9F/OC1nCkfuYIc9EnvO/nNYGlChxtzjE5VB2LwY8QeE0mV435vvz/ON1pyrX9lQRov59TQ5DDZyEefsBfbG/AAr78nufky2HUio0IAQZGNi+2BTo9qeh5i6uJnDpHKUgu+2W2uyicM4f0KFLbV7noTYur/Xd8GIKCL0HDgc+mrT4Gtpz79PTW2BZdw5Z22bzSSvZbHOkH/euR/RsMBU2JTnaP5mCJR1+hJIZ0TfLnnFce0dlfbX6WcM8gtqus6bTgkm6DnyuB5H0/asL1MYQdgsD29ARl6GLKluevy734PdxkQp13XqnVO1+0Nem/cFeHinC6+emG07r60HHI32444Uk+9YRk7aO2WXeRE2iDpG/DWuX8FQdd67c64yusoOAUYEP6vPRGZsvIF7X31ecSHFz0g9K5HfrmsXn59w+fjzxj18KbAL7nPuvBlfrWN5xBRO9eHXZtPW/zw9W47uKfbNZ/RsEBDalzgHjhnnHUxU3MXYNPEfvgEthBw6Glk0Gu7c5KTe6Fx4KzznbS8Eby+MCYKoNnuPXmdBlEJlhko5abUTzo7+I5NoMsbvo6VrrllxDNjoX4RfhMLrWl3s4e3S5XXneHeINPm8c5p0haHDvryzXbthSQgIxGvNKbB77jn8IDtJ0Tu4l6evgQ1s8rleRMpP8T/g9rH3xsQ2hD3H076e0f3fVceJofGBwKMNt3f0ch1epvuJvNVnyar7VVnjjOHDHg2bbXl008YAneZ8pLOnMueBlPcrv+7BeaN267FWPEEA6GC43i1E5drPiTpmjKgb1jgKZ8Yek28pvvRHC9PLqvutXC4BDah1sTDo4OmKBedPVZLOfFxdR3pdH6HCmuAM7eVFHvuJTw3r3cBovNVqm9uuDiTplwaSlU1qpQ0a41mnbBdnuUvieMkoEDmBo53llxva1Su17ccZZna66iOrH5MWXTKKHyh+MNBXQ/L1Xy7zRGl5f2sN6CGBy15tapXazjUk6ZAtfYJSdXZNA3smPg6yaTsA+R44zXPEddUjqx13v6u2fD/e8Hw3fidTt3Z9gfS+z/wAH/9oADAMBAwIRAxEAABAAXu0AAAAAAAAAAAAAAADjLhLAPACAAR8DCAAAAAOVcBEOm/I5f2VwkcAAAB16FHCgC3EFu3h2YwAAADdfW0Twr9AUtWc9MAAABa1UaACnmsGCewGngAAAHb26kBgDABiCkDHgbgAB4MR7DexAKWJPQtZ7n7ADMiIAbC317KWMdQnyyyAAHYAAAAAAAAAAAAAAAD//2gAIAQEDAT8Q9YfWtPyZjtcFAZcD2DMTrjmTF2dfVc/heFyiCOIgEV9pfLp+7bWPMC64nsaDCM/8G1+T6IpGc+Xpl5z18VmOor4iGsmgWF1tz+PgKotHIK7Kr17q5efx8FKnjQ9xBfoAAtFiAkm2XH03GY2jHLwNWNKnNjyEC5Tt0sAB8xEpK4RGJ6TKOXRxQoFQGIZxRpWWCtKgLUrEVkaIAdxX9AyeOyvyh+R/6o/SHVcYhP3SrdqkBEpMKp6sayaRqUpa9Xnets6/Pxm8zsYNenWpEc24cHt+2GPXUe/0Ia4pMxnAdw8LyxM8v6e2PT9mPOcLivqHNB2fCqv2VtVoMCfe9O/DcxqMieg8nfZmCM3xXI1k0Pur3qrKlcD0OOjWj4A0AHCuadYiSbErsyhA9xdtBAkBTGweN5H7F34lctHHUzyo2n8ZAUQx6y8P4RiYSqrcZSJ8T23oDUhls8e7roTYwcMYclkt8PAeQYgiLdOJSrvkfDWlTrxcdSqr5mAQ0PJBc4BFyAuH7ljaoVURo4GrWwtN516nCzNEsgDVEStkHPiuC8gAI7E10zeL0gBDQdgBQSKRcURk/EDbtzyVXAX1cKwbj7dmAKjjFMiLZkDNsg6iP7IKFsaepxLBeYesvc4opgqwRsgCOmnVICrDK2tZcREEcEhVIAVLQG1WyY6SMu0DVlX2pk1ojfsZ1LfxIDnk06bfA6gtq4A3uF49NEQRAHKgg1FTA/UQbHGGPJESeHOsaZqg7qCK6VRcAJxnS2DHOo5nJlDc8egeQb4VjFlOS58m8CFJ1G/twOhI7tMIIYFOBJM56LyrC1WLhER/jdpTGNdArRqBt2dvJgAUCkHUUUu6DKRIMFIkAFKMsNiOw6tzh/h/Z0wewDBR1imyqaGQ4s4hVi8TqYIVNVXAfr0DryYcHt+wD/lxRRsDBA94YYemjLPnIdy9w00KQBtIaxJazdcOogMYUx+VMl09jZIGJuobIgEwRtGHkf8AR/nI/wCj/ORd0ut41ejLSRLC64SRIMSJlWUdpja1hJhovSFOZD+F7jDdUFIVCmOgdpift2hl760VIt/U/wCrBM5lqETlUuLxrsebGSxZYc8o0EJDVrioaFZ4tWVZnWAKcDjvgo76vmEydBPVMFpCn5SLBRMCFDWwd3AlLrH0LcuiJwNECKBC6U7cUUV6JC4dFouGDUPNgVIenOlZAXBdUB8F9EUcjZDOqrkZS6KZJn/TyKsKFiDX7KrV3JgbfXAJprJNANIi9UTQKVtprFJDnSOTKyZpynldFvmXuDuYBkCBFyKbupjlcwZFIgGIEKuez9/9559Jadt9/R68/Xn3xkeFXcRnaESKgRtHVAAIYs6q5XErBSMmF8NICBxozKBjSsbCCFbEYjDxDBBGwmARaqta42OlVSssZo5xUrylmSijh4oH/KHJpRow6VEYQtPlAwdGkn122YQrpcs7Z13VHPBjFOokNVS8VQUVXCpAFL1S1dqUdmECBHAm/DhAfbO5RsTOKgFtAOhn2Q00tIL5XbmlkMtgKFyJMExfvda2CxX2zXGblIoFY3K2Ab/ZH6HaW1RQHZlmxj3FH8Zf/f8ArFv+9dl2843s/gkxtdmCgOVa1LekjJWdDpMDm1wy7BUcW21P/cYI5xM7IJUo4jv6GqIPI7o2f9TJr9K6DYOWgaZX9HVyYkl0nwiPR19fGCJvS8pPDIkTlMO/UALZNHs5qGZRgRWGSspPQgVWGPYe6JhRNFTFcv8A3W+b8bzKQXBEbYFXAb9b8d/d/PjFHi2bCbRcB0DgnCvSefuYpER9Xr1++PI4XAgPJpWoAdi7PnlIglYDbDj9AXEnVFSWlNxLKaKo2S0W2i3Yt4FBEHhpv+c1bdVTcffziwtojnZExLt6HQbp+roAgLIKYrtmDfQPqMiqRbGCsHBtknAVgEMADEvc5HONnSKQp8R4vGo4jczh6J50ODWT7OscOH4wAODWV2aknRcRfNRfGcAXkm7B7SLRdnjwgpLHpJwxrgFy7LAorlyNRy3sVAHK6b8WPgDHw9JBBMRCsTq9FTzKbf5LxdZCV8NMJGVo0wgCS1jAXDcQ8D3XBMQ79EEZYWi4d5pLK7S4sS3yXILN8RRnkxJbggDhvayUzmBWhizDGMeMGJfkDzr9pLjNwo1xo72dLSBT0b9whzYxhXWNSKksnGpYvmiCcHAmoJ2aBDkiNtmSCz6CsbgxWHBl8alK2FVz45yQWA4DxL0jRIhga8LZH3ZDzxfL+uI5WPuLxCzYJWmCEELxqP3YAF2CFQiWVHSiJFKBeN4hQ2Lj4VgUiE+tySBOU6WVkNZMAz8xoKofocgNHvrUet50GXTe/wD3m7TlaDy7eY1EydWAB1u86risZdGDn4lfdvrqH5sa8au2QLBhnDgOR2UVxfQw5hl3oHOHoj4LP2BkyyNl0zmBMKYA6unNNBy3ZXHIwXN8Vr0PhfK7YdW482TiQAQHnWx+xTL0rF8e5kG614mDgMGb5sGWaezlWAGlIGrQCBychgps2F98oZvYM1VcJVMVCu64rLuLqG6As+WBSwKfi3iYQwmVHBg0pgTgLMiN1Jy4CtOEI0CraBSKWo6ipC9cjQXzQx6CyLjZPWf7Fku4DHXT60IzHByBcYpTYzvcOnx/X6fMf/maqXtOFz/ElseI+9N3Pow0/wDBr//aAAgBAgMBPxD14wZIXuzQOqwDa4zR9Yr7bg8i04DiF1AXzxRR7b1HKanWwF2B+C+mE4EAQNIjsR5H/wAFLw6YvmaDyw850M5uL8behQr0jCTjk3I6tV8pfTWICjYNhbejDZQbxt3b3ZFHka1c2GJHW/PLSMdqpd3NWX7u746PZ++CII69CycGUOAG3NUEB7XQWyx0rTQ4x4RipJZIaawgIgur6qh3lBguoRs6/pOdYu3VCwOi8xfHXEScYcyj5yBCAL68c8Y26eN8fjTHm/uN33NTDzDyhQIaGd0yO2D3WSqiFBLyKJTZm6yWiRWIUhlN8B3BgCpBynIJUohNMh16POlo7Tsez2IdUwuZYZZoSuujbr0GYrspBYzTNtg6irVmquq44Q8AgBDjGro+cGO69piNPTOQ7yt+TonjnGNqM8Eqe8uVQRoOcJtqZI+iadJbuTlWgrGs+qIJp0ooFAxdSNGc8CiPziaaa9YhHsWKYuBMCnamkJIiKQJNSg2QsudAkIbBonXZgvnLFiUdLIFySPoSgZOE2iSlk1nJM271Aq1AwQrgGeFsgoJi7nbjkWRUbLeGqNUM/NwD7KgwVwbdGlh7cIBtNoKdhyYQHOaylAiqQBiAaJw4cfsOjrA/wZbP1rsKguhAXbhQ1KhVnFrqEVGKMQCVdT0F0GWE7tAtxaeFBhE4l0PK7fC545ZzU4VX2OgdgAOhnw9+fRGsXytCWXqjpxZu/pWj632cG+SekWzzUL3COrQCCoMirS7bQkXTxiUdL+joPK/jNsscAFgJu1vU8FXRLaUoB4i1h1FwPHnvaRR6EsvJbvAJ2IR1U5KrFmnCyWudCI7UgMsQYQq+Tk6CAEZFAMipxD4YoABKYEJWmgHYqs7q8ufk44JbsqwJqCFcVZMPajxioHCKZppC2k3GlA7rdA/YmocFgAuoV3HBKHLkSjkoPKk4OS8J0ETomRahSJnVjsL525syCxR31ACMlYrovq2lrxcJO+3PbntzTXT+fSSrfQBVrgEz0K4ZEVdlavyJapwjNGMg4KBoRHEbDk+Vm+NnXU1HipBuAOKr8RGE4EIl1sfW+zlzCjAVKvCQo7VJwcRdCJlQSBvdpUwdwg7Rtf4AkD1xvnkAkDdGkqBYoFZf6TchOgPVXZKTnWdD2NtqSI4YJaCIbpH4u0wi7AikYYuRMxQWqPJxwfuhbvEw4LSsyYoCrCE2cfUO+fzcEll23+pBJwoGXNdoQAc8kO4epc1rDwfBNQGaod/2BQDHo+QWiO40vTJlKCVAFIRrXRg4VZ2AZ3nXtkpMIJCVcAK4sH1Tb5nTXa3T29DS0/zevhbUceAID41nLYxq+RxSKADdIlBiKJeHGoR1A8FRcbJZvFq0C8hwVWHQusf+lV12tK3xxqtS/OB+R6aw7067Kinh+2bOZarTQt0goKUFOuP84Z+C/Q41O1uHV4JtIvU6VUkUhUQquC+CEJ01S5KUdkcU0bl3TDbd/FYVagGXpnkCtmA8GAJddxnO527vFbvEnaUO5AIPURHEdJuL8x5sfBhrZrJSrEtdAgOsA/ZEUtCcIhH1QI8XBv4bhQ3SJrbtBCXFi+DBPjfpaUJ0yNTs6pvbFUReBhqHoIcIX5/anpVvUe2FV6AAqsA26wC7yIWhZKiwEajDDUJJNEOgsd9vV8c4cANlF6JCPc3OL6cYfoaNVAMpRC7cYs61iA7ApKM3rkmHBgT8hcr06+Tb0iUazJZHMISVUFms1uxOzXJS6dXZBUPTZ9fX11yqbEroKRjUeBdxiwUREiJyJ0R5PXrzg/Dr/hS0Jix6bNZRog2BLSNrrnXXPbj9ANVbkOktE0IhEjzrkodR7aAdQE7Z8ZPGeFFIQEFeUvoFEFf7sqGe4mx9G2Hvxkyq+Xur1Xr6NkBDyCJ2GlBXdiw3MIG5WhAEgpNm0I1jIgsTaKgQ7bHRgpCYC6KohKcSoQIYSgIkOvIpo0Ma0wFuI+bXCnUOhFMLQI1dgGhAvQqEJaHDuG58mzzUnZ1CqIkKQaHFRFAU0Awe9EHdI1cRoQIOnK4XlDUe2gDyA2lcgvUSH2euL1mNENeGyt3xUu8VfiBjqdB2L3csor4QCBFSEGNuiUZF5VKhlbyS8IFxBkQrQ6IB6JCHM4LFnK1DAvVCV685uM08PNAAgfbk4DQWAQbONtGoABAXJD5O0rHKGm4SODMVUpiNCiDeA1XGoVFQEJaNL0EC1ltXRgS2EhY9g0BUBVqdBkDAWxQdJjr9zAmpqSgVrlS1vfGCR0QErWoipufyMXhV4O+919Qt/legdPtIJ85N54BKmt7eps+DDJFRkPCU9CWy05TfPg1yx7DkuBNgKKG9oYEAAlfVAylgSgoKCpstBEQRcJYMQe6Y6F3KGsvlZyYBS4Ad0bZXhrXjNH0CpbcUM8t/8T5rs97w4/DYl7NzN6qJoUJzbx4PRhBi3Cibi8B8xLbe3kzaRW7mPyNEaQFB46c4x0qIrqoBp0U9cNOJQ30F84FvIFk+kfEz2YGtacXA9ZlbCcnZyqCBEXYjICWhEMTfMLlBOAQNSHyypgyiY21M1raz1qQUVErl0UpNdEGrqG9VzXvkArsAK3QPCZSU332oAY6BVioBl0E3euREnfM66xc+roV5aLXQRqool/KaNBUBCbABXVcny20ERU3AUQK6xoKYmZkmkDKKojnHSiZQoAsKlIXBgN6qivl5iAAOwGubLRZ2lakiCZERR6fp+Tnot+P/ADpnmj9j+F8kufd33f8Ap5/8H//aAAgBAwMBPxD16NuEXwXavQKvQzsCPUedD7RjyjCN2r7GMAH3+yY+O2tyO6v5ZwalyAg7ETSJwn/g8tGhD4u18FfGPdDoJ7tL1RY6xxV0mXTwLT4BnmwGgKyCSpBAi10bYbwwek0RiFdUOHe1zTEgUJxq6eQa2JxmrcQXYzbBKk7yQw7IBEaI7ETSJw+jJvLADaqwAMsN2TsDFkk1uBpvNflWJAtYdMdgDUOP0ATbYD6rUvgfqO+BXEUQEKbNQ0jeKWZsbrMAosK5Us9XOb5cEPAza8/uODM0hUJ0dyCmrtwbj0CchVVgNVEY8MRmOeLXWpEIXYQVKVwcbLUl50rnBASzXoLBEsQ3sRe7XUzfjZgAUAJwIG6cHogOnNVMHnbBGvJkmcAOZyrlOUKtVuGE6HwMiidAqLSO8Nz3kPYnN/jDLLCHWFT5+2VSxkXeKzW8Eg4nvQlNW+mhtAuDzICCXjsISKlA9D6HHwoonuNwhn0ixFHsELDS9xgwsqsbb0wMXAok2+zKEWMrwql8ZNiq0uUBpIH1QWnNe90xSWtIEi604d9cp8ABSjmgU6FFxuRiyoGOrsAtZqBiBoIKtVwnZ3HOeKHsAiiOFA7RkLDoCBSvsgjmlDTUboSYtyQjsRKdQEByPf8AZ7ME+y5o9PtcVoIStTBm8WFzsHJqBILaHZBMoQg6NwVYc4y+8MLz5jixiKJ4pxFDTCghm0XQajtF7j1TqiuVc2Z6VuGlpPBG9bV6LqHrfUu/09G+9cwEEHFAi5K4/BGQhSYzTBsaGznJP6qcgbn4Xi55hSyQieEQIaBwhuU/YOhahBYk2BOMhfxjNDj5+1Q6XAuSceeBAEYEwASZAA3wZN9oN9FgG2VSxCiE0giXZbQqzGndGZugIUENCoKVwDQBXfem+8J7Zzxbi85AsqkhWzbquHsiySEHiiD7hi2s2FGt0guwsPf9mN0TmpZdlwHVGMjj0aC4sCy8irFHZ1pwImBPAQbOoR7gHbI4M93x607VKTCLEAj5N1tKBKtA6Mn/ALyf+833QL01XsERVSBLYgVpdBlipIzqjqdWjkOsb5RZlrrQ8ANeTjo1eYdUmkW9ViIJm9Nw1IRWchdgzej6h34o+j9EGi2ACOuEwJmOi0ciomyXMMAWXDkRddwb/A0YkQQK5HgDCLHM0oBilAVgo0lNjeAnKGQ9EDQUbHQILvaqpHiAe1Ru9h0XOBUkpLXJRXIYqwcU7SEgsEgBqILswDUKoBRyMIR2RQOcH07xyxUXbNsYF6oAgLo2sb8ZRR5uR5Qd8lIkDFShDewUpC39l76oWpR2imqQdMIAioqcqAqq6BXjRggGlfzjAswGoUfbJMYVVYB3V0HvhFiQKEUEDQg1RLkY5AaPt66I6bcPdU/OF4LTD2gGTEdWKIlBFEE1yZ+F5oSAU7WzpgVwkKl2oBT11vJEWmECECkNG06aw2i4EL2QJ8ejMC3ZR4CdDFSYTXlGQaUGWUHpm/nCY1Im7Mp4wTpvF6Xtp2qUDoGjpnAUdX7IPvv3xSriNhONkfYU75q9jsQFVhWF6vdz+w8jTfYIYzU6hQcIjR8jjc+SFwnFrXfy7Y0mKgj3Vq/P7KtQJHkRCPkTPbntyDzo4hEsISBTEkSUqEcJWTQy9A6nhEQSMyCHOuKCAMDpeVV3a/cyz1sGkgutW9z0ju+vAVgeVUANq6x14pXoGkhQcneK21FTsVAeRl55/QskvkTgF5DWzT6coL6c9AFUmgV6DgBEVmBXygFEuo8J6Jts1V3PosTq6+iDiSJWgBVQgxBQXeIs3NvWDhFizVKAPT8Yk+ih5EoBiO3wLgICiibE7n6EuHXb0JBA6U605MPiOIkeTTUbb54P06fjW2B4thUKrRc7L/MD3Leih757M6L1fjPIkDH4PCAenHZWFZKwurC+TJjsSjmyJRxoqiyhyww7c2WLSgN6AAxCJc1kFB5LqmcSnE7b3d4IFLeiuhMB7JEgq0IDTQbTkVyqfVWzAbRrAwChwXzUtwi2SiCi2itd4gOTKLcmhC3SlRwL6EYPBgxC60oNGm7nVn1BbwQwc9VTVdwCDBeSLjaigqnrrQMbCad4tokN3gUZBNka1CdK6wAqlXkba8kySNbsEdo7ZIsL0uDqB5bWtn7IdB8tDITqpkQaLy4VtiDyWROh0ByAWtMMD1Q9NaOiGg0amoS01SQ0gbhVh0wRg6ogpiiBDMtOo41JQJOASU2hUiBLvzjYZosI7Y4GBqU7TQAA1gJdzEyBiU6uQ1hyIDCZJUaQAkULyba2Rpg2TZdoeuGiohcZkTaJq3jvgQapEA+fdxEQimyIEBH6tFXuv6hr1er7DYs0ZqG01HWsngKqAO9ap6lfjA4EHkx1AnjW+mHBiHEdBlqxKb4CdxiiLBm9OwUTkCloPWaUpFQFBACClEoo0Uwieoq4zhjQYSty3JVT0s0LcxK9DQAmOpU0J7hDA0llw/8AJu799H2mBC6qYHBkGAEABAHH1ccahzAISRQO8UXTFniBydgXVsIaUklQBIEMU52KOlzkIF2XcFgKwWHbGLiCp7PeNIyJIZQoV9TFb8Fms2EZxngAl4SIDECoaEHAwRLXhREgLDYxPZWithdAYcAkC4bAEkhATRrRkglwUcVXB0YOgzbaomCBUqAFVXvkwPnSYpJQaQTQbzoFBXtEKGtk5I7y44Xxkki+Uu5QT5jiDAoqjqiptcfghgqpYGgVpFYFyy8DG9bQ6GoYIEw1IAwqgVZcFCzWGeABaKnVJGym1EyyWCWWOBZJQi03mvj9P9rZan0hLq54p/fvpo0vXPrZ19Tt/wCD/9k=',
                  width: 150,
                },
                [
                  {
                      text: `10 Jalan Besar, #15-02 Sim Lim Tower, \n  Singapore - 208787, , \n Email:arif@usoftsolutions.com`,
                      bold: true,
                      color: '#333333',
                      alignment: 'right',
                    },
                ],
              ],
            },
            {
              columns: [
                  {
                    text:'Reg No:201526293M'
                  },
                ],
            },
            {
              columns: [
                {
                  text: 'To',
                  color: '#aaaaab',
                  bold: true,
                  fontSize: 14,
                  alignment: 'left',
                  margin: [0, 20, 0, 5],
                },
                {
                  text: '',
                  color: '#aaaaab',
                  bold: true,
                  fontSize: 14,
                  alignment: 'right',
                  margin: [0, 20, 0, 5],
                }
              ],
            },
            {
              columns: [
                {
                  text: `${data[0].company_name} \n  ${data[0].billing_address_flat} \n  ${data[0].billing_address_street} \n  ${data[0].billing_address_country}  ${data[0].billing_address_po_code} \n  ${data[0].email}`,
                  color: '#333333',
                  alignment: 'left',
                },
                {
                  text: `date : ${data[0].creation_date.substring(1,10)} \n   ${data[0].quote_code}`,
                  bold: true,
                  color: '#333333',
                  alignment: 'right',
                }
              ],
            },
            '\n\n',
            {
              text: `${data[0].salutation} ${data[0].first_name}, \n\n\n Project:- ${data[0].project_reference} \n Dear Sir, \n\n With reference to the above captions, we would like to thank you for inviting us to quote for the above mentioned works and we are pleased to submit herewith our Value Quotation for you kind persual. \n\n`,
              style: 'subheader'
          },
            {
              layout: {
                defaultBorder: false,
                hLineWidth: ()=> {
                  return 1;
                },
                vLineWidth: ()=> {
                  return 1;
                },
                hLineColor: (i)=> {
                  if (i === 1 || i === 0) {
                    return '#bfdde8';
                  }
                  return '#eaeaea';
                },
                vLineColor: ()=> {
                  return '#eaeaea';
                },
                hLineStyle: ()=> {
                  // if (i === 0 || i === node.table.body.length) {
                  return null;
                  //}
                },
                // vLineStyle: function () { return {dash: { length: 10, space: 4 }}; },
                paddingLeft: ()=> {
                  return 10;
                },
                paddingRight: ()=> {
                  return 10;
                },
                paddingTop: ()=> {
                  return 2;
                },
                paddingBottom: ()=> {
                  return 2;
                },
                fillColor: ()=> {
                  return '#fff';
                },
              },
              table: {
                headerRows: 1,
                widths: ['5%','29%', '12%', '13%', '13%','13%', '13%'],
                body: tableData
              },
            },
            '\n',
            '\n\n',
            {
              layout: {
                defaultBorder: false,
                hLineWidth: ()=> {
                  return 1;
                },
                vLineWidth: ()=> {
                  return 1;
                },
                hLineColor: ()=> {
                  return '#eaeaea';
                },
                vLineColor: ()=> {
                  return '#eaeaea';
                },
                hLineStyle: ()=> {
                  // if (i === 0 || i === node.table.body.length) {
                  return null;
                  //}
                },
                // vLineStyle: function () { return {dash: { length: 10, space: 4 }}; },
                paddingLeft: ()=> {
                  return 10;
                },
                paddingRight: ()=> {
                  return 10;
                },
                paddingTop: ()=> {
                  return 3;
                },
                paddingBottom: ()=> {
                  return 3;
                },
                fillColor:()=> {
                  return '#fff';
                },
              },
              table: {
                headerRows: 1,
                widths: ['*', 'auto'],
                body:
                 [
                  [
                    {
                      text: 'Subtotal',
                      border: [false, true, false, true],
                      alignment: 'right',
                      margin: [0, 5, 0, 5],
                    },
                    {
                      border: [false, true, false, true],
                      text: total,
                      alignment: 'right',
                      fillColor: '#f5f5f5',
                      margin: [0, 5, 0, 5],
                    },
                  ],
                  [
                    {
                      text: 'GST 7%',
                      border: [false, false, false, true],
                      alignment: 'right',
                      margin: [0, 5, 0, 5],
                    },
                    {
                      text: gstAmount,
                      border: [false, false, false, true],
                      fillColor: '#f5f5f5',
                      alignment: 'right',
                      margin: [0, 5, 0, 5],
                    },
                  ],
                  [
                    {
                      text: 'Net Total',
                      bold: true,
                      fontSize: 20,
                      alignment: 'right',
                      border: [false, false, false, true],
                      margin: [0, 5, 0, 5],
                    },
                    {
                      text: total + gstAmount,
                      bold: true,
                      fontSize: 20,
                      alignment: 'right',
                      border: [false, false, false, true],
                      fillColor: '#f5f5f5',
                      margin: [0, 5, 0, 5],
                    },
                  ],
                ],
              },
            },
            '\n\n',
            {
              text: `TOTAL : ${NetTotal.toString()} ONLY \n\n`,
              style: 'subheader'
          },
          {
              text: 'Terms and Condition:-',
              style: 'notesTitle',
            },
            {
              text: `${data[0].condition} \n\n `,
              style: 'notesText',
            },
            '\n\n',
              {
                width: '100%',
                alignment: 'center',
                text: 'Thank You Very Much for your Business!',
                bold: true,
                margin: [0, 10, 0, 10],
                fontSize: 15,
              },
          ],
          styles: {
            notesTitle: {
              fontSize: 10,
              bold: true,
              margin: [0, 50, 0, 3],
            },
            notesText: {
              fontSize: 10,
            },
          },
          defaultStyle: {
            columnGap: 20,
            //font: 'Quicksand',
          },
          
        };
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(dd).open();
        
        //console.log(dd);
      }
      //Generate PDF
      const GeneratePdf = (quoteId)=>{
        api.post('tender/getQuotePDF',{quote_id:quoteId})
        .then((res)=>{
          makePdf(res.data.data)
        })
      }
  return (
    <>
    <BreadCrumbs heading={tenderDetails && tenderDetails.title} />

        <Form >
          <FormGroup>
          <ComponentCard title="Key Details | Code: O-1045">
              <Row>
              <Col md="3">
                  <FormGroup>
                  <Label>Project <span className='required'> *</span></Label>
                  <Input  type="text" onChange={handleInputs} value={tenderDetails && tenderDetails.title} name="title" />
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Ref No</Label>
                  <Input type="text" onChange={handleInputs} value={tenderDetails && tenderDetails.office_ref_no} name="office_ref_no"/>
                  </FormGroup>
              </Col>
              <Col md="3">
                  <FormGroup>
                  <Label>Company Name (OR) <Link to="" color="primary" onClick={addCompanyToggle.bind(null)}><b><u>Add New Company</u></b></Link></Label>
                  <Input type="select" onChange={(e)=> {
                    handleInputs(e)
                    getContact(e.target.value)
                  }} 
                    value={tenderDetails && tenderDetails.company_id} 
                    name="company_id">
                      <option value="" selected>Please Select</option>
                      {company && company.map((e)=>{
                        return  <option key={e.company_id} value={e.company_id} >{e.company_name}</option>

                    })}

          <Modal isOpen={addCompanyModal} toggle={addCompanyToggle.bind(null)}>
                <ModalHeader toggle={addCompanyToggle.bind(null)}>New Opportunity</ModalHeader>
                <ModalBody>
                  <Row>
                  <Col md="12">
                    <Card>
                      <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
                          New Company
                      </CardTitle>
                      <CardBody>
                        <Form>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <Label>Company Name <span className='required'> *</span></Label>
                                <Input type="text" name="company_name" 
                                onChange={companyhandleInputs}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label>Website</Label>
                                <Input type="text" name="website"
                                  onChange={companyhandleInputs}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label>Main Phone <span className='required'> *</span></Label>
                                <Input type="text" name="phone" 
                                onChange={companyhandleInputs}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label>Main Fax</Label>
                                <Input type="text" name="fax"
                                onChange={companyhandleInputs}
                              />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Form>
                      </CardBody>
                      <CardBody className="bg-light">
                        <CardTitle tag="h4" className="mb-0">
                          Address
                        </CardTitle>
                      </CardBody>
                      <CardBody>
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <Label>Address 1</Label>
                              <Input type="text" name="address_street" placeholder=" " 
                              onChange={companyhandleInputs}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="12">
                            <FormGroup>
                              <Label>Address 2</Label>
                              <Input type="text" name="address_town" placeholder=""  onChange={companyhandleInputs}
                                />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <Label>Post Code</Label>
                              <Input type="text" name="address_po_code" placeholder="" 
                              onChange={companyhandleInputs}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <Label>Country <span className='required'> *</span></Label>
                              <Input type="select" name="address_country" 
                              onChange={companyhandleInputs}
                              >
                              <option value="" selected="selected">Please Select</option>
                              <option value="AF">Afghanistan</option>
                              <option value="AX">Aland Islands</option>
                              <option value="AL">Albania</option>
                              <option value="DZ">Algeria</option>
                              <option value="AS">American Samoa</option>
                              <option value="AD">Andorra</option>
                              <option value="AO">Angola</option>
                              <option value="AI">Anguilla</option>
                              <option value="A1">Anonymous Proxy</option>
                              <option value="AQ">Antarctica</option>
                              <option value="AG">Antigua and Barbuda</option>
                              <option value="AR">Argentina</option>
                              <option value="AM">Armenia</option>
                              <option value="AW">Aruba</option>
                              <option value="AP">Asia/Pacific Region</option>
                              <option value="AU">Australia</option>
                              <option value="AT">Austria</option>
                              <option value="AZ">Azerbaijan</option>
                              <option value="BS">Bahamas</option>
                              <option value="BH">Bahrain</option>
                              <option value="BD">Bangladesh</option>
                              <option value="BB">Barbados</option>
                              <option value="BY">Belarus</option>
                              <option value="BE">Belgium</option>
                              <option value="BZ">Belize</option>
                              <option value="BJ">Benin</option>
                              <option value="BM">Bermuda</option>
                              <option value="BT">Bhutan</option>
                              <option value="BO">Bolivia</option>
                              <option value="BA">Bosnia and Herzegovina</option>
                              <option value="BW">Botswana</option>
                              <option value="BV">Bouvet Island</option>
                              <option value="BR">Brazil</option>
                              <option value="IO">British Indian Ocean Territory</option>
                              <option value="BN">Brunei Darussalam</option>
                              <option value="BG">Bulgaria</option>
                              <option value="BF">Burkina Faso</option>
                              <option value="BI">Burundi</option>
                              <option value="KH">Cambodia</option>
                              <option value="CM">Cameroon</option>
                              <option value="CA">Canada</option>
                              <option value="CV">Cape Verde</option>
                              <option value="KY">Cayman Islands</option>
                              <option value="CF">Central African Republic</option>
                              <option value="TD">Chad</option>
                              <option value="CL">Chile</option>
                              <option value="CN">China</option>
                              <option value="CX">Christmas Island</option>
                              <option value="CC">Cocos (Keeling) Islands</option>
                              <option value="CO">Colombia</option>
                              <option value="KM">Comoros</option>
                              <option value="CG">Congo</option>
                              <option value="CD">Congo, The Democratic Republic of the</option>
                              <option value="CK">Cook Islands</option>
                              <option value="CR">Costa Rica</option>
                              <option value="CI">Cote dIvoire</option>
                              <option value="HR">Croatia</option>
                              <option value="CU">Cuba</option>
                              <option value="CY">Cyprus</option>
                              <option value="CZ">Czech Republic</option>
                              <option value="DK">Denmark</option>
                              <option value="DJ">Djibouti</option>
                              <option value="DM">Dominica</option>
                              <option value="DO">Dominican Republic</option>
                              <option value="EC">Ecuador</option>
                              <option value="EG">Egypt</option>
                              <option value="SV">El Salvador</option>
                              <option value="GQ">Equatorial Guinea</option>
                              <option value="ER">Eritrea</option>
                              <option value="EE">Estonia</option>
                              <option value="ET">Ethiopia</option>
                              <option value="EU">Europe</option>
                              <option value="FK">Falkland Islands (Malvinas)</option>
                              <option value="FO">Faroe Islands</option>
                              <option value="FJ">Fiji</option>
                              <option value="FI">Finland</option>
                              <option value="FR">France</option>
                              <option value="GF">French Guiana</option>
                              <option value="PF">French Polynesia</option>
                              <option value="TF">French Southern Territories</option>
                              <option value="GA">Gabon</option>
                              <option value="GM">Gambia</option>
                              <option value="GE">Georgia</option>
                              <option value="DE">Germany</option>
                              <option value="GH">Ghana</option>
                              <option value="GI">Gibraltar</option>
                              <option value="GR">Greece</option>
                              <option value="GL">Greenland</option>
                              <option value="GD">Grenada</option>
                              <option value="GP">Guadeloupe</option>
                              <option value="GU">Guam</option>
                              <option value="GT">Guatemala</option>
                              <option value="GG">Guernsey</option>
                              <option value="GN">Guinea</option>
                              <option value="GW">Guinea-Bissau</option>
                              <option value="GY">Guyana</option>
                              <option value="HT">Haiti</option>
                              <option value="HM">Heard Island and McDonald Islands</option>
                              <option value="VA">Holy See (Vatican City State)</option>
                              <option value="HN">Honduras</option>
                              <option value="HK">Hong Kong</option>
                              <option value="HU">Hungary</option>
                              <option value="IS">Iceland</option>
                              <option value="IN">India</option>
                              <option value="ID">Indonesia</option>
                              <option value="IR">Iran, Islamic Republic of</option>
                              <option value="IQ">Iraq</option>
                              <option value="IE">Ireland</option>
                              <option value="IM">Isle of Man</option>
                              <option value="IL">Israel</option>
                              <option value="IT">Italy</option>
                              <option value="JM">Jamaica</option>
                              <option value="JP">Japan</option>
                              <option value="JE">Jersey</option>
                              <option value="JO">Jordan</option>
                              <option value="KZ">Kazakhstan</option>
                              <option value="KE">Kenya</option>
                              <option value="KI">Kiribati</option>
                              <option value="KP">Korea, Democratic Peoples Republic of</option>
                              <option value="KR">Korea, Republic of</option>
                              <option value="KW">Kuwait</option>
                              <option value="KG">Kyrgyzstan</option>
                              <option value="LA">Lao Peoples Democratic Republic</option>
                              <option value="LV">Latvia</option>
                              <option value="LB">Lebanon</option>
                              <option value="LS">Lesotho</option>
                              <option value="LR">Liberia</option>
                              <option value="LY">Libyan Arab Jamahiriya</option>
                              <option value="LI">Liechtenstein</option>
                              <option value="LT">Lithuania</option>
                              <option value="LU">Luxembourg</option>
                              <option value="MO">Macao</option>
                              <option value="MK">Macedonia</option>
                              <option value="MG">Madagascar</option>
                              <option value="MW">Malawi</option>
                              <option value="MY">Malaysia</option>
                              <option value="MV">Maldives</option>
                              <option value="ML">Mali</option>
                              <option value="MT">Malta</option>
                              <option value="MH">Marshall Islands</option>
                              <option value="MQ">Martinique</option>
                              <option value="MR">Mauritania</option>
                              <option value="MU">Mauritius</option>
                              <option value="YT">Mayotte</option>
                              <option value="MX">Mexico</option>
                              <option value="FM">Micronesia, Federated States of</option>
                              <option value="MD">Moldova, Republic of</option>
                              <option value="MC">Monaco</option>
                              <option value="MN">Mongolia</option>
                              <option value="ME">Montenegro</option>
                              <option value="MS">Montserrat</option>
                              <option value="MA">Morocco</option>
                              <option value="MZ">Mozambique</option>
                              <option value="MM">Myanmar</option>
                              <option value="NA">Namibia</option>
                              <option value="NR">Nauru</option>
                              <option value="NP">Nepal</option>
                              <option value="NL">Netherlands</option>
                              <option value="AN">Netherlands Antilles</option>
                              <option value="NC">New Caledonia</option>
                              <option value="NZ">New Zealand</option>
                              <option value="NI">Nicaragua</option>
                              <option value="NE">Niger</option>
                              <option value="NG">Nigeria</option>
                              <option value="NU">Niue</option>
                              <option value="NF">Norfolk Island</option>
                              <option value="MP">Northern Mariana Islands</option>
                              <option value="NO">Norway</option>
                              <option value="OM">Oman</option>
                              <option value="PK">Pakistan</option>
                              <option value="PW">Palau</option>
                              <option value="PS">Palestinian Territory</option>
                              <option value="PA">Panama</option>
                              <option value="PG">Papua New Guinea</option>
                              <option value="PY">Paraguay</option>
                              <option value="PE">Peru</option>
                              <option value="PH">Philippines</option>
                              <option value="PN">Pitcairn</option>
                              <option value="PL">Poland</option>
                              <option value="PT">Portugal</option>
                              <option value="PR">Puerto Rico</option>
                              <option value="QA">Qatar</option>
                              <option value="RE">Reunion</option>
                              <option value="RO">Romania</option>
                              <option value="RU">Russian Federation</option>
                              <option value="RW">Rwanda</option>
                              <option value="SH">Saint Helena</option>
                              <option value="KN">Saint Kitts and Nevis</option>
                              <option value="LC">Saint Lucia</option>
                              <option value="PM">Saint Pierre and Miquelon</option>
                              <option value="VC">Saint Vincent and the Grenadines</option>
                              <option value="WS">Samoa</option>
                              <option value="SM">San Marino</option>
                              <option value="ST">Sao Tome and Principe</option>
                              <option value="A2">Satellite Provider</option>
                              <option value="SA">Saudi Arabia</option>
                              <option value="SN">Senegal</option>
                              <option value="RS">Serbia</option>
                              <option value="SC">Seychelles</option>
                              <option value="SL">Sierra Leone</option>
                              <option value="SG">Singapore</option>
                              <option value="SK">Slovakia</option>
                              <option value="SI">Slovenia</option>
                              <option value="SB">Solomon Islands</option>
                              <option value="SO">Somalia</option>
                              <option value="ZA">South Africa</option>
                              <option value="GS">South Georgia and the South Sandwich Islands</option>
                              <option value="ES">Spain</option>
                              <option value="LK">Sri Lanka</option>
                              <option value="SD">Sudan</option>
                              <option value="SR">Suriname</option>
                              <option value="SJ">Svalbard and Jan Mayen</option>
                              <option value="SZ">Swaziland</option>
                              <option value="SE">Sweden</option>
                              <option value="CH">Switzerland</option>
                              <option value="SY">Syrian Arab Republic</option>
                              <option value="TW">Taiwan</option>
                              <option value="TJ">Tajikistan</option>
                              <option value="TZ">Tanzania, United Republic of</option>
                              <option value="TH">Thailand</option>
                              <option value="TL">Timor-Leste</option>
                              <option value="TG">Togo</option>
                              <option value="TK">Tokelau</option>
                              <option value="TO">Tonga</option>
                              <option value="TT">Trinidad and Tobago</option>
                              <option value="TN">Tunisia</option>
                              <option value="TR">Turkey</option>
                              <option value="TM">Turkmenistan</option>
                              <option value="TC">Turks and Caicos Islands</option>
                              <option value="TV">Tuvalu</option>
                              <option value="UG">Uganda</option>
                              <option value="UA">Ukraine</option>
                              <option value="AE">United Arab Emirates</option>
                              <option value="GB">United Kingdom</option>
                              <option value="US">United States</option>
                              <option value="UM">United States Minor Outlying Islands</option>
                              <option value="UY">Uruguay</option>
                              <option value="UZ">Uzbekistan</option>
                              <option value="VU">Vanuatu</option>
                              <option value="VE">Venezuela</option>
                              <option value="VN">Vietnam</option>
                              <option value="VG">Virgin Islands, British</option>
                              <option value="VI">Virgin Islands, U.S.</option>
                              <option value="WF">Wallis and Futuna</option>
                              <option value="EH">Western Sahara</option>
                              <option value="YE">Yemen</option>
                              <option value="ZM">Zambia</option>
                              </Input>
                            </FormGroup>
                          </Col>
                        </Row>
                      </CardBody>
                      <CardBody>
                        <Form>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <Label>Supplier Type</Label>
                                <Input type="select" name="supplier_type" 
                                onChange={companyhandleInputs}
                                >
                                  <option value="" selected="selected">Please Select</option>
                                  <option value="2nd middle man">2nd middle man</option>
                                  <option value="3rd middle man">3rd middle man</option>
                                  <option value="Broker">Broker</option>
                                  <option value="Retailer">Retailer</option>
                                  <option value="Wholesaler">Wholesaler</option>
                              </Input>
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label>Industry</Label>
                                <Input type="select" name="industry" 
                                onChange={companyhandleInputs}
                                >
                                  <option value="" selected="selected">Please Select</option>
                                  <option value="Creative">Creative</option>
                                  <option value="Education">Education</option>
                                  <option value="Financial">Financial</option>
                                  <option value="Jewellery">Jewellery</option>
                                  <option value="Legal">Legal</option>
                                  <option value="Management">Management</option>
                                  <option value="Media">Media</option>
                                  <option value="Medical">Medical</option>
                                  <option value="Money Exchange">Money Exchange</option>
                                  <option value="Organisation">Organisation</option>
                                  <option value="Others">Others</option>
                                  <option value="Property">Property</option>
                                  <option value="Real Estate">Real Estate</option>
                                  <option value="Retail b2b">Retail b2b</option>
                                  <option value="Retail b2c">Retail b2c</option>
                                  <option value="Service">Service</option>
                                  <option value="Software">Software</option>
                                  <option value="Technology">Technology</option>
                                  <option value="Telecom">Telecom</option>
                                  <option value="Trading">Trading</option>
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label>Company Size</Label>
                                <Input type="select" name="company_size" 
                                onChange={companyhandleInputs}
                                >
                                  <option value="" selected="selected">Please Select</option>
                                  <option value="Large">Large</option>
                                  <option value="Medium">Medium</option>
                                  <option value="Small">Small</option>
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label>Company Source</Label>
                                <Input type="select" name="source" 
                                onChange={companyhandleInputs}
                                >
                                  <option value="" selected="selected">Please Select</option>
                                  <option value="Agency">Agency</option>
                                  <option value="Direct">Direct</option>
                                  <option value="Referral">Referral</option>
                                </Input>
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
                  <Button color="primary"  onClick={()=>{
                    insertCompany()
                  }} >
                    Save & Continue
                  </Button>
                  <Button color="secondary" onClick={addCompanyToggle.bind(null)}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal> 
                      </Input>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Contact (OR) <Link to="" color="primary" onClick={addContactToggle.bind(null)}><b><u>Add New Contact</u></b></Link> </Label>
                        <Input type="select" onChange={handleInputs} value={tenderDetails && tenderDetails.contact_id} name="contact_id" >
                        <option value="" selected>Please Select</option>
                        {contact && contact.map((e)=>{
                        return  <option key={e.contact_id} value={e.contact_id} >{e.first_name}</option>

                      })}

                        <Modal isOpen={addContactModal} toggle={addContactToggle.bind(null)}>
                          <ModalHeader toggle={addContactToggle.bind(null)}>New Contact</ModalHeader>
                          <ModalBody>
                            <Row>
                            <Col md="12">
                              <Card>
                                <CardBody>
                                  <Form>
                                    <Row>
                                    <Col md="12">
                                      <FormGroup>
                                        <Label>Title</Label>
                                        <Input type="select" name="salutation" onChange={handleAddNewContact}>
                                          <option value="" selected="selected">Please Select</option>
                                          <option value="Ms">Ms</option>
                                          <option value="Mr">Mr</option>
                                          <option value="Mrs">Mrs</option>
                                        </Input>
                                      </FormGroup>
                                    </Col>
                                      <Col md="12">
                                        <FormGroup>
                                          <Label>Name</Label>
                                          <Input type="text" name="first_name" onChange={handleAddNewContact}/>
                                        </FormGroup>
                                      </Col>
                                      <Col md="12">
                                        <FormGroup>
                                          <Label>Email</Label>
                                          <Input type="text" name="email" onChange={handleAddNewContact}/>
                                        </FormGroup>
                                      </Col>
                                      <Col md="12">
                                        <FormGroup>
                                          <Label>Position</Label>
                                          <Input type="text" name="position" onChange={handleAddNewContact}/>
                                        </FormGroup>
                                      </Col>
                                      <Col md="12">
                                        <FormGroup>
                                          <Label>Department</Label>
                                          <Input type="text" name="department" onChange={handleAddNewContact}/>
                                        </FormGroup>
                                      </Col>
                                      <Col md="12">
                                        <FormGroup>
                                          <Label>Phone (Direct)</Label>
                                          <Input type="number" name="phone_direct" onChange={handleAddNewContact}/>
                                        </FormGroup>
                                      </Col>
                                      <Col md="12">
                                        <FormGroup>
                                          <Label>Fax (Direct)</Label>
                                          <Input type="number" name="fax" onChange={handleAddNewContact}/>
                                        </FormGroup>
                                      </Col>
                                      <Col md="12">
                                        <FormGroup>
                                          <Label>Mobile</Label>
                                          <Input type="number" name="mobile" onChange={handleAddNewContact}/>
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
                            <Button color="primary" onClick={()=>{
                                AddNewContact()
                              }}>
                              Submit
                            </Button>
                            <Button color="secondary" onClick={addContactToggle.bind(null)}>
                              Cancel
                            </Button>
                          </ModalFooter>
                        </Modal>

                    </Input>
                        </FormGroup>
                    </Col>
                    </Row>
              
                    <Row>
                    
                    <Col md="3">
                        <FormGroup>
                        <Label>Mode of submission</Label>
                        <Input type="text" value={tenderDetails && tenderDetails.mode_of_submission} onChange={handleInputs} name="mode_of_submission" />
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Services</Label>
                        <Input type="text" onChange={handleInputs} value={tenderDetails && tenderDetails.services} name="services"/>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Project Start Date</Label>
                            <Input type="date" onChange={handleInputs} value={tenderDetails && tenderDetails.site_show_date} name="site_show_date"/>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Project End Date</Label>
                        <Input value={tenderDetails && tenderDetails.project_end_date} type="date" 
                        onChange={handleInputs} name="project_end_date" />
                        </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    
                    <Col md="3">
                        <FormGroup>
                        <Label>Project Incharge</Label>
                        <Input type="select" value={tenderDetails && tenderDetails.site_show_attendee} onChange={handleInputs} name="site_show_attendee">
                            <option value="" selected="selected">Please Select</option>
                           {incharge && incharge.map((e)=>{
                            return(
                              <option value={e.company_id} key={e.first_name}>{e.first_name}</option>
                            )
                           })} 
                         </Input>

                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Actual Submission Date</Label>
                        <Input type="date" value={tenderDetails && tenderDetails.actual_submission_date} onChange={handleInputs} name="actual_submission_date"/>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label> Status <span className='required'> *</span></Label>
                        <Input value={tenderDetails && tenderDetails.status} type="select" onChange={handleInputs} name="status">
                            <option value="">Please Select</option><option value="In Progress">In Progress</option>
                            <option value="Waiting for Approval">Waiting for Approval</option>
                            <option value="Submitted">Submitted</option>
                            <option value="Follow-up">Follow-up</option>
                            <option value="Awarded">Awarded</option>
                            <option value="Not Awarded">Not Awarded</option>
                            <option value="Enquiry">Enquiry</option>
                            <option value="Cancelled">Cancelled</option>
                            <option selected="selected" value="Converted to Project">Converted to Project</option>
                        </Input>

                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Email</Label>
                        <Input type="text" value={tenderDetails && tenderDetails.email} onChange={handleInputs} name="email"/>
                        </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col md="3">
                        <FormGroup>
                        <Label>Price</Label>
                        <Input onChange={handleInputs} type="text" value={tenderDetails && tenderDetails.price} name="price">
                            
                        </Input>
                        </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                        <Button onClick={()=>{
                           editTenderData()
                        }} type="button" className="btn btn-success mr-2">
                        Save & Continue
                        </Button>
                        <Button type="submit" className="btn btn-dark">
                        Cancel
                        </Button>
                     </div>
                    </Row>
                </ComponentCard>
                </FormGroup> 
        </Form>

        <ComponentCard title="More Details">
          <ToastContainer></ToastContainer>

          <Modal isOpen={editCostingSummaryModel} toggle={editCostingSummaryToggle.bind(null)}>
            <ModalHeader toggle={editCostingSummaryToggle.bind(null)}>Edit Costing Summary</ModalHeader>
            <ModalBody>
              <Row>
              <Col md="12">
                <Card>
                  <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
                    Edit Costing Summary
                  </CardTitle>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col md="4">
                          <FormGroup>
                            <Label>No. of Worker Used</Label>
                            <Input type="number" onChange={handleCostingSummeryInputs} defaultValue={costingsummary && costingsummary.no_of_worker_used} name="no_of_worker_used"/>
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Label>No. of Days Worked</Label>
                            <Input type="number" onChange={handleCostingSummeryInputs} defaultValue={costingsummary && costingsummary.no_of_days_worked} name="no_of_days_worked"/>
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Label>Labout Rates Per Day</Label>
                            <Input type="number" onChange={handleCostingSummeryInputs} defaultValue={costingsummary && costingsummary.labour_rates_per_day} name="labour_rates_per_day"/>
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Label>Total Price (S$ W/o GST)</Label>
                            <Input type="number" onChange={handleCostingSummeryInputs} defaultValue={costingsummary && costingsummary.invoiced_price} name="invoiced_price" />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Label>Profit Margin %</Label>
                            <Input type="number" disabled onChange={handleCostingSummeryInputs} defaultValue={costingsummary && costingsummary.profit_percentage} name="profit_percentage" />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Label>Profit Margin</Label>
                            <Input type="number" disabled name="profit" onChange={handleCostingSummeryInputs} defaultValue={costingsummary && costingsummary.profit} tabindex="-1"/>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  <CardBody className="bg-light">
                    <CardTitle tag="h4" className="mb-0">
                      
                    </CardTitle>
                  </CardBody>
                  <CardBody>
                    <Row>
                    <Col md="4">
                      <FormGroup>
                          <Label>Total Material</Label>
                          <Input type="number" disabled onChange={handleCostingSummeryInputs} defaultValue={costingsummary && costingsummary.total_material_price} name="total_material_price"/>
                      </FormGroup>
                      </Col>
                      {/* <Col md="3">
                      <FormGroup>
                          <Label>Transport Charges %</Label>
                          <Input type="text" value={costingsummary && costingsummary.transport_charges_percentage}/>
                      </FormGroup>
                      </Col> */}
                      <Col md="4">
                      <FormGroup>
                          <Label>Transport Charges </Label>
                          <Input type="number" onChange={handleCostingSummeryInputs} defaultValue={costingsummary && costingsummary.transport_charges} name="transport_charges"/>
                      </FormGroup>
                      </Col>
                      <Col md="4">
                      <FormGroup>
                          <Label>Total Labour Charges</Label>
                          <Input type="number" disabled onChange={handleCostingSummeryInputs} defaultValue={costingsummary && costingsummary.total_labour_charges} name="total_labour_charges"/>
                      </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    {/* <Col md="3">
                      <FormGroup>
                          <Label>Salesman Commission %</Label>
                          <Input type="text" value={costingsummary && costingsummary.salesman_commission_percentage}/>
                      </FormGroup>
                      </Col> */}
                      <Col md="4">
                      <FormGroup>
                          <Label>Salesman Commission </Label>
                          <Input type="number" onChange={handleCostingSummeryInputs} defaultValue={costingsummary && costingsummary.salesman_commission} name="salesman_commission"/>
                      </FormGroup>
                      </Col>
                      {/* <Col md="3">
                      <FormGroup>
                          <Label>Finance Charges % </Label>
                          <Input type="text" value={costingsummary && costingsummary.finance_charges_percentage} />
                      </FormGroup>
                      </Col> */}
                      <Col md="4">
                      <FormGroup>
                          <Label>Finance Charges </Label>
                          <Input type="number" onChange={handleCostingSummeryInputs} defaultValue={costingsummary && costingsummary.finance_charges} name="finance_charges"/>
                      </FormGroup>
                      </Col>
                      <Col md="4">
                      <FormGroup>
                          <Label>Office Overheads </Label>
                          <Input type="number" onChange={handleCostingSummeryInputs} defaultValue={costingsummary && costingsummary.office_overheads} name="office_overheads" />
                      </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    {/* <Col md="3">
                      <FormGroup>
                          <Label>Office Overheads %</Label>
                          <Input type="text" value={costingsummary && costingsummary.office_overheads_percentage}/>
                      </FormGroup>
                      </Col> */}
                    
                      <Col md="4">
                      <FormGroup>
                          <Label>Other Charges </Label>
                          <Input type="number" onChange={handleCostingSummeryInputs} value={costingsummary && costingsummary.other_charges} name="other_charges"/>
                      </FormGroup>
                      </Col>
                      <Col md="4">
                      <FormGroup>
                          <Label>TOTAL COST</Label>
                          <Input type="number" disabled onChange={handleCostingSummeryInputs} value={costingsummary && costingsummary.total_cost} name="total_cost"/>
                      </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardBody>
                  <CardTitle className="mb-0 bg-light">
                  
                    </CardTitle>
                
                  </CardBody>
                </Card>
              </Col>
              </Row>  
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={()=>{
                    EditCostingSummary();
                  //editCostingSummaryToggle.bind(null)
                }
              }
                >
                Submit
              </Button>
              <Button color="secondary" onClick={editCostingSummaryToggle.bind(null)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal> 

          <Modal isOpen={quotationsModal} toggle={quotationstoggle.bind(null)}>
            <ModalHeader toggle={quotationstoggle.bind(null)}>Quote History</ModalHeader>
            <ModalBody>
              <Row>
              <Col md="12">
                <Card>
                  <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
                    Quote History
                  </CardTitle>
                  <CardBody>
                  
                  </CardBody>
                </Card>
              </Col>
              </Row>  
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={quotationstoggle.bind(null)}>
                Submit
              </Button>
              <Button color="secondary" onClick={quotationstoggle.bind(null)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal> 

          <Nav tabs>
            <NavItem>
              <NavLink
                className={activeTab === '1' ? 'active' : ''}
                onClick={() => {
                  toggle('1');
                }}
              >
                Costing Summary
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === '2' ? 'active' : ''}
                onClick={() => {
                  toggle('2');
                }}
              >
                Quotations
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === '3' ? 'active' : ''}
                onClick={() => {
                  toggle('3');
                }}
              >
                Attachment
              </NavLink>
            </NavItem>
          
          </Nav>

          <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col md="12" className='mb-4'>
                  <Button color="primary" onClick={()=>{
                    setEditCostingSummaryModel(true)
                  }}
                    >Edit Costing Summary</Button>
              </Col>
            </Row>
            <Row>
              <Col md="3"><FormGroup><h3>Costing Summary</h3> </FormGroup></Col>
              <Col md="3"><FormGroup><Label>Total Cost : {costingsummary && costingsummary.total_cost}</Label> </FormGroup></Col>
              <Col md="3"><FormGroup><Label>PO Price (S$ W/o GST) : {costingsummary && costingsummary.po_price}</Label> </FormGroup></Col>
              <Col md="3"><FormGroup><Label>Profit Margin : {costingsummary && costingsummary.profit_percentage} %</Label> </FormGroup></Col>
            </Row>
            <hr/>
            <Row>
            <Col md="3">
                <FormGroup>
                <Label>Total Material</Label>
                <br/>
                <span>{costingsummary && costingsummary.total_material_price}</span>
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                <Label>Transport Charges</Label>
                <br/>
                <span>{costingsummary && costingsummary.transport_charges}</span>
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                <Label>Total Labour Charges</Label>
                <br/>
                <span>{costingsummary && costingsummary.total_labour_charges}</span>
                </FormGroup>
            </Col>
           
            <Col md="3">
                <FormGroup>
                <Label>Salesman Commission</Label>
                <br/>
                <span>{costingsummary && costingsummary.salesman_commission}</span>
                </FormGroup>
            </Col>
            </Row>
            <br/>
            <Row>
            <Col md="3">
                <FormGroup>
                <Label> Finance Charges </Label>
                <br/>
                <span>{costingsummary && costingsummary.finance_charges}</span>
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                <Label>Office Overheads</Label>
                <br/>
                <span>{costingsummary && costingsummary.office_overheads}</span>
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                <Label>Other Charges</Label>
                <br/>
                <span>{costingsummary && costingsummary.other_charges}</span>
                </FormGroup>
            </Col>
           
            <Col md="3">
                <FormGroup>
                <Label> TOTAL COST </Label>
                <br/>
                <span>{costingsummary && costingsummary.total_cost}</span>
                </FormGroup>
            </Col>
            </Row>
          </TabPane>
          
          <TabPane tabId="2">

              <Row>
                  <Col md="3" className='mb-4 d-flex justify-content-between'>
                    <h3>Quotations </h3> 
                    <Button color="primary" onClick={quotationstoggle.bind(null)}>View Quote Log</Button>
                  </Col>
              </Row>


            <Form>
                <Row>
                  <Col><FormGroup><Label>Revision</Label> </FormGroup></Col>
                  <Col><FormGroup><Label>Quote Code</Label> </FormGroup></Col>
                  <Col><FormGroup><Label>Quote Date</Label> </FormGroup></Col>
                  <Col><FormGroup><Label>Quote Status</Label> </FormGroup></Col>
                  <Col md="1"><FormGroup><Label>Discount</Label> </FormGroup></Col>
                  <Col md="1"><FormGroup><Label>Amount</Label> </FormGroup></Col>
                  <Col><FormGroup><Label></Label> </FormGroup></Col>
                  <Col><FormGroup><Label>Action</Label> </FormGroup></Col>
                </Row>
                <Row>
                <Col>
                  <FormGroup></FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                      <span>{quote && quote.quote_code}</span>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                      <Label>{quote && quote.quote_date}</Label>
                  </FormGroup>
                </Col>
                <Col >
                  <FormGroup>
                      <Label>{quote && quote.quote_status}</Label>
                  </FormGroup>
                </Col>
                <Col md="1">
                  <FormGroup>
                      <Label>{quote && quote.discount}</Label>
                  </FormGroup>
                </Col>
                <Col md="1">
                  <FormGroup>
                      <Label>{quote && quote.total_amount}</Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                      <Label><u onClick={ () => {
                          getLineItem(quote.quote_id)
                      }
                      }>View Line Items</u></Label>

                      <Modal isOpen={viewLineModal} toggle={viewLineToggle.bind(null)}>
                            <ModalHeader toggle={viewLineToggle.bind(null)}>Line Items</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                <table className='lineitem'>
                                  
                                  <thead>
                                    <tr>
                                      <th scope="col">Title	</th>
                                      <th scope="col">Description	</th>
                                      <th scope="col">Qty</th>
                                      <th scope="col">Unit Price</th>
                                      <th scope="col">Amount</th>
                                      <th scope="col">Updated By</th>
                                      <th scope="col">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {lineItem && lineItem.map((e)=>{
                                      return(
                                        <tr>
                                            <td data-label="Title">{e.title}</td>
                                            <td data-label="Description">{e.description}</td>
                                            <td data-label="Qty">{e.quantity}</td>
                                            <td data-label="Unit Price">{e.unit_price}</td>
                                            <td data-label="Amount">{e.amount}</td>
                                            <td data-label="Updated By">{e.created_by}</td>
                                            <td data-label="Action"><Link to=""><span onClick={()=>{
                                              deleteRecord(e.quote_items_id)
                                            }}><Icon.Trash2 /></span></Link></td>
                                        </tr>
                                      )
                                        
                                    })}
                                   
                                  </tbody>
                                </table>
                                </FormGroup>
                            </ModalBody>
                        </Modal>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    {quote && (<button type='button' onClick={()=>{
                      GeneratePdf(quote.quote_id)
                    }}><Label>Generate Pdf</Label></button>)}
                  </FormGroup>
                </Col>
                </Row>
            </Form>
      </TabPane>


      <TabPane tabId="3">
                <Row>
                <Col xs="12" md="3">
                    <ComponentCard title="Attachments">
                        <Button color="primary" onClick={attachmentToggle.bind(null)}>
                            Add
                        </Button>
                        <Modal isOpen={attachmentModal} toggle={attachmentToggle.bind(null)}>
                            <ModalHeader toggle={attachmentToggle.bind(null)}>Upload Media</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label htmlFor="exampleFile">Select Files</Label>
                                    <Input type="file" placeholder="" />
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={attachmentToggle.bind(null)}>Upload</Button>
                            </ModalFooter>
                        </Modal>
                    </ComponentCard>
                </Col>
                </Row>
               
          </TabPane>
          
          </TabContent>
          
        </ComponentCard>
    </>
  )
};

export default TenderEdit;