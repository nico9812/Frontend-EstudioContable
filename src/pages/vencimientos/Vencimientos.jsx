import ContentCalendario from '@/components/vencimientos/ContentVencimientos';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function Vencimientos() {
  return (
    <Card>
      <Card.Header className="text-center">
        <Card.Title> Vencimientos</Card.Title>
      </Card.Header>
      <Card.Body>
        <Button as={Link} to="../" variant="secondary">
          Volver
        </Button>
        <ContentCalendario />
      </Card.Body>
    </Card>
  );
}
