import { React } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

const LoginLayout = () => {
  return (
    <Container className="py-0">
      <Row className="flex-center min-vh-100 py-6">
        <Col sm={10} md={8} lg={6} xl={5} className="col-xxl-4">
          <Card className="shadow p-4 bg-white rounded">
            <Outlet />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginLayout;
