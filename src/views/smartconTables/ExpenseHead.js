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


const ExpenseHead = () => {
    const [accounts,setExpensehead] = useState(null);
    const getExpensehead = () =>{
      api.get('/expensehead/getExpenseHead')
        .then((res)=> {
          setExpensehead(res.data.data)
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
    
            getExpensehead()

    }, [])
    

   const columns = [
        {
          name: "id",
          selector: "expense_group_id",
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
          name: "Title",
          selector: "title",
          sortable: true,
          grow:0,
          wrap: true
        },
        {
          name: "	Updated By",
          selector: "updated_by",
          sortable: true,
          grow:2,
          wrap: true
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
            api.post('/expensehead/deleteExpGroup',{expense_group_id:id}).then(res=>{
              console.log(res)
              Swal.fire(
                'Deleted!',
                'Your Tender has been deleted.',
                'success'
              )
              getExpensehead()

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
            <Link to="/ExpenseHeadDetails">
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
                return (<tr key={element.expense_group_id}>
                <td>{element.expense_group_id}</td>
                <td><Link to={`/ExpenseHeadEdit/${element.expense_group_id}`} ><Icon.Edit2 /></Link></td>
                <td><Link to=""><span onClick={()=>deleteRecord(element.expense_group_id)}><Icon.Trash2 /></span></Link></td>
                <td>{element.title}</td>
                <td>{element.updated_by}</td>
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

export default ExpenseHead;