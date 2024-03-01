import ContentClientes from '@/components/users/ContentClientes';
import { Card } from 'react-bootstrap';

export const Clientes = () => {
  return (
    <Card className="text-center">
      <Card.Header>
        <Card.Title>Lista de Clientes</Card.Title>
      </Card.Header>
      <Card.Body>
        <ContentClientes />
      </Card.Body>
    </Card>
  );
};
