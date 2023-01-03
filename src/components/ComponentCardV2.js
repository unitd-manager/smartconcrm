import { Card, CardBody } from 'reactstrap';
import PropTypes from 'prop-types';

const pStyle = {
  textAlign: 'right',
  marginRight: '10px'
};

const ComponentCardV2 = ({ children }) => {
  return (
    <Card>
      <CardBody style={pStyle}>
        <div className="btn btn-space text-nowrap">{children}</div>
      </CardBody>
    </Card>
  );
};

ComponentCardV2.propTypes = {
  children: PropTypes.node,
};

export default ComponentCardV2;
