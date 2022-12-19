import React,{useEffect,useState} from 'react';
import * as Icon from 'react-feather';
import {Row,Col,Button } from 'reactstrap';
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import "datatables.net-buttons/js/buttons.colVis"
import "datatables.net-buttons/js/buttons.flash"
import "datatables.net-buttons/js/buttons.html5"
import "datatables.net-buttons/js/buttons.print"
import { Link } from 'react-router-dom';
import api from '../../constants/api';


const Accounts = () => {
    const [accounts,setAccounts] = useState(null);
    const getAccounts = () =>{
      api.get('/accounts/getAccounts')
        .then((res)=> {
          setAccounts(res.data.data)
            console.log(res.data.data)
        })
    }

    useEffect(() => {
        setTimeout(() => {
            $('#example').DataTable(
                {
                    pagingType: 'full_numbers',
                      pageLength: 20,
                      processing: true,
                      dom: 'Bfrtip',
                          buttons: ['csv', 'print'
                          ]
                }
            );
            } ,
            1000
            );
    
            getAccounts()

    }, [])
    

   const columns = [
        {
          name: "id",
          selector: "expense_id",
          grow:0,
          wrap: true,
          width:'4%'
        },
        {
            name: 'Edit',
            selector: "edit",
            cell: () => <Icon.Edit2 />,
            grow:0,
            width:'auto',
            button:true,
            sortable:false,
        },
        {
            name:'Del',
            selector: "delete",
            cell: () => <Icon.Trash />,
            grow:0,
            width:'auto',
            wrap: true
        },
        {
          name: "Date",
          selector: "date",
          sortable: true,
          grow:0,
          wrap: true
        },
        {
          name: "Description",
          selector: "description",
          sortable: true,
          grow:2,
          wrap: true
        },
        {
          name: "Amount",
          selector: "amount",
          sortable: true,
          grow:0,
        },
        {
            name: "Type",
            selector: "type",
            sortable: true,
            width:'auto',
            grow:3,
            // cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "Head",
            selector: "group",
            sortable: true,
            grow:2,
            width:'auto',
            // cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "Sub Head",
            selector: "sub_group",
            sortable: true,
            grow:2,
            wrap: true,
            // cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "Status",
            selector: "payment_status",
            sortable: true,
            width:'auto',
            // cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "Updated By",
            selector: "modified_by",
            sortable: true,
            width:'auto',
            // cell: d => <span>{d.closing.join(", ")}</span>
          },
      ]
      
      const deleteRecord = (id) => {
      
         // console.log(id)
        
        Swal.fire({
          title: `Are you sure? ${id}`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            api.post('/accounts/deleteExpense',{expense_id:id}).then(res=>{
              console.log(res)
              Swal.fire(
                'Deleted!',
                'Your Tender has been deleted.',
                'success'
              )
              getAccounts()

            })
          }
        })


        // api.get(`/tender/deleteExpense/${expense_id}`)
        //  .then((res)=> {
        //      setAccounts(res.data.data)
        //  })

      }
      

  return (
    <div className="MainDiv">
    {/* <div className="jumbotron text-center bg-sky">
        <h3>Therichpost.com</h3>
    </div> */}
    
    <div className="container">

    <Row>
          <Col md="6">
            <Link to="/TenderDetails">
              <Button  color="primary" className="my-3">
                Add New
              </Button>
            </Link>
          </Col>
                  
          </Row>

        
        <table id="example" className="display">
          <thead>
              <tr >
                  {columns.map(cell=>{
                    return (<td key={cell.name}>{cell.name}</td>)
                  })}
              </tr>
          </thead>
          <tbody>
            {accounts && accounts.map(element=>{
                return (<tr key={element.expense_id}>
                <td>{element.expense_id}</td>
                <td><Link to={`/TenderEdit/${element.expense_id}`} ><Icon.Edit2 /></Link></td>
                <td><Link to=""><span onClick={()=>deleteRecord(element.expense_id)}><Icon.Trash2 /></span></Link></td>
                <td>{element.date}</td>
                <td>{element.description}</td>
                <td>{element.amount}</td>
                <td>{element.type}</td>
                <td>{element.group}</td>
                <td>{element.sub_group}</td>
                <td>{element.payment_status}</td>
                <td>{element.modified_by}</td>
                </tr>)
            })}
          </tbody>
          <tfoot>
          <tr>
                  {columns.map(cell=>{
                    return (<td key={cell.name}>{cell.name}</td>)
                  })}
              </tr>
          </tfoot>
      </table>
      </div>
    </div>)
}

export default Accounts;