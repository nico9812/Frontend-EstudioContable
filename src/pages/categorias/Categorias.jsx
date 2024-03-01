import ContentCategorias from '@/components/categorias/ContentCategorias';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function Categorias() {
  return (
    <Card>
      <Card.Header className="text-center">
        <Card.Title> Categorias </Card.Title>
      </Card.Header>
      <Card.Body>
        <Button as={Link} to="../" variant="secondary">
          Volver
        </Button>
        <ContentCategorias />
      </Card.Body>
    </Card>
  );
}
