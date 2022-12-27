import { Link } from 'react-router-dom';
import {Row,Col,Button } from 'reactstrap';
import {useDispatch,useSelector} from 'react-redux';
import { useEffect } from 'react';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
// import bg1 from '../../assets/images/card/no-images.png';
// import bg2 from '../../assets/images/card/laura.jpg';
// // import bg3 from '../../assets/images/card/no-images.png';
// import bg4 from '../../assets/images/card/PETERJOHN.jpg';
// // import bg5 from '../../assets/images/card/no-images.png';
// import bg6 from '../../assets/images/card/RICKSON.png';
// // import bg7 from '../../assets/images/card/no-images.png';
// // import bg8 from '../../assets/images/card/no-images.png';
import Blog from '../../components/dashboard/extraDashboard/Blog';

import {getEmployees} from '../../store/employee/employeeSlice';


  // const BlogData = [
  //   {
  //     image: bg1,
  //     title: 'ALEX',
  //     occupation:'',
  //     age: 'Age : 37',
  //     email:'Email :',
  //     phone:'Phone :',
  //   },
  //   {
  //     image: bg2,
  //     title: 'LAURA PATRICK',
  //     occupation:'Employee',
  //     age: 'Age : 34',
  //     email:'ac2@cubosale.com',
  //     phone:'96254178',
  //   },
  //   {
  //     image: bg1,
  //     title: "MRAF",
  //     occupation:'',
  //     age: 'Age : ',
  //     email:'Email :',
  //     phone:'Phone :',
  //   },
  //   {
  //     image: bg4,
  //     title: 'PETER JOHN',
  //     occupation:'',
  //     age: 'Age : 43',
  //     email:'ac1@cubosale.com',
  //     phone:'96547859',
  //   },
  //   {
  //       image: bg1,
  //       title: 'RAMESH VIGNESH',
  //       occupation:'',
  //       age: 'Age : 26',
  //       email:'Email :',
  //       phone:'Phone :',
  //     },
  //     {
  //       image: bg6,
  //       title: 'RICKSON',
  //       occupation:'Manager',
  //       age: 'Age : 22',
  //       email:'ac5@cubosale.com',
  //       phone:'Phone :',
  //     },
  //     {
  //       image: bg1,
  //       title: "SELVA SEKARAN",
  //       occupation:'Supervisor',
  //       age: 'Age : 34',
  //       email:'ac3@cubosale.com',
  //       phone:'Phone :',
  //     },
  //     {
  //       image: bg1,
  //       title: 'SIVA SHANKAR',
  //       occupation:'',
  //       age: 'Age : 34',
  //       email:'Email :',
  //       phone:'Phone :',
  //     },
  //     {
  //       image: bg1,
  //       title: 'SURENDAR',
  //       occupation:'',
  //       age: 'Age : 40',
  //       email:'Email : ac6@cubosale.com',
  //       phone:'Phone :',
  //     },
  //     {
  //       image: bg1,
  //       title: 'VIGNESHWARAN',
  //       occupation:'',
  //       age: 'Age : 37',
  //       email:'Email : ac4@cubosale.com',
  //       phone:'Phone :',
  //     },
  // ];
  
  const Cards = () => {
const dispatch=useDispatch();
const employees=useSelector(state=>state.employee.employees);

useEffect(()=>{
  dispatch(getEmployees());
},[]);

    return (
      <>
        <BreadCrumbs />
        <Row>
          <Col md="6">
            <Link to="/EmployeeDetails">
              <Button  color="primary" className="my-3">
                Add New
              </Button>
            </Link>
          </Col>     
        </Row>
        <Row className='employee-img'>
          {employees.map((blg) => (
            <Col sm="6" lg="6" xl="3" key={blg.employee_id_duplicate}>
              <Link to={`/EmployeeDetailsData/${blg.employee_id_duplicate}`}><Blog
                image={blg.image}
                id={blg.employee_id_duplicate}
                 title={blg.first_name}
                occupation={blg.project_designation}
                gender={blg.gender}
                email={blg.login_email}
                phone={blg.phone}
              />
              </Link>
            </Col>
          ))}
        </Row>
      </>
    );
  };
  
  export default Cards;
  