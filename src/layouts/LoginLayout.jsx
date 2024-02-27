import { Card, Col, Container, Row } from 'react-bootstrap';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '@/redux/reducer/authReducerSlice';

const LoginLayout = () => {
  const token = useSelector(selectCurrentToken);

  return token ? (
    <Navigate to="/dashboard" replace />
  ) : (
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
