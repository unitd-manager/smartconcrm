import React,{useEffect} from 'react';
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
import { useDispatch,useSelector } from 'react-redux';
// import api from '../../constants/api';
import { getTenders,deleteTender } from '../../store/tender/tenderSlice';

const Test = () => {
    // const [tendersdata,setTendersdata] = useState(null);
    const dispatch=useDispatch();
    const tenders =useSelector(state=>state.tender.tenders);
    const getAllTenders = () =>{
      // api.get('/tender/getTenders')
      //   .then((res)=> {
      //       setTenders(res.data.data)
      //       console.log(res.data.data)
      //   })

      dispatch(getTenders());
      // setTendersdata(tenders);
      console.log(tenders);
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
                          ],
                        //   columnDefs: [
                        //   { visible: false, targets: 1 }
                        // ],
    searching: true
                }
            );
            } ,
            1000
            );
    
        getAllTenders()

    }, [])
    

   const columns = [
        {
          name: "id",
          selector: "opportunity_id",
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
          name: "Code",
          selector: "opportunity_code",
          sortable: true,
          grow:0,
          wrap: true
        },
        {
          name: "Project",
          selector: "title",
          sortable: true,
          grow:2,
          wrap: true
        },
        {
          name: "Ref No",
          selector: "office_ref_no",
          sortable: true,
          grow:0,
        },
        {
            name: "Main Con",
            selector: "company_name",
            sortable: true,
            width:'auto',
            grow:3,
            // cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "Actual Closing",
            selector: "closinactual_closing",
            sortable: true,
            grow:2,
            width:'auto',
            // cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "Status",
            selector: "status",
            sortable: true,
            grow:2,
            wrap: true,
            // cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "Quoted By",
            selector: "quote_ref",
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
            dispatch(deleteTender(id))
           .then(res=>{
              console.log(res)
              Swal.fire(
                'Deleted!',
                'Your Tender has been deleted.',
                'success'
              )
              getAllTenders()

            })
          }
        })


        // api.get(`/tender/deleteTender/${opportunity_id}`)
        //  .then((res)=> {
        //      setTenders(res.data.data)
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
            {tenders&& tenders.map(element=>{
                return (<tr key={element.title}>
                <td>{element.opportunity_id}</td>
                <td><Link to={`/TenderEdit/${element.opportunity_id}`} ><Icon.Edit2 /></Link></td>
                <td><Link to=""><span onClick={()=>deleteRecord(element.opportunity_id)}><Icon.Trash2 /></span></Link></td>
                <td>{element.opportunity_code}</td>
                <td>{element.title}</td>
                <td>{element.office_ref_no}</td>
                <td>{element.company_name}</td>
                <td>{element.closinactual_closing}</td>
                <td>{element.status}</td>
                <td>{element.quote_ref}</td>
                </tr>)
            })}
          </tbody>
          {/* <tfoot>
          <tr>
                  {columns.map(cell=>{
                    return (<td key={cell.name}>{cell.name}</td>)
                  })}
              </tr>
          </tfoot> */}
      </table>
      </div>
    </div>)
}

export default Test;