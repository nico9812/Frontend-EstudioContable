import ContentUsers from '@/components/users/ContentUsers';
import { Card } from 'react-bootstrap';

export const Clientes = () => {
  return (
    <Card className="text-center">
      <Card.Header>
        <Card.Title>Lista de Clientes</Card.Title>
      </Card.Header>
      <Card.Body>
        <ContentUsers />
      </Card.Body>
    </Card>
  );
};
