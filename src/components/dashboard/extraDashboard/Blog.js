import { Card, CardBody, CardImg, CardText, CardTitle, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Blog = ({ image, id, title, occupation, gender, email, phone, color }) => {
  return (
    <Card>
      <CardImg alt="Card image cap" src={image} />
      <CardBody className="p-4">
        <CardTitle tag="h5"><Link to="/EmployeeDetailsData">{title}</Link></CardTitle>
        <CardText>{id}</CardText>
        <CardText>{occupation}</CardText>
        <CardText>{gender}</CardText>
        <CardText>{email}</CardText>
        <CardText>{phone}</CardText>
        <Button color={color}>Read More</Button>
      </CardBody>
    </Card>
  );
};

Blog.propTypes = {
  image: PropTypes.string,
  id:PropTypes.string,
  title: PropTypes.string,
  occupation: PropTypes.string,
  gender: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  color: PropTypes.string,
};

export default Blog;
