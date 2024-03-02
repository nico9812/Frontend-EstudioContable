import ContentCategorias from '@/components/categorias/ContentCategorias';
import { Card } from 'react-bootstrap';

export function Categorias() {
  return (
    <Card>
      <Card.Header className="text-center">
        <Card.Title> Categorias </Card.Title>
      </Card.Header>
      <Card.Body>
        <ContentCategorias />
      </Card.Body>
    </Card>
  );
}
