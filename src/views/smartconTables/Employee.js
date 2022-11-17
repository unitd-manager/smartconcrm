import { Link } from 'react-router-dom';
import {Row,Col,Button } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import bg1 from '../../assets/images/card/no-images.png';
import bg2 from '../../assets/images/card/laura.jpg';
// import bg3 from '../../assets/images/card/no-images.png';
import bg4 from '../../assets/images/card/PETERJOHN.jpg';
// import bg5 from '../../assets/images/card/no-images.png';
import bg6 from '../../assets/images/card/RICKSON.png';
// import bg7 from '../../assets/images/card/no-images.png';
// import bg8 from '../../assets/images/card/no-images.png';
import Blog from '../../components/dashboard/extraDashboard/Blog';

  
  const BlogData = [
    {
      image: bg1,
      title: 'ALEX',
      occupation:'',
      age: 'Age : 37',
      email:'Email :',
      phone:'Phone :',
    },
    {
      image: bg2,
      title: 'LAURA PATRICK',
      occupation:'Employee',
      age: 'Age : 34',
      email:'ac2@cubosale.com',
      phone:'96254178',
    },
    {
      image: bg1,
      title: "MRAF",
      occupation:'',
      age: 'Age : ',
      email:'Email :',
      phone:'Phone :',
    },
    {
      image: bg4,
      title: 'PETER JOHN',
      occupation:'',
      age: 'Age : 43',
      email:'ac1@cubosale.com',
      phone:'96547859',
    },
    {
        image: bg1,
        title: 'RAMESH VIGNESH',
        occupation:'',
        age: 'Age : 26',
        email:'Email :',
        phone:'Phone :',
      },
      {
        image: bg6,
        title: 'RICKSON',
        occupation:'Manager',
        age: 'Age : 22',
        email:'ac5@cubosale.com',
        phone:'Phone :',
      },
      {
        image: bg1,
        title: "SELVA SEKARAN",
        occupation:'Supervisor',
        age: 'Age : 34',
        email:'ac3@cubosale.com',
        phone:'Phone :',
      },
      {
        image: bg1,
        title: 'SIVA SHANKAR',
        occupation:'',
        age: 'Age : 34',
        email:'Email :',
        phone:'Phone :',
      },
      {
        image: bg1,
        title: 'SURENDAR',
        occupation:'',
        age: 'Age : 40',
        email:'Email : ac6@cubosale.com',
        phone:'Phone :',
      },
      {
        image: bg1,
        title: 'VIGNESHWARAN',
        occupation:'',
        age: 'Age : 37',
        email:'Email : ac4@cubosale.com',
        phone:'Phone :',
      },
  ];
  
  const Cards = () => {
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
          {BlogData.map((blg) => (
            <Col sm="6" lg="6" xl="3" key={blg.image}>
              <Blog
                image={blg.image}
                title={blg.title}
                occupation={blg.occupation}
                age={blg.age}
                email={blg.email}
                phone={blg.phone}
              />
            </Col>
          ))}
        </Row>
      </>
    );
  };
  
  export default Cards;
  