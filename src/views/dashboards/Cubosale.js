import { Row, Col } from 'reactstrap';
import SalesOverview from '../../components/dashboard/classicDashboard/ProjectOverview';


const Classic = () => {
  return (
    <>
      {/*********************Sales Overview ************************/}
      <Row>
        <Col lg="12">
          <SalesOverview />
        </Col>
      </Row>
      {/*********************Email & Visitor ************************/}
      {/* <Row>
        <Col lg="8" sm="12">
          <EmailCampaign />
        </Col>
        <Col lg="4" sm="12">
          <ActiveVisitors />
        </Col>
      </Row>
      
      <Stats />
     
      <Row>
        <Col lg="12">
          <ProjectTable />
        </Col>
      </Row>
     
      <Row>
        <Col lg="6" sm="12">
          <RecentComments />
        </Col>
        <Col lg="6" sm="12">
          <Chat />
        </Col>
      </Row> */}
    </>
  );
};

export default Classic;
