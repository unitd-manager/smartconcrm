import React,{useEffect,useState} from 'react';
import * as Icon from 'react-feather';
// import Swal from 'sweetalert2'
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


const Project = () => {

    const [project,setProject] = useState(null);

    const getProject = () =>{
      api.get('project/getProjects')
        .then((res)=> {
          setProject(res.data.data)
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
            2000
            );
    
        getProject()

    }, [])
    

   const columns = [
        {
          name: "id",
          selector: "opportunity_id",
          grow:0,
          wrap: true,
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
          name: "Title",
          selector: "title",
          sortable: true,
          grow:2,
          wrap: true
        },
        {
          name: "company",
          selector: "company_name",
          sortable: true,
          grow:0,
        },
        {
            name: "contact",
            selector: "contact_name",
            sortable: true,
            width:'auto',
            grow:3,
            // cell: d => <span>{d.closing.join(", ")}</span>
          },
          {
            name: "Category",
            selector: "category",
            sortable: true,
            grow:2,
            width:'auto',
          },
          {
            name: "Status",
            selector: "status",
            sortable: true,
            grow:2,
            wrap: true,
          },
      ]
      
      // const deleteRecord = (id) => {
        
      //   Swal.fire({
      //     title: `Are you sure? ${id}`,
      //     text: "You won't be able to revert this!",
      //     icon: 'warning',
      //     showCancelButton: true,
      //     confirmButtonColor: '#3085d6',
      //     cancelButtonColor: '#d33',
      //     confirmButtonText: 'Yes, delete it!'
      //   }).then((result) => {
      //     if (result.isConfirmed) {
      //       api.post('/project/deleteProject',{project_id:id}).then(res=>{
      //         console.log(res)
      //         Swal.fire(
      //           'Deleted!',
      //           'Your Tender has been deleted.',
      //           'success'
      //         )
      //         getProject()

      //       })
      //     }
      //   })

      // }
      

  return (
    <div className="MainDiv">

    <div className="container">

        <table id="example" className="display">
          <thead>
              <tr >
                  {columns.map(cell=>{
                    return (<td key={cell.name}>{cell.name}</td>)
                  })}
              </tr>
          </thead>
          <tbody>
            {project && project.map((element,i)=>{
                return (<tr key={element.title}>
                <td>{i+1}</td>
                <td><Link to={`/projectEdit/${element.project_id}`}><Icon.Edit2 /></Link></td>
                <td><Link to=""><span ><Icon.Trash2 /></span></Link></td>
                <td>{element.project_code}</td>
                <td>{element.title}</td>
                <td>{element.company_name}</td>
                <td>{element.contact_name}</td>
                <td>{element.category}</td>
                <td>{element.status}</td>
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

export default Project;